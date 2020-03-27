import https from 'https';
import {IdCreator} from '@/components/id-creator';

//TODO test it
export class HttpRequest {
    public request(url: string, options: https.RequestOptions = {}, payload = ''): Promise<{ data: any; statusCode: number }> {
        const stringifiedPayload = JSON.stringify(payload);
        options.headers = {
            ...options.headers,
            'Content-Length': stringifiedPayload.length,
            'User-Agent': 'stacker-plugins' + new IdCreator().create()
        };
        return new Promise((resolve, reject) => {
            const request = https.request(url, options, (resp) => {
                let data = '';
                resp
                    .on('data', (chunk) => {
                        data += chunk;
                    })
                    .on('end', () => {
                        resolve({data, statusCode: resp.statusCode!});
                    });
            }).on('error', (err) => {
                reject(err);
            });
            request.write(stringifiedPayload);
            request.end();
        });
    }
}

