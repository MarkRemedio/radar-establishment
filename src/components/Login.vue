<template>
    <div class="login-container h-100">
        <div class="row h-100">
            <div class="col col-xs-6 col-sm-6 col-md-6 left h-100">
                <center>
                    <img src="./../assets/asdasd.png" class="imgleft">
                </center>
            </div>
            <div class="col col-xs-6 col-sm-6 col-md-6 h-100" id="logindiv">
                <center>
                    <img src="./../assets/radarblack.png" class="imgright">
                    <p class="msg"> {{ msg }} </p> 
                    <br/><br/><br/>
                    <b-form style="width:60%" @submit="onSubmit" @reset="onReset">
                        <b-form-input
                            id="contactnumber"
                            v-model="form.contactnumber"
                            required
                            placeholder="Number"
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
                        <span class="errormsg" v-bind:style="{ display : displayerrormsg }"> {{ errormsg }}</span>
                        <!--div class="row">
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
                        </div-->
                        <br><br/><br/>
                        <b-button type="submit" variant="primary" class="loginbtn">Login</b-button>
                    </b-form>
                    <!--br/><br/><br/>
                    <a href="#" class="createaccount">Not Registered? Create an Account!</a-->
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
            errormsg: 'Invalid number/password',
            displayerrormsg: 'none',
            form : {
                contactnumber: '',
                password: '',
                remember: false,
                loading: false,
                token: localStorage.getItem('access_token') || null,
            }
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            const loginform = { "contactNumber": this.form.contactnumber , "pin" : this.form.password}
            this.$http
                .post(process.env.API_URL +'api/auth/login',loginform)
                .then(response => {
                    if(response.data.data.user.role === 'establishment'){
                        const token = response.data.data.token;
                        localStorage.setItem('access_token', token);
                        this.$session.start();
                        this.$session.set('name', response.data.data.user.firstName);
                        this.$session.set('id', response.data.data.user._id);
                        this.$session.set('profileurl', response.data.data.user.profileImageFileId);
                        this.$router.push({ name : 'establishment' });
                    }else{
                        this.displayerrormsg = 'block';
                        this.errormsg = 'Unauthorized';
                        this.form.contactnumber = '';
                        this.form.password = '';
                    }
                })
                .catch(error => {
                    this.displayerrormsg = 'block';
                    this.errormsg = 'Invalid Number/Password';
                    this.form.contactnumber = '';
                    this.form.password = '';
                })
                .finally(() => this.loading = false)
        },
        onReset(event) {
            event.preventDefault();
            this.form.contactnumber = '';
            this.form.password = '';
            this.form.remember = false;
        }
    },
}
</script>

<style>
    body {
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
        margin-left: -55px;
    }
    .errormsg{
        font: normal normal normal 18px/25px Montserrat;
        color: red;
        text-align: left;
        margin-top: 10px;
    }
    @media only screen 
    and (max-device-width: 1024px) {
        div#logindiv {
            margin-top: 30%;
        }
        .imgleft {
            margin-top: 120%;
        }
        body, html{
          overflow-y: hidden;
        }
    }
</style>
