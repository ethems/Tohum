const path = require('path');
const precss = require('precss');
const cssnext = require('postcss-cssnext');

module.exports = {
  context: path.resolve(__dirname, 'client'),
  entry: ['./index.jsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'assets', 'js')
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js|.jsx?$/,
      exclude: /node_modules/,
      options: {
        presets: [
          ['es2015', {
            modules: false
          }], 'react'
        ],
        plugins: ['transform-class-properties', 'transform-object-rest-spread']
      }
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader?importLoaders=1', {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            precss,
            cssnext
          ]
        }
      }]
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader?importLoaders=1', {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            precss,
            cssnext
          ]
        }
      }, 'sass-loader']
    }, {
      test: /\.(png|jpg|ttf|eot)$/,
      exclude: /node_modules/,
      loader: 'url-loader?limit=100000'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};