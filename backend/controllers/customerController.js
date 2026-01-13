const Request = require('../models/Request');
const Contact = require('../models/Contact');

// Create a new request/inquiry (Protected - for logged in users)
exports.createRequest = async (req, res) => {
  const { type, subject, description } = req.body;
  try {
    const request = await Request.create({
      user: req.user.id, // Clerk ID
      type,
      subject,
      description,
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get history of requests for current customer
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.id }); // Clerk ID
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a contact message (Public - for anyone on the contact page)
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
