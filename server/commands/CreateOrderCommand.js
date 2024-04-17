const Command = require('./Command');
const Item = require("../models/Item");
const Order = require("../models/Order");
const User = require("../models/User");
const { validatePaymentDetails } = require("../config/validation");
const mailjet = require('node-mailjet').connect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_API_SECRET
);

class CreateOrderCommand extends Command {
    constructor(session, orderDetails) {
        super();
        this.session = session;
        this.orderDetails = orderDetails;
    }

    async execute() {
        const { items, paymentDetails, shippingAddress, email, userId } = this.orderDetails;

        if (!validatePaymentDetails(paymentDetails)) {
            throw new Error("Invalid payment details");
        }

        // Fetch user details
        const user = await User.findById(userId).session(this.session);
        if (!user) {
            throw new Error("User not found");
        }

        // Check and update stock
        for (const orderItem of items) {
            const item = await Item.findById(orderItem.item).session(this.session);
            if (!item || item.stock < orderItem.quantity) {
                throw new Error('Item not available');
            }
            item.stock -= orderItem.quantity;
            await item.save({ session: this.session });
        }

        // Save the order
        const newOrder = new Order({
            user: userId,
            items,
            paymentDetails,
            shippingAddress,
            email
        });
        const savedOrder = await newOrder.save({ session: this.session });


        try {
            await this.sendConfirmationEmail(email, savedOrder._id, user.name);
        } catch (error) {
            console.error("Failed to send confirmation email:", error.message);
        }

        return savedOrder;
    }

    async sendConfirmationEmail(email, orderId, userName) {
        const request = mailjet.post("send", { version: "v3.1" }).request({
            Messages: [{
                From: {
                    Email: process.env.EMAIL_USERNAME,
                    Name: "Online Shop"
                },
                To: [{
                    Email: email,
                    Name: userName
                }],
                Subject: "Order Confirmation",
                TextPart: `Your order has been placed successfully. Order Number: ${orderId}`
            }]
        });
        await request;
    }
}

module.exports = CreateOrderCommand;
