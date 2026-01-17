const { createClerkClient } = require('@clerk/clerk-sdk-node');
const User = require('../models/User'); // Central Import

// Lazy initialization
let clerk = null;
const getClerkClient = () => {
    if (!clerk) {
        clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    }
    return clerk;
};

// @desc    Get all users (from Clerk) and auto-sync to MongoDB
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        console.log('📡 Fetching users from Clerk and syncing to DB...');
        const clerkUsers = await getClerkClient().users.getUserList();
        const userArray = Array.isArray(clerkUsers) ? clerkUsers : (clerkUsers.data || []);
        
        // Auto-Sync and CLEANUP
        const clerkIds = userArray.map(u => u.id);
        
        // 1. Delete anyone in DB who is NOT in Clerk anymore (Full Mirror)
        await User.deleteMany({ clerkId: { $nin: clerkIds, $exists: true } });

        const syncPromises = userArray.map(async (u) => {
            const email = u.emailAddresses[0]?.emailAddress;
            const name = u.username || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Anonymous';
            const role = u.publicMetadata?.role || 'customer';

            // Remove legacy email conflicts (legacy records without clerkId)
            if (email) {
                await User.deleteMany({ email: email, clerkId: { $ne: u.id } });
            }

            return User.findOneAndUpdate(
                { clerkId: u.id },
                { clerkId: u.id, name, email, role },
                { upsert: true, new: true }
            );
        });
        await Promise.all(syncPromises);

        // Map for Frontend
        const mappedUsers = userArray.map(user => ({
            _id: user.id,
            id: user.id,
            name: user.username || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Anonymous',
            email: user.emailAddresses[0]?.emailAddress || 'No Email',
            role: user.publicMetadata?.role || 'customer',
            createdAt: user.createdAt
        }));

        res.json(mappedUsers);
    } catch (error) {
        console.error('getUsers Sync Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user role in Clerk
// @route   PUT /api/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const userId = req.params.id;

        console.log(`Updating role for user ${userId} to ${role}`);

        // Update Clerk User's public metadata
        const updatedUser = await getClerkClient().users.updateUserMetadata(userId, {
            publicMetadata: { role }
        });

        // 2. CRITICAL SYNC: Handle MongoDB with conflict resolution
        const clerkUser = await getClerkClient().users.getUser(userId);
        const email = clerkUser.emailAddresses[0]?.emailAddress;
        const name = clerkUser.username || `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim();

        // Check and remove any legacy record using this email but a different clerkId
        if (email) {
            await User.deleteMany({ email: email, clerkId: { $ne: userId } });
        }

        const dbUser = await User.findOneAndUpdate(
            { clerkId: userId },
            { role, email, name }, // Update everything to be safe
            { new: true, upsert: true }
        );

        console.log(`Successfully forced sync for ${email} in MongoDB`);

        res.json({
            _id: updatedUser.id,
            id: updatedUser.id,
            role: updatedUser.publicMetadata.role
        });
    } catch (error) {
        console.error('Clerk Update Metadata Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user from Clerk
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Prevent self-deletion
        if (userId === req.user.clerkId || userId === req.user.id) { // Check both to be safe
            return res.status(400).json({ message: 'You cannot delete yourself' });
        }

        // Fetch user data before deletion from Clerk to get email
        const clerkUserToDelete = await getClerkClient().users.getUser(userId);
        const emailToDelete = clerkUserToDelete.emailAddresses[0]?.emailAddress;

        await getClerkClient().users.deleteUser(userId);

        // SYNC: Remove from MongoDB using both Clerk ID and Email (to catch legacy records)
        if (emailToDelete) {
            await User.deleteMany({ email: emailToDelete });
        }
        await User.deleteMany({ clerkId: userId });

        res.json({ message: 'User removed from Clerk and Database' });
    } catch (error) {
        console.error('Clerk Delete User Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Sync all users from Clerk to MongoDB
// @route   POST /api/users/sync
// @access  Private/Admin
const syncAllUsers = async (req, res) => {
    try {
        console.log('Starting manual sync...');
        const clerkUsers = await getClerkClient().users.getUserList();
        const userArray = Array.isArray(clerkUsers) ? clerkUsers : (clerkUsers.data || []);
        
        for (const u of userArray) {
            const email = u.emailAddresses[0]?.emailAddress;
            const name = u.username || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Anonymous';
            const role = u.publicMetadata?.role || 'customer';

            // Check if a user with this email exists but has a different clerkId (legacy)
            const existingLegacy = await User.findOne({ email, clerkId: { $ne: u.id } });
            if (existingLegacy) {
                await User.deleteOne({ _id: existingLegacy._id });
            }

            await User.findOneAndUpdate(
                { clerkId: u.id },
                { clerkId: u.id, name, email, role },
                { upsert: true }
            );
        }
        res.json({ message: `Successfully synced ${userArray.length} users` });
    } catch (error) {
        console.error('Sync error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Invite/Create user in Clerk and sync to MongoDB
// @route   POST /api/users/invite
// @access  Private/Admin
const inviteUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        console.log(`🚀 Creating new user: ${email} with role: ${role}`);

        // 1. Check for legacy conflicts in DB first
        await User.deleteMany({ email: email });

        // 2. Create user in Clerk
        const clerkUser = await getClerkClient().users.createUser({
            emailAddress: [email],
            firstName: name.split(' ')[0] || 'User',
            lastName: name.split(' ').slice(1).join(' ') || '',
            publicMetadata: { role }
        });

        // 3. Sync to MongoDB
        await User.findOneAndUpdate(
            { clerkId: clerkUser.id },
            { clerkId: clerkUser.id, name, email, role },
            { upsert: true, new: true }
        );

        res.status(201).json({ message: 'User invited and synced successfully' });
    } catch (error) {
        console.error('Invite error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, updateUserRole, deleteUser, syncAllUsers, inviteUser };
