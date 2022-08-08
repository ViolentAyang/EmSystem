<template>
    <div id="guide">
      <div style="margin-top: 10px; margin-left: 20px; float: left">
        工程认证达成度定型化管理系统
      </div>
      <div style="margin-top: 10px; float: right">
        <el-button @click="home" type="danger" plain> 首页 </el-button>
        <el-button @click="data" type="primary" plain>数据管理</el-button>
        <el-button @click="classManage" type="success" plain
          >专业达成度</el-button
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
    <img src="../assets/home.jpg" alt="">
  </div>
</template>

<script>
export default {
  data(){
    return{
      userId: ''
    }
  },
  created(){
    this.getUserId()
  },
  methods:{
    getUserId(){
      this.userId = this.$route.params.userId
    },
    data(){
      this.$router.push({
          name: "Data", 
          params: { userId: this.userId },
        });
    },
    home(){
      window.location.reload()
      //this.userId = this.$route.params.userId
      //console.log(this.userId)
    },
    user(){
      this.$router.push({
          name: "User", 
          params: { userId: this.userId },
        });
    },
    about(){
      this.$router.push({
          name: "About", 
          params: { userId: this.userId },
        });
    },
    classManage(){
      this.$router.push({
          name: "Class", 
          params: { userId: this.userId },
        });
    },
    logout(){
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    teacherManager(){
      this.$router.push({
        name: "teacherManager",
        params: { userId: this.userId },
      });
    },
  }
};
</script>

<style lang="less" scoped>
#guide {
  height: 100%;
  background-color: #f5f5f8;
  color: #333;
  text-align: center;
  line-height: 40px;
}
&img{
    height: 60%;
    width: 100%;
}
</style>