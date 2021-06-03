<template>
  <table class="container">
    <tr>
      <td colspan="2" class="header">
        <span class="title">英语学习平台</span>
        <nav>
          <div class="navg">
            <el-row>
              <el-col :span="1"
                ><div class="grid-content ">
                  <el-link href="/#/home"><span style="color:#fff;">首页</span></el-link>
                </div></el-col
              >
              <el-col :span="2"
                ><div class="grid-content bg-purple-light">
                  <el-link href="/#/recommend"><span >视频推荐</span></el-link>
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
        
      </td>
      <td class="content">
        <div class="panel">
          <div class="panel-heading">
            <span class="panel-heading-text"><i class="el-icon-reading"></i>课程推荐结果</span>
          </div>
          <div class="panel-body">
            <div class="module" v-for="item in lessonInfo" :key="item.lId">
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
import Lesson from '../components/Lesson'
import { ref } from 'vue'
import { get } from '../utils/request'
export default {
  name:"Recommend",
  components:{Lesson},
  setup(){
    const lessonInfo=ref([]); 
    const loginId=localStorage.loginId
    const getLessonInfo=async (uId) => {
    const result = await get('/api/recommend',{uId})

    if (result?.success) {
      lessonInfo.value = result?.data?.recommendResult
    } 
    }
    getLessonInfo(loginId);
      
  return {lessonInfo}
  }
}
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
  
  display: flex;
  flex-direction: column;
  top:20px;
  width: 930px;
  height: auto;
  
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
  height: 600px;
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