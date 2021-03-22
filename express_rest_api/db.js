const mongoose = require('mongoose');

const connect = (connectionString, databaseName) => mongoose.connect(
    `${connectionString}/${databaseName}`,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
);
        


// const connect = function(connectionString, databaseName) {
//     return mongoose.connect(
//         `${connectionString}/${databaseName}`,
//         {
//             useNewUrlParser: true, 
//             useUnifiedTopology: true
//         })
// }

module.exports = {
    connect
};