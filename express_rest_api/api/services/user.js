const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { const: { secret} } = require('../../config')

const register = async ({username, email, password}) => {

    try {

        let sameEmailUser = await User.findOne({email: email});

        if (sameEmailUser) {
            throw {error: 'Email is already in use!'}
        }

        const user = new User({ username, email, password });
        const newUser = await user.save();

        const token = jwt.sign({ _id: newUser._id, username: newUser.username }, secret);
        return {token, newUser};

    } catch (err) {
        throw {error: err.error};
    }
}

const login = async ({email, password}) => {

    try {
        let user = await User.findOne({email: email});

        if (!user) {
            throw {error: 'User not found!'}
        }

        let match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw {error: 'Wrong password!'}
        }
        
        let token = jwt.sign({_id: user._id, username: user.username}, secret);

        return {token, user}; 

    } catch (err) {
        throw {error: err.error};
    }


}


module.exports = {
    register,
    login,
} 