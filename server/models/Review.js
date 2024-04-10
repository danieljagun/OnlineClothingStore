const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    comment: String,
    createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);
