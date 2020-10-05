<template>
  <div class="header-container">
    <div class="row">
      <div class="col-lg-2">
        <div class="leftheader">
          <img src="./../assets/asdasd.png" class="logoheader">
        </div>
      </div>
      <div class="col-lg-10">
        <div class="rightheader">
            <b-dropdown id="dropdown-right" v-bind:text="name" class="headerdropdown">
              <b-dropdown-item href="#">Personal Details</b-dropdown-item>
              <hr>
              <b-dropdown-item href="#">Logout</b-dropdown-item>
            </b-dropdown>
          <img src="./../assets/person-icon.png" class="profile">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name: 'John Doe',
    }
  }
}
</script>

<style>
  .header-container{
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 6px #0000000A;
    opacity: 1;
    height: 70px;
  }
  .leftheader{
    background: #0367B2 0% 0% no-repeat padding-box;
    opacity: 1;
    height: 100%;
  }
  .rightheader{
    float: right;
    margin-top: 20px;
  }
  .row{
    height: 100%;
  }
  .logoheader{
    width: 85px;
    height: 32px;
    margin-left: 22px;
    margin-top: 15px;
  }
  .profile{
    border-radius: 50px;
    opacity: 1;
    width: 38px;
    height: 38px;
  }
  .dropdown-toggle::after {
    margin-left: 0.955em;
  }
  .dropdown .nav-link {color:#fff; text-decoration: none;}
  .dropdown .dropdown-menu a{color: #000; text-decoration: none; text-align: center;}
  .dropdown .btn {background: #fff; color:#000; border-style: none;}
  .dropdown-menu .dropdown-item {display: inline-block; width: 100%; padding: 10px 5px;}
  .container .dropdown .dropdown-menu a:hover
  {
    color: #000;
    background-color: #fff;
    border-color: #fff;
  }
  .btn-secondary:not(:disabled):not(.disabled):active, 
  .btn-secondary:not(:disabled):not(.disabled).active, 
  .show > .btn-secondary.dropdown-toggle{
    color: #000;
    background-color: #fff;
    border-color: #fff;
  }
  .dropdown-item,
  .dropdown-menu .dropdown-item{
    padding: 0px 2px;
  }
  #dropdown-right hr {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  button#dropdown-center__BV_toggle_ {
    padding: 2px;
  }
</style>
