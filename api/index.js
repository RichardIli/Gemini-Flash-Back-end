// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const routes = require('./routes/routes.js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// Basic error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error occurred.' });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});