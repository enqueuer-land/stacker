import {shallowMount} from '@vue/test-utils'
import Stage from '@/views/stage/stage.vue'

import {BootstrapVue} from 'bootstrap-vue'
import Vue from 'vue'

Vue.use(BootstrapVue);

describe('stage.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowMount(Stage, {
            propsData: {msg}
        });
        expect(wrapper.text()).toMatch(msg)
    })
});
