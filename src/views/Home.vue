<template>
  <table class="container">
    <tr>
      <td colspan="2" class="header">
        <span class="title">英语学习平台</span>
        <nav>
          <div class="navg">
            <el-row>
              <el-col :span="1"
                ><div class="grid-content bg-purple-light">
                  <el-link href="/#/home"><span>首页</span></el-link>
                </div></el-col
              >
              <el-col :span="2"
                ><div class="grid-content">
                  <el-link href="/#/recommend"><span style="color:#fff;">视频推荐</span></el-link>
                </div></el-col
              >
              <el-col :span="2"
                ><div class="grid-content">
                  <el-link href="/#/search"><span style="color:#fff;">视频查询</span></el-link>
                </div></el-col
              >
              <el-col :span="2"
                ><div class="grid-content">
                  <el-link href="/#/person"><span style="color:#fff;">个人信息</span></el-link>
                </div></el-col
              >
            </el-row>
          </div>
        </nav>
      </td>
    </tr>
    <tr>
      <td class="left-menu">
        <div class="menu">
          <el-table :data="tableData" border style="width: 100%" @row-click="handle">
            <el-table-column
              align="center"
              header-align="center"
              prop="date"
              label="阶段"
              width="180"
            >
            </el-table-column>
          </el-table>
        </div>
      </td>
      <td class="content">
        <div id="e1" class="panel">
          
          <div class="panel-heading">
            <span class="panel-heading-text"><i class="el-icon-reading"></i>语法初级</span>
          </div>
          <div class="panel-body">
            <div class="module" v-for="item in chuji" :key="item.lId">
            <router-link
              
              :to="`/study/${item.lId}`">
            <Lesson :item="item"/>
            </router-link>
            </div>
          </div>
          
        </div>
        <div id="e2" class="panel">
          <div class="panel-heading">
            <span class="panel-heading-text"><i class="el-icon-reading"></i>语法中级</span>
          </div>
          <div class="panel-body">
            <div class="module" v-for="item in zhongji" :key="item.lId">
            <router-link
              
              :to="`/study/${item.lId}`">
            <Lesson :item="item"/>
            </router-link>
            </div>
          </div>
        </div>
        <div id="e3" class="panel">
          <div class="panel-heading">
            <span class="panel-heading-text"><i class="el-icon-reading"></i>语法高级</span>
          </div>
          <div class="panel-body">
            <div class="module" v-for="item in gaoji" :key="item.id">
            <router-link
              
              :to="`/study/${item.lId}`">
            <Lesson :item="item"/>
            </router-link>
            </div>
          </div>
        </div>
        
      </td>
    </tr>
  </table>
</template>

<script>
import { ref } from 'vue'
import { get } from '../utils/request'
import Lesson from '../components/Lesson'

export default {

  name:"Home",
  components:{Lesson},

  setup(){
    const tableData=[
      { date: "语法初级" },
        { date: "语法中级" },
        { date: "语法高级" },
        
    ]
    
    const goAnchor=(selector)=>{
      var anchor =document.querySelector(selector) // 参数为要跳转到的元素id
      document.body.scrollTop = anchor.offsetTop; // chrome
      document.documentElement.scrollTop = anchor.offsetTop;
    }
    const handle=(row)=>{
      var i=0;
      for (const iterator of tableData){
        i++;
        if(row.date==iterator.date){
          goAnchor("#e"+i);
          break;
        }
    }
    
  }
  
  const chuji=ref([]);
  const zhongji=ref([]);
  const gaoji=ref([]);

    const getLessonInfo=async () => {
    const result = await get('/api/lesson-list')
    
    
    if (result?.success==true) {
      chuji.value = result?.data?.chuji;
      zhongji.value= result?.data?.zhongji;
      gaoji.value= result?.data?.gaoji;
    } 
    }
  getLessonInfo();

  return {tableData,handle,chuji,gaoji,zhongji,getLessonInfo}
  }
}
 /*  data() {
    return {
      tableData: [
        { date: "阅读初级" },
        { date: "阅读中级" },
        { date: "阅读高级" },
        { date: "听力初级" },
        { date: "听力中级" },
        { date: "听力高级" },       
      ],
      activeIndex: "1",
      activeIndex2: "1",
      
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handle(row){
      var i=0;
      for (const iterator of this.tableData){
        i++;
        if(row.date==iterator.date){
          this.goAnchor("#e"+i);
          break;
        }
      }
      
    },
    goAnchor(selector) {
        var anchor = this.$el.querySelector(selector) // 参数为要跳转到的元素id
        document.body.scrollTop = anchor.offsetTop; // chrome
        document.documentElement.scrollTop = anchor.offsetTop;
    }
  }, */
</script>

<style scoped>
.container {
  margin-top: 30px;
  width: 1200px;
  /* background-color: green; */
  height: 3000px;
}

.header {
  width: 1200px;
  height: 70px;
  /* background-color: rgb(230, 46, 46); */
}

.left-menu {
  
  width: 20%;
  /* background-color: rgb(54, 64, 204); */
}

.menu {
  position: fixed;
  top: 150px;
  left: 50px;
}

.content {
  float: left;
}

.title {
  font-family: Georgia, "Times New Roman", Times, serif;
  color: #33322e; 
  font-size: 35px;
  
}
.navg {
  height: 40px;
  padding-left: 0;
  margin-bottom: 0;
  
  color: #fff;
  background-color: #337ab7;
}



.grid-content {
  font-size: 20px;
  text-align: center;
  min-height: 40px;
}
.bg-purple-light {
  background: #ebeff8;
}
.panel{
  
  top:20px;
  width: 930px;
  height: 500px;
  /* background-color: rgb(221, 20, 188); */
  border:0px solid ;
  
}


.panel-heading{
  display: table;
  margin-top: 25px;
  width: 930px;
  height: 50px;
  color: #333;
  background-color:#ddd;
  border: 1px solid #ddd
}
/* .row{
  display: table-row;
} */
.panel-heading-text{
  display: table-cell;
  padding-left: 20px;
  vertical-align: middle;
}

.panel-body{
  width: 100%;
  height: 420px;
  /* background-color: lawngreen; */
  overflow: scroll;
  border: 1px solid #ddd;
}
.module {
    display: block;
    width: 220px;
    height: 150px;
    margin: 25px;
    padding: 10px;
    background-color: #d9edf7;
    float: left;
    border-radius: 18px;
    position: relative;
}
a {
  text-decoration: none;
}
 
.router-link-active {
  text-decoration: none;
}

</style>