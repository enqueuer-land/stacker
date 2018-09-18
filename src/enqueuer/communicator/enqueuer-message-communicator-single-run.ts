import {EnqueuerMessageCommunicator} from './enqueuer-message-communicator';
import * as fs from 'fs';
import { spawn } from 'child_process';
import * as input from "../models/inputs/requisition-model";
import * as output from "../models/outputs/requisition-model";

export class EnqueuerMessageCommunicatorSingleRun implements EnqueuerMessageCommunicator {

    private static input: string = 'conf/requisition.json';
    private static output: string = 'out/file.json';

    public publish(requisitionModel: input.RequisitionModel): Promise<output.RequisitionModel> {
        return new Promise((resolve) => {
            fs.writeFileSync(EnqueuerMessageCommunicatorSingleRun.input, JSON.stringify(requisitionModel));

            const tester = spawn('enqueuer',  ['conf/enqueuer.yml']);
            // tester.stdout.on('data', (data: string) => console.log('tester: ' + data));

            let interval = setInterval(() => {
                try {
                    let fileContent = fs.readFileSync(EnqueuerMessageCommunicatorSingleRun.output).toString();
                    clearInterval(interval);
                    resolve(JSON.parse(fileContent));
                } catch (err) {
                    //do nothing
                }
            }, 50);

        });
    }

}