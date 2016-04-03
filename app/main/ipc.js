import { shell, ipcMain } from 'electron';
import { hideWindow } from './window';
import { IPC_SEARCH, IPC_SEARCH_REPLY, IPC_EXECUTE } from '../const/ipc';

export default {
  /**
   * Connects the IPC stub to the main application context
   *
   * @param object app
   */
  connect: (app) => {
    ipcMain.on(IPC_SEARCH, (evt, args) => {
      let results = null;
      if (app.hasPlugins()) {
        // iterate through plugins
        const plugins = app.getPlugins();
        plugins.forEach((plugin) => {
          // call the plugin's search method
          // and set it as the results
          // TODO: needs to append to a results list instead
          results = plugin.search(args.q);
        });
      }
      evt.sender.send(IPC_SEARCH_REPLY, results);
    });

    ipcMain.on(IPC_EXECUTE, (evt, result) => {
      // open the item via the shell
      shell.openItem(result.data.fullPath);
      // closes the main window
      hideWindow(app.mainWindow);
    });
  },

  // inherited
  on: (channel, listener) => ipcMain.on(channel, listener),
  once: (channel, listener) => ipcMain.once(channel, listener),
  removeListener: (channel, listener) => ipcMain.removeListener(channel, listener),
  removeAllListeners: (channel, listener) => ipcMain.removeAllListeners(channel, listener),
};
