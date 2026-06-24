const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');
const { fetchnotificationList, createNotification } = require('../controllers/notificationController');

router.get('/notifications', authMiddleware, fetchnotificationList);
router.post('/notification', authMiddleware, createNotification);

module.exports = router;
