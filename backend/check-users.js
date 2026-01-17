const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkManagers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
        
        const allUsers = await User.find({});
        console.log('--- ALL USERS IN DATABASE ---');
        allUsers.forEach(u => {
            console.log(`- Name: ${u.name} | Email: ${u.email} | Role: "${u.role}"`);
        });
        console.log('-----------------------------');
        
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkManagers();
