const jwt = require('jsonwebtoken');
const { const: { secret, cookieName}} = require('../../config');

module.exports = function auth(req, res, next) {

    let token = req.cookies[cookieName];

    if (token) {
        jwt.verify( token, secret , (err, decoded) => {
            if(err) { res.clearCookie(cookieName).status(401).send({error: 'No authentication!'})}
            req.user = decoded;
        })
    }
    next();

}