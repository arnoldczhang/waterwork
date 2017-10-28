const mongo = require('mongodb').MongoClient;
const log = require('./log');
const dbUrl = 'mongodb://localhost:27017/waterwork';
const isFunction = (func) => typeof func === 'function';
const isVoid0 = (obj) => obj == null;
const noop = () => {};

const insertOne = (db, colName, data = {}, cb = noop) => {
  const collection = db.collection(colName);
  return collection.insertOne(data, (err, res) => {
    if (err) return log(err, 'error');
    log('insertOne', 'info', data);
    if (isFunction(cb)) return cb();
  });
};

const findOne = (db, colName, query = {}, cb = noop, fb = noop) => {
  const collection = db.collection(colName);
  return collection.findOne(query, (err, res) => {
    if (err) return log(err, 'error');
    if (isVoid0(res)) if (isFunction(fb)) return fb();
    log('findOne', 'info', res);
    if (isFunction(cb)) return cb(res);
  });
};

const updateOne = (db, colName, query = {}, data = {}, cb = noop) => {
  const collection = db.collection(colName);
  if (isVoid0(collection)) return log('collectionNotFound', 'error', colName);
  collection.updateOne(query, data, (err, res) => {
    if (err) return log(err, 'error');
    log('updateOne', 'info', data);
    if (isFunction(cb)) return cb(res);
  });
};

const insertOrUpdateOne = (db, colName, query = {}, data = {}) => {
  findOne(db, colName, query, (res) => {
    updateOne(db, colName, query, data);
  }, () => {
    insertOne(db, colName, data);
  });
};

const connect = (cb) => {
  return mongo.connect(dbUrl, (err, db) => {
    if (err) return log(err, 'error');
    return cb(db);
    db.close();
  });
};

module.exports.insertOne =  insertOne;
module.exports.findOne =  findOne;
module.exports.updateOne =  updateOne;
module.exports.insertOrUpdateOne =  insertOrUpdateOne;
module.exports.connect =  connect;