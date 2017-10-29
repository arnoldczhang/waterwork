const path = require('path');
const Koa = require('koa');
const body = require('koa-body');
const logger = require('koa-logger');
const views = require('koa-views');
const compress = require('koa-compress');
const staticServer = require("koa-static");
// const webpack = require('webpack');
// const webpackDevMiddleware = require('koa-webpack-dev-middleware');
// const webpackHotMiddleware = require('koa-webpack-hot-middleware');
// const config = require('./config/webpack.config');
// const compiler = webpack(config);

const getViewPath = (fileName = '') => path.join(__dirname, `./views/${fileName ? fileName + '.ejs' : ''}`);
const router = require('./config/router')(getViewPath);
const app = new Koa();

app
  // .use(webpackDevMiddleware(compiler, {
  //   noInfo: true,
  //   publicPath: config.output.publicPath
  // }))
  // .use(webpackHotMiddleware(compiler))
  .use(views(getViewPath(), { extension: 'ejs' }))
  .use(staticServer(path.join(__dirname, './lib')))
  .use(body())
  .use(logger())
  .use(compress())
  .use(router.routes())
  .use(router.allowedMethods())
  ;

if (!module.parent) app.listen(3003, () => {
  console.log('koa started at 3003 port');
});
