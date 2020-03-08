const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');

const client = redis.createClient(keys.REDIS_TOKEN_URL);
console.log('token redis:', keys.REDIS_TOKEN_URL);
//const client = redis.createClient(process.env.REDIS_URL);

module.exports = {
  ...client,
  getAsync: util.promisify(client.get).bind(client),
  hgetAsync: util.promisify(client.hget).bind(client),
  setAsync: util.promisify(client.set).bind(client),
  hsetAsync: util.promisify(client.hset).bind(client),
  keysAsync: util.promisify(client.keys).bind(client),
  delAsync: util.promisify(client.del).bind(client),
  hdelAsync: util.promisify(client.hdel).bind(client),
  expire: util.promisify(client.expire).bind(client)
};
