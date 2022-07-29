<template>
  <div>
    <div id="guide">
      <el-row style="margin-top: 10px; float: right">
        工程认证达成度定型化管理系统
        <el-button @click="home" style="margin-left: 720px" type="danger" plain>
          首页
        </el-button>
        <el-button @click="data" type="primary" plain>数据管理</el-button>
        <el-button @click="classManage" type="success" plain>班级管理</el-button>
        <el-button @click="user" type="info" plain>个人信息</el-button>
        <el-button @click="about" style="margin-right: 10px" type="primary" plain
          >关于我们</el-button
        >
      </el-row>
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
    }
  }
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
&img{
    height: 690px;
    width: 1536px;
}
</style>