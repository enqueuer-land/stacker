import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

store.commit('addPublisherProtocol', {
        type: 'http',
        sync: true,
        module: () => import('./components/stage/publishers/HttpPublisher.vue')
    }
);
store.commit('addSubscriptionProtocol', {
        type: 'http',
        module: () => import('./components/stage/subscriptions/HttpSubscription.vue')
    },
);
store.commit('addPublisherProtocol', {
        type: 'amqp',
        sync: false,
        module: () => import('./components/stage/publishers/AmqpPublisher.vue')
    }
);
store.commit('addSubscriptionProtocol', {
        type: 'amqp',
        module: () => import('./components/stage/subscriptions/AmqpSubscription.vue')
    },
);
store.commit('addPublisherProtocol', {
        type: 'mqtt',
        sync: false,
        module: () => import('./components/stage/publishers/MqttPublisher.vue')
    }
);
store.commit('addSubscriptionProtocol', {
        type: 'mqtt',
        module: () => import('./components/stage/subscriptions/MqttSubscription.vue')
    },
);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
