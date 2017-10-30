const mongo = require('./mongo');
const noop = val => val;

const setUser = (data = {}, cb = noop) => {
  return new Promise((resolve, reject) => {
    return mongo.connect((db) => {
      return mongo.insertOrUpdateOne(db, 'user', { name: data.name }, data, (res) => {
        cb(res);
        resolve();
      });
    });
  });
};

const getUser = (data = {}, cb = noop) => {
  return new Promise((resolve, reject) => {
    return mongo.connect((db) => {
      return mongo.findOne(db, 'user', data, (res) => {
        cb(res);
        resolve();
      });
    });
  });
};

module.exports.setUser = setUser;
module.exports.getUser = getUser;