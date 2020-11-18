import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router/router.js'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(BootstrapVue)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('access_token') === null) {
      next({
        name: 'login',
      })
    } 
    next()
  } else if(to.matched.some(record => record.meta.requiresVisitor)) {
    if (localStorage.getItem('access_token') !== null) {
      next({
        name: 'establishment',
      })
    } 
    next()
  } else {
    next()
  }
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
