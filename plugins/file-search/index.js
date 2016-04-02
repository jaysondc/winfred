import path from 'path';
import co from 'co';
import readdirp from 'readdirp';
import fuzzy from 'fuzzy';

export default class FileSearchPlugin {
  constructor() {
    const self = this;
    this.name = 'File Search';
    this.desc = 'Sample desc....';
    this.results = [];
    // lookup files
    const DIR_TO_READ = path.resolve(process.env.USERPROFILE, 'Desktop');
    co(function* () {
      // lookup the results and set it
      self.results = yield self.lookup(DIR_TO_READ);
    }).catch((err) => {
      console.log(err);
      console.log(err.stack);
    });
  }

  search(q) {
    if (this.results && this.results.length) {
      // fuzzy filter results by name
      return fuzzy.filter(q, this.results, { extract: item => item.name });
    }
  }

  lookup(path) {
    return new Promise((resolve, reject) => {
      const results = [];
      // create a stream to read recursively
      const stream = readdirp({ root: path });
      stream
        // add entry on data stream
        .on('data', (entry) => {
          results.push(entry);
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
