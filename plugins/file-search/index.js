import path from 'path';
import co from 'co';
import readdirp from 'readdirp';
import fuzzy from 'fuzzy';
import { cloneDeep, filter, flatMap, flatten, max, values } from 'lodash';
import { Plugin, Result } from '../../app/models';
import extensions from './extensions';

export default class FileSearchPlugin extends Plugin {
  constructor(options) {
    super(options);
    this.name = 'File Search';
    this.desc = 'Sample desc....';
    // lookup files
    const INDEX_PATHS = [
      this.getApp().getPath('desktop'),
      this.getApp().getPath('documents'),
      this.getApp().getPath('downloads'),
      this.getApp().getPath('music'),
      this.getApp().getPath('pictures'),
      this.getApp().getPath('videos'),
      path.resolve(process.env.USERPROFILE, 'Applications'),
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
      const filtered = fuzzy.filter(q.toLowerCase(), this.results, {
        extract: item => item.title.toLowerCase(),
      });
      // rescore and resort results
      const rescored = filtered
        // rescore everything
        .map(item => {
          const newItem = cloneDeep(item);
          // re-score the fuzzy score
          newItem.score = this.reScore(item.score, item.original);
          newItem.original.score = newItem.score;
          return newItem;
        })
        // re-sort the new scores
        .sort((a, b) => {
          const compare = b.score - a.score;
          if (compare) { return compare; }
          return a.score - b.score;
        });
      return rescored.slice(0, 10).map(item => item.original);
    }
    return [];
  }

  /**
   * Takes an Result instance, and reset the score based on it's file naming conventions
   *
   * @param int score       The current score
   * @param Result result   The Result instance
   * @return float
   */
  reScore(score, result) {
    // check extension priorities
    const ext = path.extname(result.title).toLowerCase();
    const priorites = filter(extensions, o => o.ext.indexOf(`*${ext}`) > -1)
      // return only the priorities
      .map(o => o.priority);
    const ratio = max(values(priorites));
    return score * ratio;
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
        fileFilter: flatMap(extensions, ext => ext.ext),
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
