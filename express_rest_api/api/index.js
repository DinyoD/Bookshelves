const { Router } = require('express');

const usersRouter = require('../api/resources/user');

const connect = function(path, app){
    const router = Router(); 

    router.use('/users', usersRouter);

    app.use(path, router)
}

module.exports = {
    connect,
}