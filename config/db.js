const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sahaddev25_db_user:Xf9TcGsQdD2ZvQr3@sahaddev.bugwu6p.mongodb.net/?appName=sahaddev');
        console.log('mongoDb connected');
    } catch (error) {
        console.log('DB connection error', error);
    }
};

module.exports = connectDB;