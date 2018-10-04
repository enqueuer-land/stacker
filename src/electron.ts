import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import { isNullOrUndefined } from 'util';
import {ChildProcess} from 'child_process';

const isDevMode = process.execPath.match(/[\\/]electron/);
if (isDevMode) {
    enableLiveReload();
}

let window: Electron.BrowserWindow | null;

const createWindow = async () => {
    window = new BrowserWindow({
        darkTheme: true,
        width: 1624,
        height: 1000
    });
    window.loadURL(`file://${__dirname}/index.jade`);
    if (isDevMode) {
        await installExtension(VUEJS_DEVTOOLS);
        window.webContents.openDevTools({ mode: 'bottom' });
    }

    let enqueuer: ChildProcess | null = null;
    window.on('close', () => {
        if (!isNullOrUndefined(enqueuer)) {
            try {
                console.log('killing enqueuer: ' + enqueuer.pid);
                process.kill(enqueuer.pid);
                enqueuer = null;
            } catch (err) {
                console.error(err);
            }
        }
        if (window) {
            window.webContents.send('close');
        }
        window = null;
    });

    ipcMain.on('enqueuerChild', (event: any, newEnqueuer: ChildProcess) => {
        console.log('Enqueuer pid: ' + newEnqueuer.pid);
        enqueuer = newEnqueuer;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    console.log('activate window');

    if (window === null) {
        createWindow();
    }
});
