const mongoose = require('mongoose');

const UserActivitySchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    activity: {
        type: String,
        enum: ['HelpRequest', 'RequestedResource', 'ScheduledEvent', 'HelpResponse', 'SharedResource', 'EnrolledToEvent'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('UserActivity', UserActivitySchema);