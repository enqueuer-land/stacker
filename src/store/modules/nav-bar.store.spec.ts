import Store from 'electron-store';
import {FileDialog} from '@/components/file-dialog';
import * as navBarStore from '@/store/modules/nav-bar.store';
import {EnvironmentSaver} from '@/environments/environment-saver';
import {RendererMessageCommunicator} from '@/components/renderer-message-communicator';

jest.mock('@/store');
jest.mock('electron-store');
jest.mock('@/components/file-dialog');
jest.mock('@/environments/environment-saver');
jest.mock('@/components/renderer-message-communicator');

const noEnvironmentDefault = {
    name: 'No environment',
    role: 'none',
    store: {}
};

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
        expect(navBarStore.default().namespaced).toBeTruthy();
    });

    it('should store in "nav-bar" file', () => {
        navBarStore.default();
        expect(electronStoreConstructorMock).toHaveBeenCalledWith({name: 'nav-bar'});
    });

    it('should get default "no env" env', () => {
        navBarStore.default();
        expect(storeGetMock).toHaveBeenCalledWith('selectedEnvironment', noEnvironmentDefault);
    });

    it('should set enqueuer store at the beginning', () => {
        const messageCommunicatorEmitMock = jest.fn();
        // @ts-ignore
        RendererMessageCommunicator.emit.mockImplementationOnce(messageCommunicatorEmitMock);

        navBarStore.default();

        expect(messageCommunicatorEmitMock).toHaveBeenCalledWith('setEnqueuerStore', {});
    });

    it('should init selected environment', () => {
        expect(navBarStore.default().state.selectedEnvironment).toEqual(noEnvironmentDefault);
    });

    it('should init selected environment', () => {
        expect(navBarStore.default().state.environments).toEqual([noEnvironmentDefault]);
        expect(storeGetMock).toHaveBeenCalledWith('environments', [noEnvironmentDefault]);
    });

    it('should get environments', () => {
        const state = {environments: ['env1', 'env2']};
        expect(navBarStore.default().getters.environments(state)).toEqual(['env1', 'env2']);
    });

    it('should get selectedEnvironment', () => {
        const state = {selectedEnvironment: 'env1'};
        expect(navBarStore.default().getters.selectedEnvironment(state)).toEqual('env1');
    });

    it('should persist and send store to enqueuer', () => {
        const selectedEnv = {store: {key: 'value'}};

        const messageCommunicatorEmitMock = jest.fn();
        // @ts-ignore
        RendererMessageCommunicator.emit.mockImplementationOnce(messageCommunicatorEmitMock);
        const stage: any = {};

        navBarStore.default().mutations.environmentSelected(stage, selectedEnv);

        expect(storeSetMock).toHaveBeenCalledWith('environments', undefined);
        expect(storeSetMock).toHaveBeenCalledWith('selectedEnvironment', selectedEnv);
        expect(messageCommunicatorEmitMock).toHaveBeenCalledWith('setEnqueuerStore', {});
    });

    it('should select environment', () => {
        const selectedEnv = {store: {key: 'value'}};

        const stage: any = {};

        navBarStore.default().mutations.environmentSelected(stage, selectedEnv);

        expect(stage.selectedEnvironment).toEqual(selectedEnv);
    });

    it('should changeSelectedEnvironmentStore', () => {
        const payload = {environment: {id: '1'}, store: {key: 'value'}};

        const stage: any = {
            environments: [{id: '0'}, {id: '1'}]
        };

        navBarStore.default().mutations.changeSelectedEnvironmentStore(stage, payload);

        expect(stage.selectedEnvironment).toEqual({
            id: '1',
            store: {
                key: 'value'
            }
        });
    });

    it('should changeSelectedEnvironmentName', () => {
        const payload = {environment: {id: '1'}, name: 'name'};

        const stage: any = {
            environments: [{id: '0'}, {id: '1'}]
        };

        navBarStore.default().mutations.changeSelectedEnvironmentName(stage, payload);

        expect(stage.selectedEnvironment).toEqual({
            id: '1',
            name: 'name'
        });
    });

    it('should deleteEnvironment when component is the selected one', () => {
        const payload = {environment: {id: '1'}};

        const stage: any = {
            environments: [{id: '0'}, {id: '1'}],
            selectedEnvironment: {id: '1'}
        };

        navBarStore.default().mutations.deleteEnvironment(stage, payload);

        expect(stage.environments).toEqual([{id: '0'}]);
        expect(stage.selectedEnvironment).toEqual(noEnvironmentDefault);
    });

    it('should deleteEnvironment when component is NOT the selected one', () => {
        const payload = {environment: {id: '1'}};

        const stage: any = {
            environments: [{id: '0'}, {id: '1'}],
            selectedEnvironment: {id: '0'}
        };

        navBarStore.default().mutations.deleteEnvironment(stage, payload);

        expect(stage.environments).toEqual([{id: '0'}]);
        expect(stage.selectedEnvironment).toEqual({id: '0'});
    });

    it('should cloneEnvironment', () => {
        const payload = {environment: {id: '0', name: 'env'}};

        const stage: any = {
            environments: [{id: '0', name: 'env'}],
            selectedEnvironment: {id: '0'}
        };

        navBarStore.default().mutations.cloneEnvironment(stage, payload);

        expect(stage.environments).toEqual([
            stage.environments[0],
            {
                id: expect.any(String),
                name: stage.environments[0].name
            }
        ]);
    });

    it('should add new environment', () => {
        const stage: any = {
            environments: [{id: '0', name: 'env'}],
            selectedEnvironment: {id: '0'}
        };

        navBarStore.default().mutations.addNewEnvironment(stage);

        const expectedNew = {
            name: `New Environment 1`,
            id: expect.any(String),
            store: {}
        };
        expect(stage.selectedEnvironment).toEqual(expectedNew);
        expect(stage.environments).toEqual([
            stage.environments[0],
            expectedNew
        ]);
    });

    it('should add environment', () => {
        const payload = {name: 'new env', store: {}};
        const stage: any = {
            selectedEnvironment: {id: '0'},
            environments: [],
        };

        navBarStore.default().mutations.addEnvironment(stage, payload);

        expect(stage.selectedEnvironment).toEqual(payload);
    });

    it('should save environments', async () => {
        const payload = {environment: {name: 'env', store: {}}};
        // @ts-ignore
        FileDialog.showSaveDialog.mockImplementationOnce(async () => 'filename');

        const saveMock = jest.fn( async () => ({}));
        // @ts-ignore
        EnvironmentSaver.mockImplementationOnce(() => ({save: saveMock}));

        await navBarStore.default().mutations.saveEnvironment({}, payload);

        expect(saveMock).toHaveBeenCalledWith('filename', payload.environment);
    });

    it('should do nothing when no file is picked environments', async () => {
        const payload = {environment: {name: 'env', store: {}}};
        // @ts-ignore
        FileDialog.showSaveDialog.mockImplementationOnce(async () => undefined);

        const saveMock = jest.fn( async () => ({}));
        // @ts-ignore
        EnvironmentSaver.mockImplementationOnce(() => ({save: saveMock}));

        await navBarStore.default().mutations.saveEnvironment({}, payload);

        expect(saveMock).not.toHaveBeenCalled();
    });

});
