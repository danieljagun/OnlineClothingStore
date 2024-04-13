const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const responseFactory = require('../config/responseFactory');

// Register a new user - Public
router.post('/register', async (req, res) => {
    const { username, email, password, shippingAddress, paymentMethod } = req.body;
    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            shippingAddress,
            paymentMethod
        });
        const savedUser = await newUser.save();

        // Generate a JWT token
        const token = jwt.sign(
            { id: savedUser._id }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1d' } // Token expiration
        );

        // Send back the token and user info (excluding password)
        res.status(201).json(responseFactory.success({
            token,
            user: { ...savedUser._doc, password: undefined }
        },"User registered successfully"));
    } catch (error) {
        console.error(error);
        res.status(400).json(responseFactory.error("Error registering user"));
    }
});

// Login - Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json(responseFactory.error("User not found", 404));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(responseFactory.error("Invalid credentials"));
        }

        // Generate a JWT token upon successful login
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Send back the token and user info (excluding password)
        res.json(responseFactory.success({
            token,
            user: { ...user._doc, password: undefined }
        }, "User logged in successfully"));
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

module.exports = router;
