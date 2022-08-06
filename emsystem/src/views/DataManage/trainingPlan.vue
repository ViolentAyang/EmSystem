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
    <el-alert title="设置培养计划" type="success" :closable="false"> </el-alert>
    <div style="float: left; display: flex">
      <el-input
        style="
          width: 180px;
          margin-left: 10px;
          margin-right: 10px;
          margin-top: 10px;
        "
        v-model="InitSearch.courseNo"
        placeholder="请输入课程编号"
      ></el-input>
      <el-input
        style="width: 180px; margin-right: 10px; margin-top: 10px"
        v-model="InitSearch.courseName"
        placeholder="请输入课程名"
      ></el-input>
      <el-input
        style="width: 180px; margin-top: 10px; margin-right: 10px"
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
    </div>
    <el-button
      style="
        margin-right: 30px;
        margin-top: 10px;
        margin-bottom: 10px;
        float: right;
      "
      @click="newPlan"
      type="success"
      >新增培养计划</el-button
    >
    <!--新增培养计划对话框-->
    <el-dialog
      title="新增培养计划"
      :visible.sync="dialogVisibleAdd"
      width="40%"
      :before-close="handleCloseAdd"
    >
      <el-form ref="form" :model="addForm" label-width="80px">
      <el-form-item label="课程编号">
        <el-input v-model="addForm.courseNo"></el-input>
      </el-form-item>
      <el-form-item label="课程名">
        <el-input v-model="addForm.courseName"></el-input>
      </el-form-item>
      <el-form-item label="课时数">
        <el-input v-model="addForm.creditHour"></el-input>
      </el-form-item>
      <el-form-item label="开设学期">
        <el-input v-model="addForm.arrangeTerm"></el-input>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseAdd">取 消</el-button>
        <el-button type="danger" @click="resetAddForm"
          >重置</el-button
        >
        <el-button type="primary" @click="submitAdd"
          >提交</el-button
        >
      </span>
    </el-dialog>
    <!--修改培养计划对话框-->
    <el-dialog
      title="新增培养计划"
      :visible.sync="dialogVisibleEdit"
      width="40%"
      :before-close="handleCloseEdit"
    >
      <el-form ref="form" :model="editForm" label-width="80px">
      <el-form-item label="课程编号">
        <el-input v-model="editForm.courseNo"></el-input>
      </el-form-item>
      <el-form-item label="课程名">
        <el-input v-model="editForm.courseName"></el-input>
      </el-form-item>
      <el-form-item label="课时数">
        <el-input v-model="editForm.creditHour"></el-input>
      </el-form-item>
      <el-form-item label="开设学期">
        <el-input v-model="editForm.arrangeTerm"></el-input>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseEdit">取 消</el-button>
        <el-button type="danger" @click="resetEditForm"
          >重置</el-button
        >
        <el-button type="primary" @click="submitEdit"
          >提交</el-button
        >
      </span>
    </el-dialog>
    <!--显示用户下所有的培养计划-->
    <el-table
      :cell-style="{ textAlign: 'center' }"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column header-align="center" prop="courseNo" label="课程编号">
      </el-table-column>
      <el-table-column header-align="center" prop="courseName" label="课程名">
      </el-table-column>
      <el-table-column header-align="center" prop="creditHour" label="学时">
      </el-table-column
      ><el-table-column
        header-align="center"
        prop="arrangeTerm"
        label="开设学期"
      >
      </el-table-column>
      <el-table-column header-align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
          <el-button size="mini" type="primary" @click="openEdit(scope.row)"
            >修改</el-button
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
      userId: "",
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      tableData: [],
      InitSearch: {
        userId: "",
        courseNo: "",
        courseName: "",
        arrangeTerm: "",
      },
      addForm:{
        userId: "",
        courseNo: "",
        courseName: "",
        creditHour: "",
        arrangeTerm: "",
      },
      editForm:{
        userId: "",
        courseNo: "",
        courseName: "",
        creditHour: "",
        arrangeTerm: "",
      },
      deleteObject:{
        userId: "",
        courseArray: []
      }
    };
  },
  created() {
    this.getUserId();
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.post(
        "getAllPlan",
        this.InitSearch
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.tableData = res.data.planData;
    },
    async tableFilter() {
      const { data: res } = await this.$http.post(
        "getAllPlan",
        this.InitSearch
      );
      if (res.meta.status != "200") return this.$message.error("搜索失败！");
      this.$message.success("搜索成功！");
      this.tableData = res.data.planData;
    },
    getUserId() {
      this.userId = this.$route.params.userId;
      this.InitSearch.userId = this.userId;
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
    filterReset() {
      this.InitSearch.majorNo = "";
      this.InitSearch.majorName = "";
      this.InitSearch.arrangeTerm = "";
      this.getList();
    },
    //新增用到的函数
    handleCloseAdd(){
      this.dialogVisibleAdd = false
      this.resetAddForm()
    },
    resetAddForm(){
      this.addForm.courseNo = ""
      this.addForm.courseName = ""
      this.addForm.creditHour = ""
      this.addForm.arrangeTerm = ""
    },
    newPlan(){
      this.dialogVisibleAdd = true
    },
    async submitAdd(){
      this.addForm.userId = this.userId;
      const { data: res } = await this.$http.post(
        "addPlan",
        this.addForm
      );
      if (res.meta.status != "200") return this.$message.error("新增失败！");
      this.$message.success("新增成功！");
      this.getList()
      this.handleCloseAdd()
    },
    //修改培养计划
    handleCloseEdit(){
      this.dialogVisibleEdit = false
    },
    openEdit(row){
      this.dialogVisibleEdit = true
      this.editForm.courseNo = row.courseNo
      this.editForm.courseName = row.courseName
      this.editForm.creditHour = row.creditHour
      this.editForm.arrangeTerm = row.arrangeTerm
    },
    resetEditForm(){
      this.editForm.courseNo = ""
      this.editForm.courseName = ""
      this.editForm.creditHour = ""
      this.editForm.arrangeTerm = ""
    },
    async submitEdit(){
      this.editForm.userId = this.userId
       const { data: res } = await this.$http.post(
        "editPlan",
        this.editForm
      );
      if (res.meta.status != "200") return this.$message.error("修改失败！");
      this.$message.success("修改成功！");
      this.getList();
      this.handleCloseEdit()
    },
    async handleDelete(row){
      this.deleteObject.courseArray.push(row.courseNo)
      this.deleteObject.userId = this.userId
      const { data: res } = await this.$http.post(
        "deletePlan",
        this.deleteObject
      );
      if (res.meta.status != "200") return this.$message.error("删除失败！");
      this.$message.success("删除成功！");
      this.getList()
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