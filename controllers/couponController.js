let Coupons = require('../models/couponModel');

exports.createCoupon = async (req, res) => {
    const { code, percentage, fixedAmount, title } = req.body;
    if (!code || !title) return res.send({
        status: false,
        message: 'All Fields required'
    });
    const alredythere = await Coupons.findOne({ code: code });
    if (alredythere) {
        return res.send({ status: false, message: 'Coupon Already exists in same code' });
    }

    const couponCount = await Coupons.countDocuments();
    const coupon = await Coupons.create({
        id: couponCount + 1,
        title: title,
        code: code,
        description: null,
        expiry: null,
        status: 'active',
        limit: 100,
        couponCount: 0,
        percentage: percentage || null,
        fixedAmount: fixedAmount || null,
    });
    res.send({
        status: true,
        message: 'coupon created successfully',
        coupon
    });
}

exports.getCoupons = async (req, res) => {
    const coupons = await Coupons.find();
    res.send({ status: true, datas: coupons });
}

// UPDATE
exports.updateCoupon = async (req, res) => {
    const id = req.params.id || req.query.id;
    if (!id) {
        return res.status(400).send({ status: false, message: 'ID is required' });
    }

    try {
        const coupon = await Coupons.findOneAndUpdate({ id: id }, req.body, { new: true });
        if (!coupon) {
            return res.status(404).send({ status: false, message: 'Coupon not found' });
        }
        res.send({ status: true, coupon });
    } catch (error) {
        res.status(400).send({ status: false, message: 'Invalid ID format or Coupon not found' });
    }
};

// GET ONE Coupons BY ID
exports.getCouponById = async (req, res) => {
    const id = req.params.id || req.query.id;

    if (!id) {
        return res.status(400).send({ status: false, message: 'ID is required' });
    }

    const query = !isNaN(id) ? { id: Number(id) } : { _id: id };

    try {
        const coupon = await Coupons.findOne(query);
        if (!coupon) return res.status(404).send({ status: false, message: 'Coupon not found' });
        res.send({ status: true, coupon });
    } catch (error) {
        res.status(400).send({ status: false, message: 'Invalid ID format or Coupon not found' });
    }
};

// DELETE
exports.deleteCoupon = async (req, res) => {
    const id = req.params.id || req.query.id;
    if (!id) {
        return res.status(400).send({ status: false, message: 'ID is required' });
    }
    try {
        const coupon = await Coupons.findOneAndDelete({ id: id });
        if (!coupon) {
            return res.status(404).send({ status: false, message: 'Coupon not found' });
        }
        res.send({ status: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(400).send({ status: false, message: 'Invalid ID format or Coupon not found' });
    }
}; 