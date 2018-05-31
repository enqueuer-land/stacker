import { EnqueuerRunner } from './enqueuer-runner';

export class EnqueuerRunnerMock extends EnqueuerRunner {

    public async start(): Promise<void> {
        console.log('Mocking enqueuer start');
    }

}