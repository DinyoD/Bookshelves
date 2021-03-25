
const { isEmail, isAlphanumeric } = require('validator');
const usersService = require('../services/user');
const { const: { cookieName} } = require('../../config')

const register = (req, res, next) => {
    let { username, email, password, confirmPassword } = req.body;
    let correctInputs = username && email && isEmail(email) && password && 
                        password.length > 5 && isAlphanumeric(password) && password == confirmPassword;
    
    if (!correctInputs) {
        next({ error: 'Uncorrect Register Data'})
    }

    usersService.register({username, email, password})
        .then(token => res.cookie(cookieName, token))
        .catch(next)
}

const login = (req, res, next) => {
    let { username, password } = req.body;

    usersService.login({username, password})
        .then(token => res.cookie(cookieName, token))
        .catch(next)

}

module.exports = {
    register,
    login
}