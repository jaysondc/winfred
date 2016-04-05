import path from 'path';
import readdirp from 'readdirp';
import { filter, flatMap, flatten, max, values } from 'lodash';
import extensions from './extensions';

/**
 * Looks up a single path
 *
 * @param array filePath       A path to look up
 * @return Promise
 */
export function lookup(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    // create a stream to read recursively
    const stream = readdirp({
      root: filePath,
      fileFilter: flatMap(extensions, ext => ext.ext),
    });
    stream
      // add entry on data stream
      .on('data', (entry) => {
        results.push({
          icon: '', // TODO: create node add-on for retrieving associated icon
          title: entry.name,
          subtitle: entry.fullPath,
          desc: entry.fullPath,
          data: entry,
        });
      })
      // reject on error
      .on('error', reject)
      // resolve when finished
      .on('end', () => {
        resolve(results);
      });
  });
}

/**
 * Refreshes and index the list of paths
 *
 * @param array indexPaths
 * @return array
 */
export function * refresh(indexPaths) {
  const promises = indexPaths.map(p => lookup(p));
  const results = yield Promise.all(promises);
  // console.log('*refresh() => ', flatten(results).length);
  return Promise.resolve(flatten(results));
}

/**
 * Takes an Result instance, and reset the score based on it's file naming conventions
 *
 * @param int score       The current score
 * @param Result result   The Result instance
 * @return float
 */
export function reScore(score, result) {
  // check extension priorities
  const ext = path.extname(result.title).toLowerCase();
  const priorites = filter(extensions, o => o.ext.indexOf(`*${ext}`) > -1)
    // return only the priorities
    .map(o => o.priority);
  const ratio = max(values(priorites));
  return score * ratio;
}
