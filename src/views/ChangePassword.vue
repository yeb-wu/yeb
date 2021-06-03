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
        修改密码
      </h3>
      <el-form-item label="原密码" prop="old_password">
        <el-input
          type="password"
          placeholder="请输入原密码"
          v-model="form.old_password"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input
          type="password"
          placeholder="请新密码"
          v-model="form.new_password"
        />
      </el-form-item>

      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12"
            ><el-button type="primary" @click="handleChange"
              >确认修改</el-button
            ></el-col
          >
          <el-col :span="6"><el-button type="back" @click="handleBack">返回</el-button></el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {useRouter } from 'vue-router'
import {reactive} from 'vue'
import {post} from '../utils/request'
/* import { useStore } from 'vuex' */ 
  export default {
    name: "ChangePassword",
    setup(){
      /* const store = useStore() */
      const form=reactive({old_password:'',new_password:''})
      const router = useRouter();
      /* const store =useStore(); */
      const handleChange=async()=>{
        try{
          if(form.old_password==localStorage.loginPassword){
            const result=await post('/api/changePassword',{
            lId:localStorage.loginId,
            password:form.new_password
            })
            if(result?.success){
            localStorage.loginPassword=form.new_password
            router.push({name:'Person'})
            }
            else{
            alert('修改失败')
            }         
          }else{
            alert('原密码错误')
          }
          
        }catch(e){
          console.log(e)
        }
      }
     
    const handleBack=()=>{
      router.push({name:'Person'})
    }
    return {handleChange,form,handleBack}
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