export default {
    state: {
        textFilter: '',
        iconFilters: [
            {
                active: true,
                icon: 'fa fa-check',
                color: 'var(--carabina-passing-test-color)',
                propertyFilterName: 'showPassingTests'
            },
            {
                active: true,
                icon: 'fa fa-times',
                color: 'var(--carabina-failing-test-color)',
                propertyFilterName: 'showFailingTests'
            },
            {
                active: false,
                icon: 'fa fa-exclamation',
                color: 'var(--carabina-ignored-test-color)',
                propertyFilterName: 'showIgnoredTests'
            },]
    },
    mutations: {
        filterTextChanged: (stage: any, value: string) => stage.textFilter = value,
        iconFilterClicked: (stage: any, value: any) => {
            value.active = !value.active;
        },
    },
    getters: {
        textFilter: (state: any) => state.textFilter,
        iconFilters: (state: any) => state.iconFilters,
    },
    namespaced: true
}
