import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from './app.vue'
import store from './store'
import {
    CardPlugin,
    ModalPlugin,
    LayoutPlugin,
    ButtonPlugin,
    SpinnerPlugin,
    TooltipPlugin,
    CollapsePlugin,
    DropdownPlugin,
    FormGroupPlugin,
    FormInputPlugin,
    BreadcrumbPlugin,
    InputGroupPlugin,
    ButtonGroupPlugin
} from 'bootstrap-vue'

Vue.use(CardPlugin);
Vue.use(ModalPlugin);
Vue.use(LayoutPlugin);
Vue.use(ButtonPlugin);
Vue.use(SpinnerPlugin);
Vue.use(TooltipPlugin);
Vue.use(DropdownPlugin);
Vue.use(CollapsePlugin);
Vue.use(FormInputPlugin);
Vue.use(FormGroupPlugin);
Vue.use(InputGroupPlugin);
Vue.use(BreadcrumbPlugin);
Vue.use(ButtonGroupPlugin);

Vue.config.productionTip = false;

//TODO try to test it
new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
