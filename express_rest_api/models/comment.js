const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: true
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