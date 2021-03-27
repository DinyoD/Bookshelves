const { Router } = require('express');

const usersRouter = require('../api/resources/user');
const booksRouter = require('../api/resources/book');
const reviewsRouter = require('../api/resources/review');
const authorsRouter =  require('../api/resources/author');
const authRouter =  require('../api/resources/auth');

const connect = function(path, app){
    const router = Router(); 

    router.use('/auth', authRouter);
    router.use('/users', usersRouter);
    router.use('/books', booksRouter);
    router.use('/reviews', reviewsRouter);
    router.use('/authors', authorsRouter)

    app.use(path, router);
}

module.exports = {
    connect,
}