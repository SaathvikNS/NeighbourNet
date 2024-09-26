const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ToDo', ToDoSchema);