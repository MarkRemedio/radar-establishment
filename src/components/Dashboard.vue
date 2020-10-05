<template>
  <div>
    <Header/>
    
    <div class="maincontent">
      <div class="row">
        <div class="col-lg-2">
          <SideBar/>
        </div>
        <div class="col-lg-10">
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
          ['ESTABLISHMENT', 'ADDRESS', 'CONTACT NO.', 'ACTIONS'],
          [1, 'b3ba90', '7c95f7', '9a3853'],
          [2, 'ec0b78', 'ba045d', 'ecf03c'],
          [3, '63788d', 'a8c325', 'aab418']
        ],
        header: 'row',
        enableSearch: true
      }
    }
  },
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
</style>

