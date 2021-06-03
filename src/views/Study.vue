<template>
  <table class="container">
    <tr>
      <td colspan="2" class="header">
        <span class="title">英语学习平台</span>
        <nav>
          <div class="navg">
            <el-row>
              <el-col :span="1"
                ><div class="grid-content ">
                  <el-link href="/#/home"><span style="color:#fff;">首页</span></el-link>
                </div></el-col
              >
              <el-col :span="2"
                ><div class="grid-content">
                  <el-link href="/#/recommend"><span style="color:#fff;">视频推荐</span></el-link>
                </div></el-col
              >
              <el-col :span="2"
                ><div class="grid-content">
                  <el-link href="/#/search"><span style="color:#fff;">视频查询</span></el-link>
                </div></el-col
              >
              <el-col :span="2"
                ><div class="grid-content">
                  <el-link href="/#/person"><span style="color:#fff;">个人信息</span></el-link>
                </div></el-col
              >
            </el-row>
          </div>
        </nav>
      </td>
    </tr>
    <tr>
      <td class="left-menu">
        <div class="menu">
          <el-table
            :data="subLessons"
            border
            style="width: 100%"
            @row-click="handle"
          >
            <el-table-column
              align="center"
              header-align="center"
              prop="lChildName"
              :label="name"
              width="180"
            >
            </el-table-column>
          </el-table>
        </div>
      </td>
      <td class="content">
        <div id="e1" class="panel">
          <div class="panel-heading">
            <span class="panel-heading-text"
              ><i class="el-icon-video-camera"></i>{{ vidio }}
            </span>
            <div class="testButton ">
              <el-button type="text" @click="handleTest" icon="el-icon-edit">课程测试</el-button>
            </div>
          </div>
          <div class="video" v-if="show=='player'">
            <Player
              class="video-player vjs-custom-skin"
              ref="videoPlayer"
              :playsinline="true"
              :options="playerOptions"
              
            />
          </div>
          <div class="test" v-if="show=='test'">
          <Test
            :questions="questions"
            :lId="lId"
            />
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import { useRoute } from "vue-router";
import { get } from "../utils/request";
import Player from "vue-video-player/src/player.vue";
import Test from "../components/Test"
export default {
 
  components: {
    Player,Test
  },

  setup() {
    const obj=reactive({
      playerOptions:{
      playbackRates: [0.5, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: 'test2.mp4'/* require('@/assets/test2.mp4')  */
             //"https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4", // url地址
          },
        ],
        poster: "", // 你的封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, // 全屏按钮
        }
        }
    })
    const route = useRoute();
    const data = reactive({ lId:null, lName: "", subLessons: [],questions:[] });
    const vidio = ref();
    const url = ref();
    const show=ref("player")
    const handle = (row) => {
      vidio.value = row.lChildName;
      url.value = row.url;
     
      obj.playerOptions.sources[0].src=row.url; 
    };
    //接口增加试卷数据
    
    const getLessonInfo = async () => {
      const result = await get(`/api/study/${route.params.id}`);
      //${route.params.id}
      if (result) {
        data.lId=result.data.lId;
        data.lName= result.data.lName;
        vidio.value = result.data.subLessons[0].lChildName;
        url.value = result.data.subLessons[0].url;
        for (let value of result.data.subLessons) {
          data.subLessons.push(value);
          
        }
        for (let value of result.data.questions) {
          data.questions.push(value);
          
        }
      }
    };
    getLessonInfo();
    const handleTest=()=>{
      show.value='test'
    }
    
    const {lId,lName, subLessons,questions } = toRefs(data);

    const  {playerOptions} = toRefs(obj);

    return {lId, lName, subLessons, handle, vidio, url, playerOptions
    ,show,questions,handleTest};
  },
};
</script>

<style scoped>
.container {
  margin-top: 30px;
  width: 1200px;

  height: 3000px;
}

.header {
  width: 1200px;
  height: 70px;

}

.left-menu {
  width: 20%;

}

.menu {
  position: absolute;
  top: 150px;
  left: 50px;
}

.content {
  display: flex;
  flex-direction: column;
  
}

.title {
  font-family: Georgia, "Times New Roman", Times, serif;
  color: #33322e; 
  font-size: 35px;
}
.navg {
  height: 40px;
  padding-left: 0;
  margin-bottom: 0;
  
  color: #fff;
  background-color: #337ab7;
}



.grid-content {
  font-size: 20px;
  text-align: center;
  min-height: 40px;
}
.bg-purple-light {
  background: #ebeff8;
}
.panel {
  top: 20px;
  width: 930px;
  height: 800px;
  border:0px solid ;
}
.video{
  display: inline-block;
    width: 100%;
    height: 525px;
    text-align: center;
    line-height: 100px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
}
.testButton{
  float: right!important;
  display: table-cell;
  padding-top: 3px;
  vertical-align: middle;
}

.panel-heading {
  display: table;
  margin-top: 25px;
  width: 930px;
  height: 50px;
  background-color:#ddd;
  border: 1px solid #ddd
}
/* .row{
  display: table-row;
} */
.panel-heading-text {
  display: table-cell;
  padding-left: 20px;
  vertical-align: middle;
}

</style>