const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    id: Number,
    title: String,
    code: String,
}, { timestamps: true });

module.exports = mongoose.model('coupons', couponSchema);