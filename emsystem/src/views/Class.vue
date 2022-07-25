<template>
  <div>
    <div id="guide">
      <el-row style="margin-top: 10px; float: right">
        工程认证达成度定型化管理系统
        <el-button @click="home" style="margin-left: 720px" type="danger" plain>
          首页
        </el-button>
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
      </el-row>
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
  methods: {
    data() {
      this.$router.push("/data");
    },
    home() {
      this.$router.push("/home");
    },
    user() {
      this.$router.push("/class");
    },
    about() {
      this.$router.push("/about");
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