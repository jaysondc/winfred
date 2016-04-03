import path from 'path';
import co from 'co';
import readdirp from 'readdirp';
import fuzzy from 'fuzzy';
import { flatten, values } from 'lodash';
import { Plugin, Result } from '../../app/models';
import extensions from './extensions';

export default class FileSearchPlugin extends Plugin {
  constructor(options) {
    super(options);
    this.name = 'File Search';
    this.desc = 'Sample desc....';
    // lookup files
    const INDEX_PATHS = [
      path.resolve(process.env.USERPROFILE, 'Projects'),
      path.resolve(process.env.USERPROFILE, 'Applications'),
      // path.resolve(process.env.USERPROFILE),
      // path.resolve(process.env.PROGRAMFILES),
      // path.resolve(process.env['ProgramFiles(x86)']),
    ];
    co(this.refresh(INDEX_PATHS));
  }

  /**
   * @param string q
   * @return array
   */
  search(q) {
    if (this.results && this.results.length) {
      // fuzzy filter results by name
      const filtered = fuzzy.filter(q, this.results, { extract: item => item.title });
      return filtered.slice(0, 10).map(item => {
        // get the original item
        const result = item.original;
        // set the score
        result.score = item.score;
        return result;
      });
    }
    return [];
  }

  /**
   * Refreshes and index the list of paths
   *
   * @param array indexPaths
   */
  * refresh(indexPaths) {
    const promises = indexPaths.map(p => this.lookup(p));
    const results = yield Promise.all(promises);
    this.results = flatten(results);
  }

  /**
   * Looks up a single path
   *
   * @param array filePath       A path to look up
   * @return Promise
   */
  lookup(filePath) {
    return new Promise((resolve, reject) => {
      const results = [];
      // create a stream to read recursively
      const stream = readdirp({
        root: filePath,
        fileFilter: flatten(values(extensions)),
      });
      stream
        // add entry on data stream
        .on('data', (entry) => {
          results.push(new Result({
            icon: '', // TODO: create node add-on for retrieving associated icon
            title: entry.name,
            subtitle: entry.fullPath,
            desc: entry.fullPath,
            data: entry,
          }));
        })
        // reject on error
        .on('error', reject)
        // resolve when finished
        .on('end', () => {
          resolve(results);
        });
    });
  }
}
