const { Router } = require('express');

const usersRouter = require('../api/resources/user');
const booksRouter = require('../api/resources/book');
const commentsRouter = require('../api/resources/comment');
const authorsRouter =  require('../api/resources/author');
const authRouter =  require('../api/resources/auth');

const connect = function(path, app){
    const router = Router(); 

    router.use('/auth', authRouter);
    router.use('/users', usersRouter);
    router.use('/books', booksRouter);
    router.use('/reviews', commentsRouter);
    router.use('/authors', authorsRouter)

    app.use(path, router);
}

module.exports = {
    connect,
}