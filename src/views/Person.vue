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
                ><div class="grid-content bg-purple-light">
                  <el-link href="/#/person"><span>个人信息</span></el-link>
                </div></el-col
              >
            </el-row>
          </div>
        </nav>
      </td>
    </tr>
    <tr>
      <el-container style="height: auto; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template #title
                ><i class="el-icon-message"></i>个人信息</template
              >
              <el-menu-item index="1-1" @click="handleOne"
                >个人资料</el-menu-item
              >
              <el-menu-item index="1-2" @click="handleTwo"
                >学习记录</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleChange"
                    >修改密码</el-dropdown-item
                  >
                  <el-dropdown-item @click="handleBack">退出账户</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>{{ loginName }}</span>
          </el-header>
          <el-main>
            <!-- <component :is="currentTabComponent"></component> -->
            <Information v-if="currentTabComponent == 'Information'" />
            <Record v-if="currentTabComponent == 'Record'" />
          </el-main>
        </el-container>
      </el-container>
    </tr>
  </table>
</template>

<script>
import Information from "./Information";
import Record from "./Record";
import { ref, computed, reactive, provide } from "vue";
/* import { useStore } from "vuex"; */
import { get } from "../utils/request";
import { useRouter } from "vue-router";
export default {
  components: { Information, Record },
  name: "Person",

  setup() {
    const router = useRouter();
    /* const store = useStore(); */
    const currentTabComponent = ref("");
    const handleTwo = () => {
      currentTabComponent.value = "Record";
    };
    const handleOne = () => {
      currentTabComponent.value = "Information";
      console.log(localStorage.loginName); //注意每次请求时都要先进行登录操作，把store里得login名赋值
    };

    const data = reactive({ personInfo: {}, personRecord: {} });

   /*  const getPersonData = (tab) => {
      axios
        .get('https://www.fastmock.site/mock/c2662fb669b9378b206443199c38de89/learn/api/person', {
          params: {
            tab: tab,
          },
        })
        .then(function (response) {
         data.personInfo= response?.data.data.personInfo
         data.personRecord= response?.data.data.personRecord
        })
        .catch(function (error) {
          console.log(error);
        });
    }; */

    const getPersonData = async (uid) => {
      const result = await get('/api/person', {uid})
      if(result?.success === true) {
        
        data.personInfo = result.data.personInfo; 
        data.personRecord=result.data.personRecord; 
        currentTabComponent.value = "Information";
      }
    }  
    provide("data", data)
    getPersonData(localStorage.loginId);

    /* const {personInfo,personRecord}=toRefs(data) */
    
    
    const handleChange = () => {
      router.push({ name: "ChangePassword" });
    };
    const handleBack=()=>{
      
      localStorage.removeItem('isLogin');
      router.push({ name: "Login" })
       
    }
    return {
      currentTabComponent,
      handleTwo,
      handleOne,
      loginName: computed(() => localStorage.loginName),
      handleChange,
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