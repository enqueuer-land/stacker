import Store from 'electron-store';
import * as resultStore from '@/store/modules/result.store';
import resultIconFilters from '@/icons/result-icon-filters';

jest.mock('electron-store');

describe('StageStore', () => {
    const storeGetMock: any = jest.fn((event, store) => store);
    const storeSetMock: any = jest.fn();
    const electronStoreConstructorMock = jest.fn(() => ({
        get: storeGetMock,
        set: storeSetMock,
    }));

    beforeEach(() => {
        storeGetMock.mockClear();
        storeSetMock.mockClear();
        // @ts-ignore
        Store.mockImplementation(electronStoreConstructorMock);
    });

    it('namespaced should be true', () => {
        expect(resultStore.default().namespaced).toBeTruthy();
    });

    it('should store in "result" file', () => {
        resultStore.default();
        expect(electronStoreConstructorMock).toHaveBeenCalledWith({name: 'result'});
    });

    it('should get default responses', () => {
        expect(resultStore.default().state.responses).toEqual([]);
    });

    it('should get default flattenTests', () => {
        expect(resultStore.default().state.flattenTests).toEqual([]);
    });

    it('should get default textFilter', () => {
        expect(resultStore.default().state.textFilter).toEqual('');
    });

    it('should get default enqueuerRunningShowModal', () => {
        expect(resultStore.default().state.enqueuerRunningShowModal).toBeFalsy();
    });

    it('should get default iconFilters', () => {
        expect(resultStore.default().state.iconFilters).toEqual(resultIconFilters);
    });

    it('should get default "responses" env', () => {
        resultStore.default();
        expect(storeGetMock).toHaveBeenCalledWith('responses', []);
    });

    it('should get default "flattenTests" env', () => {
        resultStore.default();
        expect(storeGetMock).toHaveBeenCalledWith('flattenTests', []);
    });

    it('should run requisition', () => {
        const stage: any = {};
        resultStore.default().mutations.runRequisition(stage);
        expect(stage.enqueuerRunningShowModal).toBeTruthy();
    });

    it('should receive response', () => {
        const stage: any = {};
        const value: any = [];

        resultStore.default().mutations.responseReceived(stage, value);

        expect(stage.enqueuerRunningShowModal).toBeFalsy();
        expect(stage.responses).toEqual(value);
        expect(storeSetMock).toHaveBeenCalledWith('responses', value);
        expect(storeSetMock).toHaveBeenCalledWith('flattenTests', value);
    });

    it('should change filter text', () => {
        const stage: any = {};
        const value = 'filter';

        resultStore.default().mutations.filterTextChanged(stage, value);

        expect(stage.textFilter).toBe(value);
    });

    it('should toggle some icon filter', () => {
        const value: any = {active: true};

        resultStore.default().mutations.iconFilterClicked({}, value);

        expect(value.active).toBeFalsy();
    });

    it('should toggle even when it has no initial value', () => {
        const value: any = {};

        resultStore.default().mutations.iconFilterClicked({}, value);

        expect(value.active).toBeTruthy();
    });

    it('should get enqueuerRunningShowModal', () => {
        const state: any = {enqueuerRunningShowModal: 'enqueuerRunningShowModal'};

        expect(resultStore.default().getters.enqueuerRunningShowModal(state))
            .toEqual(state.enqueuerRunningShowModal);
    });

    it('should get responses', () => {
        const state: any = {responses: 'any'};

        expect(resultStore.default().getters.responses(state))
            .toEqual(state.responses);
    });

    it('should get textFilter', () => {
        const state: any = {textFilter: 'any'};

        expect(resultStore.default().getters.textFilter(state))
            .toEqual(state.textFilter);
    });

    it('should get iconFilters', () => {
        const state: any = {iconFilters: 'any'};

        expect(resultStore.default().getters.iconFilters(state))
            .toEqual(state.iconFilters);
    });

    it('should get responseIsValid when it has no response', () => {
        const state: any = {responses: []};

        expect(resultStore.default().getters.responseIsValid(state))
            .toBeTruthy();
    });

    it('should get responseIsValid when it has a valid test', () => {
        const state: any = {responses: [{valid: true}]};

        expect(resultStore.default().getters.responseIsValid(state))
            .toBeTruthy();
    });

    it('should get responseIsValid when it has an ignored test', () => {
        const state: any = {responses: [{ignored: true}]};

        expect(resultStore.default().getters.responseIsValid(state))
            .toBeTruthy();
    });

    it('should get responseIsValid when it is not valid', () => {
        const state: any = {responses: [{}]};

        expect(resultStore.default().getters.responseIsValid(state))
            .toBeFalsy();
    });

    it('should get responseName', () => {
        const state: any = {responses: [{name: 'name'}]};

        expect(resultStore.default().getters.responseName(state))
            .toBe('name');
    });

    it('should get totalTime', () => {
        const state: any = {responses: [{time: {totalTime: 10}}, {time: {totalTime: 20}}]};

        expect(resultStore.default().getters.totalTime(state))
            .toBe(30);
    });

    it('should get total of ignored tests', () => {
        const state: any = {flattenTests: [{ignored: true}, {}]};

        expect(resultStore.default().getters.ignoredTests(state))
            .toBe(1);
    });

    it('should get filteredFlattenTests', () => {
        const state: any = {
            iconFilters: [],
            flattenTests: []
        };

        expect(resultStore.default().getters.filteredFlattenTests(state))
            .toEqual([]);
    });

    it('should get filteredFlattenTests with active iconFilters', () => {
        const state: any = {
            textFilter: 'textFilter',
            iconFilters: [{active: true, filter: () => true}],
            flattenTests: [{name: 'textFilter'}]
        };

        expect(resultStore.default().getters.filteredFlattenTests(state))
            .toEqual([
                {
                    carabinaMeta: {
                        flattenIndex: 0
                    },
                    name: 'textFilter'
                }
            ]);
    });

    it('should get summary', () => {
        const state: any = {
            flattenTests: [{ignored: true}, {valid: true}, {valid: false}]
        };

        expect(resultStore.default().getters.summary(state))
            .toEqual('1/2 (50.00%)');
    });
});
