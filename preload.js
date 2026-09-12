const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('taskforge', {
  showNotification: ({ title, body }) => ipcRenderer.send('show-notification', { title, body })
});
