const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    nationality: {
        type: String
    },
    yearOfBirth:{
        type: Number,
    }
});

module.exports = mongoose.model('Author', authorSchema);