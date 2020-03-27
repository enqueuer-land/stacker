import https from 'https';

//TODO test it
export class HttpRequest {
    public request(url: string, options: https.RequestOptions = {}, payload = '') {
        const stringifiedPayload = JSON.stringify(payload);
        options.headers = {
            ...options.headers,
            'Content-Length': stringifiedPayload.length
        };
        return new Promise((resolve, reject) => {
            const request = https.request(url, options, (resp) => {
                let data = '';
                resp
                    .on('data', (chunk) => {
                        data += chunk;
                    })
                    .on('end', () => {
                        resolve({data, statusCode: resp.statusCode});
                    });
            }).on("error", (err) => {
                reject(err);
            });
            request.write(stringifiedPayload);
            request.end();
        });
    }
}

