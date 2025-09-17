const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    village: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['admin', 'villager'],
        default: 'villager' 
    },
    adminId: String,
    otp: String,
    otpExpiry: Date,
    isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);