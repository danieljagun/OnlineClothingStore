const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Corrected from UserRoutes to User
const bcrypt = require('bcryptjs');

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password, shippingAddress, paymentMethod } = req.body;
    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ // Corrected to use User
            username,
            email,
            password: hashedPassword,
            shippingAddress,
            paymentMethod
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: { ...savedUser._doc, password: undefined } }); // Corrected the message
    } catch (error) {
        res.status(400).json({ message: "Error registering user" });
    }
});

// Login (This is a simplistic approach; you'll want to use JWT or sessions for actual authentication)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username }); // Corrected to use User
        if (!user) {
            return res.status(404).json({ message: "User not found" }); // Corrected the message
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({ message: "User logged in successfully", user: { ...user._doc, password: undefined } }); // Corrected the message
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

module.exports = router;
