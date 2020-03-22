import Store from 'electron-store';
import {OutputRequisitionModel} from 'enqueuer';
import {TestFlattener} from '@/components/test-flattener';
import {TestModel} from 'enqueuer/js/models/outputs/test-model';
import resultIconFilters from '@/icons/result-icon-filters';

let resultRepository: any;

function initialize() {
    resultRepository = new Store({name: 'result'});
}

function persist(stage: any) {
    resultRepository.set('responses', stage.responses);
    resultRepository.set('flattenTests', stage.flattenTests);
}

export default () => {
    initialize();
    return {
        state: {
            responses: resultRepository.get('responses', [] as OutputRequisitionModel[]),
            flattenTests: resultRepository.get('flattenTests', [] as any[]),
            textFilter: '',
            enqueuerRunningShowModal: false,
            iconFilters: resultIconFilters,
        },
        mutations: {
            runRequisition: (stage: any) => {
                stage.enqueuerRunningShowModal = true;
            },
            responseReceived: (stage: any, value: OutputRequisitionModel[]) => {
                stage.enqueuerRunningShowModal = false;

                stage.responses = value;
                stage.flattenTests = value
                    .reduce((acc: any[], test: OutputRequisitionModel) => acc.concat(new TestFlattener().flatten(test)), []);
                persist(stage);
            },
            filterTextChanged: (stage: any, value: string) => stage.textFilter = value,
            iconFilterClicked: (stage: any, value: any) => value.active = !value.active,
        },
        getters: {
            enqueuerRunningShowModal: (state: any) => state.enqueuerRunningShowModal,
            responses: (state: any) => state.responses,
            textFilter: (state: any) => state.textFilter,
            iconFilters: (state: any) => state.iconFilters,
            responseIsValid: (state: any) => {
                return state.responses.every((test: TestModel) => test.valid === true || test.ignored === true);
            },
            responseName: (state: any) => {
                return state.responses[0].name;
            },
            totalTime: (state: any) => {
                return state.responses.reduce((acc: number, test: any) => acc + test.time.totalTime, 0);
            },
            ignoredTests: (state: any) => {
                return state.flattenTests.reduce((acc: number, test: any) => acc + (test.ignored === true ? 1 : 0), 0);
            },
            filteredFlattenTests: (state: any) => {
                const activeIconFilters = state.iconFilters
                    .filter((iconFilter: any) => iconFilter.active);
                return state.flattenTests
                    .map((flattenTest: any, index: number) => {
                        flattenTest.carabinaMeta = {
                            flattenIndex: index
                        };
                        return flattenTest;
                    })
                    .filter((flattenTest: any) => JSON.stringify(flattenTest).toLowerCase().includes(state.textFilter.toLowerCase()))
                    .filter((flattenTest: any) => activeIconFilters.some((activeIconFilter: any) => activeIconFilter.filter(flattenTest)));
            },
            summary: (state: any) => {
                const summary = state.flattenTests.reduce((acc: any, test: any) => {
                        if (test.ignored !== true) {
                            if (test.valid === true) {
                                acc.validTests += 1;
                            }
                            acc.totalTests += 1;
                        }
                        return acc;
                    },
                    {
                        validTests: 0,
                        totalTests: 0
                    });
                const percentage = summary.totalTests > 0 ? (100 * summary.validTests / summary.totalTests).toFixed(2) : 100;
                return `${summary.validTests}/${summary.totalTests} (${percentage}%)`;
            },
        },
        namespaced: true
    };
}
