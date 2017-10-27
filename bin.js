const webpack = require('./config/webpack');
const config = {
  env: 'debug',
  entryKey: 'test',
  entryUrl: './src/' + 'test.js',
};
webpack(config);