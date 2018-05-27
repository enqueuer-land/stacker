import * as Vue from 'vue';
import * as App from './components/App.vue';
import { EnqueuerClient } from './enqueuer/enqueuer-client';
import { RunnableModel } from './models/runnable-model';

Vue.config.productionTip = false;

//tslint:disable-next-line:no-unused-expression
new Vue(App).$mount('#app');