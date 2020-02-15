import {shallowMount} from '@vue/test-utils'
import SideBarNeck from '@/views/side-bar/side-bar-neck.vue'

describe('SideBarNeck', () => {
    it('should render filter', () => {
        const wrapper = shallowMount(SideBarNeck);
        expect(wrapper.find('.filter-icon')).not.toBeNull();
        expect(wrapper.find('.filter-input')).not.toBeNull();
    });

    it('should render "new button"', () => {
        const wrapper = shallowMount(SideBarNeck);
        expect(wrapper.find('#new-button')).not.toBeNull();
    });
});
