const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { const: { saltRounds } } = require('../config');

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

userSchema.pre('save', function (next){
    let user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(saltRounds, (err, salt) => {

        if (err) { 
            next(err); 
        }

        bcrypt.hash(this.password, salt, (err, hash) => {

            if (err) { 
                next(err); 
            }

            this.password = hash;
            next();
        });
    })
});

module.exports = mongoose.model('User', userSchema);