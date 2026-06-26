const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            }
        }
    ]
});

module.exports = mongoose.model("Favorite", favoriteSchema);
