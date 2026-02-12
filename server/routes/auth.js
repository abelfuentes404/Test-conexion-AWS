const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protegidas
router.get('/profile', verifyToken, authController.getProfile);
router.get('/users', verifyToken, checkRole(['admin']), authController.getAllUsers);

module.exports = router;