const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mydb');
        console.log('mongoDb connected');
    } catch (error) {
        console.log('DB connection error', error);
    }
};

module.exports = connectDB;