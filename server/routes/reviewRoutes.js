const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get reviews for an item
router.get('/item/:itemId', async (req, res) => {
    try {
        const reviews = await Review.find({ item: req.params.itemId }).populate('user', 'username');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews" });
    }
});

// Post a review
router.post('/', async (req, res) => {
    const { item, user, rating, comment } = req.body;
    try {
        const newReview = new Review({
            item,
            user,
            rating,
            comment
        });
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: "Error posting review" });
    }
});

module.exports = router;
