<template>
    <div class="maincontent h-100">
      <Header/>
      <div class="bodycontainer"> 
          <h2 class="title"> Establishment Logs </h2>
          <center>
            <div class="datatable">
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

export default {
  name: 'app',
  components: {
    Header,
    SideBar,
    VueTableDynamic 
  },
  data(){
    return {
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
          {column: 0, width: '15%'}, 
          {column: 1, width: '18%'}, 
          {column: 2, width: '27%'}, 
          {column: 3, width: '10%'}, 
          {column: 4, width: '15%'},
          {column: 5, width: '15%'},
        ],
      },
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
          let individuals = values[0];
          values[1].forEach((logs) => {
            let userDetails = values[0].get(logs.individualId);
            if(userDetails != null){
              let logTime = new Date(logs.createdAt).toString();
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
</style>

