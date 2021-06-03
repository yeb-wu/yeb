<template>
  <el-table :data="tableData" style="width: 100%" height="400px">
      <el-table-column type="expand">
      <template #default="props">
        <el-form label-position="left" inline>
          <el-form-item label="A:">
            <span>{{ props.row.ques.options[0] }}</span>
          </el-form-item>
          <el-form-item label="B:">
            <span>{{ props.row.ques.options[1] }}</span>
          </el-form-item>  
          <el-form-item label="C:">
            <span>{{ props.row.ques.options[2] }}</span>
          </el-form-item>
          <el-form-item label="D:">
            <span>{{ props.row.ques.options[3] }}</span>
          </el-form-item>       
        </el-form>
        <el-form label-position="left" inline>
        <el-form-item label="所属课程:">
        <span v-for="(item, index) in props.row.lesson" :key="index">
          {{ item.lName }}，
        </span>
          </el-form-item>
        </el-form> 
        
      </template>
    </el-table-column>
    <el-table-column
      prop="ques.qId"
      label="试题id"
      sortable
      width="90"
    ></el-table-column>
    <el-table-column prop="ques.question" label="考题内容" width="400">
    </el-table-column>
    <el-table-column prop="ques.answer" label="考题答案" width="80">
    </el-table-column>
    <el-table-column :filters="filters" :filter-method="filterKno" prop="ques.kId" label="对应知识点" width="120">
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
    >添加</el-button>

  <el-dialog title="试题信息" v-model="dialogFormVisible">
    <el-form :model="Form">
      <el-form-item label="考题内容" :label-width="formLabelWidth">
        <el-input v-model="Form.question"></el-input>
      </el-form-item>

      <el-form-item label="选项" :label-width="formLabelWidth">
        <el-input placeholder="选项A" v-model="Form.options[0]"></el-input>
        <el-input placeholder="选项B" v-model="Form.options[1]"></el-input>
        <el-input placeholder="选项C" v-model="Form.options[2]"></el-input>
        <el-input placeholder="选项D" v-model="Form.options[3]"></el-input>
      </el-form-item>

      <el-form-item label="考题答案" :label-width="formLabelWidth">
        <el-radio-group v-model="Form.answer">
          <el-radio  :label="0"></el-radio>
          <el-radio  :label="1"></el-radio>
          <el-radio  :label="2"></el-radio>
          <el-radio  :label="3"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="所属课程" :label-width="formLabelWidth">
        <el-select v-if="select" filterable style="width:400px" v-model="Form.lesson" multiple placeholder="请选择">
          <el-option
            v-for="item in lessons"
            :key="item.lId"
            :label="item.lName"
            :value="item.lId"
          >
          </el-option>
        </el-select>
        <el-select v-else filterable style="width:400px" v-model="Form.lesson" multiple placeholder="请选择">
          <el-option
            v-for="item in lessons"
            :key="item.lId"
            :label="item.lName"
            :value="item.lId"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="知识点" :label-width="formLabelWidth">
        <el-select filterable  style="width:400px" v-model="Form.kId" placeholder="请选择">
          <el-option
            v-for="item in knos"
            :key="item"
            :label="item.kName"
            :value="item.kId"
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
import { post,get} from '../utils/request';
export default {
  name: "Question",
  setup() {
   
    const select =ref(true)
    const tableData = ref([]);
    const lessons = ref([]);
    const knos=ref([]);
    const dialogFormVisible=ref(false)
    const Form=reactive({qId:"",question:"",answer:"",options:[],kId:"",lesson:[]});
    const filters=ref([])
    
    const requestQuestionInfo=async()=>{
      try{
        const result=await post('/api/question')
        if(result?.success){
          tableData.value=result?.data?.quesInfo;
          for(let item of tableData.value){
            item.ques.options=item.ques.options.split("#")
          }
          lessons.value=result?.data?.lessons;
          knos.value=result?.data?.knos;
          //这一块应该又后台完成
          for(let table of tableData.value){
            for(let kno of knos.value){
              if(table.ques.kId==kno.kId){
                table.ques.kId=kno.kName
              }
            }
          }
          var KnoList=[]
          for(let kno of knos.value){
            let content={text:'',value:''}
            content.text=kno.kName
            content.value=kno.kName
            KnoList.push(content)
          }
          filters.value=KnoList
        }
      }catch(e){
        console.log(e)
      }
    }
    requestQuestionInfo()

    const clean=()=>{
      Form.qId=""
      Form.question=""
      Form.answer=""
      Form.kId=""
      Form.lesson=[]
      Form.options=[]
      select.value=!select.value
    }
    const handleEdit = (index, row) => {
      dialogFormVisible.value = true;
      Form.qId=row.ques.qId
      Form.question=row.ques.question
      Form.answer=row.ques.answer
      //理论上这一段循环也应该出现在后端,把tabletable里的kid(实际上是KName)转为kid
      for(var kno of knos.value){
        if(row.ques.kId===kno.kName){
          Form.kId=kno.kId
        }
      }
      /* Form.kId=row.ques.kId */
      var i=0;
      for(var lesson of row.lesson){
        Form.lesson[i]=lesson.lId
        i++
      }
      Form.options=row.ques.options
    };
    const handleDelete=async(index,row)=>{
      const qId=row.ques.qId
      try{
        const result=await get('/api/question/delete',{qId})
        if(result?.success){
          alert("删除成功")
          requestQuestionInfo()
        }else{
          alert("删除失败")
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
      //options要变为字符串
      //From中的lesson为id，lIdList
      const strOption = Form.options.join('#')
      try{
        const result=await post('/api/question/change',{
          qId:Form.qId,
          question:Form.question,
          answer:Form.answer,
          options:strOption,
          kId:Form.kId,
          lIdList:Form.lesson
        })
        if(result?.success){
          alert("修改成功")
          requestQuestionInfo()
          dialogFormVisible.value=false
          clean()
        }else{
          alert("修改失败")
          dialogFormVisible.value=false
        }
      }catch(e){
        alert("修改失败")
        dialogFormVisible.value=false
        clean()
        console.log(e)
      }
    }
    const handleCancle=()=>{
        clean()
        dialogFormVisible.value = false
    }

    const filterKno=(value,row)=>{
      return row.ques.kId===value
    }

    return { tableData, lessons,handleEdit,dialogFormVisible,Form,
    handleDelete,handleInsert,handleSubmit,handleCancle,knos,select,filters,filterKno
    };
  },
};
</script>

<style scoped>
</style>