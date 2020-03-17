import {Collection, Folder, Header, Item, Request, Response} from './postman-types';
import {PostmanEventExtractor} from './postman-event-extractor';
import {Event, InputPublisherModel, InputRequisitionModel, InputSubscriptionModel} from 'enqueuer';

//TODO test it
export class PostmanCollectionConverter {
    public convert(postmanCollection: Collection): InputRequisitionModel {
        return this.createRequisition(postmanCollection.item, postmanCollection.info.name);
    }

    private createRequisition(items: (Item | Folder)[], name: string) {
        const requisitions: any = {
            name,
            subscriptions: [],
            publishers: [],
            requisitions: []
        };

        items
            .forEach((item: Item | Folder) => {
                const items = (item as any).item;
                if (items !== undefined) {
                    requisitions.requisitions.push(this.createRequisition(items, item.name));
                } else {
                    const castedItem = item as Item;
                    const publisher = this.createPublisher(castedItem.request,
                        new PostmanEventExtractor(castedItem).extractOnInitEvent(),
                        new PostmanEventExtractor(castedItem).extractOnMessageReceivedEvent());
                    publisher.name = item.name;
                    requisitions.publishers.push(publisher);

                    requisitions.subscriptions.concat((castedItem.response || [])
                        .map(response => this.createSubscription(response)));
                }
            });
        return requisitions;
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
