const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { const: { secret} } = require('../../config')

const register = async ({username, email, password}) => {

     try {
        const user = await User.create({ username, email, password });
        const newUser = await user.save();
        const token = jwt.sign({ _id: newUser._id, username: newUser.username }, secret);
        return token;
    } catch (err) {
        return err;
    }
}

const login = async ({username, password}) => {

    const user = await User.findOne({username: username});

    if (!user) {
        throw {error: 'User not found!'}
    }

    let match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw {error: 'Wrong password!'}
    }

    let token = jwt.sign({_id: user._id, username}, SECRET);
    return token;
}


module.exports = {
    register,
    login,
} 