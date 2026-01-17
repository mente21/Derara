const Request = require('../models/Request');
const Contact = require('../models/Contact');
const User = require('../models/User'); // Import User model
const sendEmail = require('../utils/sendEmail'); // Import sendEmail utility

// Create a new request/inquiry (Protected - for logged in users)
exports.createRequest = async (req, res) => {
  const { type, subject, description, phone } = req.body;
  console.log(`New request received: ${subject} from ${req.user?.clerkId}`);
  try {
    const request = await Request.create({
      user: req.user.clerkId, // Explicitly use Clerk ID
      type,
      subject,
      description,
      phone,
    });

    // Fetch user details for email
    const user = await User.findOne({ clerkId: req.user.clerkId });
    const userEmail = user ? user.email : 'Unknown';
    const userName = user ? user.name : 'Unknown User';

    // Send Email Notification to Admin/Manager
    const message = `
      <h1>New Customer Request</h1>
      <p><strong>Customer:</strong> ${userName} (${userEmail})</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Type:</strong> ${type}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Description:</strong> ${description}</p>
      <hr/>
      <p>Login to Dashboard to respond.</p>
    `;

    // Send Email Notification to ALL Managers
    try {
        const staff = await User.find({ role: 'manager' });
        const staffEmails = staff.map(s => s.email);
        
        console.log("Notifying manager emails:", staffEmails);

        if (staffEmails.length > 0) {
            await sendEmail({
                email: staffEmails.join(','),
                subject: `New Request: ${subject}`,
                message,
            });
        }
    } catch (emailError) {
        console.error("Failed to notify managers via email:", emailError);
    }

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get history of requests for current customer
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.clerkId }); // Clerk ID
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a contact message (Public - for anyone on the contact page)
exports.createContact = async (req, res) => {
  const { name, email, subject, message: textMessage, phone } = req.body;
  try {
    const contact = await Contact.create(req.body);

    // Send Email Notification to Admin/Manager
    const htmlMessage = `
      <h1>New Contact Message</h1>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${textMessage}</p>
      <hr/>
      <p>Sent from Derara Public Contact Form</p>
    `;

    try {
        const staff = await User.find({ role: 'manager' });
        const staffEmails = staff.map(s => s.email);
        
        if (staffEmails.length > 0) {
            await sendEmail({
                email: staffEmails.join(','),
                subject: `Contact Form: ${subject}`,
                message: htmlMessage,
            });
        }
    } catch (emailError) {
        console.error("Failed to notify managers via email:", emailError);
    }

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
