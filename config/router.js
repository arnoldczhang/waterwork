const fs = require('fs');
const ejs = require('ejs');
const router = require('koa-router')();
const redis = require('./redis');
const db = require('./db');
const response = require('./response');
const MSG = require('./message');
const CODE = require('./code');
const build = require('./build');

let compiler;

/*
 Functions
 */
const extend = (...args) => Object.assign.apply(null, args);
const isUndefined = (obj) => typeof obj === 'undefined';
const getHash = () => {
  const code = +String(Math.random()).substr(2);
  return code.toString(36);
};


/*
  Renderers
 */
async function index(ctx) {
  const sessionId = ctx.cookies.get('mtdpsessionid');
  let data;
  await redis.has(sessionId, (res) => {
    res = JSON.parse(res);
    data = {
      loginState: res || '未登录',
    };
    if (!res) return ctx.cookies.set('mtdpsessionid', null);
    redis.expire(sessionId, 60 * 30);
  });

  await ctx.render('layout', {
    body: compiler('index')(data),
  });
};

async function login (ctx) {
  const data = ctx.request.body;
  await db.getUser(data, (user) => {
    if (!user) {
      ctx.body = extend({}, response, {
        code: CODE.error,
        message: MSG.notexist,
      });
    }

    else {
      const sessionId = getHash();
      redis.set(sessionId, JSON.stringify(user));
      redis.expire(sessionId, 60 * 30);
      ctx.cookies.set('mtdpsessionid', sessionId);
      ctx.body = extend({}, response, {
        code: CODE.success,
        data,
      });
    }
  });
};

async function save (ctx) {
  const sessionId = ctx.cookies.get('mtdpsessionid');
  const data = ctx.request.body;
  const user = await redis.has(sessionId);
  if (user) {
    const srcUrl = `./src/${data.id}.js`;
    const distUrl = `dist/${data.id}.js`;
    await fs.writeFile(srcUrl, data.content, (err) =>{
      if (err) return;
    });

    await build({
      entryKey: data.id,
      entryUrl: srcUrl,
    }, (err, state) => {
      console.log(1122)
      if (err) return;
      ctx.body = extend({}, response, {
        code: CODE.success,
        data: fs.readFileSync(distUrl, 'utf8'),
      });
    });
  }

  else {
    ctx.body = extend({}, response, {
      code: CODE.error,
      message: MSG.nologin,
    });
  }
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
  });
};

async function addUser (ctx) {

};

/*
  Router
 */
router
  .get('/', index)
  .post('/login', login)
  .post('/save', save)
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