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
          ['Name', 'In/Out', 'Time Logged']
        ],
        header: 'row',
        highlight: { row: [0] },
        highlightedColor: '#F5F6FA',
        enableSearch: true,
        pageSize: 5,
        pageSizes: [5, 10, 20],
        pagination: true,
        columnWidth: [{column: 0, width: '30%'}, {column: 1, width: '20%'}, {column: 2, width: '50%'}],
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
          let individuals = values[0];
          values[1].forEach((logs) => {
            var logTime = Date.parse(logs.createdAt);
            var type = logs.accessType.toUpperCase();
            this.params.data.push([values[0].get(logs.individualId).join(" "), type, new Date(logTime)]);
          })
        })
        .catch(error => {
          console.log(error)
        })
    },

    fetchAllAccessLogs : function () {
      //this.$session.get('id') 
      //5f86a0682d3d1553940e6f3c
      return this.$http.get(process.env.API_URL +'api/access-logs?establishmentId='+this.$session.get('id') , { 
        headers : { 
          'Authorization': `Bearer `+ localStorage.getItem('access_token')
        } 
      })
      .then(response => response.data.data);
    },

    fetchAllIndividuals : function (){
      var namesiddata = new Map();
      this.$http.get(process.env.API_URL +'api/users?role=individual', { 
        headers : { 
          'Authorization': `Bearer `+ localStorage.getItem('access_token')
        } 
      })
      .then(response => {
        response.data.data.forEach((user) => {
          namesiddata.set(user._id,[user.firstName,user.middleName,user.lastName]);
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
    opacity: 0.6;
  }
  .v-table-row.flex-c {
    height: 65px !important;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    opacity: 1;
    text-align: left;
    font: normal normal normal 13px/20px Montserrat;
    letter-spacing: 0px;
    color: #303030;
    opacity: 1;
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

