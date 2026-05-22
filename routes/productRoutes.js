const express = require('express');
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController.js');

router.post('/product', createProduct);
router.get('/products', getProducts);
router.get('/product', getProductById);
router.put('/product', updateProduct);
router.delete('/product', deleteProduct);

module.exports = router;