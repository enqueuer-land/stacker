import {IdCreator} from '@/components/id-creator';

type Log = {
    timestamp: string;
    level: string;
    priority: number;
    message: string;
    id: string;
};

const logLevel = [
    'DEBUG',
    'INFO',
    'WARN',
    'ERROR',
    'FATAL',
    'STDOUT',
];

export class EnqueuerLogParser {
    private readonly enqueuerLogRegex = / (\[[^\]]*\]) - (.*)/;
    private readonly bufferSize: number;

    private logs: Log[] = [];
    private priorityFilter: number;

    constructor(bufferSize = 50, priorityFilter = 'DEBUG') {
        this.bufferSize = bufferSize;
        this.priorityFilter = Math.max(logLevel.findIndex(item => item === priorityFilter), 0);
    }

    public getLogs(): Log[] {
        return this.logs
            .filter(log => log.priority >= this.priorityFilter);
    }

    public increasePriorityFilter(): EnqueuerLogParser {
        this.priorityFilter = Math.min(this.priorityFilter + 1, logLevel.length - 1);
        return this;
    }

    public decreasePriorityFilter(): EnqueuerLogParser {
        this.priorityFilter = Math.max(this.priorityFilter - 1, 0);
        return this;
    }

    public getPriorityFilterName(): string {
        return logLevel[this.priorityFilter];
    }

    public clearBuffer(): void {
        this.logs.splice(0, this.logs.length);
    }

    public static generateLog(message: string, level: string): Log {
        return {
            id: new IdCreator().create(),
            timestamp: EnqueuerLogParser.formatDate(new Date()),
            level: level.toUpperCase(),
            priority: logLevel.findIndex(item => item === level.toUpperCase()),
            message
        }
    }

    public addParsedLogs(parsed: Log): void {
        this.addLogToBuffer(parsed);
    }

    public addLogs(rawLogs: string): void {
        rawLogs.split('\n')
            .forEach(rawLog => {
                const splitted = rawLog.split(this.enqueuerLogRegex);
                const firstElement = splitted.shift() as string;
                if (splitted.length <= 0) {
                    if (firstElement && firstElement != '') {
                        this.addLogToBuffer(EnqueuerLogParser.generateLog(firstElement, 'STDOUT'));
                    }
                    return;
                }
                const timestamp = new Date(firstElement.substr(1, firstElement.length - 2));
                const squareLevel = splitted.shift() as string;
                const level = squareLevel.substr(1, squareLevel.length - 2).toUpperCase();
                const structuredLog: Log = {
                    id: new IdCreator().create(),
                    timestamp: EnqueuerLogParser.formatDate(timestamp),
                    level,
                    priority: logLevel.findIndex(item => item.toUpperCase() === level.toUpperCase()),
                    message: splitted.shift() as string
                };
                this.addLogToBuffer(structuredLog);
            });

    }

    private addLogToBuffer(parsed: Log): void {
        this.logs.push(parsed);
        this.logs = this.logs
            .filter((log, index, vec) => index >= vec.length - this.bufferSize);
    }

    private static formatDate(timestamp: Date): string {
        return `${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}:${timestamp
            .getSeconds().toString().padStart(2, '0')}.${timestamp.getMilliseconds().toString().padStart(3, '0')}`;
    }
}
