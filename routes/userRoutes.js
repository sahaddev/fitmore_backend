const express = require('express');
const router = express.Router();

const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');


router.post('/user', createUser);
router.get('/users', getUsers);
router.get('/user', getUserById);
router.put('/user', updateUser);
router.delete('/user', deleteUser);

module.exports = router;