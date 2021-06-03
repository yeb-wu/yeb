<template>
  <el-table :data="tableData" style="width: 100%" height="400">
    <el-table-column fixed prop="nickname" label="昵称" width="150">
    </el-table-column>
    <el-table-column prop="lName" label="课程名" width="300"> </el-table-column>
    <el-table-column prop="score" label="分数" width="120">
    </el-table-column>
    <el-table-column prop="date" label="日期" width="300"> </el-table-column>
  </el-table>
</template>

<script>
import { ref,inject } from 'vue';

export default {
  nickname:"Record",
  setup() {
    const data=inject('data');
    
    const tableData=ref([])
    tableData.value=data?.personRecord;
    console.log(tableData)
    return{tableData}
  },
};
</script>

<style scoped>
</style>