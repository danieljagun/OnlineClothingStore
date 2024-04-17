const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: String,
    stock: { type: Number, required: true, default: 0 }

});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;