import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? 'https://astronomy-pics.onrender.com/' : `http://localhost:3000/`
Vue.prototype.$http = axios

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
