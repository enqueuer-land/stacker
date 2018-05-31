import { EnqueuerMessageSender } from './enqueuer-message-sender';

export class EnqueuerMessageSenderMock implements EnqueuerMessageSender {

    public async publish(): Promise<void> {
        return Promise.resolve();
    }

}