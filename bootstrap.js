/*eslint-disable*/

// wraps the main entry point into babel-register
const debug = require('debug')('winfred');
require('babel-register');
require('babel-polyfill');
require('./main');

// load env
require('dotenv').load();

if (process.env.NODE_ENV === "development") {
  const path = require('path');
  const express = require('express');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.dev').default;
  const compiler = webpack(config);
  const app = express();

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
    debug('HMR running on port 4000.');
  })
}
