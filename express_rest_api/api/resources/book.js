const { Router } = require('express');
const bookModel = require('../../models/book');
const controllerFactory = require('../controllers/controller-factory');

const booksController = controllerFactory(bookModel);
const router = Router();

router.route('/')
    .get(booksController.getAll)
    .post(booksController.createOne);

router.route('/:id')
    .get(booksController.getOne)
    .delete(booksController.deleteOne)
    .put(booksController.updateOne);

module.exports = router;