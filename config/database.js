const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Connect to the database
const databaseConnection = () => {
    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, // Recommended options to avoid deprecation warnings
        })
        .then(() => {
            console.log('Connected to the job portal database');
        })
        .catch((error) => {
            console.error('Connection to the database failed:', error.message);
            process.exit(1); // Exit the process with a failure code
        });
};

// Export the databaseConnection function
module.exports = databaseConnection;
