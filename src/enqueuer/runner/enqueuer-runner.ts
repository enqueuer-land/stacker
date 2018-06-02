import { EventEmitter } from 'events';

export abstract class EnqueuerRunner extends EventEmitter {
    public async abstract start(): Promise<void>;
}