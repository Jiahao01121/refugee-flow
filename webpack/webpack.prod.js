/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common.js');

module.exports = env => console.info(env) || merge(common, {
  mode: env.NODE_ENV,
  output: {
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       icons: {
  //         chunks: 'all',
  //         enforce: true,
  //         filename: '[name].[chunkhash].js',
  //         name: 'icons',
  //         test: /[\\/]node_modules[\\/](@ant-design)[\\/]/,
  //       },
  //       maps: {
  //         chunks: 'all',
  //         enforce: true,
  //         filename: '[name].[chunkhash].js',
  //         name: 'maps',
  //         test: /[\\/]node_modules[\\/](luma.gl|mapbox-gl|react-map-gl|@deck.gl)[\\/]/,
  //       },
  //     },
  //   },
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new OptimizeCssAssetsPlugin({}),
    // new BundleAnalyzerPlugin(),
  ],
});
