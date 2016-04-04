import path from 'path';
import dotenv from 'dotenv';
import baseConfig from './webpack.config.base';

// Load env
dotenv.load();

// set the default config
let config = {};

// merge configs
config = Object.assign({}, baseConfig, config);

// set output directory
config.output.path = path.resolve(__dirname, 'dist');

export default config;
