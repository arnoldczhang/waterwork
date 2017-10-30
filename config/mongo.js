const mongo = require('mongodb').MongoClient;
const logger = require('./log');

const dbUrl = 'mongodb://localhost:27017/waterwork';
const isFunction = (func) => typeof func === 'function';
const isVoid0 = (obj) => obj == null;
const noop = () => {};

const insertOne = (db, colName, data = {}, cb = noop) => {
  const collection = db.collection(colName);
  return collection.insertOne(data, (err, res) => {
    if (err) return logger.error(err);
    logger('insertOne', 'info', data);
    if (isFunction(cb)) return cb();
  });
};

const findOne = (db, colName, query = {}, cb = noop) => {
  const collection = db.collection(colName);
  logger('findOneIng', 'info', query);
  return collection.findOne(query, (err, res) => {
    if (err) return logger.error(err);
    if (isVoid0(res)) {
      if (isFunction(cb)) return cb(null);
    }

    else {
      logger('findOne', 'info', res);
      if (isFunction(cb)) return cb(res);
    }
  });
};

const updateOne = (db, colName, query = {}, data = {}, cb = noop) => {
  const collection = db.collection(colName);
  if (isVoid0(collection)) return logger('collectionNotFound', 'error', colName);
  collection.updateOne(query, data, (err, res) => {
    if (err) return logger.error(err);
    logger('updateOne', 'info', data);
    if (isFunction(cb)) return cb(res);
  });
};

const insertOrUpdateOne = (db, colName, query = {}, data = {}, cb = noop) => {
  const args = arguments;
  findOne(db, colName, query, (res) => {
    if (res) {
      updateOne.apply(null, args);
    }

    else {
      insertOne.apply(null, [db, colName, data, cb]);
    }
  });
};

const connect = (cb) => {
  return mongo.connect(dbUrl, (err, db) => {
    if (err) return logger.error(err);
    logger('mongoInit', 'info');
    cb(db);
    db.close();
  });
};

module.exports.insertOne =  insertOne;
module.exports.findOne =  findOne;
module.exports.updateOne =  updateOne;
module.exports.insertOrUpdateOne =  insertOrUpdateOne;
module.exports.connect =  connect;