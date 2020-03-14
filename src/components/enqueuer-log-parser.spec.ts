import {EnqueuerLogParser} from '@/components/enqueuer-log-parser';

describe('EnqueuerLogParser', () => {
    it('should generate log', () => {
        const generateLog = EnqueuerLogParser.generateLog('message', 'level');

        expect(generateLog.id).toBeDefined();
        expect(generateLog.level).toBe('level'.toUpperCase());
        expect(generateLog.priority).toBe(-1);
        expect(generateLog.message).toBe('message');
        expect(generateLog.timestamp).toMatch(/\d\d:\d\d:\d\d.\d\d\d/);
    });

    it('should add parsed logs', () => {
        const enqueuerLogParser = new EnqueuerLogParser();
        enqueuerLogParser.addParsedLogs(EnqueuerLogParser.generateLog('message', 'TRACE'));

        const logs = enqueuerLogParser.getLogs();

        expect(logs.length).toBe(1);
        expect(logs[0].id).toBeDefined();
        expect(logs[0].level).toBe('TRACE');
        expect(logs[0].message).toBe('message');
        expect(logs[0].timestamp).toBeDefined();
    });

    it('should add logs', () => {
        const enqueuerLogParser = new EnqueuerLogParser();
        enqueuerLogParser.addLogs(`[2020-03-08T16:35:32.901Z] [INFO] - Rocking and rolling`);

        const logs = enqueuerLogParser.getLogs();

        expect(logs.length).toBe(1);
        expect(logs[0].id).toBeDefined();
        expect(logs[0].priority).toBe(2);
        expect(logs[0].level).toBe('INFO');
        expect(logs[0].message).toBe('Rocking and rolling');
        expect(logs[0].timestamp).toMatch('13:35:32.901');
    });

    it('should be able to add two logs at the same time', () => {
        const enqueuerLogParser = new EnqueuerLogParser();
        enqueuerLogParser.addLogs(`[2020-03-08T16:35:32.901Z] [TRACE] - message1\n[2020-03-08T16:35:32.901Z] [WARN] - message2`);

        const logs = enqueuerLogParser.getLogs();

        expect(logs.length).toBe(2);
        expect(logs[0].id).toBeDefined();
        expect(logs[0].priority).toBe(0);
        expect(logs[0].level).toBe('TRACE');
        expect(logs[0].message).toBe('message1');
        expect(logs[0].timestamp).toBeDefined();
        expect(logs[1].id).toBeDefined();
        expect(logs[1].priority).toBe(3);
        expect(logs[1].level).toBe('WARN');
        expect(logs[1].message).toBe('message2');
        expect(logs[1].timestamp).toBeDefined();
    });

    it('should limit log buffer', () => {
        const bufferSize = 50;
        const enqueuerLogParser = new EnqueuerLogParser(bufferSize);
        for (let i = 0; i < bufferSize + 1; ++i) {
            enqueuerLogParser.addParsedLogs(EnqueuerLogParser.generateLog('message', 'TRACE'));
        }

        const logs = enqueuerLogParser.getLogs();

        expect(logs.length).toBe(bufferSize);
    });

    it('should clear buffer', () => {
        const bufferSize = 10;
        const enqueuerLogParser = new EnqueuerLogParser(bufferSize);
        for (let i = 0; i < bufferSize; ++i) {
            enqueuerLogParser.addParsedLogs(EnqueuerLogParser.generateLog('message', 'TRACE'));
        }
        expect(enqueuerLogParser.getLogs().length).toBe(bufferSize);

        enqueuerLogParser.clearBuffer();

        expect(enqueuerLogParser.getLogs().length).toBe(0);
    });

    it('should add raw stdout', () => {
        const enqueuerLogParser = new EnqueuerLogParser();
        enqueuerLogParser.addLogs(`Rocking and rolling`);

        const logs = enqueuerLogParser.getLogs();

        expect(logs.length).toBe(1);
        expect(logs[0].id).toBeDefined();
        expect(logs[0].priority).toBe(6);
        expect(logs[0].level).toBe('STDOUT');
        expect(logs[0].message).toBe('Rocking and rolling');
        expect(logs[0].timestamp).toBeDefined();
    });

    it('should filter logs', () => {
        const enqueuerLogParser = new EnqueuerLogParser();

        enqueuerLogParser.addParsedLogs(EnqueuerLogParser.generateLog('message1', 'warn'));
        enqueuerLogParser.addParsedLogs(EnqueuerLogParser.generateLog('message2', 'trace'));
        enqueuerLogParser.addParsedLogs(EnqueuerLogParser.generateLog('message3', 'debug'));
        enqueuerLogParser.addParsedLogs(EnqueuerLogParser.generateLog('message4', 'fatal'));
        enqueuerLogParser.addParsedLogs(EnqueuerLogParser.generateLog('message5', 'info'));
        enqueuerLogParser.addParsedLogs(EnqueuerLogParser.generateLog('message6', 'stdout'));
        enqueuerLogParser.addParsedLogs(EnqueuerLogParser.generateLog('message7', 'error'));

        expect(enqueuerLogParser.getLogs().length).toBe(7);
        enqueuerLogParser.increasePriorityFilter();
        expect(enqueuerLogParser.getLogs().length).toBe(6);
        enqueuerLogParser.increasePriorityFilter();
        expect(enqueuerLogParser.getLogs().length).toBe(5);
        enqueuerLogParser.increasePriorityFilter();
        expect(enqueuerLogParser.getLogs().length).toBe(4);
        enqueuerLogParser.increasePriorityFilter();
        expect(enqueuerLogParser.getLogs().length).toBe(3);
        enqueuerLogParser.increasePriorityFilter();
        expect(enqueuerLogParser.getLogs().length).toBe(2);
        enqueuerLogParser.increasePriorityFilter();
        expect(enqueuerLogParser.getLogs().length).toBe(1);
    });

    it('should increase log priority', () => {
        const enqueuerLogParser = new EnqueuerLogParser();

        expect(enqueuerLogParser.getPriorityFilterName()).toBe('TRACE');
        expect(enqueuerLogParser.increasePriorityFilter().getPriorityFilterName()).toBe('DEBUG');
        expect(enqueuerLogParser.increasePriorityFilter().getPriorityFilterName()).toBe('INFO');
        expect(enqueuerLogParser.increasePriorityFilter().getPriorityFilterName()).toBe('WARN');
        expect(enqueuerLogParser.increasePriorityFilter().getPriorityFilterName()).toBe('ERROR');
        expect(enqueuerLogParser.increasePriorityFilter().getPriorityFilterName()).toBe('FATAL');
        expect(enqueuerLogParser.increasePriorityFilter().getPriorityFilterName()).toBe('STDOUT');

        expect(enqueuerLogParser.increasePriorityFilter().getPriorityFilterName()).toBe('STDOUT');
        expect(enqueuerLogParser.increasePriorityFilter().getPriorityFilterName()).toBe('STDOUT');
    });

    it('should decrease log priority', () => {
        const enqueuerLogParser = new EnqueuerLogParser(50, 'STDOUT');

        expect(enqueuerLogParser.getPriorityFilterName()).toBe('STDOUT');
        expect(enqueuerLogParser.decreasePriorityFilter().getPriorityFilterName()).toBe('FATAL');
        expect(enqueuerLogParser.decreasePriorityFilter().getPriorityFilterName()).toBe('ERROR');
        expect(enqueuerLogParser.decreasePriorityFilter().getPriorityFilterName()).toBe('WARN');
        expect(enqueuerLogParser.decreasePriorityFilter().getPriorityFilterName()).toBe('INFO');
        expect(enqueuerLogParser.decreasePriorityFilter().getPriorityFilterName()).toBe('DEBUG');
        expect(enqueuerLogParser.decreasePriorityFilter().getPriorityFilterName()).toBe('TRACE');

        expect(enqueuerLogParser.decreasePriorityFilter().getPriorityFilterName()).toBe('TRACE');
        expect(enqueuerLogParser.decreasePriorityFilter().getPriorityFilterName()).toBe('TRACE');
    });

});
