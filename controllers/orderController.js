const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

// CREATE ORDER
exports.createOrder = async (req, res) => {
    console.log("-> orderController -> createOrder");
    const { userId, products, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!userId || !products || !totalAmount) {
        return res.status(400).send({ status: false, message: 'userId, products, and totalAmount are required' });
    }

    try {
        const newOrder = await Order.create({
            userId,
            products,
            totalAmount,
            shippingAddress,
            paymentMethod
        });

        // Clear the user's cart after successful order creation
        const cart = await Cart.findOne({ userId });
        if (cart) {
            cart.products = [];
            await cart.save();
        }

        // Increment user's order count
        const user = await User.findOne({ id: userId });
        if (user) {
            user.ordersCount = (user.ordersCount || 0) + 1;
            await user.save();
        }

        return res.status(201).send({ status: true, message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).send({ status: false, message: 'Server error', error: error.message });
    }
};

// GET ORDER HISTORY
exports.getOrderHistory = async (req, res) => {
    console.log("-> orderController -> getOrderHistory");
    const userId = req.params.userId || req.query.userId;

    if (!userId) {
        return res.status(400).send({ status: false, message: 'userId is required' });
    }

    try {
        let orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();

        // Manually populate products because productId is a Number
        for (let order of orders) {
            for (let item of order.products) {
                if (item.productId != null) {
                    const productDetails = await Product.findOne({ id: item.productId }).lean();
                    if (productDetails) {
                        item.productId = productDetails;
                    }
                }
            }
        }

        return res.status(200).send({ status: true, orders });
    } catch (error) {
        console.error("Error in getOrderHistory:", error);
        return res.status(500).send({ status: false, message: 'Server error', error: error.message });
    }
};

// GET ORDER BY ID
exports.getOrderById = async (req, res) => {
    console.log("-> orderController -> getOrderById");
    const { orderId } = req.params;

    try {
        let order = await Order.findById(orderId).lean();

        if (!order) {
            return res.status(404).send({ status: false, message: 'Order not found' });
        }

        // Manually populate products
        if (order.products) {
            for (let item of order.products) {
                if (item.productId != null) {
                    const productDetails = await Product.findOne({ id: item.productId }).lean();
                    if (productDetails) {
                        item.productId = productDetails;
                    }
                }
            }
        }

        return res.status(200).send({ status: true, order });
    } catch (error) {
        console.error("Error in getOrderById:", error);
        return res.status(500).send({ status: false, message: 'Server error', error: error.message });
    }
};
