import { EnqueuerMessageCommunicator } from './enqueuer-message-communicator';
import {RequisitionModel} from '../models/outputs/requisition-model';

export class EnqueuerMessageCommunicatorMock implements EnqueuerMessageCommunicator {
    public publish(): Promise<void> {
        return Promise.resolve();
    }
}