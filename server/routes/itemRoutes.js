const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const authenticate = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');
const responseFactory = require('../config/responseFactory');

// Get all items - Public
router.get('/', async (req, res) => {
    try {
        const { category, manufacturer, title, sort } = req.query;
        let query = {};
        if (category) {
            query.category = category;
        }
        if (manufacturer) {
            query.manufacturer = manufacturer;
        }
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }

        let sortOptions = {};
        if (sort) {
            const sortKey = sort.startsWith('-') ? sort.slice(1) : sort;
            sortOptions[sortKey] = sort.startsWith('-') ? -1 : 1;
        }

        const items = await Item.find(query).sort(sortOptions);
        res.json(responseFactory.success(items));
    } catch (error) {
        res.status(500).json(responseFactory.error("Error fetching items", 500));
    }
});

// Get a single item by ID - Public
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json(responseFactory.error("Item not found", 404));
        }
        res.json(responseFactory.success(item));
    } catch (error) {
        res.status(500).json(responseFactory.error("Error fetching item", 500));
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
        res.status(201).json(responseFactory.success(savedItem, "Item created successfully"));
    } catch (error) {
        res.status(400).json(responseFactory.error("Error creating item"));
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
        res.json(responseFactory.success(updatedItem, "Item updated successfully"));
    } catch (error) {
        res.status(400).json(responseFactory.error("Error updating item"));
    }
});

// Delete an item - Admin
router.delete('/:id', [authenticate, isAdmin], async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json(responseFactory.success({}, "Item deleted successfully"));
    } catch (error) {
        res.status(500).json(responseFactory.error("Error deleting item", 500));
    }
});

module.exports = router;
