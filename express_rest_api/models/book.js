const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    genre:[{
        type: String,
        require: true
    }],
    year: {
        type: Number,
    },
    description: {
        type: String
    },
    coverUrl: {
        type: String
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'Author',
        require: true,
    },
    reviews:[{
        type: mongoose.Types.ObjectId,
        ref: 'Review'
    }]
})