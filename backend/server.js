const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const operationRoutes = require('./routes/operationRoutes');
const webhookRoutes = require('./routes/webhooks');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
// Force restart

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for local testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'svix-id', 'svix-signature', 'svix-timestamp']
}));

// Routes that need raw body (Webhooks)
app.use('/api/webhooks', webhookRoutes);

app.use(express.json()); // Body parser for all other routes

// Request Logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// app.use(helmet()); // Security headers (Commented out for local debug)

// Protected Routes
app.use('/api/users', userRoutes);
app.use('/api/ops', operationRoutes);

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is reachable with Clerk integration!' });
});

// Basic route
app.get('/', (req, res) => {
  res.send('Derara API is running with Clerk Auth...');
});

// 404 Handler (JSON)
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found on this server` });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (!process.env.CLERK_SECRET_KEY) {
    console.warn('⚠️ WARNING: CLERK_SECRET_KEY is missing from environment variables!');
  }
});
