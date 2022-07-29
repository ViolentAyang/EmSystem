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
    <el-alert title="设置支撑等级" type="success" :closable="false"> </el-alert>

    <!--修改类型编码对话框-->
    <el-dialog
      title="修改类型编码"
      :visible.sync="typeDialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="类型编码">
          <el-input :disabled="true" v-model="form.typeEncoding"></el-input>
        </el-form-item>
        <el-form-item label="等级数">
          <el-input v-model="form.gradeNum"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table
      :cell-style="{ textAlign: 'center' }"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        header-align="center"
        prop="typeEncoding"
        label="类型编码"
      >
      </el-table-column>
      <el-table-column header-align="center" prop="gradeNum" label="等级数">
      </el-table-column>

      <el-table-column header-align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
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
      typeValue: "",
      numValue: "",
      typeDialogVisible: false,
      tableData: [],
      form: {
        typeEncoding: "",
        gradeNum: "",
        userId: "",
      },
      InitSearch: {
        userId: "",
      },
    };
  },
  created() {
    this.getUserId();
    this.getList();
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.post(
        "getAllSupport",
        this.InitSearch
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.tableData = res.data;
    },
    getUserId() {
      this.userId = this.$route.params.userId;
      //console.log(this.$route.params.userId)
      //console.log("是否获取")
      //console.log(this.userId)
      this.InitSearch.userId = this.userId;
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
    handleEdit(row) {
      this.form.typeEncoding = row.typeEncoding;
      this.form.gradeNum = row.gradeNum;
      this.typeDialogVisible = true;
    },
    resetForm() {
      this.form.typeEncoding = "";
      this.form.gradeNum = "";
    },
    handleClose() {
      this.typeDialogVisible = false;
    },
    async submitForm() {
      this.form.userId = this.userId
      console.log(this.form);
      const { data: res } = await this.$http.post("editAllNum", this.form);
      if (res.meta.status != "200") return this.$message.error("修改失败！");
      this.$message.success("修改成功！");
      this.handleClose()
      this.getList()
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