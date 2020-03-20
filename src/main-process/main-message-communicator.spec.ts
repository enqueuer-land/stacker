import {MainMessageCommunicator} from "@/main-process/main-message-communicator";

describe('MainMessageCommunicator', () => {
    it('should not send if window is destroyed', () => {
        const sendMock = jest.fn();
        const window = {
            isDestroyed: () => true,
            webContents: {
                send: sendMock
            }
        };

        new MainMessageCommunicator(window as any).send('event', {a: 'b'});

        expect(sendMock).not.toHaveBeenCalled();
    });

    it('should send if window is not destroyed', () => {
        const sendMock = jest.fn();
        const window = {
            isDestroyed: () => false,
            webContents: {
                send: sendMock
            }
        };

        new MainMessageCommunicator(window as any).send('event', {a: 'b'});

        expect(sendMock).toHaveBeenCalledWith('event', {a: 'b'});
    });

    it('should send specific event when sending log', () => {
        const sendMock = jest.fn();
        const window = {
            isDestroyed: () => false,
            webContents: {
                send: sendMock
            }
        };

        new MainMessageCommunicator(window as any).addLog('message', 'INFO');

        expect(sendMock).toHaveBeenCalledWith('addLog', {level: 'INFO', message: 'message'});
    });
});
