const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('comment', commentSchema);

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    description: {
        type: String,
        required: false
    },
    tags: [{
        type: String,
        default: []
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
        default: []
    }],
    status: {
        type: String,
        required: true,
        default: 'Todo'
    }
})

module.exports = mongoose.model('ticket', ticketSchema);
