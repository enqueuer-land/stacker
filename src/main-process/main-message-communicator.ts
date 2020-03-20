import {BrowserWindow, ipcMain} from 'electron';

//TODO test it
export class MainMessageCommunicator {
    private readonly window: BrowserWindow;

    public constructor(window: BrowserWindow) {
        this.window = window;
    }

    public on(event: string, listener: (...args: any[]) => void) {
        ipcMain.on(event, (_, data: any) => listener(data));
    }

    public send(event: string, ...args: any[]) {
        this.window.webContents.send(event, ...args)
    }

    public addLog(message: string, level: 'DEBUG' | 'INFO' | 'ERROR') {
        if (!this.window.isDestroyed()) {
            this.send('addLog', {message, level});
        }
    }


}
