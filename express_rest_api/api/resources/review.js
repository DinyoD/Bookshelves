const { Router } = require('express');

const reviewModel = require('../../models/review');
const controllerFactory = require('../controllers/controller-factory');

const reviewController = controllerFactory(reviewModel);

const router = Router();

router.route('/')
    .get(reviewController.getAll)
    .post(reviewController.createOne);

router.route('/:id')
    .get(reviewController.getOne)
    .delete(reviewController.deleteOne)
    .put(reviewController.updateOne);

module.exports = router;
