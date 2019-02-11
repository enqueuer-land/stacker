const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
// const Menu = electron.Menu;
const Store = require("enqueuer/js/configurations/store").Store;
const Logger = require("enqueuer/js/loggers/logger").Logger;
const RequisitionRunner = require("enqueuer/js/requisition-runners/requisition-runner").RequisitionRunner;
const os = require("os");


let url;
if (process.env.NODE_ENV === 'DEV') {
    console.log('Running in dev mode');
    url = 'http://localhost:8090/'
} else {
    url ='file://'+ __dirname + `/../dist/index.html`;
}

app.on('ready', () => {
    //https://github.com/electron/electron/blob/master/docs/api/browser-window.md
    const window = new BrowserWindow({
        width: 1600,
        height: 1200,
        title: 'stacker',
        minWidth: 1400,
        minHeight: 800,
        center: true,
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/preload.js'
        },
        // titleBarStyle: 'hidden',
        // frame: false,
        show: false
    });

    window.loadURL(url);

    //Showing window gracefully
    window.once('ready-to-show', () => {
        window.webContents.send('dirnames', __dirname, os.homedir(), process.cwd());
        if (process.env.NODE_ENV === 'DEV') {
            window.webContents.openDevTools({mode: 'bottom'});
        } else {
            process.chdir(os.homedir());
        }
        window.show();
    });

    ipcMain.on('runRequisition', (event, requisition) => {
        Store.refreshData();
        Logger.setLoggerLevel('debug');
        event.sender.send('runningRequisition');
        new RequisitionRunner(requisition, null).run()
            .then(report => {
                event.sender.send('runRequisitionReply', report)
            })
            .catch(err => {
                console.log(`Error running requisition: ${err}`);
            });

    });

    createMenu(window);
});


let createMenu = function (window) {
// Create the Application's main menu
    const template = [{
        label: "Application",
        submenu: [
            {label: "Virgs", selector: "orderFrontStandardAboutPanel:"},
            {label: "About Application", selector: "orderFrontStandardAboutPanel:"},
            {type: "separator"},
            {
                label: "Quit", accelerator: "Command+Q", click: function () {
                    app.quit();
                }
            }
        ]
    }, {
        label: "Edit",
        submenu: [
            {label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:"},
            {label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
            {type: "separator"},
            {label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"},
            // {label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:", click() {window.webContents.send('clipboardCopy')}},
            // {label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:", click() {window.webContents.send('clipboardPaste')}},
            {label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
        ]
    }
    ];

    // Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};
