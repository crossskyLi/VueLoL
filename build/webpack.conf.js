const path = require('path');
const config = require('./config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const resolve = require('./util').resolve;
module.exports = {
  entry: {
    app: "./src/core/index.js",
    view: "./views/main.js",
  },
  output: {
    path: path.resolve(process.cwd(), "./dist"),
    publicPath: './',
    chunkFilename: 'chunk-[id].js?[chunkhash]',
    filename: '[name].js?[hash]',
    chunkFilename: '[id].js',
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias
  },
  devtool: '#eval-source-map',
  optimization: {
    minimizer: [
      // new TerserPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true, // Must be set to true if using source-maps in production
      //   terserOptions: {
      //     // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
      //   }
      // }),
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true,
    }),
    // new cleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "test output",
      template: "./index.html",
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ]

}