const {default: installExtension, VUEJS_DEVTOOLS} = require('electron-devtools-installer');
const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const RequisitionRunner = require("enqueuer/js/requisition-runners/requisition-runner").RequisitionRunner;
require('enqueuer/js/injectable-files-list');

let url;
if (process.env.NODE_ENV === 'DEV') {
    console.log('Running in dev mode');
    url = 'http://localhost:8080/'
} else {
    url = `file://${process.cwd()}/dist/index.html`
}

app.on('ready', () => {
    let window = new BrowserWindow({
        width: 1600,
        height: 1200,
        // minWidth: 800,
        // minHeight: 600,
        // resizable: true,
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/preload.js'
        }
    });
    window.loadURL(url);

    ipcMain.on('runRequisition', (event, requisition) => {
        // console.log('file: ' + JSON.stringify(requisition, null, 2));
        // Logger.setLoggerLevel('trace');
        event.sender.send('runningRequisition');
        new RequisitionRunner(requisition, null).run()
            .then(report => {
                event.sender.send('runRequisitionReply', report)
            })
            .catch(err => {
               console.log(`Error running requisition: ${err}`);
            });

    });

    installExtension(VUEJS_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

    window.webContents.openDevTools({mode: 'bottom'});

});
