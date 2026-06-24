const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');
const { fetchbannerImage, createBanner } = require('../controllers/bannerController');

router.get('/banner', authMiddleware, fetchbannerImage);
router.post('/banner', authMiddleware, createBanner);

module.exports = router;
