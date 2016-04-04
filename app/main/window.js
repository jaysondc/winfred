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
    resizable: true,
    skipTaskbar: true,
  });
  // move up a little bit to off-set for results
  const pos = win.getPosition();
  win.setPosition(pos[0], pos[1] - 200);
  return win;
}

/**
 * Collapses the main window
 *
 * @context The application context
 * @param BrowserWindow mainWindow
 */
export function collapseWindow(mainWindow) {
  mainWindow.setSize(this.size[0], this.size[1]);
}

/**
 * Expands the main window
 *
 * @context The application context
 * @param BrowserWindow mainWindow
 */
export function expandWindow(mainWindow) {
  mainWindow.setSize(this.size[0], this.size[1] + 500);
}

/**
 * Hides the window and resets the query
 *
 * @context The application context
 * @param BrowserWindow mainWindow
 */
export function hideWindow(mainWindow) {
  mainWindow.hide();
  // collapses the window
  collapseWindow.bind(this)(mainWindow);
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
    hideWindow.bind(this)(mainWindow);
  } else {
    showWindow.bind(this)(mainWindow);
  }
}
