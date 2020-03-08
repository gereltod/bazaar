const debug = require('debug')('server:redis:token');

const util = require('util');
const keys = require('../config/keys');
const redisClient = require('./redis-clientToken');

debug('Redis токен үүсэв');

const get = async (userid) => {
    try {
        debug('Get token:', userid);
        const cacheValue = await redisClient.getAsync(userid);
        return cacheValue;
    } catch (err) {
        console.log(err.message);
        return null;
    }
};

const set = async (userid, data) => {
    try {
        debug('Set token:', userid, data);
        //await client.set(token, data, 'ex', config.jwt.ttl);
        await redisClient.setAsync(userid, data);
    } catch (err) {
        console.log(err.message);
        return null;
    }
};

const del = async (userid) => {
    try {
        debug('Del token:', userid);
        await redisClient.delAsync(userid);
    } catch (err) {
        console.log(err.message);
        return null;
    }
};

module.exports = {
    get,
    set,
    del,
};
