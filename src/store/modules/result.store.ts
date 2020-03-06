import store from '@/store'
import {TestFlattener} from "@/components/test-flattener";
import {TestModel} from 'enqueuer/js/models/outputs/test-model';
import {OutputRequisitionModel, OutputTestModel} from "enqueuer/js/enqueuer";

export default {
    state: {
        responses: [] as OutputRequisitionModel[],
        flattenTests: [] as any[],
        textFilter: '',
        iconFilters: [
            {
                active: true,
                icon: 'fa fa-check',
                color: 'var(--carabina-passing-test-color)',
                filter: (test: OutputTestModel) => test.ignored !== true && test.valid === true
            },
            {
                active: true,
                icon: 'fa fa-times',
                color: 'var(--carabina-failing-test-color)',
                filter: (test: OutputTestModel) => test.ignored !== true && test.valid === false
            },
            {
                active: false,
                icon: 'fa fa-exclamation',
                color: 'var(--carabina-ignored-test-color)',
                filter: (test: OutputTestModel) => test.ignored === true
            }
        ],
        enqueuerRunningShowModal: false,
        enqueuerRunningStartTime: null
    },
    mutations: {
        disableEnqueuerRunningModal: (stage: any) => {
            stage.enqueuerRunningShowModal = false;
        },
        runRequisition: (stage: any, requisition: any) => {
            stage.enqueuerRunningShowModal = true;
            stage.enqueuerRunningStartTime = new Date().getTime();
        },
        updateResponse: (stage: any, value: OutputRequisitionModel[]) => {
            const elapsedTime = new Date().getTime() - stage.enqueuerRunningStartTime;
            const remainingTime = Math.max(500 - elapsedTime, 0);
            setTimeout(() => store.commit('result/disableEnqueuerRunningModal'), remainingTime);

            stage.responses = value;
            stage.flattenTests = value
                .reduce((acc: any[], test: OutputRequisitionModel) => acc.concat(new TestFlattener().flatten(test)), []);
        },
        filterTextChanged: (stage: any, value: string) => stage.textFilter = value,
        iconFilterClicked: (stage: any, value: any) => value.active = !value.active,
    },
    getters: {
        enqueuerRunningShowModal: (state: any) => state.enqueuerRunningShowModal,
        responses: (state: any) => state.responses,
        textFilter: (state: any) => state.textFilter,
        iconFilters: (state: any) => state.iconFilters,
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
            const percentage = (100 * summary.validTests / summary.totalTests).toFixed(2);
            return `${summary.validTests}/${summary.totalTests} (${percentage}%)`;
        },
    },
    namespaced: true
}
