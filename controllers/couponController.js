let coupons = [];

exports.createCoupon = (req, res) => {
    const { title, code } = req.body;
    if (!title || !code) return res.send({
        status: false,
        message: 'coupon create fail'
    });
    const coupon = {
        id: coupons.length + 1,
        title,
        code
    }
    coupons.push(coupon);
    res.send({
        status: true,
        message: 'coupon created'
    });
}

exports.getCoupons = (req, res) => {
    res.send(coupons);
}

exports.updateCoupon = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, code } = req.body;

    const coupon = coupons.find(c => c.id == id);
    if (!coupon) return res.send({
        status: false,
        message: 'coupon not found'
    });
    if (title) coupon.title = title;
    if (code) coupon.code = code;
    res.send({
        status: true,
        message: 'coupon updated'
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