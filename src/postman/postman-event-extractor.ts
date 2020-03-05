import {Event} from 'enqueuer';
import * as postman from './postman-types';

type EventExtract = {
    event?: postman.Event[];
    variable?: postman.Variable[];
};

export class PostmanEventExtractor {
    private readonly element: EventExtract;

    constructor(element: EventExtract) {
        this.element = element;
    }

    public extractOnInitEvent(): Event | undefined {
        let event = this.extractEvent('prerequest');
        if (this.element.variable) {
            if (!event) {
                event = {};
            }
            event.store = {};
            (this.element.variable || [])
                .forEach(element => event!.store![element.key] = `\`${element.value}\``);
        }
        return event;
    }

    public extractOnMessageReceivedEvent(): Event | undefined {
        return this.extractEvent('test');
    }

    public extractOnFinishEvent(): Event | undefined {
        return this.extractEvent('test');
    }

    private extractEvent(eventName: string): Event | undefined {
        if (this.element.event) {
            const event = this.element.event
                .find((event: postman.Event) => event.listen === eventName, {});
            if (event && Array.isArray(event.script.exec) && event.script.exec.length > 0) {
                return {
                    script: event.script.exec.join('; ')
                };
            }
        }
    }

}
