const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('overlay', {
  resize: (height, width) => ipcRenderer.send('resize', height, width),
  close: () => ipcRenderer.send('close'),
  notify: (title, body) => ipcRenderer.send('notify', title, body),
  onLock: (cb) => ipcRenderer.on('lock', (_e, locked) => cb(locked)),
});
