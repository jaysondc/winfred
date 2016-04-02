import { Tray } from 'electron';

/**
 * Creates a new tray from the given image
 */
export function createTray(image) {
  const tray = new Tray(image);
  return tray;
}
