const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    username: String,
    email: String,
    password: String,
    profile_image: String,
    phone_number: String,
    ordersCount: Number,
    active: Boolean,
    created_at: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);