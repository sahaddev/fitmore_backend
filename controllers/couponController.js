let coupons = [];

exports.createCoupon = (req, res) => {
    const { code, percentage, fixedAmount, title } = req.body;
    if (!code || !title) return res.send({
        status: false,
        message: 'All Fields required'
    });
    const coupon = {
        id: coupons.length + 1,
        title: title,
        code: code,
        description: null,
        expiry: null,
        status: 'active',
        limit: 100,
        couponCount: 0,
        percentage: percentage || null,
        fixedAmount: fixedAmount || null,
    }
    coupons.push(coupon);
    res.send({
        status: true,
        message: 'coupon created successfully',
        coupon
    });
}

exports.getCoupons = (req, res) => {
    res.send({ status: true, coupons });
}

exports.updateCoupon = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, code, percentage, fixedAmount, description, expiry, limit, status } = req.body;

    const coupon = coupons.find(c => c.id == id);
    if (!coupon) return res.send({
        status: false,
        message: 'coupon not found'
    });
    if (title) coupon.title = title;
    if (code) coupon.code = code;
    if (percentage) coupon.percentage = percentage;
    if (fixedAmount) coupon.fixedAmount = fixedAmount;
    if (description) coupon.description = description;
    if (expiry) coupon.expiry = expiry;
    if (limit) coupon.limit = limit;
    if (status) coupon.status = status;
    res.send({
        status: true,
        message: 'coupon updated successfully',
        coupon
    });
}

exports.deleteCoupon = (req, res) => {
    const id = parseInt(req.params.id);
    const index = coupons.findIndex(c => c.id === id);
    if (!index) return res.send({
        status: false,
        message: 'coupon not found'
    });
    coupons.splice(index, 1);
    res.send({
        status: true,
        message: 'coupon deleted'
    });
}