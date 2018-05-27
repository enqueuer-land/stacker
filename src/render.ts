import * as Vue from 'vue';
import * as App from './components/App.vue';
import { EnqueuerClient } from './enqueuer/enqueuer-client';
Vue.config.productionTip = false;

//tslint:disable-next-line:no-unused-expression
new Vue(App).$mount('#app');
EnqueuerClient.getInstance().setOnEnqueuerResponse((response: string) => {
        console.log(`Enqueuer response: ${response}`);
    }).run();
// EnqueuerClient.getInstance().run();
