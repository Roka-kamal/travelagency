const express = require('express');
const dotenv = require('dotenv');
const initiateDBConnection = require('./config/db');
const userRouter = require('./routes/user');

// Load environment variables from .env file
dotenv.config({ path: './config/.env' });

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define the port from environment variables with a fallback
const PORT = process.env.PORT;

// Set up routes
app.use('/user', userRouter);

// Start the server and initialize the database connection
app.listen(PORT, async () => {
    try {
        console.log(`Server is running on port ${PORT}`);
        await initiateDBConnection();
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit with an error if DB connection fails
    }
});