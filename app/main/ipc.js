import { ipcMain } from 'electron';
import { IPC_CONNECT, IPC_DISCONNECT, IPC_SEARCH, IPC_SEARCH_REPLY } from '../const/ipc';

let appContext = null;
let connectedClient = null;

export default {
  /**
   * Connects the IPC stub to the main application context
   *
   * @param object app
   */
  connect: (app) => {
    // sets the app context
    appContext = app;

    // start registering listeners
    ipcMain.on(IPC_CONNECT, (evt) => {
      connectedClient = evt.sender;
    });

    ipcMain.on(IPC_DISCONNECT, () => {
      connectedClient = null;
    });

    ipcMain.on(IPC_SEARCH, (evt, args) => {
      let results = null;
      if (appContext.hasPlugins()) {
        // iterate through plugins
        const plugins = appContext.getPlugins();
        plugins.map((plugin) => {
          // call the plugin's search method
          // and set it as the results
          // TODO: needs to append to a results list instead
          results = plugin.search(args.q);
        });
      }
      evt.sender.send(IPC_SEARCH_REPLY, results);
    });
  },

  // inherited
  on: (channel, listener) => ipcMain.on(channel, listener),
  once: (channel, listener) => ipcMain.once(channel, listener),
  removeListener: (channel, listener) => ipcMain.removeListener(channel, listener),
  removeAllListeners: (channel, listener) => ipcMain.removeAllListeners(channel, listener),
};
