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
    <el-alert title="教师账号管理" type="success" :closable="false"> </el-alert>
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

    <el-button
      style="
        margin-right: 30px;
        margin-top: 10px;
        margin-bottom: 10px;
        float: right;
      "
      @click="addteacher"
      type="success"
      >安排教师教授课程</el-button
    >

    <!--安排教师教授课程-->
    <el-dialog
      title="安排教师教授课程"
      :visible.sync="dialogVisibleAdd"
      width="40%"
      :before-close="handleCloseAdd"
    >
      <el-form ref="form" :model="addTeacherForm" label-width="120px">
        <el-form-item label="教师名">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
            clearable
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="课程名">
          <el-input
            style="width: 49%"
            v-model="addTeacherForm.courseName"
          ></el-input>
        </el-form-item>
        <el-form-item label="教授班级">
          <el-cascader
            :key="refreshItem"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
            :options="options"
            :show-all-levels="false"
            clearable
          />
        </el-form-item>
        <el-form-item label="开设学期">
          <el-input
            style="width: 49%"
            v-model="addTeacherForm.arrangeTerm"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseAdd">取 消</el-button>
        <el-button type="danger" @click="resetAddForm">重置</el-button>
        <el-button type="primary" @click="submitAdd">提交</el-button>
      </span>
    </el-dialog>

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
      <el-table-column header-align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
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
      refreshItem: 0, //用于清除级联选择器的绑定值
      teacherArray: [],
      state: "",
      timeout: null,
      dialogVisibleAdd: false,
      Alldata: [],
      getClass: {
        userId: "",
      },
      searchTeacher: {
        userId: "",
        teacherName: "",
      },
      InitSearch: {
        userId: "",
        teacherName: "",
        courseName: "",
        arrangeNum: "",
      },
      addTeacherForm: {
        userId: "",
        teacherNo: "",
        classId: "",
        courseName: "",
        arrangeTerm: "",
      },
      options: [],
    };
  },
  created() {
    this.getUserId();
    this.getClassOptions();
    this.searchTeacherId();
    this.getList();
  },
  methods: {
    async getList() {
      this.InitSearch.userId = this.userId;
      const { data: res } = await this.$http.post(
        "getAllCurriculum",
        this.InitSearch
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.Alldata = res.data;
    },
    getUserId() {
      this.userId = this.$route.params.userId;
      this.InitSearch.userId = this.userId;
      this.addTeacherForm.userId = this.userId;
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
    async tableFilter() {
      const { data: res } = await this.$http.post(
        "getScoreRecorded",
        this.InitSearch
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.getList();
    },
    filterReset() {
      (this.InitSearch.teacherName = ""),
        (this.InitSearch.courseName = ""),
        (this.InitSearch.arrangeNum = "");
    },
    handleCloseAdd() {
      this.dialogVisibleAdd = false;
      this.resetAddForm();
    },
    addteacher() {
      this.dialogVisibleAdd = true;
    },
    resetAddForm() {
      (this.addTeacherForm.teacherNo = ""),
        (this.addTeacherForm.classId = ""),
        (this.addTeacherForm.courseName = ""),
        (this.addTeacherForm.arrangeTerm = ""),
        (this.state = ""),
        this.cancel();
    },
    //级联选择器清除绑定值函数
    cancel() {
      this.refreshItem++;
    },
    async submitAdd() {
      const { data: res } = await this.$http.post(
        "addCurriculum",
        this.addTeacherForm
      );
      if (res.meta.status != "200") return this.$message.error("新增失败！");
      this.$message.success("新增成功！");
      this.getList();
      this.handleCloseAdd();
    },
    async searchTeacherId() {
      this.searchTeacher.userId = this.userId;
      const { data: res } = await this.$http.post(
        "getTeacherId",
        this.searchTeacher
      );
      if (res.meta.status != "200") return this.$message.error("查询失败！");
      this.$message.success("查询成功！");
      this.teacherArray = res.data;
    },
    querySearchAsync(queryString, cb) {
      var teacherArray = this.teacherArray;
      var results = queryString
        ? teacherArray.filter(this.createStateFilter(queryString))
        : teacherArray;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.addTeacherForm.teacherNo = item.label;
      //console.log(item.label);
    },
    handleChange(value) {
      this.addTeacherForm.classId = value[2];
      console.log(this.addTeacherForm);
      //console.log(value[2]);
    },
    async handleDelete(row) {
      const deletArray = {
        userId: this.userId,
        teacherNo: row.teacherNo,
        classId: row.classId,
        courseNo: row.courseNo,
      };
      //console.log(deletArray)
      const { data: res } = await this.$http.post(
        "deleteCurriculum",
        deletArray
      );
      if (res.meta.status != "200") return this.$message.error("删除失败！");
      this.$message.success("删除成功！");
      this.getList();
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