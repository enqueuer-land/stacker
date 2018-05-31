import { EventEmitter } from 'events';

export abstract class EnqueuerRunner extends EventEmitter {
    public abstract start(): Promise<void>;
}