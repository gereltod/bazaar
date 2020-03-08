const env = process.env.NODE_ENV || 'dev';
const config = require('../knexfile');

//const envConf = config[env];

const knex = require('knex');

const connection = knex(config);

module.exports = connection;
