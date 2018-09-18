import { EnqueuerMessageCommunicator } from './enqueuer-message-communicator';
import * as net from 'net';
import * as input from "../models/inputs/requisition-model";
import * as output from "../models/outputs/requisition-model";

export class EnqueuerMessageCommunicatorUds implements EnqueuerMessageCommunicator {
    public static readonly path: string = '/tmp/in.sock';

    private client: any;
    private response: any;

    public constructor() {
        this.client = net.createConnection(EnqueuerMessageCommunicatorUds.path);
    }

    public publish(requisitionModel: input.RequisitionModel): Promise<output.RequisitionModel> {
        return new Promise((resolve, reject) => {
            this.client.on('connect', () => {
                if (!this.client.write(JSON.stringify(requisitionModel))) {
                    reject("Error publishing message to uds server");
                }
            })
            .on('error', (data: any) => {
                reject(data);
            })
            .on('data', (data: any) => {
                console.log(`Uds got data`);
                this.response += data;
            })
            .on('end', () => {
                console.log(`Uds got end`);
                    resolve(JSON.parse(this.response));
            })
        });
    }


}