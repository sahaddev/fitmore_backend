const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController.js');

router.post('/product', authMiddleware, createProduct);
router.get('/products', authMiddleware, getProducts);
router.get('/product', authMiddleware, getProductById);
router.put('/product', authMiddleware, updateProduct);
router.delete('/product', authMiddleware, deleteProduct);

module.exports = router;