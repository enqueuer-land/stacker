import * as input from '../models/inputs/requisition-model';
import * as output from '../models/outputs/requisition-model';

export interface EnqueuerMessageCommunicator {
    publish(runnableModel: input.RequisitionModel): Promise<output.RequisitionModel>;
}