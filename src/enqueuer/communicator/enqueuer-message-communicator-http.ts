import {EnqueuerMessageCommunicator} from './enqueuer-message-communicator';
import request from 'request';
import * as input from "../models/inputs/requisition-model";
import * as output from "../models/outputs/requisition-model";

export class EnqueuerMessageCommunicatorHttp implements EnqueuerMessageCommunicator {

    private url: string;
    private method: string;
    private headers: any;
    private body: any;
    private timeout: number;
    private response: any;

    public constructor() {
        this.url = 'http://localhost:23023';
        this.method = 'POST';
        this.headers = {};
        this.body = '';
    }

    public publish(requisitionModel: input.RequisitionModel): Promise<output.RequisitionModel> {
        return new Promise((resolve, reject) => {
            console.log(`Hitting (${this.method.toUpperCase()}) - ${this.url}`);
            const options = this.createOptions();
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            request(options,
                (error: any, response: any) => {
                    if (error) {
                        reject('Http request error: ' + error);
                    } else {
                        this.response = response;
                        resolve(this.response);
                    }
                });
        });
    }

    private createOptions() {
        let options: any = {
            url: this.url,
            method: this.method,
            timeout: this.timeout,
            headers: this.headers
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