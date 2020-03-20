import {EnqueuerLogExtractor} from '@/main-process/enqueuer-log-extractor';
import LZString from 'lz-string';

jest.useFakeTimers();

describe('EnqueuerLogExtractor', () => {

    it('should send logsPerMessage', () => {
        const sendMock = jest.fn();
        const mainMessageCommunicator: any = {
            send: sendMock
        };
        const config = {logsPerMessage: 10, maxBufferSize: 20, logSendInterval: 10000};

        const enqueuerLogExtractor = new EnqueuerLogExtractor(mainMessageCommunicator, config);
        for (let i = 0; i < config.maxBufferSize; ++i) {
            enqueuerLogExtractor.addLog('message');
        }
        enqueuerLogExtractor.start();

        jest.runOnlyPendingTimers();

        expect(sendMock.mock.calls[0][0]).toBe('enqueuerLog');
        expect(LZString.decompressFromUTF16(sendMock.mock.calls[0][1]).split('\n').length).toBe(config.logsPerMessage);
    });

    it('should limit to max buffer size', () => {
        const sendMock = jest.fn();
        const mainMessageCommunicator: any = {
            send: sendMock
        };
        const config = {logsPerMessage: 10, maxBufferSize: 20, logSendInterval: 10000};

        const enqueuerLogExtractor = new EnqueuerLogExtractor(mainMessageCommunicator, config);
        for (let i = 0; i < config.maxBufferSize * 30; ++i) {
            enqueuerLogExtractor.addLog('message');
        }
        enqueuerLogExtractor.start();

        const elapsedTime = config.logSendInterval * 10;
        jest.advanceTimersByTime(elapsedTime);

        const logsSent = sendMock.mock.calls.reduce((acc, call) => acc + LZString.decompressFromUTF16(call[1]) + '\n', '');
        // expect(sendMock).toHaveBeenCalledTimes(elapsedTime / config.logSendInterval);
        expect(logsSent.split('\n').length).toBe(config.maxBufferSize + 1);
    });

    it('should not send messages when there is nothing to send', () => {
        const sendMock = jest.fn();
        const mainMessageCommunicator: any = {
            send: sendMock
        };
        const config = {logsPerMessage: 10, maxBufferSize: 20, logSendInterval: 10000};

        const enqueuerLogExtractor = new EnqueuerLogExtractor(mainMessageCommunicator, config);
        enqueuerLogExtractor.start();

        expect(sendMock).toHaveBeenCalledTimes(0);
    });

    it('should send message regularly', () => {
        const sendMock = jest.fn();
        const mainMessageCommunicator: any = {
            send: sendMock
        };
        const config = {logsPerMessage: 1, maxBufferSize: 2000, logSendInterval: 10000};

        const enqueuerLogExtractor = new EnqueuerLogExtractor(mainMessageCommunicator, config);
        for (let i = 0; i < config.maxBufferSize; ++i) {
            enqueuerLogExtractor.addLog('message');
        }
        enqueuerLogExtractor.start();

        const elapsedTime = config.logSendInterval * 10;
        jest.advanceTimersByTime(elapsedTime);

        expect(sendMock).toHaveBeenCalledTimes(elapsedTime / config.logSendInterval);
    });

    it('should have constructor with no config', () => {
        expect(new EnqueuerLogExtractor({} as any)).toBeDefined();
    });

});
