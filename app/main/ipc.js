import { ipcMain } from 'electron';
import { hideWindow, collapseWindow, expandWindow } from './window';
import { wrapResults } from '../utils/plugins';
import {
  IPC_SEARCH,
  IPC_SEARCH_REPLY,
  IPC_EXECUTE,
  IPC_SEARCH_COLLAPSE_WINDOW,
  IPC_SEARCH_EXPAND_WINDOW,
} from '../const/ipc';

export default {
  /**
   * Connects the IPC stub to the main application context
   *
   * @param object app
   */
  connect: (app) => {
    ipcMain.on(IPC_SEARCH, (evt, args) => {
      let results = [];
      if (app.hasPlugins()) {
        // iterate through plugins
        const plugins = app.getPlugins();
        if (plugins && plugins.length) {
          plugins.forEach((plugin) => {
            // call the plugin's search method and append to the current results
            const searchResults = wrapResults(plugin.id, plugin.search(args.q.trim()));
            if (searchResults && searchResults.length) {
              results = results.concat(searchResults);
            }
          });
        }
      }
      // emit the search reply event
      evt.sender.send(IPC_SEARCH_REPLY, results);
    });

    ipcMain.on(IPC_EXECUTE, (evt, result) => {
      // call the associated plugin's execution function
      app.getPluginById(result.pluginId).execute(result);
      // closes the main window
      hideWindow.bind(app)(app.getMainWindow());
    });

    ipcMain.on(IPC_SEARCH_COLLAPSE_WINDOW, () => {
      collapseWindow.bind(app)(app.getMainWindow());
    });

    ipcMain.on(IPC_SEARCH_EXPAND_WINDOW, () => {
      expandWindow.bind(app)(app.getMainWindow());
    });
  },

  // inherited
  on: (channel, listener) => ipcMain.on(channel, listener),
  once: (channel, listener) => ipcMain.once(channel, listener),
  removeListener: (channel, listener) => ipcMain.removeListener(channel, listener),
  removeAllListeners: (channel, listener) => ipcMain.removeAllListeners(channel, listener),
};
