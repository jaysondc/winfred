/*eslint-disable*/

// wraps the main entry point into babel-register
require('babel-register');
require('babel-polyfill');
require('./main');

// load env
require('dotenv').load();

if (process.env.NODE_ENV === "development") {
  var path = require('path');
  var express = require('express');
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var config = require('./webpack.config.dev').default;
  var compiler = webpack(config);
  var app = express();

  // Attach webpack-dev-middleware and webpack-hot-middleware
  app.use(webpackDevMiddleware(compiler, Object.assign({}, config, {
    noInfo: true,
    publicPath: '/',
  })));
  app.use(webpackHotMiddleware(compiler));

  // expose the public path
  app.use(path.basename(config.output.path), express.static(config.output.path));

  // start server
  app.listen(4000, (err, result) => {
    console.log('HMR running on port 4000.');
  })
}
