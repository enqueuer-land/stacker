import {BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from './app.vue'
import store from './store'


import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
// @ts-ignore
import PrismEditor from 'vue-prism-editor'
import "vue-prism-editor/dist/VuePrismEditor.css";


Vue.component("prism-editor", PrismEditor);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
