const router = require('express').Router();
const { registerUser, verifyOtp, getInfo, loginUser, forgotPasswordSendOtp, forgotPasswordVerifyOtp, forgotPasswordChangePassword, getOneUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);
router.post('/forgot-password-send-otp', forgotPasswordSendOtp);
router.post('/forgot-password-verify-otp', forgotPasswordVerifyOtp);
router.post('/forgot-password-change-password', forgotPasswordChangePassword);
router.get('/getinfo/:token', getInfo)
router.get('/get-user-name/:userId', getOneUser)

module.exports = router;