const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    username: String,
    email: String,
    password: String,
    profile: String,
    phonenumber: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);