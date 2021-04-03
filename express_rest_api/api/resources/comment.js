const { Router } = require('express');

const commentModel = require('../../models/comment');
const controllerFactory = require('../controllers/controller-factory');

const commentsController = controllerFactory(commentModel);

const router = Router();

router.route('/')
    .get(commentsController.getAll)
    .post(commentsController.createOne);

router.route('/:id')
    .get(commentsController.getOne)
    .delete(commentsController.deleteOne)
    .put(commentsController.updateOne);

module.exports = router;
