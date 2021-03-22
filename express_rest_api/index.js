const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { server: { port , cors: corsConfig}, database} = require('./config');
const api = require('./api');
const db = require('./db')

const app = express();

app.use(cors({
    origin: corsConfig.urls
})); 

app.use(bodyParser.json());
app.use(cookieParser());

api.connect('/api/v1', app)

function appListen() {
    return new Promise((resolve, reject) => {
        app.listen(port, function() { resolve(); })
    })
}

db.connect(database.connectionString, database.databaseName)
.then(() => console.log('Successfully connected to database'))
.catch(err => console.log('Error connecting to database.'))
.then(appListen)
.then(() => console.log(`Server listen on port :${port}`))
.catch(err => console.log(`Server error: ${err.message}`));