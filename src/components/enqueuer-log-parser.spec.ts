import {EnqueuerLogParser} from "@/components/enqueuer-log-parser";

describe('EnqueuerLogParser', () => {
    it('should generate log', () => {
        const generateLog = EnqueuerLogParser.generateLog('message', 'level');

        expect(generateLog.id).toBeDefined();
        expect(generateLog.level).toBe('level'.toUpperCase());
        expect(generateLog.message).toBe('message');
        expect(generateLog.timestamp).toMatch(/\d\d:\d\d:\d\d.\d\d\d/);
    });

    it('should add parsed logs', () => {
        const enqueuerLogParser = new EnqueuerLogParser();
        enqueuerLogParser.addParsedLogs(EnqueuerLogParser.generateLog('message', 'level'));

        const logs = enqueuerLogParser.getLogs();

        expect(logs.length).toBe(1);
        expect(logs[0].id).toBeDefined();
        expect(logs[0].level).toBe('LEVEL');
        expect(logs[0].message).toBe('message');
        expect(logs[0].timestamp).toBeDefined();
    });

    it('should add logs', () => {
        const enqueuerLogParser = new EnqueuerLogParser();
        enqueuerLogParser.addLogs(`[2020-03-08T16:35:32.901Z] [INFO] - Rocking and rolling`);

        const logs = enqueuerLogParser.getLogs();

        expect(logs.length).toBe(1);
        expect(logs[0].id).toBeDefined();
        expect(logs[0].level).toBe('INFO');
        expect(logs[0].message).toBe('Rocking and rolling');
        expect(logs[0].timestamp).toMatch('13:35:32.901');
    });

    it('should be able to add two logs at the same time', () => {
        const enqueuerLogParser = new EnqueuerLogParser();
        enqueuerLogParser.addLogs(`[2020-03-08T16:35:32.901Z] [INFO] - message1\n[2020-03-08T16:35:32.901Z] [level] - message2`);

        const logs = enqueuerLogParser.getLogs();

        expect(logs.length).toBe(2);
        expect(logs[0].id).toBeDefined();
        expect(logs[0].level).toBe('INFO');
        expect(logs[0].message).toBe('message1');
        expect(logs[0].timestamp).toBeDefined();
        expect(logs[1].id).toBeDefined();
        expect(logs[1].level).toBe('LEVEL');
        expect(logs[1].message).toBe('message2');
        expect(logs[1].timestamp).toBeDefined();
    });

    it('should limit log buffer', () => {
        const bufferSize = 50;
        const enqueuerLogParser = new EnqueuerLogParser(bufferSize);
        for (let i = 0; i < bufferSize + 1; ++i) {
            enqueuerLogParser.addParsedLogs(EnqueuerLogParser.generateLog('message', 'level'));
        }

        const logs = enqueuerLogParser.getLogs();

        expect(logs.length).toBe(bufferSize);
    });
});
