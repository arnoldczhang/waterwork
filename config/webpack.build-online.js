const path = require('path');
const webpack = require('webpack');
const noop = (err, state) => console.log(err, state);

const resolveDir = (dir) => {
  return path.resolve(__dirname, dir);
};

module.exports = (config, cb = noop) => {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': config.env
    })
  ];
  
  if (config.env === 'prod') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }));
  }

  return webpack({
    entry: {
      [config.entryKey]: config.entryUrl
    },
    output: {
      path: resolveDir('../dist'),
      publicPath: "/dist/",
      chunkFilename: '[name].[chunkhash].js',
      // sourceMapFilename: '[file].[chunkhash].map',
      crossOriginLoading: 'anonymous',
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_module/
        }
      ]
    },
    cache: true,
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': resolveDir('../src'),
      },
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
  }, cb);
};
