import * as Vue from 'vue';
import * as App from './components/App.vue';
import { EnqueuerClient } from './enqueuer/enqueuer-client';
import { RunnableModel } from './models/runnable-model';
import { ResultModel } from './models/results/result-model';
Vue.config.productionTip = false;

const runnable: RunnableModel = {
    'runnableVersion': '01.00.00',
    'name': 'runnableHttp',
    'id': 'randomIdFixedInRunnable',
    'initialDelay': 0,
    'runnables': [
        {
            'timeout': 30000,
            'name': 'HttpTitle',
            'subscriptions': [
                {
                    'type': 'http-server',
                    'name': 'HttpSubscriptionTitle',
                    'endpoint': '/enqueuer',
                    'port': 23075,
                    'method': 'POST',
                    'response': {
                        'status': 200
                    },
                    'timeout': 10000
                }
            ],
            'startEvent': {
                'publisher': {
                    'type': 'http-client',
                    'name': 'HttpPublisherClientTitle',
                    'url': 'http://localhost:23075/enqueuer',
                    'method': 'POST',
                    'payload': {
                        'enqueuer': 'virgs'
                    },
                    'headers': {
                        'content-type': 'application/json'
                    }
                }
            }
        }
    ]
};

//tslint:disable-next-line:no-unused-expression
new Vue(App).$mount('#app');
const enqueuer = new EnqueuerClient(runnable);
enqueuer.on('response', (response: ResultModel) => console.log(`response: ${response}`));
enqueuer.on('exit', (response: number) => console.log(`exit: ${response}`));
enqueuer.on('error', (response: Error) => console.log(`error: ${response}`));
enqueuer.send();