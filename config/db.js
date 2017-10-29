const mongo = require('./mongo');
const noop = () => {};

const setUser = (data = {}) => {
  return mongo.connect((db) => {
    return mongo.insertOrUpdateOne(db, 'user', { name: data.name }, data);
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