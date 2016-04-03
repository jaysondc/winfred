import path from 'path';
import co from 'co';
import fuzzy from 'fuzzy';
import { shell } from 'electron';
import { cloneDeep } from 'lodash';
import { refresh, reScore } from './search';

export default function (app) {
  const PLUGIN_NAME = 'File Search';
  const PLUGIN_DESC = 'Sample desc...';
  const INDEX_PATHS = [
    app.getPath('desktop'),
    app.getPath('documents'),
    app.getPath('downloads'),
    app.getPath('music'),
    app.getPath('pictures'),
    app.getPath('videos'),
    path.resolve(process.env.USERPROFILE, 'Applications'),
  ];

  // create an empty results set
  let results = [];

  // lookup files
  co(function* refreshIndex() {
    results = yield refresh(INDEX_PATHS);
  });

  app.createPlugin({
    name: PLUGIN_NAME,
    desc: PLUGIN_DESC,
    search: (q) => {
      if (results.length) {
        // fuzzy filter results by name
        const filtered = fuzzy.filter(q.toLowerCase(), results, {
          extract: item => item.title.toLowerCase(),
        });
        // rescore and resort results
        const rescored = filtered
          // rescore everything
          .map(item => {
            const newItem = cloneDeep(item);
            // re-score the fuzzy score
            newItem.score = reScore(item.score, item.original);
            // transfer the score to the original data object
            newItem.original.score = newItem.score;
            return newItem;
          })
          // re-sort the new scores
          .sort((a, b) => {
            const compare = b.score - a.score;
            if (compare) { return compare; }
            return a.score - b.score;
          });
        // return the original object
        return rescored.slice(0, 10).map(item => item.original);
      }
      return results;
    },
    execute: (result) => {
      // opens the item
      shell.openItem(result.data.fullPath);
    },
  });
}
