import {OutputTestModel} from 'enqueuer';

//TODO test it
const resultIconFilters = [
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
];

export default resultIconFilters;
