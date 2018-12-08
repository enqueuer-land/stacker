
const {default: installExtension, VUEJS_DEVTOOLS} = require('electron-devtools-installer');
const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const Store = require("enqueuer/js/configurations/store").Store;
const RequisitionRunner = require("enqueuer/js/requisition-runners/requisition-runner").RequisitionRunner;
require('enqueuer/js/injectable-files-list');
require('electron-debug')();

console.log('It\'s alive');

let url;
if (process.env.NODE_ENV === 'DEV') {
    console.log('Running in dev mode');
    url = 'http://localhost:8090/'
} else {
    url = `file://${process.cwd()}/dist/index.html`
}

app.on('ready', () => {
    //https://github.com/electron/electron/blob/master/docs/api/browser-window.md
    let window = new BrowserWindow({
        width: 1600,
        height: 1200,
        title: 'Stacker',
        // minWidth: 800,
        // minHeight: 600,
        // resizable: true,
        center: true,
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/preload.js'
        },
        // titleBarStyle: 'hidden',
        frame: false,
        show: false,
        icon: __dirname + '/src/assets/symbol1.png'
    });
    window.loadURL(url);

    //Showing window gracefully
    window.once('ready-to-show', () => {
        window.show()
    });

    ipcMain.on('runRequisition', (event, requisition) => {
        Store.refreshData();
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
    // window.webContents.on("devtools-opened", () => {
    //     window.webContents.closeDevTools();
    // });
});
