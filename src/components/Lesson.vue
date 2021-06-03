<template>
  <!-- <div class="module" v-for="item in lessonInfo" :key="item.id"> -->
    <span class="modulename">课程名:{{ item.lName }}</span>
    <br />
    <br />
    <p>知识点:</p>
    <span v-for="(course, index) in item.knoList" :key="index">《{{ course }}》</span>
  <!-- </div> -->
</template>

<script>
export default {
  name: "Lesson",
  props: ["item"],
  setup() {},
};
</script>

<style>


.modulename{
  font-weight: bold;
  font-size: 15px;
}
</style>