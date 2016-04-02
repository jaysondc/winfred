import path from 'path';
import { app } from 'electron';
import { globalShortcut } from 'electron';
import { getPlugins, validatePlugin } from '../utils/plugins';
import { createWindow, toggleWindow, showWindow, hideWindow } from './window';
import { createTray } from './tray';
import ipc from './ipc';

/**
 * @param object appContext    The application context
 */
export default function main(appContext) {
  // create placeholders
  let mainWindow = null;
  let tray = null;

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
    const Plugin = require(entry.fullPath).default;
    // creates the plugin instance
    const pluginInstance = new Plugin();
    // if it's a valid plugin
    if (validatePlugin(pluginInstance)) {
      // loads the plugin
      appContext.loadPlugin(pluginInstance);
    }
  });

  app.on('ready', () => {
    const WINDOW_WIDTH = process.env.NODE_ENV === 'development' ? 900 : 900;
    const WINDOW_HEIGHT = process.env.NODE_ENV === 'development' ? 900 : 300;

    // create the window object
    mainWindow = createWindow.bind(appContext)(WINDOW_WIDTH, WINDOW_HEIGHT);

    // register the default key bindings
    globalShortcut.register('alt+space', toggleWindow.bind(appContext, mainWindow));

    // creates a tray
    tray = createTray(path.resolve(__dirname, '..', 'icon.png'));
    tray.on('click', toggleWindow.bind(appContext, mainWindow));

    // load the index.html
    const indexFile = path.resolve(__dirname, '..', 'index.html');
    mainWindow.loadURL(`file://${indexFile}`);

    // hides the window on blur
    mainWindow.on('blur', hideWindow.bind(appContext, mainWindow));

    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools();
    }
  });

  // minimizes to tray when the window is closed
  app.on('window-all-closed', () => {
    mainWindow = null;
  });
}
