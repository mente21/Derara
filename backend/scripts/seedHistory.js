const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const History = require('../models/History');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedHistory = async () => {
    try {
        console.log('Connecting to MongoDB for seeding...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected!');

        const defaultHistory = [
            {
                title: "Ethiopian Roots",
                description: "Born in the heart of Addis Ababa, Derara was founded with a singular mission: to honor Ethiopia's coffee heritage. We started by building direct relationships with local farmers to ensure every bean tells the story of its origin.",
                icon: "Flag",
                image: "localfarmers.png",
                order: 0,
                createdBy: "system"
            },
            {
                title: "Local Excellence",
                description: "By implementing sustainable export practices and innovative processing methods, we've set new benchmarks for quality in Ethiopia. Our foundation is built on empowering our community and perfecting our craft.",
                icon: "Award",
                image: "excellence.jpg",
                order: 1,
                createdBy: "system"
            },
            {
                title: "Global Vision",
                description: "Our journey is just beginning. With plans to establish presence in major global hubs like Dubai and London, we are committed to being the premier bridge between Ethiopian soil and the international stage.",
                icon: "TrendingUp",
                image: "globalvision.png",
                order: 2,
                createdBy: "system"
            }
        ];

        // Clear existing history
        await History.deleteMany({});
        console.log('Cleared existing history items.');

        // Insert new ones
        await History.insertMany(defaultHistory);
        console.log('✅ History seeded successfully with default data!');
        
        process.exit();
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
};

seedHistory();
