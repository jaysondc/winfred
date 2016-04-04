import path from 'path';
import { isFunction } from 'lodash';
import { app } from 'electron';
import { globalShortcut } from 'electron';
import { getPlugins } from '../utils/plugins';
import { createWindow, toggleWindow, showWindow, hideWindow } from './window';
import { createTray } from './tray';
import { createDb } from './db';
import ipc from './ipc';
import {
  IPC_RESULT_PREVIOUS_ITEM,
  IPC_RESULT_NEXT_ITEM,
  IPC_RESULT_EXECUTE_ITEM,
} from '../const/ipc';

/**
 * @param object appContext    The application context
 */
export default function main(appContext) {
  // create placeholders
  let mainWindow = null;
  let tray = null;
  let db = null;

  // make a single instance of the app
  const shouldQuit = app.makeSingleInstance(() => {
    if (mainWindow !== null) {
      // shows the main window
      showWindow.bind(appContext)(mainWindow);
    }
  });

  // quits the newly spawned window
  if (shouldQuit) {
    app.quit();
    return;
  }

  // connects the main stub
  ipc.connect(appContext);

  // load plugins
  const stream = getPlugins(appContext.pluginsPath);
  stream.on('data', (entry) => {
    // checks if plugin implements the plugins API
    const currentPlugin = require(entry.fullPath).default;
    if (isFunction(currentPlugin)) {
      // initialize the plugin and pass the app context
      currentPlugin(appContext);
    }
  });

  app.on('ready', () => {
    // create the window object
    mainWindow = createWindow.bind(appContext)(appContext.size[0], appContext.size[1]);
    const mwc = mainWindow.webContents;

    // register the default key bindings
    globalShortcut.register('alt+space', toggleWindow.bind(appContext, mainWindow));
    globalShortcut.register('esc', hideWindow.bind(appContext, mainWindow));
    globalShortcut.register('up', () => { mwc.send(IPC_RESULT_PREVIOUS_ITEM); });
    globalShortcut.register('down', () => { mwc.send(IPC_RESULT_NEXT_ITEM); });
    globalShortcut.register('enter', () => { mwc.send(IPC_RESULT_EXECUTE_ITEM); });

    // creates a tray
    tray = createTray(path.resolve(__dirname, '..', 'icon.png'));
    tray.on('click', toggleWindow.bind(appContext, mainWindow));

    // create the db
    db = createDb(appContext.dataPath);

    // load the index.html
    const indexFile = path.resolve(__dirname, '..', 'index.html');
    mainWindow.loadURL(`file://${indexFile}`);

    // hides the window on blur
    mainWindow.on('blur', () => hideWindow.bind(appContext, mainWindow));

    // set to app context
    appContext.setApp(app);
    appContext.setMainWindow(mainWindow);
    appContext.setTray(tray);
    appContext.setDb(db);
  });

  // minimizes to tray when the window is closed
  app.on('window-all-closed', () => {
    mainWindow = null;
  });
}
