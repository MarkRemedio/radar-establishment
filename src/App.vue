<template>
  <div id="app" class="h-100">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'

export default {
  name: 'app',
  components: {
    Login,
    Dashboard
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
  html {
    height: 100%;
  }
  body{
    height: 100%;
  }
  @media only screen 
    and (max-device-width: 1024px) {
        body, html{
          height: 100%;
        }
  }
</style>
