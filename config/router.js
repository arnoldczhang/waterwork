const fs = require('fs');
const ejs = require('ejs');
const router = require('koa-router')();
const redis = require('./redis');
const response = require('./response');
const MSG = require('./message');
const CODE = require('./code');

const extend = (...args) => Object.assign.apply(null, args);
const isUndefined = (obj) => typeof obj === 'undefined';

let compiler;

/*
  Renderers
 */
async function index(ctx) {
  const sessionId = ctx.cookies.get('mtdpsessionid');
  const result = redis.has(sessionId);
  const data = {
    loginState: result || '未登录',
  };
  await ctx.render('layout', {
    body: compiler('index')(data),
  });
};

async function getUser (ctx) {
  const sessionId = ctx.cookies.get('mtdpsessionid');
  if(isUndefined(sessionId)) {
    ctx.body = extend(response, {
      code: CODE.error,
      message: MSG.nologin,
    });
    return; 
  }

  redis.get(sessionId, (err, reply) => {
    if (err) {
      console.log(err);
    }

    console.log(reply);
  });
};

async function addUser (ctx) {

};

/*
  Router
 */
router
  .get('/aaa', index)
  .get('/user', getUser)
  .post('/user', addUser)
  // .put('/users/:id', function *(next) {
  //   // ...
  // })
  // .del('/users/:id', function *(next) {
  //   // ...
  // });

module.exports = (func) => {
  compiler = (fileName) => {
    return ejs.compile(fs.readFileSync(func.call(this, 'index'), 'utf8'));
  };
  return router;
};