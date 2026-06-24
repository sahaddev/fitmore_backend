const mongoose = require('mongoose');
const Banner = require('./models/bannerModel');
const bannerData = require('./banner.json');
const Notification = require('./models/notificationModel');
const notificationData = require('./notification.json');

const seedDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mydb');
        console.log('MongoDB connected for seeding');
        
        // Clear existing banners and notifications
        await Banner.deleteMany({});
        await Notification.deleteMany({});
        
        // Insert new data
        await Banner.insertMany(bannerData);
        await Notification.insertMany(notificationData);
        
        console.log('Banners and Notifications seeded successfully from json files');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDB();
