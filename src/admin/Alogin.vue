<template>
  <div>
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="login-box"
    >
      <h3 class="login-title" style="font-family: arial; color: #409eff">
        欢迎进入后台管理
      </h3>
      <el-form-item label="账号" prop="nickname">
        <el-input
          type="text"
          placeholder="请输入账号"
          v-model="form.nickname"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        />
      </el-form-item>

      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="6"
            ><el-button type="primary" @click="handleLogin"
              >登录</el-button
            ></el-col
          >
         <!--  <el-col :span="6"><el-button type="register" @click="handleRegisterClick">注册</el-button></el-col> -->
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {useRouter } from 'vue-router'
import {reactive} from 'vue'
import {post} from '../utils/request'
//import { useStore } from 'vuex'
  export default {
    name: "Alogin",
    setup(){
     //const store = useStore()
      const form=reactive({nickname:'',password:''})
      const router = useRouter();
      const handleLogin=async()=>{
        try{
          const result=await post('/api/alogin',{
            nickname: form.nickname,
            password: form.password
          })
          if(result?.success){
            
            router.push({name:'Administer'})
          }else{
            alert('登录失败')
          }
        }catch(e){
          console.log(e)
        }

    }
    /* const handleRegisterClick=()=>{
      router.push({name:'Register'})
    } */
    return {handleLogin,form}
    }
  }

</script>

<style lang="scss" scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>