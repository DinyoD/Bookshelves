const userModel = require('../../models/user');
const { isEmail, isAlphanumeric } = require('validator');
const usersService = require('../services/user');
const { const: { cookieName} } = require('../../config')

const register = async(req, res, next) => {
    let { username, email, password, confirmPassword } = req.body;
    let correctInputs = username && email && isEmail(email) && password && i
                        password.length > 5 && isAlphanumeric(password) && password == confirmPassword;
    
    if (!correctInputs) {
        res.status(500).end({ error: 'Uncorrect Register Data'})
    }
    try {
        let token = await usersService.register({ email,username, password});
        res.cookie(cookieName, token);
    } catch (error) {
        next(error)
    }
    
}

module.exports = {
    register,
}