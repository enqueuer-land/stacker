import { spawn, ChildProcess } from 'child_process';
import { EnqueuerRunnerSpawn } from './enqueuer-runner-spawn';
import { EventEmitter } from 'events';

jest.mock('child_process');
const emitter = new EventEmitter();
describe('EnqueuerRunnerSpawn', () => {
    it('Should report error events', done => {
        spawn.mockImplementation(() => emitter);
        const runner = new EnqueuerRunnerSpawn();
        runner.start();

        runner.on('error', () => done());

        emitter.emit('error', "data");
    });

    it('Should report exit event', done => {
        spawn.mockImplementation(() => emitter);
        const runner = new EnqueuerRunnerSpawn();
        runner.start();

        runner.on('exit', () => done());

        emitter.emit('exit', "data");
    });

    it('Should fail when createServer fails', done => {
        const runner = new EnqueuerRunnerSpawn();

        spawn.mockImplementation(() => {
            throw new Error("error message");
        });
        runner.start().catch(() => done());
    });
});