const mongoose = require('mongoose');

const connect = (connectionString, databaseName) => mongoose.connect(
    `${connectionString}/${databaseName}`,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false
    }
);
        
module.exports = {
    connect
};