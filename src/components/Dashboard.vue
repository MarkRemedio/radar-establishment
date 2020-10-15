<template>
  <div>
    <Header/>
    
    <div class="maincontent">
      <div class="row">
        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
          <SideBar/>
        </div>
        <div class="col-lg-10 col-md-10 col-sm-6 col-xs-6">
          <div class="bodycontainer"> 
              <h2 class="title"> Establishment </h2>

              <div class="datatable">
                <vue-table-dynamic :params="params" ref="table"></vue-table-dynamic>
              </div>
          </div>
        </div>
      </div>
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
          ['ESTABLISHMENT', 'ADDRESS', 'CONTACT NO.', 'ACTIONS']
        ],
        header: 'row',
        highlight: { row: [0] },
        highlightedColor: '#F5F6FA',
        enableSearch: true,
        pagination: true,
        pageSize: 5,
        pageSizes: [5, 10, 20]
      }
    }
  },
  created (){
    const random = () => {
      return parseInt(Date.now() + Math.random() * 10000000).toString(16).slice(-6)
    }
    for (let i = 0; i < 40; i++) {
      this.params.data.push([i+1, `${random()}`, `${random()}`, `${random()}`])
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
    margin-right: 20px;
  }
  .row {
    margin-right: 0px;
  }
  .maincontent .row {
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
  span.table-cell-inner.flex-c-s
  {
    margin-left: 15px;
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
    position: absolute;
    margin-right: 30%;
}
</style>

