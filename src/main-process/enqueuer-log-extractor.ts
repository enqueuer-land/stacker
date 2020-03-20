import LZString from 'lz-string';
import {MainMessageCommunicator} from '@/main-process/main-message-communicator';

export type Configurations = {
    logsPerMessage: number;
    maxBufferSize: number;
    logSendInterval: number;
};

export class EnqueuerLogExtractor {
    private readonly logBuffer: string[];
    private readonly config: Configurations;
    private readonly mainMessageCommunicator: MainMessageCommunicator;

    private interval?: NodeJS.Timeout;

    constructor(mainMessageCommunicator: MainMessageCommunicator, config: Configurations = {
        logsPerMessage: 20, logSendInterval: 100, maxBufferSize: 200
    }) {
        this.config = config;
        this.mainMessageCommunicator = mainMessageCommunicator;
        this.logBuffer = [];
    }

    public start(): void {
        this.interval = setInterval(() => {
            if (this.logBuffer.length > 0) {
                const logs = this.logBuffer.filter((_, index) => index < this.config.logsPerMessage).join('\n');
                const compressed = LZString.compressToUTF16(logs);
                // console.log(compressed.length / 1024);
                this.mainMessageCommunicator.send('enqueuerLog', compressed);

                this.logBuffer.splice(0, this.config.logsPerMessage);
            }
        }, this.config.logSendInterval);
    }

    public addLog(log: string): void {
        this.logBuffer.push(log);
        const overLimitLogs = this.logBuffer.length - this.config.maxBufferSize;
        if (overLimitLogs > 0) {
            // console.log(`Discarding: ` + this.logBuffer.filter((_, index) => index <= overLimitLogs).join('\n').length / 1024);
            this.logBuffer.splice(0, overLimitLogs);
        }

    }
}
