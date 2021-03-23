const { Router } = require('express');
const router = Router(); 


const connect = function(path, app){
    app.use(path, router)
}

module.exports = {
    connect,
}