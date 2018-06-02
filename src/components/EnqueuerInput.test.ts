import { shallowMount } from '@vue/test-utils'
import EnqueuerInput from './EnqueuerInput.vue'

describe('EnqueuerInput.vue', () => {
    it('renders component as supposed to', () => {
        const wrapper = shallowMount(EnqueuerInput);
        expect(wrapper.find('#enqueuer-input').exists()).toBe(true);
    });
})