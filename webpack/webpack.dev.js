/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = env => console.info(env) || merge(common, {
  mode: env.NODE_ENV,
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    compress: true,
    port: env.PORT,
    writeToDisk: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: { disableDotRule: true },
    proxy: { '/data': 'http://localhost:2700' },
  },
});
