const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    shippingAddress: String,
    paymentMethod: String,
    isAdmin: { type: Boolean, default: false },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
