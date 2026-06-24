const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: Number,
    title: String,
    message: String,
    subText: String,
    timeString: String,
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('notifications', notificationSchema);
