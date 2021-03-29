
const { isEmail, isAlphanumeric } = require('validator');
const usersService = require('../services/user');
const { const: { cookieName} } = require('../../config')

const register = (req, res, next) => {
    console.log(req.body);
    let { username, email, password, confirmPassword } = req.body;
    let correctInputs = username && email && isEmail(email) && password && 
    password.length > 5 && isAlphanumeric(password) && password == confirmPassword;
    
    if (!correctInputs) {
        return next({ error: 'Uncorrect Register Data'})
    }

    usersService.register({username, email, password})
        .then(data => {
            res.cookie(cookieName, data.token);
            res.status(201).send(data.newUser)
        })
        .catch(next)
}

const login = (req, res, next) => {
    console.log(req.body);
    let { email, password } = req.body;

    usersService.login({email, password})
        .then(data => {
            res.cookie(cookieName, data.token);
            res.send(data.user)
        })
        .catch(next)

}

module.exports = {
    register,
    login
}