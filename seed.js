const mongoose = require('mongoose');
const Banner = require('./models/bannerModel');
const bannerData = require('./banner.json');

const seedDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mydb');
        console.log('MongoDB connected for seeding');
        
        // Clear existing banners
        await Banner.deleteMany({});
        
        // Insert new banners
        await Banner.insertMany(bannerData);
        
        console.log('Banners seeded successfully from banner.json');
        process.exit();
    } catch (error) {
        console.error('Error seeding banners:', error);
        process.exit(1);
    }
};

seedDB();
