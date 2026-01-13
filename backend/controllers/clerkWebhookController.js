const { Webhook } = require('svix');
const { createClerkClient } = require('@clerk/clerk-sdk-node');

// Lazy initialization
let clerk = null;
const getClerkClient = () => {
    if (!clerk) {
        clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    }
    return clerk;
};

exports.handleClerkWebhook = async (req, res) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error('Missing CLERK_WEBHOOK_SECRET');
        return res.status(500).json({ message: 'Webhook secret not configured' });
    }

    // Get the headers
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).json({ message: 'Missing svix headers' });
    }

    // Get the body
    const payload = req.body;
    const body = payload.toString();

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        console.error('Error verifying webhook:', err.message);
        return res.status(400).json({ message: 'Verification failed' });
    }

    // Handle the event
    const eventType = evt.type;
    console.log(`Received webhook event: ${eventType}`);

    if (eventType === 'user.created') {
        const { id, email_addresses, first_name } = evt.data;
        const email = email_addresses[0]?.email_address;

        console.log(`New User Created in Clerk: ${id} (${email})`);

        try {
            // Check if this is the first user to make them admin
            const userList = await getClerkClient().users.getUserList();
            const totalCount = userList.totalCount ?? (Array.isArray(userList) ? userList.length : (userList.data?.length || 0));
            const isFirstUser = totalCount <= 1;
            
            const role = isFirstUser ? 'admin' : 'customer';
            
            console.log(`Assigning role: ${role} to user: ${id}`);

            await getClerkClient().users.updateUserMetadata(id, {
                publicMetadata: {
                    role: role
                }
            });

            console.log(`Successfully assigned ${role} to ${id}`);
        } catch (error) {
            console.error('Error updating user metadata:', error.message);
        }
    }

    res.status(200).json({ message: 'Webhook handled' });
};
