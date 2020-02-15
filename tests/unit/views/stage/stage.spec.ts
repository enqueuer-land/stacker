import {shallowMount, createLocalVue} from '@vue/test-utils'
import Stage from '@/views/stage/stage.vue'
import {BootstrapVue} from "bootstrap-vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('stage.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowMount(Stage, {
            localVue,
            propsData: {msg}
        });
        expect(wrapper.text()).toMatch(msg)
    })
});
