import {shallowMount} from '@vue/test-utils'
import SideBar from '@/views/side-bar/side-bar.vue'
import SideBarHeader from '@/views/side-bar/side-bar-header.vue'
import SideBarBody from '@/views/side-bar/side-bar-body.vue'
import SideBarFooter from '@/views/side-bar/side-bar-footer.vue'

describe('SideBar', () => {
    it('should render header', () => {
        const wrapper = shallowMount(SideBar);
        expect(wrapper.find(SideBarHeader)).not.toBeNull();
    });

    it('should render body', () => {
        const wrapper = shallowMount(SideBar);
        expect(wrapper.find(SideBarBody)).not.toBeNull();
    });

    it('should render footer', () => {
        const wrapper = shallowMount(SideBar);
        expect(wrapper.find(SideBarFooter)).not.toBeNull();
    });
});
