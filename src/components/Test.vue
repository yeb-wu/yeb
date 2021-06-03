<template>
  <div class="exercise-center">
    <!--题目信息-->
    <div style="height: 80px">
      <el-row>
        <el-col :span="2" style="padding-left: 40px">
          <div style="width: 56px; height: 56px; background-color: aqua"></div>
        </el-col>
        <el-col :span="22" style="padding-top: 2px; padding-left: 16px">
         <!--  <el-row>
            <el-col :span="5">题目类型：<span class="topic-style">{{topicTypes}}</span></el-col>
            <el-col :span="4">题库分类：<span class="topic-style">{{topicClassify}}</span></el-col>
          </el-row> -->
          <!-- <el-row class="topic-information">
            <el-col :span="5">发布时间：{{ publishTime }}</el-col>
            <el-col :span="4">作者：{{ authorName }}</el-col>
          </el-row> -->
        </el-col>
      </el-row>
    </div>
    <div v-for="(item, index) in questions" :key="index">
      <div class="radio-type">
        <div style="padding-bottom: 5px">(5分) {{ item.question }}</div>
        <el-radio-group
          v-for="(option,i) in item.options.split('#')"
          v-model="radio[index]"
          :key="i"
        >
          <el-radio :label="i">{{ option }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div>
        <el-row>
            <el-button @click="back">退出</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
        </el-row>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
/* import { useStore } from 'vuex' */
import {post} from "../utils/request";
export default {
  name: "Test",
  props: ["questions","lId"],
  setup(props) {
    //需要主页面传入课程试题信息，
    /* const store = useStore() */
    const radio=ref([]);
    const back=()=>{
        location.reload()
    }
    var score=0;
     const resScore=async()=>{
        try{
          const result=await post('/api/submit/score',{
            uId:localStorage.loginId,
            lId:props?.lId,
            score:score
            })
          if(result?.success){        
            alert('提交成功')
            location.reload() 
          }else{
            alert('提交失败')
          } 
        }catch(e){
          alert('请求失败')
        }

    }
    const submit=()=>{
        var right=0; 
        var i=0;
        for(let item of props?.questions){
            if(item.answer==radio.value[i]){
                right++;
            }
            i++;
        }
        //axios发送数据 
        score=right;
        resScore()
    }

    return{radio,back,submit}
  },
  
};
</script>

<style scoped lang="scss">

.exercise-center{
            background-color: #FFFFFF;
            height: 396px;
            margin-top: 16px;
            padding-top: 22px;
            /*题目信息*/
            .topic-style{
                font-size: 16px;
                font-weight: 600;
                color: #333333;
                line-height: 22px;
            }
            .topic-information{
                font-size: 14px;
                font-weight: 400;
                color: #999999;
                line-height: 20px;
                padding-top: 8px;
            }
            /*题目内容*/
            .radio-type{
                height: 184px;
                border-top: solid 1px #e6e6e6;
                padding: 15px 40px;
                .el-radio-group{
                    display: block;
                    padding: 5px 15px;
                }
            }
           
}

</style>