const mongo = require('./mongo');

const setUser = (data = {}) => {
  return mongo.connect((db) => {
    return mongo.insertOrUpdateOne(db, 'user', { name: data.name }, data);
  });
};

module.exports.setUser = setUser;