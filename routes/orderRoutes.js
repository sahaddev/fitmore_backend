const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/order/create', orderController.createOrder);
router.get('/order/history/:userId', orderController.getOrderHistory);
router.get('/order/:orderId', orderController.getOrderById);

module.exports = router;
