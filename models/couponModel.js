const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    id: Number,
    title: String,
    code: String,
    description: String,
    expiry: String,
    status: String,
    limit: Number,
    couponCount: Number,
    percentage: Number,
    fixedAmount: Number,

}, { timestamps: true });

module.exports = mongoose.model('coupons', couponSchema);