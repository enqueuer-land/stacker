const Menu = require("electron").Menu;

const DynamicModulesManager = require("enqueuer/js/plugins/dynamic-modules-manager").DynamicModulesManager;
const RequisitionRunner = require("enqueuer/js/requisition-runners/requisition-runner").RequisitionRunner;

const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
// const Menu = electron.Menu;
const Configuration = require("enqueuer/js/configurations/configuration").Configuration;
const Store = require("enqueuer/js/configurations/store").Store;
const Logger = require("enqueuer/js/loggers/logger").Logger;
const os = require("os");


let url;
if (process.env.NODE_ENV === 'DEV') {
    console.log('Running in dev mode');
    url = 'http://localhost:8090/'
} else {
    url = 'file://' + __dirname + `/../dist/index.html`;
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
        Configuration.getInstance().addPlugin('enqueuer-plugin-amqp');
        Configuration.getInstance().addPlugin('enqueuer-plugin-mqtt');
        // DynamicModulesManager.getInstance().getProtocolManager().describeProtocols();


        // const mqttSubscription = './components/stage/subscriptions/MqttSubscription.vue';
        // window.webContents.send('loadSubscriptionPlugin', {
        //         type: 'mqtt',
        //         module: () => import(mqttSubscription)
        //     },
        // );


        window.webContents.send('dirnames', __dirname, os.homedir(), process.cwd());
        if (process.env.NODE_ENV === 'DEV') {
            window.webContents.openDevTools({mode: 'bottom'});
        } else {
            process.chdir(os.homedir());
        }
        window.show();
    });

    ipcMain.on('runRequisition', (event, requisition) => {
        // Store.refreshData();
        // Logger.setLoggerLevel('debug');
        event.sender.send('runningRequisition');
        new RequisitionRunner(requisition).run()
            .then(report => {
                event.sender.send('runRequisitionReply', report)
            })
            .catch(err => {
                console.log(`Error running requisition: ${err}`);
            });

    });

    app.on('before-quit', () => {
        window.webContents.send('quit');
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
            {label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
            {label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"},
            {label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
        ]
    }];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};
