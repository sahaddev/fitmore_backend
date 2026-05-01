const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    image_one: String,
    image_two: String,
    image_three: String,
    image_four: String,
    price: Number,
    category: String,
    active: Boolean,
    quantity: Number,
}, { timestamps: true });

module.exports = mongoose.model('products', productSchema);
