const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/sendEmail');
const generateOTP = require('../utils/generateOTP');

const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).send('Error registering user');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(400).send('Error logging in');
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendEmail(email, 'Password Reset OTP', `Your OTP is ${otp}`);
    res.send('OTP sent to email');
  } catch (err) {
    res.status(400).send('Error sending OTP');
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).send('Invalid or expired OTP');
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.send('OTP verified');
  } catch (err) {
    res.status(400).send('Error verifying OTP');
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.send('Password reset successfully');
  } catch (err) {
    res.status(400).send('Error resetting password');
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  verifyOTP,
  resetPassword
};
