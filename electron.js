const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow

let url;
if (process.env.NODE_ENV === 'DEV') {
  url = 'http://localhost:8080/'
} else {
  url = `file://${process.cwd()}/dist/index.html`
}

app.on('ready', () => {
  let window = new BrowserWindow({width: 1600, height: 1200});
  window.loadURL(url);

  installExtension(VUEJS_DEVTOOLS)
  .then((name) => console.log(`Added Extension:  ${name}`))
  .catch((err) => console.log('An error occurred: ', err));

  window.webContents.openDevTools({ mode: 'bottom' });
});
