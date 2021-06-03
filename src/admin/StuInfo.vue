<template>
  <el-table :data="tableData" style="width: 100%" height="400">
    <el-table-column fixed prop="uId" label="id" sortable width="70"></el-table-column>
    <el-table-column fixed prop="nickname" label="昵称" width="150">
    </el-table-column>
    <el-table-column prop="phone" label="手机" width="150"> </el-table-column>
    <el-table-column prop="password" label="密码" width="150">
    </el-table-column>
    <el-table-column prop="sex" label="性别" width="50"> </el-table-column>
    <el-table-column prop="birthday" label="生日" width="150">
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改
        </el-button>
        <el-popconfirm
           title="这是一段内容确定删除吗？" @confirm="handleDelete(scope.$index, scope.row)"
        >
        <template #reference>
        <el-button
          size="mini"
          type="danger"
          >删除
        </el-button>
        </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <el-button style="float:right" type="primary" @click="handleInsert()">添加</el-button>

  <el-dialog title="学生信息" v-model="dialogFormVisible">
    <el-form :model="Form">
      <el-form-item label="用户昵称" :label-width="formLabelWidth">
        <el-input v-model="Form.nickname"></el-input>
      </el-form-item>

      <el-form-item label="手机" :label-width="formLabelWidth">
        <el-input v-model="Form.phone"></el-input>
      </el-form-item>

      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="Form.password"></el-input>
      </el-form-item>

      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio-group v-model="Form.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
      </el-form-item>

     <el-form-item label="生日" :label-width="formLabelWidth">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          v-model="Form.birthday"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>

      </el-form-item> -->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleCancle">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from "vue";
import { post,get } from "../utils/request";
export default {
  setup() {
    
    const dialogFormVisible = ref(false);
    const Form = reactive({
      uId:"",
      nickname: "",
      phone: "",
      password: "",
      sex: "",
      birthday:""
    });
    const formLabelWidth = ref("120px");
    const tableData = ref([]);

    
    const requestStuInfo=async()=>{
      try{
        const result=await post('/api/stuInfo')
        if(result?.success){
          tableData.value = result?.data?.stuInfo;
        }
      }catch(e){
        console.log(e)
      }
    }
    requestStuInfo();
    //对应删除修改操作都是通过向后台请求数据，然后刷新后台数据实现的
    //区分编辑和添加的区别在于是否存在相同id
    const handleInsert = () => {
        clean()
        dialogFormVisible.value = true      
              
    };
    const handleDelete = async(index, row) => {
        const uId=row.uId
        try{
          const result=await get('/api/stuInfo/delete',{uId})
          if(result?.success){
            alert("删除成功")//message判断成功类型
            requestStuInfo()
            dialogFormVisible.value = false 
          }else{
            alert("删除失败")
          }
        }catch(e){
          alert("删除失败")
          console.log(e)
        }
        
    };
    const handleEdit=(index,row)=>{
        dialogFormVisible.value = true
        Form.uId=row.uId
        Form.nickname=row.nickname
        Form.phone=row.phone
        Form.sex=row.sex
        Form.password=row.password
        Form.birthday=row.birthday      
    }
    const handleSubmit=async()=>{
        
         try{
          const result=await post('/api/stuInfo/change',{
            uId:Form.uId,
            nickname:Form.nickname,
            phone:Form.phone,
            password:Form.password,
            sex:Form.sex,
            birthday:Form.birthday
          })
          if(result?.success){
            alert("修改成功")//message判断成功类型
            requestStuInfo()
            dialogFormVisible.value = false 
          }else{
            alert("修改失败")
          }
        }catch(e){
          alert("修改失败")
          console.log(e)
        }
        //ajax请求，包括添加和修改数据，分辨方式是传入id是否为空
        //重新请求
    }
    const handleCancle=()=>{
        clean()
        dialogFormVisible.value = false
    }
    const clean=()=>{
        Form.nickname=""
        Form.phone=""
        Form.sex="男"
        Form.uId=""
        Form.password=""
        Form.birthday=""
    }
    //axios请求，刷新数据
    /* const findData=()=>{} */

    return {
      tableData,handleSubmit,dialogFormVisible,Form,formLabelWidth,handleInsert,handleDelete,clean,
      handleCancle,handleEdit
    };
  },
};
</script>
