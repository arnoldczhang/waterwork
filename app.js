const path = require('path');
const mongo = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/waterwork';
const Koa = require('koa');
const views = require('koa-views');
const compress = require('koa-compress');
const getViewPath = (fileName = '') => path.join(__dirname, `./views/${fileName ? fileName + '.ejs' : ''}`);
const router = require('./config/router')(getViewPath);
const app = new Koa();

app.use(views(getViewPath(), { extension: 'ejs' }))
  .use(compress())
  .use(router.routes())
  .use(router.allowedMethods());

if (!module.parent) app.listen(3003, () => {
  console.log('koa started at 3003 port');
});


