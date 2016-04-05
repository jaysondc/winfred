/*eslint-disable*/

// wraps the main entry point into babel-register
require('babel-register');
require('babel-polyfill');
const appIndex = require('./app').default;
const logger = require('./app/utils/logger').default;

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

  const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, Object.assign({}, config, {
    noInfo: true,
    publicPath: '/',
  }));

  // Attach webpack-dev-middleware and webpack-hot-middleware
  app.use(webpackDevMiddlewareInstance);
  app.use(webpackHotMiddleware(compiler));

  // expose the public path
  app.use(path.basename(config.output.path), express.static(config.output.path));

  webpackDevMiddlewareInstance.waitUntilValid(() => {
    // start server
    app.listen(4000, (err, result) => {
      logger.info('HMR running on port 4000.');
    });
  });
}

// start the app!
appIndex();
