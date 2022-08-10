<template>
  <div>
    <div id="guide">
      <div style="margin-top: 10px; margin-left: 20px; float: left">
        工程认证达成度定型化管理系统
      </div>
      <div style="margin-top: 10px; float: right">
        <el-button @click="classManage" type="success" plain
          >专业达成度</el-button
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
    <el-alert title="查看成绩录入情况" type="success" :closable="false">
    </el-alert>
    <div style="float: left; display: flex">
      <el-input
        style="
          width: 180px;
          margin-top: 10px;
          margin-left: 10px;
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
        v-model="InitSearch.arrangeNum"
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
    </div>

    <!--显示用户下所有的教师编号-->
    <el-table
      :cell-style="{ textAlign: 'center' }"
      :data="Alldata"
      border
      style="width: 100%"
    > 
      <el-table-column header-align="center" prop="courseName" label="课程名">
      </el-table-column>
      <el-table-column header-align="center" prop="teacherClass" label="教授班级">
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
      <el-table-column header-align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="uploadScore(scope.row)"
            >录入成绩</el-button
          >
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
        teacherNo: "",
        courseName: "",
        arrangeNum:""
      },
      teacherSearch: {
        userId: "",
        teacherName: "",
      },
      Alldata: [],
      userId: "",
      teacherNo:"",
    };
  },
  created() {
    this.getUserId();
    this.getList();
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.post(
        "getTeacherScoreRecorded",
        this.InitSearch
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.Alldata = res.data
    },
    getUserId() {
      console.log(this.$route.params);
      this.userId = this.$route.params.userId;
      this.teacherNo = this.$route.params.teacherNo;
      this.InitSearch.teacherNo = this.teacherNo;
      this.InitSearch.userId = this.userId;
      console.log(this.InitSearch)
      this.teacherSearch.userId = this.userId;
      //console.log(this.InitSearch)
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    classManage() {
      window.location.reload();
    },
    //进入录入成绩
    uploadScore(row) {
      this.$router.push({
        name: "uploadScore",
        params: {
          userId: this.userId,
          courseNo: row.courseNo,
          teacherNo: this.teacherNo,
          classId:row.classId
        },
      });
    },
    tableFilter() {},
    filterReset() {
      this.InitSearch.courseName = ""
      this.InitSearch.arrangeNum = ""
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