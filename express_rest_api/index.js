const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { server: { port , cors: corsConfig}, database} = require('./config');
const api = require('./api');
const db = require('./db');
const auth = require('./api/middlewares/auth');
const errorHandler =  require('./global-error-handler');

const app = express();

app.use(cors({
    origin: corsConfig.urls
})); 

app.use(express.json());
app.use(cookieParser());
app.use(auth);

api.connect('/api/v1', app);

app.use(errorHandler);

function appListen() {
    return new Promise((resolve, reject) => {
        app.listen(port, function() { resolve(); })
    })
}

db.connect(database.connectionString, database.databaseName)
.then(() => console.log('Successfully connected to database'))
.catch(err => console.log('Error connecting to database'))
.then(appListen)
.then(() => console.log(`Server listen on port: ${port}`))
.catch(err => console.log(`Server error: ${err.message}`));