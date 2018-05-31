import { EnqueuerMessageSenderUds } from "./enqueuer-message-sender-uds";
import * as net from 'net';
import { EventEmitter } from "events";

class UdsEmitter extends EventEmitter {
    writeReturn: boolean;
    constructor(writeReturn: boolean = false) {
        super();
        this.writeReturn = writeReturn;
    }
    write(payload: string) { return this.writeReturn; };
}
let emitter = new UdsEmitter();

jest.mock('net');
describe('EnqueuerMessageSenderUds', () => {
    it('Should reject when connection creation fails', done => {
        net.createConnection.mockImplementation(() => { throw new Error("Exception"); });
        const sender = new EnqueuerMessageSenderUds();
        sender.publish().catch(() => done());
    });

    it('Should reject when connection emits error', done => {
        net.createConnection.mockImplementation(() => emitter);
        const sender = new EnqueuerMessageSenderUds();
        sender.publish().catch(() => done());

        emitter.emit('error', "bla");
    });

    it('Should reject when fails to send message', done => {

        net.createConnection.mockImplementation(() => emitter);

        const sender = new EnqueuerMessageSenderUds();
        sender.publish().catch(() => done());

        emitter.emit('connect');
    });

    it('Should aprrove if a happy path happens', done => {
        emitter = new UdsEmitter(true);
        net.createConnection.mockImplementation(() => emitter);

        const sender = new EnqueuerMessageSenderUds();
        sender.publish().then(() => done());

        emitter.emit('connect');
    });
});