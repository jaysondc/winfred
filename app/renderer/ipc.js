import { ipcRenderer } from 'electron';
import { IPC_EXECUTE } from '../const/ipc';

export default {
  execute: (item) => {
    ipcRenderer.send(IPC_EXECUTE, item);
  },

  // inherited
  on: (channel, listener) => ipcRenderer.on(channel, listener),
  once: (channel, listener) => ipcRenderer.once(channel, listener),
  removeListener: (channel, listener) => ipcRenderer.removeListener(channel, listener),
  removeAllListeners: (channel, listener) => ipcRenderer.removeAllListeners(channel, listener),
  send: (channel, ...args) => ipcRenderer.send(channel, ...args),
  sendSync: (channel, ...args) => ipcRenderer.sendSync(channel, ...args),
  sendToHost: (channel, ...args) => ipcRenderer.sendToHost(channel, ...args),
};
