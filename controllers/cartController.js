const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// ADD TO CART
exports.addToCart = async (req, res) => {
    console.log("-> cartController -> addToCart");
    const { userId, productId, quantity = 1 } = req.body;

    if (!userId || !productId) {
        return res.status(400).send({ status: false, message: 'userId and productId are required' });
    }

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Check if product already exists in the cart
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

            if (productIndex > -1) {
                // Product exists, update the quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Product does not exist, add it
                cart.products.push({ productId, quantity });
            }
            await cart.save();
            cart = await cart.populate('products.productId');
            return res.status(200).send({ status: true, message: 'Cart updated successfully', cart });
        } else {
            // Create a new cart
            const newCart = await Cart.create({
                userId,
                products: [{ productId, quantity }]
            });
            const populatedCart = await Cart.findById(newCart._id).populate('products.productId');
            return res.status(201).send({ status: true, message: 'Cart created successfully', cart: populatedCart });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: 'Server error', error: error.message });
    }
};

// GET CART BY USER ID
exports.getCart = async (req, res) => {
    console.log("-> cartController -> getCart");
    const userId = req.params.userId || req.query.userId;

    if (!userId) {
        return res.status(400).send({ status: false, message: 'userId is required' });
    }

    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return res.status(404).send({ status: false, message: 'Cart not found' });
        }
        return res.status(200).send({ status: true, cart });
    } catch (error) {
        return res.status(500).send({ status: false, message: 'Server error', error: error.message });
    }
};

// REMOVE FROM CART
exports.removeFromCart = async (req, res) => {
    console.log("-> cartController -> removeFromCart");
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).send({ status: false, message: 'userId and productId are required' });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send({ status: false, message: 'Cart not found' });
        }

        cart.products = cart.products.filter(p => p.productId.toString() !== productId);
        await cart.save();
        await cart.populate('products.productId');

        return res.status(200).send({ status: true, message: 'Product removed from cart', cart });
    } catch (error) {
        return res.status(500).send({ status: false, message: 'Server error', error: error.message });
    }
};

// CLEAR CART
exports.clearCart = async (req, res) => {
    console.log("-> cartController -> clearCart");
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).send({ status: false, message: 'userId is required' });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send({ status: false, message: 'Cart not found' });
        }

        cart.products = [];
        await cart.save();

        return res.status(200).send({ status: true, message: 'Cart cleared successfully', cart });
    } catch (error) {
        return res.status(500).send({ status: false, message: 'Server error', error: error.message });
    }
};
