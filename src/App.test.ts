import { shallowMount } from '@vue/test-utils'
import App from './App.vue'

describe('App.test.ts', () => {

    it('renders component as supposed to', () => {
        const wrapper = shallowMount(App);
        expect(wrapper.find('#main').exists()).toBe(true)
    })
  })