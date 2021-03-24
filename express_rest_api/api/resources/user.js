const { Router } = require('express');

const userModel = require('../../models/user');
const controllerFactory = require('../controllers/controller-factory')

const usersController = controllerFactory(userModel);

const router = Router();

router.route('/')
    .get(usersController.getAll)
    .post(usersController.createOne);

router.route('/:id')
    .get(usersController.getOne)
    .put(usersController.updateOne)
    .delete(usersController.deleteOne);

module.exports = router;