import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import VueProgress from 'vue-progress'

Vue.use(VueProgress)

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
