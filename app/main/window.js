import { BrowserWindow } from 'electron';
import { IPC_RELOAD_WEB_CONTENT } from '../const/ipc';

/**
 * Creates a new BrowserWindow instance
 *
 * @context The application context
 * @param int width
 * @param int height
 */
export function createWindow(width, height) {
  const win = new BrowserWindow({
    width,
    height,
    center: true,
    frame: false,
    show: false,
    minimizable: false,
    maximizable: false,
    resizable: false,
  });
  return win;
}

/**
 * Hides the window and resets the query
 *
 * @context The application context
 * @param BrowserWindow mainWindow
 */
export function hideWindow(mainWindow) {
  mainWindow.hide();
  // sends the signal to reload the web content
  mainWindow.webContents.send(IPC_RELOAD_WEB_CONTENT);
}

/**
 * Shows the window
 *
 * @context The application context
 * @param BrowserWindow mainWindow
 */
export function showWindow(mainWindow) {
  mainWindow.show();
}

/**
 * Toggles the main window to show or hide
 *
 * @context The application context
 * @param BrowserWindow mainWindow
 */
export function toggleWindow(mainWindow) {
  if (mainWindow.isVisible()) {
    hideWindow(mainWindow);
  } else {
    showWindow(mainWindow);
  }
}
