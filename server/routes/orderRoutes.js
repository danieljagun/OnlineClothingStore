require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Types: { ObjectId } } = require('mongoose');
const Order = require('../models/Order');
const authenticate = require("../middleware/authenticate");
const nodemailer = require('nodemailer');
const responseFactory = require('../config/responseFactory');
const { validatePaymentDetails } = require('../config/validation');
const isAdmin = require("../middleware/isAdmin");

// Setup NodeMailer transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// Define a function to send order confirmation email using NodeMailer
const sendOrderConfirmationEmail = async (email, orderId) => {
    const mailOptions = {
        from: 'your-email@gmail.com', // Replace with your email address
        to: email,
        subject: 'Order Confirmation',
        text: `Your order with ID ${orderId} has been successfully processed.`,
        html: `<p>Your order with ID <strong>${orderId}</strong> has been successfully processed.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
        throw new Error('Failed to send order confirmation email');
    }
};

const isValidObjectId = (id) => {
    const { ObjectId } = require('mongoose').Types;
    return ObjectId.isValid(id);
};

router.get('/user/:userId', authenticate, isAdmin, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders for user." });
    }
});

// Create a new order - Logged in users
router.post('/', async (req, res) => {
    console.log("Received Order Data:", req.body);

    const { items, paymentDetails: nestedPaymentDetails, shippingAddress, email, userId } = req.body;
    const { paymentDetails } = nestedPaymentDetails;

    if (!validatePaymentDetails(paymentDetails)) {
        console.log("Invalid payment details:", paymentDetails);
        return res.status(400).json(responseFactory.error("Invalid payment details"));
    }

    try {
        if (!userId || !isValidObjectId(userId)) {
            console.log("Invalid or missing userId:", userId);
            throw new Error("Invalid or missing userId");
        }

        const order = new Order({
            user: new ObjectId(userId),
            items: items.map(item => ({
                item: new ObjectId(item.item),
                quantity: item.quantity
            })),
            paymentDetails,
            shippingAddress,
            email,
            status: 'pending'
        });

        const savedOrder = await order.save();

        /// Send order confirmation email
        await sendOrderConfirmationEmail(email, savedOrder._id);

        res.status(201).json(responseFactory.success(savedOrder, "Order created successfully"));
    } catch (error) {
        console.error("Order processing error:", error);
        res.status(400).json(responseFactory.error(`Error creating order: ${error.message}`, 400));
    }
});

//Test Endpoint
router.post('/test', async (req, res) => {
    try {
        const testOrder = new Order({
            user: new ObjectId('5f8d04b5db93c74aab4224b7'),
            items: [{
                item: new ObjectId('5f8d04b5db93c74aab4224b8'),
                quantity: 1
            }],
            paymentDetails: {
                cardNumber: "1234567890123456",
                expirationDate: new Date(2023, 0, 1),
                cvv: "123"
            },
            shippingAddress: "123 Test St",
            email: "test@example.com",
            status: 'pending'
        });
        const savedOrder = await testOrder.save();
        res.json({ message: "Test order created successfully", order: savedOrder });
    } catch (error) {
        console.error("Failed to create test order:", error);
        res.status(400).json({ message: "Failed to create test order", error: error.message });
    }
});

// Get all orders with user and item details - Admin only
router.get('/', authenticate, isAdmin, async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'username email')
            .populate({
                path: 'items.item',
                model: 'Item',
                select: 'title price'
            });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders.", error });
    }
});

module.exports = router;
