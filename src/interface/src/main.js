import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$urlAPI = 'http://localhost:3000'
Vue.prototype.$token = ''

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
