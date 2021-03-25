const userModel = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { const: { secret} } = require('../../config')

const register = async ({username, email, password}) => {

    try {

        let sameEmailUser = await User.findOne({email: email});

        if (sameEmailUser) {
            return {error: 'Email is already in use!'}
        }

        const user = await userModel.create({ username, email, password });
        console.log(user);
        const newUser = await user.save();
        const token = jwt.sign({ _id: newUser._id, username: newUser.username }, secret);
        console.log(token);
        return token;

    } catch (err) {
        return {error: err.message};
    }
}

const login = async ({username, password}) => {

    try {
        const user = await User.findOne({username: username});

        if (!user) {
            return {error: 'User not found!'}
        }

        await bcrypt.compare(password, user.password); 
        let token = jwt.sign({_id: user._id, username}, secret);
        return token;

    } catch (err) {
        return {error: err.message};
    }


}


module.exports = {
    register,
    login,
} 