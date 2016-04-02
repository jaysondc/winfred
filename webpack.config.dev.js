import webpack from 'webpack';
import baseConfig from './webpack.config.base';

// set the default config
let config = {};

// merge configs
config = Object.assign({}, baseConfig, config);

// prepends the webpack-hot-middleware client
config.entry.app.unshift('webpack-hot-middleware/client?path=http://localhost:4000/__webpack_hmr&reload=true');

// set output
config.output.publicPath = 'http://localhost:4000/dist/';

// enable source maps
config.devtool = 'source-map';

// inserts the hot module replacement plugin
config.plugins.splice(2, 0, new webpack.HotModuleReplacementPlugin());

export default config;
