const { Router } = require('express');

const userModel = require('../../models/user');
const controllerFactory = require('../controllers/controller-factory')

const usersController = controllerFactory(userModel);
const authController = require('../controllers/authController')

const router = Router();

router.route('/register')
    .post(authController.register);

router.route('/login')
    .post(authController.login)

router.route('/')
    .get(usersController.getAll)

router.route('/:id')
    .get(usersController.getOne)
    .put(usersController.updateOne)
    .delete(usersController.deleteOne);

module.exports = router;