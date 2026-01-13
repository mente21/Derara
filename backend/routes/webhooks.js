const express = require('express');
const router = express.Router();
const clerkWebhookController = require('../controllers/clerkWebhookController');

// Clerk Webhook - uses raw body for verification
router.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhookController.handleClerkWebhook);

module.exports = router;
