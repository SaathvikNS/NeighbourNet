import mongoose from "mongoose";

const UserActivitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    actionType: {
        type: String,
        enum: ['HelpRequest', 'Resource', 'Event', 'Response'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('UserActivity', UserActivitySchema);