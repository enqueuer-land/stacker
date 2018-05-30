import { EventEmitter } from 'events';
import { RunnableModel } from './models/inputs/runnable-model';

export abstract class EnqueuerMessageSender extends EventEmitter {
    public abstract publish(runnableModel: RunnableModel): Promise<void>;
}