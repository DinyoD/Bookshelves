const { Router } = require('express');

const userModel = require('../../models/user');
const controllerFactory = require('../controllers/controller-factory')

const userController = controllerFactory(userModel);

const router = Router();

router.route('/')
    .get(userController.getAll)
    .post(userController.createOne);

router.route('/:id')
    .get(userController.getOne)
    .put(userController.updateOne)
    .delete(userController.deldeteOne);

module.exports = router;