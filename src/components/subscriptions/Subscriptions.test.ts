import { shallowMount } from '@vue/test-utils'
import EnqueuerOutput from './Subscriptions.vue'

describe('EnqueuerOutput.vue', () => {
    it('renders component as supposed to', () => {
        const wrapper = shallowMount(EnqueuerOutput);
        expect(wrapper.find('#enqueuer-output').exists()).toBe(true);
    });
})