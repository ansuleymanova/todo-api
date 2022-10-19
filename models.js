const mongoose = require('mongoose');

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
        type: String
    }],
    comments: [{
        author: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: false
        }
    }],
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ticket', ticketSchema);
