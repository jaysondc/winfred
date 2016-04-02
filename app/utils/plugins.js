import { isFunction } from 'lodash';
import readdirp from 'readdirp';

/**
 * Retrieve plugins for the given path and returns a stream
 * https://github.com/thlorenz/readdirp#api
 *
 * @param string pluginsPath
 * @return ReaddirpReadable       The readable stream
 */
export function getPlugins(pluginsPath) {
  return readdirp({ root: pluginsPath, fileFilter: '*.js' });
}

/**
 * Checks and validates the plugin instance
 *
 * @param object plugin     The plugin instance
 * @return bool
 */
export function validatePlugin(plugin) {
  if (isFunction(plugin.search)) {
    return true;
  }
  return false;
}
