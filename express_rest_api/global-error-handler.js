module.exports = function(err, req, res, next){
    res.status(500).end({message: 'Server error'})
}