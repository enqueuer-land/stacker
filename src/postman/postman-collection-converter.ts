import {Collection, Folder, Header, Item, Request, Response} from './postman-types';
import {PostmanEventExtractor} from './postman-event-extractor';
import {Event, InputPublisherModel, InputRequisitionModel, InputSubscriptionModel} from 'enqueuer';

export class PostmanCollectionConverter {
    public convert(postmanCollection: Collection): InputRequisitionModel {
        return this.createRequisition(postmanCollection,
            new PostmanEventExtractor(postmanCollection).extractOnInitEvent(),
            new PostmanEventExtractor(postmanCollection).extractOnMessageReceivedEvent());
    }

    private createRequisition(collection: any, onInit?: Event, onFinish?: Event) {
        const requisition: any = {
            name: collection.info ? collection.info.name : collection.name,
            subscriptions: [],
            publishers: [],
            requisitions: []
        };
        if (onInit !== undefined) {
            requisition.onInit = onInit;
        }
        if (onFinish !== undefined) {
            requisition.onFinish = onFinish;
        }

        collection.item
            .forEach((item: Item | Folder) => {
                const items = (item as any).item;
                if (items !== undefined) {
                    requisition.requisitions.push(this.createRequisition(item,
                        new PostmanEventExtractor(item).extractOnInitEvent(),
                        new PostmanEventExtractor(item).extractOnMessageReceivedEvent()));
                } else {
                    const castedItem = item as Item;
                    if (castedItem.request) {
                        const publisher = this.createPublisher(castedItem.request,
                            new PostmanEventExtractor(castedItem).extractOnInitEvent(),
                            new PostmanEventExtractor(castedItem).extractOnMessageReceivedEvent());
                        publisher.name = item.name;
                        requisition.publishers.push(publisher);
                    }
                    if (castedItem.response) {
                        requisition.subscriptions = requisition.subscriptions.concat(castedItem.response
                            .map(response => this.createSubscription(response)));
                    }

                }
            });
        return requisition;
    }

    private createPublisher(request: Request, onInit?: Event, onResponseReceived?: Event): InputPublisherModel {
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
        if (onResponseReceived !== undefined) {
            publisher.onResponseReceived = onResponseReceived;
        }
        return publisher;

    }

    private createSubscription(response: Response): InputSubscriptionModel {

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

    private createHeaders(headers?: Header[]) {
        const result: any = {};
        (headers || [])
            .filter(element => element.disabled !== false)
            .forEach(element => {
                result[element.key] = element.value;
            });
        return result;
    }

}
