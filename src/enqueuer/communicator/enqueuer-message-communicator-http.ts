import {EnqueuerMessageCommunicator} from './enqueuer-message-communicator';
import * as request from 'request';
import * as input from '../models/inputs/requisition-model';
import * as output from '../models/outputs/requisition-model';

export class EnqueuerMessageCommunicatorHttp implements EnqueuerMessageCommunicator {

    private readonly url: string;
    private readonly method: string;
    private body: any;
    private timeout: number;

    public constructor() {
        this.url = 'http://localhost:23023/requisitions';
        this.method = 'post';
        this.body = '';
    }

    public publish(requisitionModel: input.RequisitionModel): Promise<output.RequisitionModel> {
        this.body = requisitionModel;
        return new Promise((resolve, reject) => {
            console.log(`Hitting enqueuer (${this.method.toUpperCase()}) - ${this.url}`);
            const options = this.createOptions();
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            request(options,
                (error: any, response: any) => {
                    if (error) {
                        reject('Http request error: ' + error);
                    } else {
                        console.log(`Enqueuer response: ${response.body.substr(0, 100)}`);
                        const body = JSON.parse(response.body);
                        resolve(body);
                    }
                });
        });
    }

    private createOptions() {
        let options: any = {
            url: this.url,
            method: this.method,
            timeout: this.timeout,
            headers: {}
        };
        options.data = options.body = this.handleObjectPayload();
        if (this.method.toUpperCase() != 'GET') {
            options.headers['Content-Length'] = options.headers['Content-Length'] || this.setContentLength(options.data);
        }
        return options;
    }

    private setContentLength(value: string): number {
        if (Buffer.isBuffer(value)) {
            return value.length;
        } else {
            return Buffer.from(value, 'utf8').byteLength;
        }
    }

    private handleObjectPayload(): string | undefined {
        if (this.method.toUpperCase() == 'GET') {
            return undefined;
        }
        try {
            JSON.parse(this.body);
            return this.body;
        }
        catch (exc) {
            //do nothing
        }
        if (typeof(this.body) != 'string') {
            this.body = JSON.stringify(this.body);
        }

        return this.body;
    }

}
