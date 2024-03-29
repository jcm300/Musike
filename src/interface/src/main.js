import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueYouTubeEmbed from 'vue-youtube-embed'

Vue.use(VueYouTubeEmbed)

Vue.config.productionTip = false

Vue.prototype.$urlAPI = 'http://' + process.env.VUE_APP_SERVER_URL

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
