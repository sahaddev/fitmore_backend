const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    updatePassword
} = require('../controllers/userController');


router.post('/user', authMiddleware, createUser);
router.get('/users', authMiddleware, getUsers);
router.get('/user', authMiddleware, getUserById);
router.put('/user', authMiddleware, updateUser);
router.delete('/user', authMiddleware, deleteUser);
router.patch('/user', authMiddleware, updatePassword)

module.exports = router;