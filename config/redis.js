const redis = require("redis");
const db = require('./db');

const redisClient = redis.createClient();
redisClient.on("error", function(err) {
    console.log("redis error " + err);
});

redisClient.on("connect", () => {
  console.log("redis server started...");
});

redisClient.has = (key = '') => {
  if (key) {
    const value = redisClient.get(key);
    if (typeof value === 'undefined') return false;
    return value;
  }
  return false;
};

db.setUser({
  name: 'arnold',
  password: '55555',
});
module.exports = redisClient;