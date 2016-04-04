import path from 'path';
import packager from 'electron-packager';

packager({
  dir: path.resolve(__dirname, '..'),
  out: path.resolve(__dirname, '..', 'build'),
  arch: 'ia32',
  platform: 'win32',
  asar: true,
  overwrite: true,
}, (err, appPath) => {
  console.log(`BUILD SUCCESSFUL! ${appPath}`);
});
