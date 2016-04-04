import { app, Tray, Menu } from 'electron';

/**
 * Creates a new tray from the given image
 */
export function createTray(image) {
  const tray = new Tray(image);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click: () => { app.quit(); },
    },
  ]);
  tray.setContextMenu(contextMenu);
  return tray;
}
