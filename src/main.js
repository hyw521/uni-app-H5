import Vue from 'vue'
import App from './App'

import store from './store'
import VConsole from 'vconsole'
const vConsole = new VConsole()

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
