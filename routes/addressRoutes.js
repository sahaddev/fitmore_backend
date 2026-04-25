const express = require('express');
const router = express.Router();

const {
    createAddress,
    getAddresses,
    getAddressById,
    updateAddress,
    deleteAddress
} = require('../controllers/addressController');

router.post('/address', createAddress);
router.get('/addresses', getAddresses);
router.get('/address/:id', getAddressById);
router.put('/address/:id', updateAddress);
router.delete('/address/:id', deleteAddress);

module.exports = router;