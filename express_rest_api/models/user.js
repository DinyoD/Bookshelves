const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    ownedBooks: [{
        type: mongoose.Types.ObjectId,
        ref: 'Book'
    }],
    wishList: [{
        type: mongoose.Types.ObjectId,
        ref: 'Book'
    }]
})

module.exports = mongoose.model('User', userSchema);