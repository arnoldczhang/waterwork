const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    "webpack-hot-middleware/client?noInfo=true&reload=true",
    "./app",
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: [ 'babel-loader' ],
        exclude: /node_modules/,
        include: __dirname,
      }
    ]
  }
}