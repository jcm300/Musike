import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueYouTubeEmbed from 'vue-youtube-embed'

Vue.use(VueYouTubeEmbed)

Vue.config.productionTip = false

Vue.prototype.$urlAPI = 'http://localhost:3000'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
