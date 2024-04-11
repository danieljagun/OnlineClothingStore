const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const authenticate = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');

// Get all items - Public
router.get('/', async (req, res) => {
    try {
        const items = await Item.find({});
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching items" });
    }
});

// Get a single item by ID - Public
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Error fetching item" });
    }
});

// Create a new item - Admin
router.post('/', [authenticate, isAdmin], async (req, res) => {
    const { title, manufacturer, price, category, image, stock } = req.body;
    try {
        const newItem = new Item({
            title,
            manufacturer,
            price,
            category,
            image,
            stock
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: "Error creating item" });
    }
});

// Update an item - Admin
router.put('/:id', [authenticate, isAdmin], async (req, res) => {
    const { title, manufacturer, price, category, image, stock } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, {
            title,
            manufacturer,
            price,
            category,
            image,
            stock
        }, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: "Error updating item" });
    }
});

// Delete an item - Admin
router.delete('/:id', [authenticate, isAdmin], async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting item" });
    }
});

module.exports = router;
