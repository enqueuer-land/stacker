import {InputRequisitionModel} from "enqueuer";
import {Components} from "@/components/components";

function getId() {
    return 'ID' + Math.trunc(Math.random() * 999999) + Math.trunc(Math.random() * 999999);
}

export default {
    state: {
        textFilter: '',
        requisitions: [
            {
                id: getId(),
                name: 'second',
                requisitions: [
                    {
                        id: getId(),
                        name: 'second',
                        requisitions: [],
                        publishers: [],
                        subscriptions: [{
                            type: 'HTTP',
                            id: getId(),
                            name: Math.trunc(Math.random() * 999999),
                            carabinaMeta: {
                                componentName: Components.REQUISITION
                            }
                        }, {
                            type: 'AMQP',
                            id: getId(),
                            name: Math.trunc(Math.random() * 999999),
                            carabinaMeta: {
                                componentName: Components.REQUISITION
                            }
                        }],
                        carabinaMeta: {
                            componentName: Components.REQUISITION
                        }
                    }
                ],
                publishers: [],
                subscriptions: [{
                    type: 'HTTP',
                    id: getId(),
                    name: Math.trunc(Math.random() * 999999),
                    carabinaMeta: {
                        componentName: Components.SUBSCRIPTION
                    }
                }, {
                    type: 'AMQP',
                    id: getId(),
                    name: Math.trunc(Math.random() * 999999),
                    carabinaMeta: {
                        componentName: Components.SUBSCRIPTION
                    }
                }],
                carabinaMeta: {
                    componentName: Components.REQUISITION
                }
            }
        ],
    },
    mutations: {
        componentSelected: (stage: any, component: {}) => console.log(component),
        filterTextChanged: (stage: any, value: string) => stage.textFilter = value,
        createNewRequisition: (stage: any) => stage.requisitions.push({
            id: getId(),
            name: (stage.requisitions.length + 1).toString(),
            type: 'AMQP',
            requisitions: [],
            publishers: [{
                type: 'HTTP',
                id: getId(),
                name: Math.trunc(Math.random() * 999999),
                carabinaMeta: {
                    componentName: Components.PUBLISHER
                }
            }, {
                type: 'AMQPASDASD',
                id: getId(),
                name: Math.trunc(Math.random() * 999999),
                carabinaMeta: {
                    componentName: Components.PUBLISHER
                }
            }],
            subscriptions: [],
            carabinaMeta: {
                componentName: Components.REQUISITION
            }
        })
    },
    getters: {
        textFilter: (state: any) => state.textFilter,
        filteredRequisitions: (state: any) => state.requisitions
            .filter((requisition: InputRequisitionModel) => requisition.name.includes(state.textFilter))
    },
    namespaced: true
}
