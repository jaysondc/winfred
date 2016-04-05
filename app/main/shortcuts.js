import { globalShortcut } from 'electron';
import logger from '../utils/logger';
import { toggleWindow, hideWindow } from './window';
import {
  IPC_RESULT_PREVIOUS_ITEM,
  IPC_RESULT_NEXT_ITEM,
  IPC_RESULT_EXECUTE_ITEM,
} from '../const/ipc';

/**
 * Register the global shortcut
 *
 * @context The application context
 * @param BrowserWindow mainWindow
 */
export function registerGlobalShortcuts(mainWindow) {
  logger.info('GLOBAL ON');
  globalShortcut.register('alt+space', toggleWindow.bind(this, mainWindow));
}

/**
 * Unregister the global shortcut
 *
 * @context The application context
 * @param BrowserWindow mainWindow
 */
export function unregisterAllShortcuts(mainWindow) {
  logger.info('GLOBAL OFF');
  globalShortcut.unregisterAll();
}

/**
 * Registers the local shortcuts
 *
 * @context The application context
 * @param BrowserWindow mainWindow
 */
export function registerShortcuts(mainWindow) {
  logger.info('LOCAL ON');
  // register the default key bindings
  if (!globalShortcut.isRegistered('esc')) {
    globalShortcut.register('esc', hideWindow.bind(this, mainWindow));
  }
  if (!globalShortcut.isRegistered('up')) {
    globalShortcut.register('up', () => { mainWindow.webContents.send(IPC_RESULT_PREVIOUS_ITEM); });
  }
  if (!globalShortcut.isRegistered('down')) {
    globalShortcut.register('down', () => { mainWindow.webContents.send(IPC_RESULT_NEXT_ITEM); });
  }
  if (!globalShortcut.isRegistered('enter')) {
    globalShortcut.register('enter', () => { mainWindow.webContents.send(IPC_RESULT_EXECUTE_ITEM); });
  }
}

/**
 * Unregister the local shortcuts
 *
 * @context The application context
 * @param BrowserWindow mainWindow
 */
export function unregisterShortcuts(mainWindow) {
  logger.info('LOCAL OFF');
  // unregister shortcuts
  globalShortcut.unregister('esc');
  globalShortcut.unregister('up');
  globalShortcut.unregister('down');
  globalShortcut.unregister('enter');
}
