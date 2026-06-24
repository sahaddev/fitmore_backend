const Banner = require('../models/bannerModel');

exports.fetchbannerImage = async (req, res) => {
    console.log("-> bannerController -> fetchbannerImage");
    try {
        const banners = await Banner.find({ active: true });
        res.status(200).send({
            status: true,
            datas: banners
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

exports.createBanner = async (req, res) => {
    console.log("-> bannerController -> createBanner");
    try {
        const { image1, image2, image3, image4, image5 } = req.body;
        
        if (!image1 || !image2 || !image3 || !image4 || !image5) {
            return res.status(400).send({ status: false, message: 'All 5 image URLs are required' });
        }
        
        const banner = await Banner.create({
            image1,
            image2,
            image3,
            image4,
            image5
        });
        
        res.status(201).send({ status: true, message: "Banner Added successfully", data: banner });
    } catch (error) {
         res.status(500).send({
            status: false,
            message: 'Server Error',
            error: error.message
        });
    }
};
