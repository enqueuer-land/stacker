import {shallowMount} from '@vue/test-utils'
import SideBarBody from '@/views/side-bar/side-bar-body.vue'
import SideBarNeck from '@/views/side-bar/side-bar-neck.vue'

describe('SideBarBody', () => {
    it('should render neck', () => {
        const wrapper = shallowMount(SideBarBody);
        expect(wrapper.find(SideBarNeck)).not.toBeNull();
    });
});
