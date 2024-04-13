const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authenticate = require("../middleware/authenticate");
const isAdmin = require('../middleware/isAdmin');
const responseFactory = require('../config/responseFactory');

// Get all orders - Public (logged in)
router.get('/', authenticate, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user items.item');
        res.json(responseFactory.success(orders, "Orders fetched successfully"));
    } catch (error) {
        res.status(500).json(responseFactory.error("Error fetching orders", 500));
    }
});

// Create a new order - Admin
router.post('/', [authenticate, isAdmin], async (req, res) => {
    const { user, items } = req.body;

    // Check stock levels and update them accordingly
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        for (const orderItem of items) {
            const item = await Item.findById(orderItem.item).session(session);
            if (!item || item.stock < orderItem.quantity) {
                throw new Error('Item not available');
            }
            item.stock -= orderItem.quantity;
            await item.save({ session });
        }

        // If stock levels are sufficient, save the order
        const newOrder = new Order({ user, items });
        const savedOrder = await newOrder.save({ session });

        await session.commitTransaction();
        res.status(201).json(responseFactory.success(savedOrder, "Order created successfully"));
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json(responseFactory.error("Error creating order: ${error.message}", 400));
    } finally {
        session.endSession();
    }
});

module.exports = router;
