import * as postman from './postman-types';
import {PostmanEventExtractor} from './postman-event-extractor';
import {Event, InputPublisherModel, InputRequisitionModel, InputSubscriptionModel} from 'enqueuer';

export class PostmanCollectionConverter {
    public convert(postmanCollection: postman.Collection): InputRequisitionModel {
        console.log(postmanCollection);
        const requisition: any = {
            name: postmanCollection.info.name,
            id: postmanCollection.info._postman_id,
            subscriptions: [],
            publishers: [],
            requisitions: this.createRequisitions(postmanCollection)
        };
        const onInit = new PostmanEventExtractor(postmanCollection).extractOnInitEvent();
        if (onInit !== undefined) {
            requisition.onInit = onInit;
        }
        const onFinish = new PostmanEventExtractor(postmanCollection).extractOnFinishEvent();
        if (onFinish !== undefined) {
            requisition.onFinish = onFinish;
        }
        return requisition;
    }

    private createFolder(folder: postman.Folder): InputRequisitionModel {
        const result: any = {
            name: folder.name,
            subscriptions: [],
            publishers: [],
            requisitions: this.createRequisitions(folder)
        };
        const onInit = new PostmanEventExtractor(folder).extractOnInitEvent();
        if (onInit !== undefined) {
            result.onInit = onInit;
        }
        const onFinish = new PostmanEventExtractor(folder).extractOnFinishEvent();
        if (onInit !== undefined) {
            result.onFinish = onFinish;
        }

        return result;

    }

    private createRequisitions(postmanCollection: postman.Collection | postman.Folder): InputRequisitionModel[] {
        return postmanCollection
            .item
            .map((item: postman.Item | postman.Folder) => {
                if ((item as any).request === undefined) {
                    return this.createFolder(item as postman.Folder);
                } else {
                    return this.createItem(item as postman.Item);
                }
            });
    }

    private createItem(item: postman.Item): InputRequisitionModel {
        const requisition: any = {
            name: item.name,
            subscriptions: (item.response || []).map(response => this.createSubscription(response)),
            publishers: [this.createPublisher(item.request,
                new PostmanEventExtractor(item).extractOnInitEvent(),
                new PostmanEventExtractor(item).extractOnMessageReceivedEvent())],
            requisitions: []
        };
        if (item.id) {
            requisition.id = item.id;
        }
        return requisition;
    }

    private createPublisher(request: postman.Request, onInit?: Event, onMessageReceived?: Event): InputPublisherModel {
        const publisher: any = {
            type: request.url.protocol || "HTTP",
            url: request.url.raw,
            method: request.method,
            payload: request.body ? request.body.raw : '',
            headers: this.createHeaders(request.header),
        };

        const auth = request.auth;
        if (auth) {
            publisher.authentication = {};
            publisher.authentication[auth.type] = {};
            const authType = auth[auth.type];
            if (Array.isArray(authType)) {
                authType.forEach((element) => {
                    publisher.authentication[auth.type][element.key] = element.value;
                });
            }
        }

        if (onInit !== undefined) {
            publisher.onInit = onInit;
        }
        if (onMessageReceived !== undefined) {
            publisher.onMessageReceived = onMessageReceived;
        }
        return publisher;

    }

    private createSubscription(response: postman.Response): InputSubscriptionModel {
        const protocol = response.originalRequest.url.protocol;
        let port: any = response.originalRequest.url.port;
        if (port === undefined) {
            port = protocol.toLowerCase() === 'http' ? 8080 : 443;
        }
        const subscription: any = {
            name: response.name,
            type: protocol,
            method: response.originalRequest.method,
            endpoint: response.originalRequest.url.path.join('/'),
            port: port,
            response: {
                headers: this.createHeaders(response.header),
                status: response.code || 200,
                payload: response.body
            }
        };
        if (response.id) {
            subscription.id = response.id;
        }
        return subscription;
    }

    private createHeaders(headers?: postman.Header[]) {
        const result: any = {};
        (headers || [])
            .filter(element => element.disabled !== false)
            .forEach(element => {
                result[element.key] = element.value;
            });
        return result;
    }

}
