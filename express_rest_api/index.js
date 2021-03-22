const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { server: { port , cors: corsConfig}, database} = require('./config');

const app = express();

app.use(cors({
    origin: corsConfig.urls
})); 

app.use(bodyParser.json());
app.use(cookieParser())