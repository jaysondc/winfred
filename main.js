import path from 'path';
import main from './app/main';

// creates the winfred context
const winfred = {
  main: null, // the main app/process module
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

// boot up the main process
winfred.main = main(winfred);
