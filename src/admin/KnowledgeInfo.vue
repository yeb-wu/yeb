<template>
  <el-table :data="tableData" style="width: 100%" height="400">
    <el-table-column
      prop="kno.kId"
      label="id"
      sortable
      width="70"
    ></el-table-column>
    <el-table-column
      prop="kno.kName"
      label="知识点"
      width="100"
    ></el-table-column>
    <el-table-column label="所属课程" width="500">
      <template #default="props">
        <span v-for="(item, index) in props.row.lesson" :key="index"
          >{{ item.lName }}，</span
        >
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >修改
        </el-button>
        <el-popconfirm
          title="这是一段内容确定删除吗？"
          @confirm="handleDelete(scope.$index, scope.row)"
        >
        <template #reference>
        <el-button
          size="mini"
          type="danger"
          >删除</el-button
        >
        </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-button style="float: right" type="primary" @click="handleInsert()"
    >添加</el-button
  >
  <el-dialog title="学生信息" v-model="dialogFormVisible">
    <el-form :model="Form">
      <el-form-item label="知识点" :label-width="formLabelWidth">
        <el-input v-model="Form.kName"></el-input>
      </el-form-item>

      <el-form-item label="所属课程" :label-width="formLabelWidth">
        <el-select v-if="select" filterable style="width:400px" v-model="Form.lesson" multiple placeholder="请选择">
          <el-option
            v-for="item in lessons"
            :key="item"
            :value="item.lId"
            :label="item.lName"
          >
          </el-option>
        </el-select>
        <el-select v-else filterable style="width:400px" v-model="Form.lesson" multiple placeholder="请选择">
          <el-option
            v-for="item in lessons"
            :key="item"
            :value="item.lId"
            :label="item.lName"
          >
          </el-option>
        </el-select>
      </el-form-item>
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
import { ref, reactive } from "vue";
import { post, get } from '../utils/request';
export default {
  name: "KnoledgeInfo",
  setup() {
    /* const data = reactive({
      tableData: [
        {
          kId: "1",
          kName: "状语从句",
          lesson: ["语法-简单句1", "语法-简单句2"],
        },
        {
          k_id: "2",
          kName: "定语从句",
          lesson: ["语法-简单句1", "语法-简单句3"],
        },
        {
          k_id: "3",
          kName: "名词从句",
          lesson: ["语法-简单句3", "语法-简单句2"],
        },
      ],
      lessons: ["语法-简单句1", "语法-简单句2", "语法-简单句3"],
      Form: {
        kName: "",
        lesson: [],
      },
    }); */
    const tableData = ref([]);
    const lessons = ref([]);
    const select=ref(false)
    const dialogFormVisible = ref(false);
    const Form=reactive({kId:"",kName:"",lesson:[]});
    /* Form.value=data?.Form
    lessons.value=data?.lessons
    tableData.value = data?.tableData; */
     
    const requestKnoInfo=async()=>{
      try{
        const result=await post('/api/knowledgeInfo')
        if(result?.success){
          tableData.value=result?.data?.knowledgeInfo;
          lessons.value=result?.data?.lessons;
          }
      }catch(e){
        console.log(e)
      }
    }
    requestKnoInfo();
    const handleEdit = (index, row) => {    
      var i=0;
      for(var lesson of row.lesson){
        Form.lesson[i]=lesson.lId
        i++
      }
      Form.kId=row.kno.kId
      Form.kName=row.kno.kName
      dialogFormVisible.value = true
    };
    const handleDelete=async(index,row)=>{
      const kId=row.kno.kId
      try{
        const result=await get('/api/knowledgeInfo/delete',{kId})
        if(result?.success){
          alert(result?.message)
          requestKnoInfo()
          dialogFormVisible.value=false
        }else{
          alert("删除失败")
          dialogFormVisible.value=false
        }
      }catch(e){
        alert("删除失败")
        console.log(e)
      }
      
    }
    const handleInsert=()=>{
      clean()
      dialogFormVisible.value = true;
    }
    const handleSubmit=async()=>{
      try{
        const result=await post('/api/knowledgeInfo/change',{
          kId:Form.kId,
          kName:Form.kName,
          lIdList:Form.lesson
        })
        if(result?.success){
          alert("修改成功")
          requestKnoInfo();
          dialogFormVisible.value = false
          clean()
        }else{
          alert("修改失败")
          dialogFormVisible.value = false
          clean()
        }
      }catch(e){
        alert("修改失败")
        dialogFormVisible.value = false
        clean()
        console.log(e)
      }
        
    }
    const handleCancle=()=>{
      clean()
      dialogFormVisible.value = false
        
    }
    const clean=()=>{
      Form.kId=""
      Form.kName=""  
      Form.lesson=[]//里面数组只保存lid
      select.value=!select.value
    }
    return { tableData, lessons,handleEdit,dialogFormVisible,Form,
    handleDelete,handleInsert,handleSubmit,handleCancle };
  },
  
};
</script>

<style scoped>
</style>