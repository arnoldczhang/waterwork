const path = require('path');
const mongo = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/waterwork';
const Koa = require('koa');
const logger = require('koa-logger');
const views = require('koa-views');
const compress = require('koa-compress');
const staticServer = require("koa-static");
const getViewPath = (fileName = '') => path.join(__dirname, `./views/${fileName ? fileName + '.ejs' : ''}`);
const router = require('./config/router')(getViewPath);
const app = new Koa();

app.use(views(getViewPath(), { extension: 'ejs' }))
  .use(staticServer(path.join(__dirname, './lib')))
  .use(logger())
  .use(compress())
  .use(router.routes())
  .use(router.allowedMethods());

if (!module.parent) app.listen(3003, () => {
  console.log('koa started at 3003 port');
});


