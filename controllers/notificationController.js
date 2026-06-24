const Notification = require('../models/notificationModel');

exports.fetchnotificationList = async (req, res) => {
    console.log("-> notificationController -> fetchnotificationList");
    try {
        // Optionally, if you pass userId in query `?userId=1` you can filter:
        // const query = req.query.userId ? { userId: req.query.userId } : {};
        // const notifications = await Notification.find(query).sort({ createdAt: -1 });
        
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.status(200).send({
            status: true,
            datas: notifications
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

exports.createNotification = async (req, res) => {
    console.log("-> notificationController -> createNotification");
    try {
        const { userId, title, message, subText, timeString, isRead } = req.body;
        
        if (!title || !message) {
            return res.status(400).send({ status: false, message: 'Title and message are required' });
        }
        
        const notification = await Notification.create({
            userId,
            title,
            message,
            subText,
            timeString,
            isRead: isRead || false
        });
        
        res.status(201).send({ status: true, message: "Notification Added successfully", data: notification });
    } catch (error) {
         res.status(500).send({
            status: false,
            message: 'Server Error',
            error: error.message
        });
    }
};
