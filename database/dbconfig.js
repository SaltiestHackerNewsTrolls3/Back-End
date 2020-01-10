const knex = require('knex');

const secrets = require('../config/secrets.js');

const environment = secrets.environment || 'development';
const config = require('../knexfile.js')[environment];

module.exports = knex(config);