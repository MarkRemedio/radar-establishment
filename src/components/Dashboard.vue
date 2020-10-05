<template>
  <div>
    <Header/>
    
    <div class="row">
      <div class="col-lg-2">
        <SideBar/>
      </div>
      <div class="col-lg-10">
        <div class="bodycontainer"> 
            <h2 class="title"> Establishment </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import SideBar from './Sidebar.vue'

export default {
  name: 'app',
  components: {
    Header,
    SideBar
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
  .title{
    font: normal normal normal 30px/40px Montserrat;
    letter-spacing: 0px;
    color: #303030;
    opacity: 1;
  }
  .bodycontainer{
    margin-top: 20px;
    margin-left: 20px;
  }
  .row {
    margin-right: 0px;
  }
</style>

