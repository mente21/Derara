const dotenv = require('dotenv');
const path = require('path');
const sendEmail = require('./utils/sendEmail');

// Load env from backend folder
dotenv.config({ path: path.join(__dirname, '.env') });

const testEmail = async () => {
    console.log('Testing email with:');
    console.log('User:', process.env.EMAIL_USER);
    console.log('Pass:', process.env.EMAIL_PASS ? '********' : 'MISSING');
    
    await sendEmail({
        email: process.env.EMAIL_USER,
        subject: 'Derara Test Email',
        message: '<h1>Test Successful</h1><p>If you see this, your Gmail configuration is correct!</p>'
    });
};

testEmail();
