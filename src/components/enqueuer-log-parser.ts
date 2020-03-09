import {IdCreator} from '@/components/id-creator';

type Log = {
    timestamp: string;
    level: string;
    priority: number;
    message: string;
    id: string;
};

const logLevel = [
    'TRACE',
    'DEBUG',
    'INFO',
    'WARN',
    'ERROR',
    'FATAL'
];

export class EnqueuerLogParser {
    private readonly regExp = /(\[[^\]]*\]).*(\[[^\]]*\]) - (.*)/;

    private bufferSize: number;

    private logs: Log[] = [];

    private priorityFilter = -1;

    constructor(bufferSize = 50) {
        this.bufferSize = bufferSize;
    }

    public getLogs(): Log[] {
        return this.logs.filter(log => log.priority >= this.priorityFilter);
    }

    public setPriorityFilter(level: string): EnqueuerLogParser {
        this.priorityFilter = logLevel.findIndex(item => item === level.toUpperCase());
        return this;
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

    public addParsedLogs(parsed: Log) {
        this.addLogToBuffer(parsed);
    }

    public addLogs(rawLog: string): void {
        rawLog
            .split(/\n/)
            .forEach(line => {
                const splitted = line.split(this.regExp);
                splitted.shift();
                if (splitted.length <= 0) {
                    return;
                }
                const date = splitted.shift() as string;
                const timestamp = new Date(date.substr(1, date.length - 2));
                const squareLevel = splitted.shift() as string;
                const level = squareLevel.substr(1, squareLevel.length - 2).toUpperCase();
                const log: Log = {
                    id: new IdCreator().create(),
                    timestamp: EnqueuerLogParser.formatDate(timestamp),
                    level,
                    priority: logLevel.findIndex(item => item.toUpperCase() === level.toUpperCase()),
                    message: splitted.shift() as string
                };
                this.addLogToBuffer(log);
            });
    }

    private addLogToBuffer(parsed: Log) {
        this.logs.push(parsed);
        this.logs = this.logs
            .filter((log, index) => index >= this.logs.length - 50);
    }

    private static formatDate(timestamp: Date) {
        return `${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}:${timestamp
            .getSeconds().toString().padStart(2, '0')}.${timestamp.getMilliseconds().toString().padStart(3, '0')}`;
    }
}
