const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })],
  devServer: {
    compress: true,
    inline: true,
    port: port,
    host: 'localhost'
  },
};