import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod.js';

// create a webpack compiler
const compiler = webpack(webpackConfig);

// run the compiler
compiler.run(err => {
  if (!err) {
    console.log('DONE!');
  }
});
