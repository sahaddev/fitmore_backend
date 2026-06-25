const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
});

module.exports = mongoose.model("Cart", cartSchema);
