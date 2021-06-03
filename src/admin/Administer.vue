<template>
  <table class="container">
    <tr>
      <el-container style="height: auto; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template #title
                ><i class="el-icon-message"></i>学生管理</template
              >
              <el-menu-item index="1-1" @click="handleStuInfo"
                >学生信息修改</el-menu-item
              >
              
            </el-submenu>
            <el-submenu index="2">
              <template #title
                ><i class="el-icon-message"></i>视频管理</template
              >
              <el-menu-item index="2-1" @click="handleVidioInfo"
                >视频信息管理</el-menu-item
              > 
               
            </el-submenu>
            <el-submenu index="3">
              <template #title
                ><i class="el-icon-message"></i>试题管理</template
              >
              
              <el-menu-item index="3-1" @click="handleQuetionInfo"
                >试题信息修改</el-menu-item
              > 
            </el-submenu>

            <el-submenu index="4">
              <template #title
                ><i class="el-icon-message"></i>知识管理</template
              >
              
              <el-menu-item index="4-1" @click="handleKnowledgeInfo"
                >知识点修改</el-menu-item
              > 
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container>
          <el-header style="text-align: right; font-size: 20px ;background-color: #337ab7">
            <span style="float: left; color:#fff">后台管理系统</span>
            <el-dropdown>
              <i class="el-icon-setting" style="font-size:25px;margin-right: 15px ; color:#fff"></i>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleBack">退出账户</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span style="color:#fff">{{ loginName }}</span>
          </el-header>
          <el-main>
            <StuInfo v-if="currentTabComponent=='StuInfo'" />
            <VidioInfo v-if="currentTabComponent=='VidioInfo'" />
            <Question v-if="currentTabComponent=='Question'" />
            <KnowledgeInfo v-if="currentTabComponent=='KnowledgeInfo'" />
          </el-main>
        </el-container>
      </el-container>
    </tr>
  </table>
</template>

<script>
import StuInfo from "./StuInfo"
import VidioInfo from "./VidioInfo"
import Question from "./Question"
import KnowledgeInfo from "./KnowledgeInfo"
import { ref} from "vue";
import { useRouter } from "vue-router";
export default {
  components: {StuInfo,VidioInfo,Question,KnowledgeInfo},
  name: "Adminster",

  setup() {
    const router = useRouter();
    const handleBack=()=>{
      router.push({ name: "Alogin" })
    }

    const currentTabComponent = ref("StuInfo");
    const handleKnowledgeInfo=()=>{
      currentTabComponent.value='KnowledgeInfo'
    }
    const handleStuInfo=()=>{
      currentTabComponent.value='StuInfo'
    }

    const handleVidioInfo=()=>{
      currentTabComponent.value='VidioInfo'
    }
    const handleQuetionInfo=()=>{
      currentTabComponent.value='Question'
    }
    /* const {personInfo,personRecord}=toRefs(data) */
    
    return {
      currentTabComponent,handleKnowledgeInfo,handleStuInfo,handleVidioInfo,
      handleQuetionInfo,
      handleBack
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 30px;
  width: 1200px;

  height: 3000px;
}

.header {
  width: 1200px;
  height: 70px;

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
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>