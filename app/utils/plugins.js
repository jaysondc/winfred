import readdirp from 'readdirp';
import { cloneDeep } from 'lodash';

/**
 * Retrieve plugins for the given path and returns a stream
 * https://github.com/thlorenz/readdirp#api
 *
 * @param string pluginsPath
 * @return ReaddirpReadable       The readable stream
 */
export function getPlugins(pluginsPath) {
  return readdirp({ root: pluginsPath, fileFilter: 'index.js', depth: 1 });
}

/**
 * Given a list of results, appends the plugin ID
 *
 * @param int pluginId      The plugin ID associated with the results
 * @param list results      A list of results
 * @return array            An array of the transformed results
 */
export function wrapResults(id, results) {
  // create a new array
  const newResults = results.map(result => {
    // clone into a new result
    const transformedResult = cloneDeep(result);
    // set the plugin's ID
    transformedResult.pluginId = id;
    return transformedResult;
  });
  return newResults;
}
