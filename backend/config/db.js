const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const maskedURI = process.env.MONGO_URI ? process.env.MONGO_URI.replace(/:([^@]+)@/, ':****@') : 'UNDEFINED';
    console.log(`Connecting to: ${maskedURI}`);
    
    // Added options to handle SRV/DNS timeouts better
    const options = {
       // defaults
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error.message.includes('ETIMEOUT') || error.message.includes('querySrv')) {
      console.error('❌ DATABASE CONNECTION ERROR: DNS/SRV Timeout.');
      console.error('👉 Suggestion: Check your internet, change DNS to 8.8.8.8, or use the non-srv connection string in .env');
    } else {
      console.error(`Error: ${error.message}`);
    }
    // process.exit(1); // Optional: keep it running so it doesn't crash the dev server during retry
  }
};

module.exports = connectDB;
