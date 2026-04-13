const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getSources: () => ipcRenderer.invoke('get-sources'),
  showSaveDialog: () => ipcRenderer.invoke('show-save-dialog'),
  saveFile: (filePath, buffer) => ipcRenderer.invoke('save-file', filePath, buffer),
});