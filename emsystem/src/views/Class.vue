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
        <el-button @click="user" type="info" plain>个人信息</el-button>
        <el-button
          @click="about"
          style="margin-right: 10px"
          type="primary"
          plain
          >关于我们</el-button
        >
      </div>
    </div>
    <div style="display: flex">
      <div style="width: 20px"></div>
      <el-upload
        :auto-upload="false"
        :show-file-list="false"
        action="action"
        :on-change="handleChange"
      >
        <el-button type="primary">导入 excel</el-button>
      </el-upload>
    </div>
    <br />
    <avue-crud :option="option" :data="list"></avue-crud>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
      list: [],
      option: {
        column: [
          {
            label: "id",
            prop: "id",
          },
          {
            label: "姓名",
            prop: "name",
          },
          {
            label: "分数",
            prop: "sex",
          },
        ],
      },
    };
  },
 created() {
    this.getUserId();
  },
  methods: {
    getUserId() {
      this.userId = this.$route.params.userId;
    },
    data() {
      this.$router.push({
        name: "Data",
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
      this.$router.push({
        name: "About",
        params: { userId: this.userId },
      });
    },
    classManage() {
      window.location.reload();
    },
    handleGet() {
      window.open("/cdn/demo.xlsx");
    },
    handleChange(file, fileLis) {
      this.$Export.xlsx(file.raw).then((data) => {
        this.list = data.results;
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