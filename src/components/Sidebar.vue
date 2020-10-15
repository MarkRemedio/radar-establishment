<template>
  <div class="sidebar-container">
    <b-nav vertical class="w-100" v-bind:style="{ height : screenheight + 'px'}">
      <b-nav-item active><router-link to="/establishment">Establishments</router-link></b-nav-item>
      <b-nav-item active><router-link to="">Individuals</router-link></b-nav-item>
      <b-nav-item active><router-link to="">ID Submission</router-link></b-nav-item>
      <b-nav-item active><router-link to="">Reported Person</router-link></b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      screenheight : window.innerHeight - 70
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
  methods: {  
    onResize() {
      this.windowHeight = window.innerHeight
    },
  }
}
</script>

<style>
  .sidebar-container{
      background: #0367B2 0% 0% no-repeat padding-box;
      opacity: 1;
      background-size: auto auto;
  }

  a.nav-link {
    text-align: left;
    font: normal normal normal 20px/24px Montserrat;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
    margin-left: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  a.router-link-exact-active.router-link-active {
    color: #ffff;
  }
  .col-lg-2{
    padding-left: 0px;
  }
</style>
