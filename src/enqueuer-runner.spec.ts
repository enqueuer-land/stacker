import {spawn} from 'child_process';
import EnqueuerRunner from '@/enqueuer-runner';

jest.mock('electron');
jest.mock('child_process');

// @ts-ignore
global.eventEmitter = {
    on: () => {/* */},
    emit: () => {/* */}
};

const onMock = jest.fn();
const sendMock = jest.fn();
const stdoutOnMock = jest.fn();
const stderrOnMock = jest.fn();
const spawnMock = jest.fn(() => {
    return {
        stdout: {on: stdoutOnMock},
        stderr: {on: stderrOnMock},
        on: onMock,
        send: sendMock
    }
});
// @ts-ignore
spawn.mockImplementation(spawnMock);

describe('EnqueuerRunner', () => {
    beforeEach(() => {
        stdoutOnMock.mockClear();
        stderrOnMock.mockClear();
        onMock.mockClear();
        spawnMock.mockClear();
    });

    it('should create enqueuer folder', () => {
        new EnqueuerRunner().run();

        expect(spawnMock).toHaveBeenCalledWith('mkdir', expect.any(Array));
    });

    it('should spawn enqueuer', () => {
        new EnqueuerRunner().run();

        expect(spawnMock).toHaveBeenNthCalledWith(2, 'enqueuer', ['-b', 'debug'], {stdio: ['pipe', 'pipe', 'pipe', 'ipc']});
    });

    it('should listen to enqueuer stdout and stderr', () => {
        new EnqueuerRunner().run();

        expect(stdoutOnMock).toHaveBeenCalledWith('data', expect.any(Function));
        expect(stderrOnMock).toHaveBeenCalledWith('data', expect.any(Function));
    });

    it('should listen to enqueuer messages', () => {
        new EnqueuerRunner().run();

        const actualSubscribedEvents = onMock.mock.calls
            .map(call => call[0]);

        expect(actualSubscribedEvents.sort()).toEqual(['disconnect', 'error', 'close', 'message'].sort());
        onMock.mock.calls
            .forEach(call => expect(call[1]).toBeInstanceOf(Function));
    });

    // it('should send message to enqueuer ', () => {
    //     new EnqueuerRunner().run();
    //     const message = {id: 'id'};
    //
    //     // @ts-ignore
    //     global.eventEmitter.emit('runEnqueuer', message);
    //
    //     expect(sendMock).toHaveBeenCalledWith({event: 'runRequisition', value: message});
    // });
    //
    // it('should get enqueuer response when iterations is undefined', done => {
    //     new EnqueuerRunner().run();
    //     const message = {id: 'id'};
    //
    //
    //     // @ts-ignore
    //     global.runEnqueuer(message)
    //         .then((response: any) => {
    //             expect(response.length).toBe(1);
    //             expect(response[0].id).toBe('id');
    //             done();
    //         });
    //
    //     const onMessageCallback = onMock.mock.calls.find(call => call[0] === 'message')[1];
    //
    //     onMessageCallback({event: 'REQUISITION_FINISHED', value: {requisition: {id: 'id'}}});
    //     onMessageCallback({event: 'REQUISITION_FINISHED', value: {requisition: {id: 'notExpectedId'}}});
    // });
    //
    // it('should get enqueuer response when iterations matching total iterations', done => {
    //     new EnqueuerRunner().run();
    //     const message = {id: 'id'};
    //
    //
    //     // @ts-ignore
    //     global.runEnqueuer(message)
    //         .then((responses: any) => {
    //             expect(responses.length).toBe(2);
    //             expect(responses[0].id).toBe('id');
    //             expect(responses[0].name).toBe('first');
    //             expect(responses[1].id).toBe('id');
    //             expect(responses[1].name).toBe('second');
    //             done();
    //         });
    //
    //     const onMessageCallback = onMock.mock.calls.find(call => call[0] === 'message')[1];
    //
    //     onMessageCallback({
    //         event: 'REQUISITION_FINISHED',
    //         value: {requisition: {id: 'id', totalIterations: 2, name: 'first'}}
    //     });
    //     onMessageCallback({
    //         event: 'REQUISITION_FINISHED',
    //         value: {requisition: {id: 'id', totalIterations: 2, name: 'second'}}
    //     });
    // });
});
