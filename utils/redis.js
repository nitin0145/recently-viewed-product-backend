const redis = require('redis');

let redisClient;

async function initRedis() {
    redisClient = redis.createClient();
    redisClient.on('error', (err) => console.error('Redis error:', err));
    await redisClient.connect();
    console.log('Redis initialized');
}

async function setCache(key, value, expiration = 3600) {
    await redisClient.set(key, JSON.stringify(value), { EX: expiration });
}

async function getCache(key) {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
}

module.exports = { initRedis, setCache, getCache };
