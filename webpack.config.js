const path = require('path');
const webpack = require('webpack');


module.exports = {
  context: path.resolve(__dirname, 'client'),
  entry: ['./index.jsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'assets', 'js')
  },
  module: {
    rules: [{
      test: /\.js|.jsx?$/,
      exclude: [
        path.join(__dirname, 'node_modules/')
      ],
      query: {
        presets: [
          ['es2015', {
            modules: false
          }], 'react'
        ]
      },
      loader: 'babel-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};