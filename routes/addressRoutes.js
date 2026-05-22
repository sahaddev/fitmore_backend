const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

const {
    createAddress,
    getAddresses,
    getAddressById,
    updateAddress,
    deleteAddress
} = require('../controllers/addressController');

router.post('/address', authMiddleware, createAddress);
router.get('/addresses', authMiddleware, getAddresses);
router.get('/address/:id', authMiddleware, getAddressById);
router.put('/address/:id', authMiddleware, updateAddress);
router.delete('/address/:id', authMiddleware, deleteAddress);

module.exports = router;