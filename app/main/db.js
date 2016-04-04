import storage from 'node-persist';

/**
 * Creates the db at the given path
 *
 * @param string dbPath
 * @return object
 */
export function createDb(dbPath) {
  const db = storage.create({
    dir: dbPath,
  });
  // init the db
  db.init();
  return db;
}
