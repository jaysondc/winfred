import { ipcRenderer } from 'electron';
import { IPC_CONNECT, IPC_DISCONNECT, IPC_RELOAD_WEB_CONTENT } from '../const/ipc';

export default {
  connect: () => {
    ipcRenderer.send(IPC_CONNECT);
  },
  disconnect: () => {
    ipcRenderer.send(IPC_DISCONNECT);
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
