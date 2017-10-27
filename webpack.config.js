const path = require('path');
const webpack = require('webpack');

const resolveDir = (dir) => {
  return path.resolve(__dirname, dir)
}

webpack({
  entry: {
    test: './test/src/test.js'
  },
  output: {
    path: resolveDir('./test/dist'),
    publicPath: "./test/dist/",
    filename: '[name].min.js'
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: true
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_module/,
        query: {
          presets: [
            'stage-0',
            [
              'es2015',
              {
                modules: false,
              },
            ],
          ],
          plugins: [
            'transform-decorators-legacy',
            [
              'transform-runtime',
              {
                polyfill: false,
              },
            ],
            'transform-object-rest-spread',
            'transform-object-assign',
            'transform-class-properties',
            [
              'transform-es2015-modules-commonjs-simple',
              {
                noMangle: true,
              },
            ],
          ],
        },        
      },
    ],
  },
  cache: true,
  devtool: 'source-map',
  resolve: {
    alias: {
      '@test': resolveDir('./test'),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
}, (err, stats) => {

});