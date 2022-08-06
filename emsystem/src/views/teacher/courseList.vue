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
        v-model="InitSearch.teacherNo"
        placeholder="请输入教师号"
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
      >新增教师账号</el-button
    >

    <!--新增培养计划对话框-->
    <el-dialog
      title="新增教师账号"
      :visible.sync="dialogVisibleAdd"
      width="40%"
      :before-close="handleCloseAdd"
    >
      <el-form ref="form" :model="addTeacherForm" label-width="120px">
        <el-form-item label="教师名">
          <el-input v-model="addTeacherForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="教师号(职工号)">
          <el-input v-model="addTeacherForm.teacherNo"></el-input>
        </el-form-item>
        <el-form-item label="教师登录密码">
          <el-input v-model="addTeacherForm.teacherPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseAdd">取 消</el-button>
        <el-button type="danger" @click="resetAddForm">重置</el-button>
        <el-button type="primary" @click="submitAdd">提交</el-button>
      </span>
    </el-dialog>

    <!--修改培养计划对话框-->
    <el-dialog
      title="新增教师账号"
      :visible.sync="dialogVisibleEdit"
      width="40%"
      :before-close="handleCloseEdit"
    >
      <el-form ref="form" :model="editTeacherForm" label-width="120px">
        <el-form-item label="教师名">
          <el-input v-model="editTeacherForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="教师号(职工号)">
          <el-input v-model="editTeacherForm.teacherNo"></el-input>
        </el-form-item>
        <el-form-item label="教师登录密码">
          <el-input v-model="editTeacherForm.teacherPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseEdit">取 消</el-button>
        <el-button type="danger" @click="resetEditForm">重置</el-button>
        <el-button type="primary" @click="submitEdit">提交</el-button>
      </span>
    </el-dialog>

    <!--显示用户下所有的教师编号-->
    <el-table
      :cell-style="{ textAlign: 'center' }"
      :data="Alldata"
      border
      style="width: 100%"
    >
      <el-table-column header-align="center" prop="teacherNo" label="教师号">
      </el-table-column>
      <el-table-column header-align="center" prop="teacherName" label="教师名">
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="teacherPassword"
        label="教师密码"
      >
      </el-table-column>
      <el-table-column header-align="center" label="账号状态">
        <template v-slot="scope">
          <el-switch
            @change="userStateChanged(scope.row)"
            v-model="scope.row.status"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="EditTeacher(scope.row)"
            >修改</el-button
          >
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
      
    };
  },
  created() {
    this.getUserId();
  },
  methods: {

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
      this.$router.push({
        name: "Class",
        params: { userId: this.userId },
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
.el-table td,
.el-table th {
  text-align: center;
}
</style>