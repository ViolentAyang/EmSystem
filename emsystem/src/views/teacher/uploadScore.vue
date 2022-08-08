<template>
  <div>
    <div id="guide">
      <div style="margin-top: 10px; margin-left: 20px; float: left">
        工程认证达成度定型化管理系统
      </div>
      <div style="margin-top: 10px; float: right">
        <el-button @click="classManage" type="success" plain
          >返回课程列表</el-button
        >
        <el-button
          @click="logout"
          style="margin-right: 10px; margin-bottom: 5px"
          type="danger"
          plain
          >退出登录</el-button
        >
      </div>
    </div>
    <div style="display: flex">
      <el-button style="margin-left:10px;margin-top:10px" type="primary" @click="handleGet">下载模版</el-button>
      <div style="width: 20px"></div>
      <el-upload
        :auto-upload="false"
        :show-file-list="false"
        action="action"
        :on-change="handleChange"
      >
        <el-button style="margin-top:10px" type="primary">导入 excel</el-button>
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
      userId: "",
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
      console.log(this.$route.params);
      this.userId = this.$route.params.userId;
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    classManage() {
      this.$router.push({
        name: "courseList",
        params: { userId: this.userId },
      });
    },
    handleGet() {
      
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