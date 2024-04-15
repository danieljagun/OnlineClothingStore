require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const connectDatabase = require('./config/database');

// MongoDB connection
connectDatabase();

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from this origin only
}));

// Import routes
const itemRoutes = require('./routes/itemRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/items', itemRoutes);
app.use('/orders', orderRoutes);
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
