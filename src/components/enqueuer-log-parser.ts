import {IdCreator} from '@/components/id-creator';

type Logs = {
    timestamp: string;
    level: string;
    message: string;
    id: string;
};

//TODO test it
export class EnqueuerLogParser {

    private readonly logs: Logs[] = [];
    private readonly regExp = /\[([^\]]*)\] \[([^\]]*)\] - (.*)/;

    public getLogs(): Logs[] {
        return this.logs;
    }

    public addLogs(rawLog: string): void {
        const splitted = rawLog.split(this.regExp);
        splitted.shift();
        const timestamp = new Date(splitted.shift() as string);
        const log = {
            id: new IdCreator().create(),
            timestamp: this.formatDate(timestamp),
            level: splitted.shift() as string,
            message: splitted.shift() as string
        };
        this.logs.push(log);
        if (splitted.length > 0) {
            const remaining = splitted.shift() as string;
            try {
                if (!isNaN(new Date(remaining).getHours())) {
                    return this.addLogs(remaining.concat(splitted.join('')));
                }
            } catch (e) {
                /* */
            }
            log.message = log.message.concat(remaining);
        }
    }


    private formatDate(timestamp: Date) {
        return `${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}:${timestamp
            .getSeconds().toString().padStart(2, '0')}.${timestamp.getMilliseconds().toString().padStart(3, '0')}`;
    }
}
