<template>
    <div class="login-container">
        <div class="row">
            <div class="col left">
                <center>
                    <img src="./../assets/asdasd.png" class="imgleft">
                </center>
            </div>
            <div class="col">
                <center>
                    <img src="./../assets/radarblack.png" class="imgright">
                    <p class="msg"> {{ msg }} </p> 
                    <br/><br/><br/>
                    <b-form style="width:60%" @submit="onSubmit" @reset="onReset">
                        <b-form-input
                            id="contactnumber"
                            v-model="form.contactnumber"
                            required
                            placeholder="09xxxxx"
                            class="loginform"
                            type="tel"
                            pattern="[9]{1}[0-9]{9}"
                        ></b-form-input> 
                        <br/><br/>
                        <b-form-input
                            id="password"
                            v-model="form.password"
                            required
                            placeholder="Password"
                            class="loginform"
                            type="password"
                        ></b-form-input>
                        <br/><br/>
                        <div class="row">
                            <div class="col">
                                <b-form-checkbox 
                                        value="true"
                                        unchecked-value="false"
                                        v-model="form.remember" 
                                        class="check box formtext">Remember me</b-form-checkbox>
                            </div>
                            <div class="col">
                                <p class="forgotpass formtext"> Forgot Password </p> 
                            </div>
                        </div>
                        <br/><br/><br/>
                        <b-button type="submit" variant="primary" class="loginbtn">Login</b-button>
                    </b-form>
                    <br/><br/><br/>
                    <a href="#" class="createaccount">Not Registered? Create an Account!</a>
                </center>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome back! Please login to your account.',
      form : {
          contactnumber: '',
          password: '',
          remember: false,
          loading: false
      }
    }
  },
  methods: {
      onSubmit(event) {
        event.preventDefault()
        const loginform = { "contactNumber": this.form.contactnumber , "pin" : this.form.password}
        this.$http
            .post(process.env.API_URL +'api/v1/login',loginform)
            .then(response => {
                console.log("response >> " + response)
            })
            .catch(error => {
                console.log("error >> " +error)
            })
            .finally(() => this.loading = false)
      },
      onReset(event) {
        event.preventDefault();
        this.form.contactnumber = '';
        this.form.password = '';
        this.form.remember = false;
      }
    }
}
</script>

<style>
    html {
        height: 100%;
    }
    body {
        min-height: 100%;
        max-width: 100%;
        background: url("./../assets/dashboard-blue-logobg.png") 0% 0% no-repeat;
        background-size: 50% 100%;
    }
    .row{
        margin-left: 0px;
        margin-right: 0px;
    }
    .imgleft{
        margin-top: 40%;
    }
    .imgright{
        margin-top: 10%;
        background: transparent url('./../assets/radarblack.png') 0% 0% no-repeat padding-box;
        opacity: 1;
    }
    .msg{
        margin-top: 2%;
        color: #4D4F5C;
        opacity: 0.5;
        font-size: 18px;
        font: Montserrat;
    }
    .loginform{
        opacity: 1;
        /*height: 29px;*/
        border-style: none none solid none;
    }
    .forgotpass{
        text-align: right;   
    }
    .formtext{
        color: #303030;
        font: normal normal normal 13px/20px Montserrat;
    }
    .checkbox{
        position:absolute;
    }
    .loginbtn{
        width:100%;
        height: 61px;
        border-radius: 21px;
        opacity: 1;
    }
    .createaccount{
        text-align: center;
        text-decoration: underline;
        font: normal normal normal 14px/25px Montserrat;
        letter-spacing: 0px;
        color: #303030;
        opacity: 1;
    }
    .check.box.formtext.custom-control.custom-checkbox {
        padding-left: 0px;
    }
</style>
