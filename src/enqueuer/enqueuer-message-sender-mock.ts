import { EnqueuerMessageSender } from './enqueuer-message-sender';

export class EnqueuerMessageSenderMock extends EnqueuerMessageSender {

    public constructor() {
        super();
    }

    public async publish(): Promise<void> {
        return Promise.resolve();
    }

}