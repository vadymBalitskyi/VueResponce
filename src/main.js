import 'buefy/lib/buefy.css'

import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import Rx from 'rxjs'
import VueRx from 'vue-rx'
import lodash from 'lodash'
import Buefy from 'buefy'

Vue.use(VueResource)
Vue.use(VueRx, Rx)
Vue.use(lodash)
Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
