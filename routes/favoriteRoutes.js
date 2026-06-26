const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

const {
    addToFavorites,
    getFavorites,
    removeFromFavorites
} = require('../controllers/favoriteController');

router.post('/favorite/add', authMiddleware, addToFavorites);
router.get('/favorite/:userId', authMiddleware, getFavorites);
router.post('/favorite/remove', authMiddleware, removeFromFavorites);

module.exports = router;
