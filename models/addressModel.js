const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    id: Number,
    pincode: Number,
    city: String,
    state: String,
    country: String,
    build_name: String,
    street_name: String,
    area: String,
    user_id: Number,
}, { timestamps: true });
module.exports = mongoose.model("address", addressSchema);


