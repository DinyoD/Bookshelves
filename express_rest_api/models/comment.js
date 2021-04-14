const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    bookInfo: {
        type: String,
    },
    text: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', commentSchema);