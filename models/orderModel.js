const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    products: [
        {
            productId: {
                type: Number,
                ref: "products"
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String
    },
    paymentMethod: {
        type: String,
        default: "COD"
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);
