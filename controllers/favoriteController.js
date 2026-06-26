const Favorite = require('../models/favoriteModel');

// ADD TO FAVORITES
exports.addToFavorites = async (req, res) => {
    console.log("-> favoriteController -> addToFavorites");
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).send({ status: false, message: 'userId and productId are required' });
    }

    try {
        let favorite = await Favorite.findOne({ userId });

        if (favorite) {
            // Check if product already exists in favorites
            const productExists = favorite.products.some(p => p.productId.toString() === productId);

            if (!productExists) {
                favorite.products.push({ productId });
                await favorite.save();
            }
            favorite = await favorite.populate('products.productId');
            return res.status(200).send({ status: true, message: 'Added to favorites', favorite });
        } else {
            // Create a new favorite document
            const newFavorite = await Favorite.create({
                userId,
                products: [{ productId }]
            });
            const populatedFavorite = await Favorite.findById(newFavorite._id).populate('products.productId');
            return res.status(201).send({ status: true, message: 'Added to favorites', favorite: populatedFavorite });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: 'Server error', error: error.message });
    }
};

// GET FAVORITES BY USER ID
exports.getFavorites = async (req, res) => {
    console.log("-> favoriteController -> getFavorites");
    const userId = req.params.userId || req.query.userId;

    if (!userId) {
        return res.status(400).send({ status: false, message: 'userId is required' });
    }

    try {
        const favorite = await Favorite.findOne({ userId }).populate('products.productId');
        if (!favorite) {
            return res.status(200).send({ status: true, favorite: { userId, products: [] } });
        }
        return res.status(200).send({ status: true, favorite });
    } catch (error) {
        return res.status(500).send({ status: false, message: 'Server error', error: error.message });
    }
};

// REMOVE FROM FAVORITES
exports.removeFromFavorites = async (req, res) => {
    console.log("-> favoriteController -> removeFromFavorites");
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).send({ status: false, message: 'userId and productId are required' });
    }

    try {
        const favorite = await Favorite.findOne({ userId });
        if (!favorite) {
            return res.status(404).send({ status: false, message: 'Favorites not found' });
        }

        favorite.products = favorite.products.filter(p => p.productId.toString() !== productId);
        await favorite.save();
        await favorite.populate('products.productId');

        return res.status(200).send({ status: true, message: 'Product removed from favorites', favorite });
    } catch (error) {
        return res.status(500).send({ status: false, message: 'Server error', error: error.message });
    }
};
