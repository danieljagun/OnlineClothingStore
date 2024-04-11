const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
        quantity: { type: Number, required: true },
    }],
    status: { type: String, default: 'pending' }, // Example status values: pending, completed, shipped, etc.
    createdAt: { type: Date, default: Date.now },

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
