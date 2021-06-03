<template>
  <el-table :data="tableData" style="width: 100%" height="400">
    <el-table-column type="expand">
      <template #default="props">
        <el-table
          :data="props.row.lChild"
          style="width: 100%; font-size: 5px"
          :row-class-name="'success-row'"
        >
          <el-table-column
            prop="lChildId"
            label="子课程id"
            width="70"
          ></el-table-column>
          <el-table-column prop="lChildName" label="子课程名" width="200">
          </el-table-column>
          <el-table-column prop="url" label="文件名称" width="150">
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="mini" @click="handleSubLessonEdit(scope.$index, scope.row)"
                >修改
              </el-button>
          <el-popconfirm
               title="这是一段内容确定删除吗？"
              @confirm="handleSubLessonDelete(scope.$index, scope.row)"
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
        <el-upload         
          action="http://localhost:8881/api/vidioUpload" 
          :on-success="handleSubLessonInsert"
        >       
        <el-button style="float: right" type="primary" @click="handleConveyLid(props.row)">上传</el-button>   
        </el-upload>
      </template>
    </el-table-column>

    <el-table-column
      prop="lId"
      label="id"
      sortable
      width="70"
    ></el-table-column>
    <el-table-column prop="lName" label="课程名称" width="300">
    </el-table-column>
    <el-table-column prop="difficult" label="类型难度" width="200">
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="mini" @click="handleLessonEdit(scope.$index, scope.row)"
          >修改
        </el-button>

        <el-popconfirm
           title="这是一段内容确定删除吗？" @confirm="handleLessonDelete(scope.$index, scope.row)"
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

  <el-button style="float: right" type="primary" @click="handleLessonInsert()">添加</el-button>

  <el-dialog title="课程信息" v-model="dialogLessonVisible">
    <el-form :model="lessonInfo">
      <el-form-item label="课程名称" :label-width="formLabelWidth">
        <el-input v-model="lessonInfo.lName"></el-input>
      </el-form-item>

      <el-form-item label="课程难度" :label-width="formLabelWidth">
        <el-select v-model="lessonInfo.difficult" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleLessonCancle()">取 消</el-button>
        <el-button type="primary" @click=" handleLessonSubmit()"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>

  <el-dialog title="子课程信息" v-model="dialogSubLessonVisible">
    <el-form :model="subLessonInfo">
      <el-form-item label="子课程名" :label-width="formLabelWidth">
        <el-input v-model="subLessonInfo.lChildName"></el-input>
      </el-form-item>

      <el-form-item label="文件名称" :label-width="formLabelWidth">
        <el-input v-model="subLessonInfo.url"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleSubLessonCancle()">取 消</el-button>
        <el-button type="primary" @click="handleSubLessonSubmit()"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from "vue";
import { post,get} from "../utils/request";
export default {
  name: "VidioInfo",
  setup() {
    const dialogSubLessonVisible = ref(false);
    const dialogLessonVisible = ref(false);
    
    const formLabelWidth = ref("120px");
    
    const options = ref([]);
    const tableData = ref([]);
    const lessonInfo=reactive({lId:"",lName: "",difficult: ""})
    const subLessonInfo=reactive({lChildId:"",lId:"",lChildName: "",url: ""},)
    options.value = [
        { value: "语法初级", label: "语法初级" },
        { value: "语法中级", label: "语法中级" },
        { value: "语法高级", label: "语法高级" },
      ]
    console.log(tableData);
    const requestvidioInfo=async()=>{
      try{
        const result=await post('/api/vidioInfo')
        if(result?.success){
          tableData.value =result?.data?.vidioInfo;
        }
      }catch(e){
        console.log(e)
      }
    }
    requestvidioInfo();
    //lesson
    
    const handleLessonInsert = () => {
      Lessonclean()
      dialogLessonVisible.value = true
        
    };
    const handleLessonDelete = async(index, row) => {
      const lId=row.lId
      try{
        const result=await get('/api/lesson/delete',{lId})
        if(result?.success){
          alert("删除成功")
          requestvidioInfo()
          dialogLessonVisible.value=false
        }else{
          alert("删除失败")
        }
      }catch(e){
        alert("删除失败")
        console.log(e)
      }
        
    };
    const handleLessonEdit=(index,row)=>{
        lessonInfo.lId=row.lId
        lessonInfo.lName=row.lName
        lessonInfo.difficult=row.difficult
        dialogLessonVisible.value = true
        console.log(index, row);
    }
    const handleLessonSubmit=async()=>{
        try{
          const result=await post('/api/lesson/change',{
            lId:lessonInfo.lId,
            lName:lessonInfo.lName,
            difficult:lessonInfo.difficult
          })
          if(result?.success){
            alert("修改成功");
            requestvidioInfo();
            dialogLessonVisible.value = false
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
    const handleLessonCancle=()=>{
        Lessonclean()
        dialogLessonVisible.value = false
    }
    const Lessonclean=()=>{
        lessonInfo.lId=""
        lessonInfo.lName=""
        lessonInfo.difficult=""
    }

    //subLesson
    //这里不直接使用insert的原因在于on-success调用带参数的函数时会直接自动执行
    const handleConveyLid=(row)=>{
      subLessonclean()
      subLessonInfo.lId=row.lId
    }

    const handleSubLessonInsert = () => {
      /* subLessonInfo.lId=row.lId */
      dialogSubLessonVisible.value = true 
        
    };
    const handleSubLessonDelete = async(index, row) => {
      const lChildId=row.lChildId
      try{
        const result=await get('/api/subLesson/delete',{lChildId})
        if(result?.success){
          alert("删除成功")
          requestvidioInfo();
          dialogSubLessonVisible.value=false
        }else{
          alert("删除失败")
        }
      }catch(e){
        alert("删除失败")
        console.log(e)
      }
    };
    const handleSubLessonEdit=(index,row)=>{
        subLessonInfo.lChildId=row.lChildId
        subLessonInfo.lChildName=row.lChildName
        subLessonInfo.lId=row.lId
        subLessonInfo.url=row.url
        dialogSubLessonVisible.value = true
        console.log(index, row);
    }
    const handleSubLessonSubmit=async()=>{
      try{
        const result=await post('/api/subLesson/change',{
          lChildId:subLessonInfo.lChildId,
          lId:subLessonInfo.lId,
          lChildName:subLessonInfo.lChildName,
          url:subLessonInfo.url
        })
        if(result?.success){
          alert("修改成功")
          requestvidioInfo();
          dialogSubLessonVisible.value = false
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
    const handleSubLessonCancle=()=>{
      subLessonclean()
      dialogSubLessonVisible.value = false
    }
    const subLessonclean=()=>{
      subLessonInfo.lChildId=""
      subLessonInfo.lChildName=""
      subLessonInfo.url=""
      subLessonInfo.lId=""
    }
    return {
      tableData,
      lessonInfo,
      dialogSubLessonVisible,
      dialogLessonVisible,
      formLabelWidth,
      subLessonInfo,
      options,
      Lessonclean,
      subLessonclean,
      handleLessonInsert,
      handleLessonDelete,
      handleLessonEdit,
      handleLessonSubmit,handleLessonCancle,handleSubLessonInsert,
      handleSubLessonDelete,handleSubLessonEdit,handleSubLessonSubmit,
      handleSubLessonCancle,
      handleConveyLid
    };
  },
};
</script>
<style scoped>
.el-table .success-row {
  background: #f0f9eb;
}
</style>