import {IdCreator} from '@/components/id-creator';

type Log = {
    timestamp: string;
    level: string;
    message: string;
    id: string;
};

export class EnqueuerLogParser {

    private readonly logs: Log[] = [];
    private readonly regExp = /(\[[^\]]*\]).*(\[[^\]]*\]) - (.*)/;

    public getLogs(): Log[] {
        return this.logs;
    }

    public static generateLog(message: string, level: string): Log {
        return {
            id: new IdCreator().create(),
            timestamp: EnqueuerLogParser.formatDate(new Date()),
            level: level.toUpperCase(),
            message
        }
    }

    public addParsedLogs(parsed: Log) {
        this.logs.push(parsed)
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
                const level = splitted.shift() as string;
                const log: Log = {
                    id: new IdCreator().create(),
                    timestamp: EnqueuerLogParser.formatDate(timestamp),
                    level: level.substr(1, level.length - 2).toUpperCase(),
                    message: splitted.shift() as string
                };
                this.logs.push(log);
            });
    }

    private static formatDate(timestamp: Date) {
        return `${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}:${timestamp
            .getSeconds().toString().padStart(2, '0')}.${timestamp.getMilliseconds().toString().padStart(3, '0')}`;
    }
}
