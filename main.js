import path from 'path';
import main from './app/main';

// creates the winfred context
const winfred = {
  main: null, // the main app/process module
  mainWindow: null, // the BrowserWindow instance
  tray: null, // the tray instance
  pluginsPath: path.resolve(__dirname, 'plugins'), // the path to the plugins directory
  plugins: [], // an array of plugins
};

/**
 * Loads the plugin
 *
 * @param object plugin       The plugin instance
 */
winfred.loadPlugin = (plugin) => {
  winfred.plugins = Object.assign([], winfred.plugins, [plugin]);
};

/**
 * Returns true if plugins are available
 *
 * @return bool
 */
winfred.hasPlugins = () => winfred.plugins && winfred.plugins.length;

/**
 * Retrieves the list of loaded plugins
 *
 * @return array
 */
winfred.getPlugins = () => winfred.plugins;

/**
 * Sets the main BrowserWindow instance
 *
 * @param BrowserWindow window
 */
winfred.setMainWindow = win => {
  winfred.mainWindow = win;
};

/**
 * Retrieves the BrowserWindow
 *
 * @return BrowserWindow
 */
winfred.getMainWindow = () => winfred.mainWindow;

/**
 * Sets the Tray instance
 *
 * @param Tray tray
 */
winfred.setTray = tray => {
  winfred.tray = tray;
};

/**
 * Retrieves the Tray
 *
 * @return Tray
 */
winfred.getTray = () => winfred.tray;

// boot up the main process
winfred.main = main(winfred);
