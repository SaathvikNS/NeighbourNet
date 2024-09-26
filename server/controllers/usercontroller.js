const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const { generateOtp, mailTransport } = require('../utils/utils')
const { otpMailTemplate, welcomeMail, forgotPasswordMail, resetSuccessMail } = require('../utils/emailtemplates')

exports.registerUser = async (req, res) => {
    try{
        console.log(req.body);
        const { name, username, email, password, phone, dateOfBirth, gender, address, city } = req.body;

        const user = await User.findOne({email})
        if(user) return res.status(400).json({message: "User already registered"})
        console.log("user found")
        
        const otp = generateOtp();
        console.log("otp generated")

        const newUser = new User({
            name,
            username,
            email,
            password,
            phone,
            dateOfBirth,
            gender,
            address,
            city,
            otp
        })
        console.log("New user created")

        if(newUser.password.length < 8) {
            res.status(500).json({message: "Password too short"})
            return;
        }
        
        try{
            await newUser.save();
        } catch(e){
            console.error("Error saving user:", e);
            res.status(500).json({ message: e.message });
            return;
        }

        try {
            await mailTransport().sendMail({
                from: 'noreply@nnet.com',
                to: newUser.email,
                subject: 'Verification Code',
                html: otpMailTemplate(otp),
            });
            console.log("Mail sent");
        } catch (mailError) {
            console.error("Error sending mail:", mailError);
            res.status(500).json({ message: 'Failed to send verification email', error: mailError.message });
            return;
        }

        res.send({success: true})
    } catch (error){
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        console.log(req.body)
        const {email, otp} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: 'User doesnt exist'});
        if(!user.otp) return res.status(400).json({message: 'Otp expired or not generated'});
        
        if (parseInt(user.otp) !== parseInt(otp)) return res.status(400).json({message: 'Invalid OTP'});
        
        user.verified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        try {
            await mailTransport().sendMail({
                from: 'noreply@nnet.com',
                to: user.email,
                subject: `Welcome ${user.name}`,
                html: welcomeMail(user.name),
            })
            console.log("Welcome mail sent successfully")
        } catch (error) {
            console.error("Error sending mail:", error);
            res.status(500).json({ message: 'Failed to send verification email', error: error.message });
        }

        res.status(200).send({success: true})
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

exports.loginUser = async (req, res) => {
    try {
        console.log(req.body)
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: 'User doesnt exist'});

        if(!user.verified){
            const otp = generateOtp();
            user.otp = otp;

            await user.save();

            await mailTransport().sendMail({
                from: 'noreply@nnet.com',
                to: user.email,
                subject: 'Verification Code',
                html: otpMailTemplate(otp),
            })
            console.log("email resent");

            return res.status(200).json({message: 'verify'})
        }
        

        const matched = await user.comparePassword(password);
        if(!matched) return res.status(400).json({message: 'Invalid password'});

        if(!user.token){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            user.token = token;
    
            await user.save();
        }

        return res.status(200).json({ success: true, token: user.token });
    } catch (error){
        console.log(error.message);
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

exports.forgotPasswordSendOtp = async (req, res) => {
    try{
        console.log(req.body)
        const {email} = req.body;
        if(!email){
            return res.status(400).json({message: 'Please enter the email'});
        }

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'User not found'});
        
        const otp = generateOtp();
        user.otp = otp;

        await user.save();
        
        await mailTransport().sendMail({
            from: 'noreply@nnet.com',
            to: user.email,
            subject: 'Verification Code',
            html: forgotPasswordMail(otp),
        })
        console.log("email sent");
        
        res.status(200).json({message: 'otp sent'})
    } catch(error){
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

exports.forgotPasswordVerifyOtp = async (req, res) => {
    try {
        console.log(req.body)
        const {email, otp} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: 'User doesnt exist'});
        if(!user.otp) return res.status(400).json({message: 'Otp expired or not generated'});
        
        if (parseInt(user.otp) !== parseInt(otp)) return res.status(400).json({message: 'Invalid OTP'});
        
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.status(200).send({success: true})
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

exports.forgotPasswordChangePassword = async (req, res) => {
    try{
        console.log(req.body)
        const {email, password} = req.body;

        if(!password) return res.status(400).json({message: 'please enter the new password'})

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: 'User doesnt exist'});

        if(user.password.length < 8) {
            res.status(400).json({message: "Password too short"})
            return;
        }

        const matched = await user.comparePassword(password);
        if(matched) return res.status(400).json({message: 'New Password cant be same as the old password'})

        user.password = password;
        await user.save();

        await mailTransport().sendMail({
            from: 'noreply@nnet.com',
            to: user.email,
            subject: 'Password Reset Successful',
            html: resetSuccessMail(),
        })
        console.log("email sent");

        res.status(200).send({success: true})
        } catch(error){
        console.log(error.message);
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

exports.getInfo = async (req, res) => {
    try{
        const token = req.params.token;

        if(!token) return res.status(400).json({message: 'Token not found'});
        const user = await User.findOne({token})
        if(!user) return res.status(400).json({message: 'User not found!'});

        const formatteddate = new Date(user.dateOfBirth).toLocaleDateString('en-GB')
        
        res.status(200).json({userid: user._id, name: user.name, email: user.email, number: user.phone, dob: formatteddate, gender: user.gender, city: user.city });
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

exports.getOneUser = async(req, res) => {
    try{
        const userId = req.params.id;
        console.log(userId)
        const user = await User.findById(userId);
        if(!user) return res.status(400).json({message: 'User not found!'});

        res.status(200).json({name: user.name})
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: 'Server error', error: error.message});
    }
}