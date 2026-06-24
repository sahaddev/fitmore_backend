const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    image4: { type: String, required: true },
    image5: { type: String, required: true },
    active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);
