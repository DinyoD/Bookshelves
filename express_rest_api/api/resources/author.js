const { Router } = require('express');
const authorModel = require('../../models/author');
const controllerFactory = require('../controllers/controller-factory');


const authorsController = controllerFactory(authorModel);
const router = Router();

router.route('/')
    .get(authorsController.getAll)
    .post(authorsController.createOne);

router.route('/:id')
    .get(authorsController.getOne)
    .delete(authorsController.deleteOne)
    .put(authorsController.updateOne);

module.exports = router;