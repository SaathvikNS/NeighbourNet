const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^\+?\d{1,15}$/
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    verified:{
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    },
    token: {
        type: String
    },
    tokenExpires: {
        type: Date
    }
})

userSchema.pre('save', async function(next) {
    if(this.isModified("password")){
        const hash = await bcrypt.hash(this.password, 8)
        this.password = hash;
    }
    next();
})

userSchema.methods.comparePassword = async function(password) {
    const result = bcrypt.compare(password, this.password)
    return result;
}

userSchema.pre('save', async function(next){
    if(this.isModified("otp")){
        this.otpExpires = Date.now() + 3600 * 1000;
    }
    next();
})

userSchema.pre('save', async function(next){
    if(this.isModified('token')){
        this.tokenExpires = Date.now() + 3600 * 1000 * 24 * 30;
    }
    next();
})

module.exports = mongoose.model('User', userSchema);