const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    compress: true,
    inline: true,
    port: '8080',
    allowedHosts: [
        '.amazonaws.com'
    ]
  },
};