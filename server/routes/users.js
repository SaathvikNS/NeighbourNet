const router = require('express').Router();
const { registerUser, verifyOtp, loginUser, forgotPasswordSendOtp, forgotPasswordVerifyOtp, forgotPasswordChangePassword } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);
router.post('/forgot-password-send-otp', forgotPasswordSendOtp);
router.post('/forgot-password-verify-otp', forgotPasswordVerifyOtp);
router.post('/forgot-password-change-password', forgotPasswordChangePassword);

module.exports = router;