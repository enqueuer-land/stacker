import {ipcRenderer} from 'electron';
import IpcRendererEvent = Electron.IpcRendererEvent;

export class RendererMessageSender {
    public static on(event: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) {
        ipcRenderer.on(event, listener);
    }

    public static emit(event: string, ...args: any[]) {
        ipcRenderer.send(event, ...args);
    }

}
