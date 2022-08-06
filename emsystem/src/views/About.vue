<template>
  <div>
    <div id="guide">
      <div style="margin-top: 10px; margin-left: 20px; float: left">
        工程认证达成度定型化管理系统
      </div>
      <div style="margin-top: 10px; float: right">
        <el-button @click="home" type="danger" plain> 首页 </el-button>
        <el-button @click="data" type="primary" plain>数据管理</el-button>
        <el-button @click="classManage" type="success" plain
          >班级管理</el-button
        >
        <el-button @click="teacherManager" type="primary" plain>教师管理</el-button>
        <el-button @click="user" type="info" plain>个人信息</el-button>
        <el-button
          @click="about"
          type="primary"
          plain
          >关于我们</el-button
        >
        <el-button
          @click="logout"
          style="margin-right: 10px;margin-bottom:5px"
          type="danger"
          plain
          >退出登录</el-button
        >
      </div>
    </div>
    <avue-data-cardtext :option="option"></avue-data-cardtext>
    <el-alert title="团队成员介绍" type="success" :closable="false"> </el-alert>
    <!--<avue-data-card :option="option2"></avue-data-card>-->
    <el-carousel type="card" height="322px">
      <el-carousel-item v-for="item in carouseData" :key="item">
        <img :src="item.url" alt="" />
      </el-carousel-item>
    </el-carousel>
    <avue-data-display :option="option1"></avue-data-display>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
      option: {
        span: 6,
        data: [
          {
            /*click: function (item) {
              alert(JSON.stringify(item));
            },*/
            title: "项目背景",
            icon: "el-icon-service",
            color: "#3fa1ff",
            content:
              "作为人才培养的改革举措，工程认证要求专业在确定培养目标的基础上，制定出人才培养标准及更为细化的各指标点，依据培养过程中各指标的达成情况，以保证专业人才培养质量的不断提升",
            //href: "http://www.baidu.com",
            name: "Project Background",
            date: "1天前",
          },
          {
            /*click: function (item) {
              alert(JSON.stringify(item));
            },*/
            title: "项目特色",
            color: "yellow",
            icon: "el-icon-mobile-phone",
            content:
              "本项目基于工程认证中定量化达成度求解过程及语义表达上所存在的问题，提出采用定性化达成度的替代方案，并设计开发完整的应用软件，为工程认证的规范、可信提供有力支持",
            //href: "http://www.baidu.com",
            //target: "_blank",
            name: "Project characteristics",
            date: "1天前",
          },
          {
            /*click: function (item) {
              alert(JSON.stringify(item));
            },*/
            title: "项目内容",
            icon: "el-icon-bell",
            color: "green",
            content:
              "工程认证达成度定性化计算不同于定量化达成度的计算可以采用常规工具如EXCEL来求解，定性化达成度必须开发相关的支持软件来实现，为便于更好的用户体验",
            //href: "http://www.baidu.com",
            name: "Project Content",
            date: "1天前",
          },

          {
            /*click: function (item) {
              alert(JSON.stringify(item));
            },*/
            title: "开发周期",
            icon: "el-icon-time",
            color: "red",
            content:
              "于2022年5月开始进行需求分析，6月中旬设计出数据库，6月下旬完成原型图绘制，7月根据原型图完成前端对应页面，9月结束后端业务进行测试上线，本站将持续运营",
            //href: "http://www.baidu.com",
            name: "文件上传",
            date: "1天前",
          },
        ],
      },
      carouseData: [
        { url: require("../assets/11.png") },
        { url: require("../assets/22.png") },
        { url: require("../assets/33.png") },
        { url: require("../assets/44.png") },
      ],
      option1: {
        span: 6,
        data: [
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            count: "16",
            decimals: 2,
            title: "日活跃数",
            //href:'https://avuejs.com',
            //target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            count: "210",
            title: "月活跃数",
            //href:'https://avuejs.com',
            //target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            count: "1500",
            title: "年活跃数",
            //href:'https://avuejs.com',
            // target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            count: "30",
            title: "周活跃数",
            //href:'https://avuejs.com',
            //target:'_blank'
          },
        ],
      },
      /*option2: {
        span:6,
        data: [
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            name: '李广水',
            //src: 'static/images/11.jpg',
            text: '博士，教授。主要研究方向数据挖掘、工程人才培养，主要承担本科《算法与数据结构》、《数据库原理》等课程教学。主持并结题包括教育部、省市校级多项科研课题，发表研究论文四十多篇，授权发明专利三项。主编教材两部。当前发表工程认证研究论文两篇，组织开发服务工程认证的管理系统一套',
            //href:'https://avuejs.com',
            //target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            name: '刘慧',
            //src: '/images/33.jpg',
            text: '博士，讲师。主要研究方向为数据库的智能查询和高等教育人才培养，主要承担《算法与数据结构》、《数据库原理》、《信息系统设计》、《人机交互技术》等课程的教学。主持和参与国家级、省市级和校级多项科研课题，发表学术论文10余篇，授权发明专利1项。参编教材1部。',
            //href:'https://avuejs.com',
            //target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            name: '刘子扬',
            //src: '../assets/33.jpg',
            text: '参与过金陵科技学院设备处的基于vue+springboot的设备验收计划管理系统的设计与开发，独立开发过基于nodejs+vue的电商管理系统并被实际使用，独立设计过基于hexo的个人网站。熟悉高并发、分布式系统的开发。',
            //href:'https://avuejs.com',
            //target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            name: '李宇翔',
            //src: "https://postimg.cc/N53Pmy42",
            text: '擅长于业务实现，在第12届蓝桥杯获得国家级三等奖、团体程序设计天梯赛三等奖、PAT乙级考试满分、JIT第五届校赛个人一等奖。擅长于业务实现，在第12届蓝桥杯获得国家级三等奖、团体程序设计天梯赛三等奖、PAT乙级考试满分、JIT第五届校赛个人一等奖。',
            //href:'https://avuejs.com',
            //target:'_blank'
          },
        ]
      },*/
    };
  },
  created() {
    this.getUserId();
  },
  methods: {
    getUserId() {
      this.userId = this.$route.params.userId;
    },
    logout(){
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    data() {
      this.$router.push({
        name: "Data",
        params: { userId: this.userId },
      });
    },
    teacherManager(){
      this.$router.push({
        name: "teacherManager",
        params: { userId: this.userId },
      });
    },
    home() {
      this.$router.push({
        name: "Home",
        params: { userId: this.userId },
      });
    },
    user() {
      this.$router.push({
        name: "User",
        params: { userId: this.userId },
      });
    },
    about() {
      window.location.reload();
    },
    classManage() {
      this.$router.push({
        name: "Class",
        params: { userId: this.userId },
      });
    },
  },
};
</script>

<style lang="less" scoped>
#guide {
  height: 60px;
  background-color: #f5f5f8;
  color: #333;
  text-align: center;
  line-height: 40px;
}
</style>