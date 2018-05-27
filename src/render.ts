import * as Vue from 'vue';
import * as App from './components/App.vue';
import { EnqueuerClient } from './enqueuer/enqueuer-client';
import { RunnableModel } from './models/runnable-model';
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
const enqueuer = new EnqueuerClient();
enqueuer.on('response', (response: string) => {
                    console.log(`Enqueuer response: ${response}`);
                });
enqueuer.sendMessage(runnable);