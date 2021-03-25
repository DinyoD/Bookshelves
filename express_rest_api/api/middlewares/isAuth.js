module.exports = function isAuth(req, res, next){
    if (req.user) {
        next();
    }
}