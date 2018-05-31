import { RunnableModel } from '../models/inputs/runnable-model';

export interface EnqueuerMessageSender {
    publish(runnableModel: RunnableModel): Promise<void>;
}