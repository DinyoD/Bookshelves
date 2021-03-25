module.exports = function(err, req, res, next){
    console.log(err)
    if (!err) {
        return;
    }
    res.status(500).send({message: err})
}