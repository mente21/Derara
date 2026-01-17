const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { createClerkClient } = require('@clerk/clerk-sdk-node');
const User = require('./models/User');

dotenv.config();

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const syncUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB.');

        console.log('Fetching all users from Clerk...');
        const clerkUsers = await clerk.users.getUserList();
        const userArray = Array.isArray(clerkUsers) ? clerkUsers : (clerkUsers.data || []);
        
        console.log(`Found ${userArray.length} users in Clerk.`);

        for (const u of userArray) {
            const email = u.emailAddresses[0]?.emailAddress;
            const name = u.username || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Anonymous';
            const role = u.publicMetadata?.role || 'customer';

            console.log(`Processing: ${name} (${email})`);

            // Check if a user with this email exists but has a different clerkId (legacy)
            const existingLegacy = await User.findOne({ email, clerkId: { $ne: u.id } });
            if (existingLegacy) {
                console.log(`   - Found legacy record for ${email}. Deleting to prevent conflict...`);
                await User.deleteOne({ _id: existingLegacy._id });
            }

            // Upsert the Clerk User
            await User.findOneAndUpdate(
                { clerkId: u.id },
                {
                    clerkId: u.id,
                    name,
                    email,
                    role
                },
                { upsert: true, new: true }
            );
            console.log(`   - Synced ${role} successfully.`);
        }

        console.log('--- SYNC COMPLETE ---');
        console.log('All Clerk users have been mirrored to MongoDB.');
        process.exit(0);
    } catch (err) {
        console.error('Sync failed:', err);
        process.exit(1);
    }
};

syncUsers();
