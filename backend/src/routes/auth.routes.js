const { authLimiter, bidLimiter } = require('../middleware/security.middleware');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Public routes — auth limiter: max 10 attempts per 15 min
router.post('/register', authLimiter, authController.register);
router.post('/verify-otp', authLimiter, authController.verifyOTP);
router.post('/login', authLimiter, authController.login);
router.post('/refresh', authLimiter, authController.refreshToken);
router.post('/forgot-password', authLimiter, authController.forgotPassword);
router.post('/reset-password', authLimiter, authController.resetPassword);

// Protected routes
router.post('/logout', verifyToken, authController.logout);

module.exports = router;
