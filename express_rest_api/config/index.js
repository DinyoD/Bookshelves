const environment = process.env.NODE_ENV || 'dev';
let config = require(`./${environment}.config.json`);

module.exports = config;

