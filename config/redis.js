const redis = require("redis");
const logger = require('./log');
const redisClient = redis.createClient();
const isFunction = (func) => typeof func === 'function';
const noop = () => {};

redisClient.on("error", function(err) {
    logger.error("redis error " + err);
});

redisClient.on("connect", () => {
  logger.info("redis server started...");
});

redisClient.has = (key = '', cb = noop) => {
  return new Promise((resolve, reject) => {
    if (key) {
      return redisClient.get(key,  (err, res) => {
        if (err) logger.error(err);
        if (res == null) cb(false);
        cb(res);
        resolve(res);
      });
    }
    cb(false);
    resolve();
  });
};

module.exports = redisClient;