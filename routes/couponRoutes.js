const express = require('express');
const router = express.Router();

const {
    createCoupon,
    getCoupons,
    updateCoupon,
    getCouponById,
    deleteCoupon
} = require('../controllers/couponController');

router.post('/coupon', createCoupon);
router.get('/coupons', getCoupons);
router.get('/coupon', getCouponById);
router.put('/coupon', updateCoupon);
router.delete('/coupon', deleteCoupon);

module.exports = router; 