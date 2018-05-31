import { shallowMount } from '@vue/test-utils'
import App from './App.vue'

describe('App.test.ts', () => {
    it('loads component as supposed to', () => {
        const wrapper = shallowMount(App);
        expect(wrapper.find('#main').exists()).toBe(true)
    })
  })