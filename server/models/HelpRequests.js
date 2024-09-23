import mongoose from "mongoose";

const HelpRequestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["open", "in progress", "completed"],
        default: "open",
    },
    responders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    responses: [{
        helperId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        status: { type: String, enum: ['accepted', 'completed'], default: 'accepted'}
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