const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    genre:{
        type: String,
        require: true
    },
    year: {
        type: Number,
    },
    description: {
        type: String
    },
    language:{
        type: String,
        require: true
    },
    coverUrl: {
        type: String
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'Author',
        require: true,
    },
    comments:[{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }]
})

module.exports = mongoose.model('Book', bookSchema);