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
    <el-alert title="查看教师成绩录入情况" type="success" :closable="false"> </el-alert>
    <div style="float: left; display: flex">
      <el-input
        style="width: 180px; margin-left: 10px; margin-top: 10px"
        v-model="InitSearch.teacherName"
        placeholder="请输入教师名"
      ></el-input>
      <el-input
        style="
          width: 180px;
          margin-top: 10px;
          margin-left: 10px;
          margin-right: 10px;
        "
        v-model="InitSearch.courseName"
        placeholder="请输入课程名"
      ></el-input>
      <el-input
        style="
          width: 180px;
          margin-top: 10px;
          margin-left: 10px;
          margin-right: 10px;
        "
        v-model="InitSearch.arrangeTerm"
        placeholder="请输入开设学期"
      ></el-input>
      <el-button
        style="margin-right: 10px; margin-top: 10px; margin-bottom: 10px"
        @click="tableFilter"
        type="primary"
        icon="el-icon-search"
        >搜索</el-button
      >
      <el-button
        style="margin-right: 10px; margin-top: 10px; margin-bottom: 10px"
        @click="filterReset"
        type="primary"
        icon="el-icon-refresh"
        >重置</el-button
      >
      <el-button
        style="margin-right: 10px; margin-top: 10px; margin-bottom: 10px"
        @click="viewGrade"
        type="primary"
        plain
        icon="el-icon-user-solid"
        >查看年级达成度结果</el-button
      >
      <el-button
        style="margin-right: 10px; margin-top: 10px; margin-bottom: 10px"
        @click="viewClass"
        type="primary"
        plain
        icon="el-icon-user"
        >查看班级达成度结果</el-button
      >
    </div>

    <!--显示用户下所有的教师教授信息-->
    <el-table
      :cell-style="{ textAlign: 'center' }"
      :data="Alldata"
      border
      style="width: 100%"
    >
      <el-table-column header-align="center" prop="teacherName" label="教师名">
      </el-table-column>
      <el-table-column header-align="center" prop="courseName" label="课程名">
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="teacherClass"
        label="教授班级"
      >
      </el-table-column>
      <el-table-column header-align="center" prop="arrangeNum" label="开设学期">
      </el-table-column>
      <el-table-column header-align="center" label="成绩录入情况">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            disabled
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      InitSearch: {
        userId: "",
        teacherName: "",
        courseName: "",
        arrangeTerm: "",
      },
      Alldata: [],
    };
  },
  created() {
    this.getUserId();
    this.getList();
  },
  methods: {
    async getList(){
      const { data: res } = await this.$http.post(
        "getAllCurriculum",
        this.InitSearch
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.Alldata = res.data
    },
    tableFilter(){
      this.getList();
    },
    filterReset() {
      this.InitSearch.teacherName = "";
      this.InitSearch.courseName = "";
      this.InitSearch.arrangeTerm = "";
      this.getList();
    },
    getUserId() {
      this.userId = this.$route.params.userId;
      this.InitSearch.userId = this.userId;
      //console.log(this.InitSearch)
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
      window.location.reload()
    },
    viewGrade(){
      this.$router.push({
        name: "checkResultMajor",
        params: { userId: this.userId },
      });
    },
    viewClass(){
      this.$router.push({
        name: "checkResultClass",
        params: { userId: this.userId },
      });
    }
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