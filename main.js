import path from 'path';
import { cloneDeep } from 'lodash';
import main from './app/main';

// creates the winfred context
const winfred = {
  app: null, // the main app/process module
  mainWindow: null, // the BrowserWindow instance
  tray: null, // the tray instance
  pluginsPath: path.resolve(__dirname, 'plugins'), // the path to the plugins directory
  plugins: [], // an array of plugins
};

/**
 * Loads the plugin
 *
 * @param int id                     The plugin ID
 * @param object plugin              The plugin object
 * @param string plugin.name         Name of the plugin
 * @param string plugin.desc         Description of the plugin
 * @param function plugin.search     Search callback function
 * @param function plugin.execute    Result execution callback function
 */
winfred.loadPlugin = (id, plugin) => {
  const p = cloneDeep(plugin);
  p.id = id;
  // append to list
  winfred.plugins = winfred.plugins.concat([p]);
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
 * Retrieves the plugin by it's ID
 *
 * @param int id
 * @return object|null
 */
winfred.getPluginById = id => {
  const filtered = winfred.plugins.filter(plugin => id === plugin.id);
  return filtered.length ? filtered[0] : null;
};

/**
 * Sets the main app instance
 *
 * @param app
 */
winfred.setApp = app => {
  winfred.app = app;
};

/**
 * Retrieves the main app instance
 *
 * @return app
 */
winfred.getApp = () => winfred.app;

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


// Plugin API
winfred.createPlugin = (plugin) => {
  // retrieve the current plugin index
  const currIndex = winfred.plugins.length;
  const pluginId = currIndex + 1;
  winfred.loadPlugin(pluginId, plugin);
};

// Main Process Proxies
winfred.getPath = (...args) => winfred.getApp().getPath(...args);

// boot up the main process
main(winfred);
