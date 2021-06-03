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
        欢迎进入英语学习平台
      </h3>
      <el-form-item label="账号" prop="username">
        <el-input
          type="text"
          placeholder="请输入账号"
          v-model="form.username"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input
          type="password"
          placeholder="请确认密码"
          v-model="form.certainPassword"
        />
      </el-form-item>

      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12"
            ><el-button type="primary" @click="handleLogin"
              >已有账号去登陆</el-button
            ></el-col
          >
          <el-col :span="6"><el-button type="register" @click="handleRegister">注册</el-button></el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import {reactive} from 'vue';
import { post } from "../utils/request";
export default {
  name: "Register",
  setup() {
    const router = useRouter();
    const form=reactive({username:'',password:'',
      certainPassword: ""})
    
    const  handleLogin= () => {
      router.push({ name: "Login" });
    };
    const handleRegister=async()=>{
        try{
          const result=await post('/api/register',{
            username: form.username,
            password: form.password
          })
          if(result?.success){
            router.push({name:'Login'})
          }else{
            alert('注册失败')
          } 
        }catch(e){
          alert('请求失败')
        }

    }
    return { form, handleLogin,handleRegister };
  },
};
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