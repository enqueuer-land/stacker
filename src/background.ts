'use strict';

import {app, protocol, BrowserWindow, ipcMain} from 'electron'
import {
    createProtocol,
    /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
// import {InputRequisitionModel, OutputRequisitionModel} from "enqueuer";

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: {secure: true, standard: true}}]);


import * as path from "path";
import * as shell from "child_process";

try {
    // const ls = shell.spawn("ls", {
        const ls = shell.spawn("node_modules/.bin/enqueuer-daemon", {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    });


// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
//     ls.stdout.on("data", data => {
//         console.log(`stdout: ${data}`);
//     });


// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    ls.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });


    ls.on('message', message => {
        console.log('message from child:', message);
        ls.send('Hi');
    });

    ls.send({foo: 5});
    ls.send({exit: 'true'});

} catch (e) {
    // console.log(e)
}

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            // contextIsolation: true, // protect against prototype pollution
            // enableRemoteModule: false, // turn off remote
            // preload: 'preload' // use a preload script
            // preload: __dirname + "/enqueuer.js" // use a preload script
            preload: "./node_modules/.bin/enqueuer-daemon" // use a preload script
            // preload: "enqueuer-daemon" // use a preload script
        }
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }

    win.on('closed', () => {
        win = null
    })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

import * as http from 'http';
import {OutputRequisitionModel} from "enqueuer";

async function httpRequest(url: string, options: any, stringifiedPayload: string) {
    return new Promise((resolve, reject) => {
        const request = http
            .request(url, options, (resp) => {
                let data = '';
                resp
                    .on('data', (chunk) => {
                        data += chunk;
                    })
                    .on('end', () => {
                        resolve({data, statusCode: resp.statusCode});
                    });
            }).on("error", (err) => {
                reject(err);
            });
        request.write(stringifiedPayload);
        request.end();
    });
}

async function runNqr(args: any) {
    const req = JSON.stringify(args);
    const response: any = await httpRequest('http://localhost:3000/requisitions', {
        method: 'POST',
    }, req);
    const requisitionResponse: OutputRequisitionModel[] = JSON.parse(response.data);
    console.log(requisitionResponse[0].valid);
    return requisitionResponse;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
global.runEnqueuer = async (requisition: any) => await runNqr(requisition);

ipcMain.on('runRequisition', async (event, args) => {
    const response = await runNqr(args);
    event.reply('runRequisitionReply', response);
});

app.on('activate', async () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

import * as fs from 'fs';

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // Devtools extensions are broken in Electron 6.0.0 and greater
        // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
        // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
        // If you are not using Windows 10 dark mode, you may uncomment these lines
        // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
        // try {
        //   await installVueDevtools()
        // } catch (e) {
        //   console.error('Vue Devtools failed to install:', e.toString())
        // }

    }
    createWindow();

    // setTimeout(async () => await runNqr(), 1000);
    setTimeout(async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        // global.welcome = fs.readFileSync(`/Users/guilherme.moraes/Dev/carabin/welcome.js`).toString();
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        global.external = (await import('/Users/guilherme.moraes/Dev/carabina/external.js') as any) as any;
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        global.fs = fs;

        // in main process
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        // global.loadedPlugins = requireFromString(welcome).welcome;
        // global.loadedPlugins = (await import('/Users/guilherme.moraes/Dev/carabin/welcome.js') as any).welcome as any;
        // global.loadedPlugins = ((await import('/Users/guilherme.moraes/Dev/carabin/list-item.js')) as any).welcome;
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore

        win!.webContents.send('ping')
    }, 1000);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
