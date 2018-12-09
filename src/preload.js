const electron = require('electron');
window.ipcRenderer = electron.ipcRenderer;
window.clipboard = electron.clipboard;
window.remote = electron.remote;
