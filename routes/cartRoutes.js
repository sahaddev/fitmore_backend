const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

const {
    addToCart,
    getCart,
    removeFromCart,
    clearCart
} = require('../controllers/cartController');

router.post('/cart/add', authMiddleware, addToCart);
router.get('/cart/:userId', authMiddleware, getCart);
router.post('/cart/remove', authMiddleware, removeFromCart);
router.post('/cart/clear', authMiddleware, clearCart);

module.exports = router;
