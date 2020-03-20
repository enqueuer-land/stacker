import {BrowserWindow, ipcMain} from 'electron';

export class MainMessageCommunicator {
    private readonly window: BrowserWindow;

    public constructor(window: BrowserWindow) {
        this.window = window;
    }

    public on(event: string, listener: (...args: any[]) => void) {
        ipcMain.on(event, (_, data: any) => listener(data));
    }

    public send(event: string, ...args: any[]) {
        if (!this.window.isDestroyed()) {
            this.window.webContents.send(event, ...args)
        }
    }

    public addLog(message: string, level: 'DEBUG' | 'INFO' | 'ERROR') {
        this.send('addLog', {message, level});
    }

}
