const mongoose = require('mongoose');

const HelpRequestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        minlength: 20,
        required: true,
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["open", "in progress", "completed"],
        default: "open",
    },
    responders: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('HelpRequest', HelpRequestSchema);