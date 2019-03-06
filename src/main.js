import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

store.commit('addPublisherProtocol', {
        type: 'amqp',
        sync: false
    }
);
store.commit('addSubscriptionProtocol', {
        type: 'amqp',
    },
);
store.commit('addPublisherProtocol', {
        type: 'mqtt',
        sync: false
    }
);
store.commit('addSubscriptionProtocol', {
        type: 'mqtt',
    },
);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
