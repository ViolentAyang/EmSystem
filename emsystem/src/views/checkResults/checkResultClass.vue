<template>
  <div>
    <div id="guide">
      <div style="margin-top: 10px; margin-left: 20px; float: left">
        工程认证达成度定性化管理系统
      </div>
      <div style="margin-top: 10px; float: right">
        <el-button @click="home" type="danger" plain> 首页 </el-button>
        <el-button @click="data" type="primary" plain>数据管理</el-button>
        <el-button @click="classManage" type="success" plain
          >专业达成度</el-button
        >
        <el-button @click="teacherManager" type="primary" plain
          >教师管理</el-button
        >
        <el-button @click="user" type="info" plain>个人信息</el-button>
        <el-button @click="about" type="primary" plain>关于我们</el-button>
        <el-button
          @click="logout"
          style="margin-right: 10px; margin-bottom: 5px"
          type="danger"
          plain
          >退出登录</el-button
        >
      </div>
    </div>
    <el-alert title="查看指定班级达成度" type="success" :closable="false"> </el-alert>
    <div style="float: left; display: flex">
    <span style="margin-top:18px;margin-bottom:10px;margin-left:10px">请选择要查看的班级</span>
      <el-cascader
      style="margin-top:10px;margin-bottom:10px;margin-left:10px"
        v-model="value"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
      ></el-cascader>

    </div>
    <!--显示用户下所有的教师教授信息-->
    <el-table
      :cell-style="{ textAlign: 'center' }"
      :data="Alldata"
      border
      row-key="no"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      style="width: 100%"
    >
      <el-table-column header-align="center" prop="no" label="编号">
      </el-table-column>
      <el-table-column header-align="center" prop="content" label="内容">
      </el-table-column>
      <el-table-column header-align="center" prop="achievement" label="达成度">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Alldata: [],
      options:[],
      userId:"",
      getClass:{
        userId:"",
      },
      value:"",
      searchResult:{
        userId:"",
        classId:""
      }
    };
  },
  created() {
    this.getUserId();
    this.getClassOptions();
  },
  methods: {
    getUserId() {
      this.userId = this.$route.params.userId;
      //console.log(this.InitSearch)
    },
    async getClassOptions() {
      this.getClass.userId = this.userId;
      const { data: res } = await this.$http.post(
        "getGradeMajorClass",
        this.getClass
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.options = res.data.options;
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    teacherManager() {
      this.$router.push({
        name: "teacherManager",
        params: { userId: this.userId },
      });
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
      this.$router.push({
        name: "Class",
        params: { userId: this.userId },
      });
    },
    async handleChange(value) {
      this.searchResult.userId = this.userId;
      this.searchResult.classId = value[2];
      //console.log(value[2]);
      const { data: res } = await this.$http.post(
        "viewClassAchievement",
        this.searchResult
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.Alldata = res.data
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
.el-table td,
.el-table th {
  text-align: center;
}
</style>    