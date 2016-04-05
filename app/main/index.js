import path from 'path';
import { isFunction } from 'lodash';
import { app } from 'electron';
import { getPlugins } from '../utils/plugins';
import { createTray } from './tray';
import { createDb } from './db';
import ipc from './ipc';
import {
  createWindow,
  toggleWindow,
  showWindow,
  hideWindow,
} from './window';
import {
  registerGlobalShortcuts,
  unregisterAllShortcuts,
  registerShortcuts,
  unregisterShortcuts,
} from './shortcuts';

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
    // creates the window, tray, and db instances
    mainWindow = createWindow.bind(appContext)(appContext.size[0], appContext.size[1]);
    tray = createTray(path.resolve(__dirname, '..', 'icon.png'));
    db = createDb(appContext.dataPath);

    // register the global shortcut
    registerGlobalShortcuts.bind(appContext)(mainWindow);
     // window "show" event doesn't get called initially
    registerShortcuts.bind(appContext)(mainWindow);

    // register main window shortcuts
    mainWindow.on('show', registerShortcuts.bind(appContext, mainWindow));
    mainWindow.on('focus', registerShortcuts.bind(appContext, mainWindow));
    mainWindow.on('hide', unregisterShortcuts.bind(appContext, mainWindow));
    mainWindow.on('blur', unregisterShortcuts.bind(appContext, mainWindow));

    // hides the window on blur
    mainWindow.on('blur', hideWindow.bind(appContext, mainWindow));
    // toggles the main window
    tray.on('click', toggleWindow.bind(appContext, mainWindow));

    // set to app context
    appContext.setApp(app);
    appContext.setMainWindow(mainWindow);
    appContext.setTray(tray);
    appContext.setDb(db);

    // connects the main stub
    ipc.connect(appContext);

    // load the index.html
    const indexFile = path.resolve(__dirname, '..', 'index.html');
    mainWindow.loadURL(`file://${indexFile}`);
  });

  // unregister all shortcuts
  app.on('will-quit', unregisterAllShortcuts.bind(appContext, mainWindow));

  // minimizes to tray when the window is closed
  app.on('window-all-closed', () => {
    mainWindow = null;
  });
}
