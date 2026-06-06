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
router.get('/address', authMiddleware, getAddresses);
router.get('/address', authMiddleware, getAddressById);
router.put('/address', authMiddleware, updateAddress);
router.delete('/address', authMiddleware, deleteAddress);

module.exports = router;