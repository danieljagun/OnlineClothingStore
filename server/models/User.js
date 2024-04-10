const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    shippingAddress: String,
    paymentMethod: String,
    isAdmin: { type: Boolean, default: false }, // Default value is false for regular users
});

const User = mongoose.model('User', userSchema);
