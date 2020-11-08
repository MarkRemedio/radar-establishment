<template>
    <div class="maincontent h-100">
      <Header/>
      <div class="bodycontainer"> 
          <h2 class="title"> Establishment Logs </h2>
          <center>
            <div class="datatable">
              <date-picker 
                v-model="daterange" 
                type="date" 
                range 
                placeholder="Select date range" 
                format="YYYY-MM-DD"
                width="200"></date-picker>
              <vue-table-dynamic :params="params" ref="table"></vue-table-dynamic>
            </div>
          </center>
      </div>
    </div>
</template>

<script>
import Header from './Header.vue'
import SideBar from './Sidebar.vue'
import VueTableDynamic from 'vue-table-dynamic'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name: 'app',
  components: {
    Header,
    SideBar,
    VueTableDynamic,
    DatePicker,
  },
  data(){
    return {
      daterange: '',
      localIndividual: null,
      params: {
        data: [
          ['ID', 'Name', 'Address', 'In/Out', 'Designated Area', 'Time Logged']
        ],
        header: 'row',
        highlight: { row: [0] },
        highlightedColor: '#F5F6FA',
        enableSearch: true,
        pageSize: 5,
        pageSizes: [5, 10, 20],
        pagination: true,
        columnWidth: [
          {column: 0, width: '7%'}, 
          {column: 1, width: '18%'}, 
          {column: 2, width: '35%'}, 
          {column: 3, width: '10%'}, 
          {column: 4, width: '15%'},
          {column: 5, width: '15%'},
        ],
      },
    }
  },
  watch: {
    daterange : function (){
      Promise.all([
          this.fetchAllAccessLogs(),
        ])
        .then((values) => {
          this.params.data = [['ID', 'Name', 'Address', 'In/Out', 'Designated Area', 'Time Logged']];
          values[0].forEach((logs) => {
            let userDetails = this.localIndividual.get(logs.individualId);
            if(userDetails != null){
              let logTime = new Date(logs.createdAt);
              let fromDate = new Date(this.daterange[0]);
              let toDate = new Date(this.daterange[1]);

              if(fromDate.getTime() <= logTime.getTime() && toDate.getTime() >= logTime.getTime()){
                console.log("time " + logTime + " is within range");
                this.addDatatoTable(userDetails, logs, logTime);
              }
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  methods : {   
    filltable: function () {
      Promise.all([
          this.fetchAllIndividuals(),
          this.fetchAllAccessLogs(),
        ])
        .then((values) => {
          console.log(values[0]);
          this.localIndividual = values[0];
          values[1].forEach((logs) => {
            let userDetails = this.localIndividual.get(logs.individualId);
            if(userDetails != null){
              let logTime = new Date(logs.createdAt);
              
              this.addDatatoTable(userDetails, logs, logTime);
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    },

    fetchAllAccessLogs : function () {
      return this.$http.get(process.env.API_URL +'api/access-logs?establishmentId='+this.$session.get('id') , { 
        headers : { 
          'Authorization': `Bearer `+ localStorage.getItem('access_token')
        } 
      })
      .then(response => response.data.data);
    },

    fetchAllIndividuals : function (){
      let namesiddata = new Map();
      this.$http.get(process.env.API_URL +'api/users?role=individual', { 
        headers : { 
          'Authorization': `Bearer `+ localStorage.getItem('access_token')
        } 
      })
      .then(response => {
        response.data.data.forEach((user) => {
          namesiddata.set(user._id,[
              user.firstName,
              user.middleName,
              user.lastName,
              user.displayId,
              user.address
            ]);
        });
      });

      return namesiddata;
    },

    addDatatoTable : function(userDetails, logs, logTime){
      logTime = logTime.toString();
      let idx = logTime.indexOf("GMT");
      let userNameArray = [userDetails[0],userDetails[1],userDetails[2]];
      let userId = userDetails[3];
      let userAddress = userDetails[4];

      logTime = logTime.slice(0, idx-1);
      this.params.data.push([
        userId,
        userNameArray.join(" "), 
        userAddress.brgyName + " " + userAddress.citymunName + " " + userAddress.provName,
        logs.accessType.toUpperCase(), 
        logs.designatedArea,
        logTime
      ]);
    }

  },
  mounted (){
    this.filltable();
  }
}
</script>

<style>
  .title{
    font: normal normal normal 30px/40px Montserrat;
    letter-spacing: 0px;
    color: #303030;
    opacity: 1;
    padding-left: 15px;
    padding-top: 20px;
  }
  .bodycontainer{
    margin-left: 20px;
    margin-right: 20px;
  }
  .maincontent {
    background: #F0F3F7 0% 0% no-repeat padding-box;
  }
  .datatable {
    background-color: white;
    padding: 20px;
  }
  input.vue-input.placeholder-light.prefix {
    width: 409px;
    height: 45px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 10px #0000002B;
    border-radius: 20px;
    opacity: 1;
    margin-left: 5px;
  }
  .v-table {
    margin-top: 30px;
  }
  .v-table-header-wrap {
    height: 58px;
    text-align: left;
    font: normal normal 600 14px/18px Montserrat;
    letter-spacing: 0px;
    color: #727C90;
    text-transform: uppercase;
    opacity: 0.8;
  }
  .v-table-row.flex-c {
    height: 65px !important;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    text-align: left;
    letter-spacing: 0px;
    font-size: 14px;
    font: Montserrat;
  }
  .table-cell.flex-c-s,
  .table-cell.flex-c
  {
    padding-left: 20px;
  }
  i.iconfont.iconsearch {
    width: 35px;
    padding-left: 10px;
    margin-top: 5px;
  }
  input.vue-input.placeholder-light.prefix {
    padding-left: 40px;
    margin-top: 5px;
  }
  .pagination-page.flex-c {
    margin:auto;
  }
  .row {
    margin-right: 0px;
  }
  .mx-datepicker-range {
    width: 220px;
    float: right;
    position: relative;
    margin-bottom: -30%;
    margin-top: 10px;
  }
  input.mx-input {
    height: 45px;
    box-shadow: 0 0 10px #0000002B;
    border-radius: 20px;
    opacity: 1;
  }
</style>

