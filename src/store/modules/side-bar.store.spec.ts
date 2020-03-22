import Store from 'electron-store';
import * as sideBarStore from '@/store/modules/side-bar.store';
// @ts-ignore
import requisitionsExample from '@/components/requisitions-example.json';

jest.mock('electron-store');

describe('SideBarStore', () => {
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
        Store.mockImplementationOnce(electronStoreConstructorMock);
    });

    it('namespaced should be true', () => {
        expect(sideBarStore.default().namespaced).toBeTruthy();
    });

    it('should store in "nav-bar" file', () => {
        sideBarStore.default();
        expect(electronStoreConstructorMock).toHaveBeenCalledWith({name: 'side-bar'});
    });

    it('should get default "requisitions"', () => {
        sideBarStore.default();
        expect(storeGetMock).toHaveBeenCalledWith('requisitions', requisitionsExample);
    });

    it('should get default "selectedComponentId"', () => {
        sideBarStore.default();
        expect(storeGetMock).toHaveBeenCalledWith('selectedComponentId', null);
    });

    it('should init textFilter with empty', () => {
        expect(sideBarStore.default().state.textFilter).toBe('');
    });

    it('should init requisitions example one', () => {
        expect(sideBarStore.default().state.requisitions[0].name).toEqual(requisitionsExample[0].name);
    });

    it('should init selectedComponent with first requisition example', () => {
        expect(sideBarStore.default().state.selectedComponent?.name).toEqual(requisitionsExample[0].name);
    });

    it('should get selectedComponent', () => {
        const stage = {selectedComponent: 'component'};
        const selectedComponent = sideBarStore.default().getters.selectedComponent(stage);
        expect(selectedComponent).toBe('component');
    });

    it('should get textFilter', () => {
        const stage = {textFilter: 'component'};
        const textFilter = sideBarStore.default().getters.textFilter(stage);
        expect(textFilter).toBe('component');
    });

    it('should get filteredRequisitions', () => {
        const stage = {
            textFilter: 'FirS',
            requisitions: [{id: 'fIrsT', carabinaMeta: {}}, {id: 'second', carabinaMeta: {}}]
        };
        const filteredRequisitions = sideBarStore.default().getters.filteredRequisitions(stage);
        expect(filteredRequisitions).toEqual([stage.requisitions[0]]);
    });

    it('should get breadcrumbItems', () => {
        const stage = {
            selectedComponent: {
                name: '1',
                id: '1',
                carabinaMeta: {
                    parent: {
                        name: '2',
                        id: '2',
                        carabinaMeta: {
                            parent:
                                {name: '3', id: '3', carabinaMeta: {}}
                        }
                    }
                }
            }
        };
        const items = sideBarStore.default().getters.breadcrumbItems(stage);
        expect(items).toEqual([
            {
                click: expect.any(Function),
                id: '3',
                text: '3'
            },
            {
                click: expect.any(Function),
                id: '2',
                text: '2'
            }
        ]);
    });

    it('should change text filter', () => {
        const stage: any = {};

        sideBarStore.default().mutations.filterTextChanged(stage, 'text');

        expect(stage.textFilter).toEqual('text');
    });

    it('should select component by id', () => {
        const selectedComponent = {
            name: '1',
            id: '1',
            carabinaMeta: {
                selected: true,
            }
        };
        const componentToSelect = {
            name: '2',
            id: '2',
            carabinaMeta: {
                selected: false,
            }
        };
        const stage = {
            requisitions: [selectedComponent, componentToSelect],
            selectedComponent
        };

        sideBarStore.default().mutations.selectComponentById(stage, componentToSelect.id);

        expect(selectedComponent.carabinaMeta.selected).toBeFalsy();
        expect(componentToSelect.carabinaMeta.selected).toBeTruthy();
        expect(stage.selectedComponent).toEqual(componentToSelect);
    });

    it('should select component by id when no component is selected', () => {
        const componentToSelect = {
            name: '2',
            id: '2',
            carabinaMeta: {
                selected: false,
            }
        };
        const stage = {
            requisitions: [componentToSelect],
            selectedComponent: null
        };

        sideBarStore.default().mutations.selectComponentById(stage, componentToSelect.id);

        expect(componentToSelect.carabinaMeta.selected).toBeTruthy();
        expect(stage.selectedComponent).toEqual(componentToSelect);
    });

    it('should add requisition', () => {
        const requisition: any = {
            name: '2',
            carabinaMeta: {}
        };
        const stage = {
            requisitions: [],
            selectedComponent: null
        };

        sideBarStore.default().mutations.addRequisition(stage, requisition);

        expect(requisition.carabinaMeta.selected).toBeTruthy();
        expect(stage.requisitions).toEqual([requisition]);
        expect(stage.selectedComponent).toEqual(requisition);
    });

    // it('should do nothing when adding already loaded requisition', () => {
    //     const requisition: any = {
    //         id: '1',
    //     };
    //     const stage = {
    //         requisitions: [requisition],
    //         selectedComponent: null
    //     };
    //
    //     sideBarStore.default().mutations.addRequisition(stage, requisition);
    //
    //     expect(stage.requisitions).toEqual([requisition]);
    //     expect(stage.selectedComponent).toBeNull();
    // });
    //
    // it('should create new requisition component starting selected', () => {
    //     const stage: any = {
    //         requisitions: []
    //     };
    //
    //     sideBarStore.default().mutations.createNewComponent(stage, {
    //         componentType: ComponentTypes.REQUISITION,
    //         startSelected: true
    //     });
    //
    //     expect(stage.requisitions.length).toBe(1);
    //     expect(stage.requisitions[0].carabinaMeta.selected).toBeTruthy();
    // });
    //
    // it('should create new publisher component', () => {
    //     const parent: any = {publishers: [], carabinaMeta: {}};
    //     const stage: any = {
    //         requisitions: [parent]
    //     };
    //
    //     sideBarStore.default().mutations.createNewComponent(stage, {
    //         componentType: ComponentTypes.PUBLISHER,
    //         parent
    //     });
    //
    //     expect(stage.requisitions[0].publishers.length).toBe(1);
    //     expect(parent.publishers.length).toBe(1);
    //     expect(parent.publishers[0].carabinaMeta.selected).toBeFalsy();
    // });
    //
    // it('should create new subscription component', () => {
    //     const parent: any = {subscriptions: [], carabinaMeta: {}};
    //     const stage: any = {
    //         requisitions: [parent]
    //     };
    //
    //     sideBarStore.default().mutations.createNewComponent(stage, {
    //         componentType: ComponentTypes.SUBSCRIPTION,
    //         parent
    //     });
    //
    //     expect(stage.requisitions[0].subscriptions.length).toBe(1);
    //     expect(parent.subscriptions.length).toBe(1);
    //     expect(parent.subscriptions[0].carabinaMeta.selected).toBeFalsy();
    // });
    //
    // it('should change currently selected component', () => {
    //     const stage: any = {
    //         requisitions: [],
    //         selectedComponent: {}
    //     };
    //
    //     sideBarStore.default().mutations.currentSelectedComponentChanged(stage, {
    //         attributeName: 'attr',
    //         value: {object: true}
    //     });
    //
    //     expect(stage.selectedComponent).toEqual({attr: {object: true}});
    // });
    //
    // it('should change AttributeOfComponent', () => {
    //     const stage: any = {
    //         requisitions: [],
    //         selectedComponent: {}
    //     };
    //     const component = {};
    //
    //     sideBarStore.default().mutations.changeAttributeOfComponent(stage, {
    //         component,
    //         attributeName: 'attr',
    //         value: {object: true}
    //     });
    //
    //     expect(component).toEqual({attr: {object: true}});
    // });
});
