const express = require('express');
const router = express.Router();

const {
    createCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon
} = require('../controllers/couponController');

router.post('/coupon', createCoupon);
router.get('/coupons', getCoupons);
router.put('/coupon/:id', updateCoupon);
router.delete('/coupon/:id', deleteCoupon);

module.exports = router;