module.exports = function(model){

    function createOne(req, res, next){
        model.create(req.body)
            .then( doc => { res.status(204).send(doc) })
            .catch(next)
    }

    function updateOne(req, res, next) {
        const id = req.params.id;

        model.findByIdAndUpdate(id, req.body)
            .then( doc => res.send(doc))
            .catch(next);
    }

    function getOne(req, res, next) {
        const id = req.params.id;

        model.findById(id)
            .then( doc => res.send(doc))
            .catch(next);
    }

    function getAll(req, res, next){
        model.find({})
            .then( docs => res.send(docs))
            .catch(next);
    }

    function deldeteOne(req, res, next){
        const id = req.params.id;

        model.findByIdAndRemove(id)
            .then(doc => res.send(doc))
            .catch(next)
    }

    return {
        createOne,
        updateOne,
        getOne,
        getAll,
        deldeteOne
    }
}