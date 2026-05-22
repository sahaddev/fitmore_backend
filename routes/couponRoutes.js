const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

const {
    createCoupon,
    getCoupons,
    updateCoupon,
    getCouponById,
    deleteCoupon
} = require('../controllers/couponController');

router.post('/coupon', authMiddleware, createCoupon);
router.get('/coupons', authMiddleware, getCoupons);
router.get('/coupon', authMiddleware, getCouponById);
router.put('/coupon', authMiddleware, updateCoupon);
router.delete('/coupon', authMiddleware, deleteCoupon);

module.exports = router; 