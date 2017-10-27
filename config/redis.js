const redis = require("redis");

const redisClient = redis.createClient();
redisClient.on("error", function(err) {
    console.log("redis error " + err);
});

redisClient.on("connect", () => {
  console.log("redis server started...");
});

module.exports = redisClient;