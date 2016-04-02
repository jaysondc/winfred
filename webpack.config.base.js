import path from 'path';
import webpack from 'webpack';
import webpackTargetElectronRenderer from 'webpack-target-electron-renderer';

// set the default config
const config = {};

// set the default entry point
config.entry = {
  app: [
    path.resolve(__dirname, 'app', 'renderer', 'index.js'),
  ],
  vendor: [
    'lodash',
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'redux-thunk',
  ],
};

// set the default plugins
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  new webpack.NoErrorsPlugin(),
];

config.output = {
  path: path.resolve(__dirname),
  filename: 'bundle.js',
  publicPath: '/',
};

config.module = {
  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel'],
    },
  ],
};

// specify the target as electron
config.target = webpackTargetElectronRenderer(config);

export default config;
