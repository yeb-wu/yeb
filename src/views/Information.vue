<template>
  <el-form
    :model="Form"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户昵称" prop="nickname">
      <el-input v-model="Form.nickname"></el-input>
    </el-form-item>
    <el-form-item label="用户手机" prop="phone">
      <el-input v-model="Form.phone"></el-input>
    </el-form-item>
    <el-form-item label="生日" required>
      <el-form-item prop="birthday">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          v-model="Form.birthday"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
    </el-form-item>

    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="Form.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-popconfirm
      title="确定要提交更改吗？"
      @confirm="submitForm('ruleForm'),handleSubmit()"
    >
    <template #reference>
      <el-button type="primary"
        >立即创建</el-button
      >
    </template>
      </el-popconfirm>
    <el-popconfirm
      title="这是一段内容确定删除吗？"
      @confirm="resetForm()"
    >
    <template #reference>
      <el-button >重置</el-button>
    </template>
    </el-popconfirm>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive,inject} from "vue";
import { post } from "../utils/request";
/* import { useStore } from "vuex"; */
/* import { useRoute } from "vue-router";
import { get } from "../utils/request"; */
export default {
  name:"Information",

  setup() {
    const data=inject('data');
    
    const Form = reactive({
      nickname: data?.personInfo.nickname,
      phone: data?.personInfo.phone,
      birthday: data?.personInfo.birthday,
      
      sex: data?.personInfo.sex,
    });
    console.log(Form)//这个不能删
    const rules = reactive({
      nickname: [
        { required: true, message: "请输入昵称", trigger: "blur" },
        { min: 2, max: 8, message: "长度在 2 到 5 个字符", trigger: "blur" },
      ],
      phone: [{ required: true, message: "请输入电话", trigger: "change" }],
      birthday: [
        {
          type: "date",
          required: true,
          message: "请选择出生日期",
          trigger: "change",
        },
      ],

      sex: [{ required: true, message: "请选择性别", trigger: "change" }],
    });
    
    const handleSubmit=async()=>{
       try{
          const result=await post('/api/submit/personInfo',{
            uId: localStorage.loginId,
            /* password: store.state.loginPassword, */
            nickname: Form.nickname,
            phone: Form.phone,
            birthday:Form.birthday,
            sex:Form.sex
          })
          if(result.success==true){
            localStorage.loginName=Form.nickname
            console.log(localStorage.loginName)
            alert("submit!");
          }else{
            alert('提交失败')
          }  
        }catch(e){
          alert('请求失败')
        }
    }
    const resetForm=()=> {
      Form.nickname=''
      Form.phone=''
      Form.birthday=''
      
      Form.sex=''
    }

    return { Form, rules,handleSubmit,resetForm};
  },
  methods: {
   submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          console.log(this.Form)
        } else {
          alert("error submit!!");
          return false;
        }
      });
    }, 
    
  },
};
</script>

<style scoped>
</style>