const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { createClerkClient } = require('@clerk/clerk-sdk-node');
const User = require('./models/User');

dotenv.config();

const clean = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
        const clerkUsers = await clerk.users.getUserList();
        const userArray = Array.isArray(clerkUsers) ? clerkUsers : (clerkUsers.data || []);
        const clerkIds = userArray.map(u => u.id);

        console.log(`Clerk has ${clerkIds.length} users.`);

        // 1. Delete anyone in DB who has a clerkId that is NOT in the Clerk list
        const res1 = await User.deleteMany({ clerkId: { $nin: clerkIds, $exists: true } });
        console.log(`Removed ${res1.deletedCount} ghost users (wrong clerkId)`);

        // 2. Delete anyone in DB who HAS NO clerkId at all (Legacy) if their email is not special
        // In a true mirror, we delete everyone not in Clerk.
        const res2 = await User.deleteMany({ clerkId: { $exists: false } });
        console.log(`Removed ${res2.deletedCount} legacy users (no clerkId)`);

        // 3. Re-Mirror everyone from Clerk
        for (const u of userArray) {
            const email = u.emailAddresses[0]?.emailAddress;
            const name = u.username || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Anonymous';
            const role = u.publicMetadata?.role || 'customer';

            await User.findOneAndUpdate(
                { clerkId: u.id },
                { clerkId: u.id, name, email, role },
                { upsert: true }
            );
        }
        console.log('Finished Mirroring.');

        const finalCount = await User.countDocuments();
        console.log(`Final user count in DB: ${finalCount}`);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

clean();
