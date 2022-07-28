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
    <el-alert title="设置支撑等级" type="success" :closable="false">
    </el-alert>
    
  

    <!--修改类型编码对话框-->
    <el-dialog
      title="修改类型编码"
      :visible.sync="typeDialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
      >
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table
      :cell-style="{ textAlign: 'center' }"
      :data="tableData"
      border
      style="width: 100%;"
    >
      <el-table-column header-align="center" prop="typeEncoding" label="类型编码">
      </el-table-column>
      <el-table-column header-align="center" prop="gradeNum" label="等级数">
      </el-table-column>
      <el-table-column header-align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)"
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
      typeValue: "", 
      numValue: "", 
      typeDialogVisible: "",
      tableData: [
        { typeEncoding: "支撑数", gradeNum: "10" },
        { typeEncoding: "达成度", gradeNum: "10" },
        { typeEncoding: "评价级", gradeNum: "5" },
        { typeEncoding: "学生评分等级", gradeNum: "8" },
      ],
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
      this.$router.push("/user");
    },
    about() {
      this.$router.push("/about");
    },
    classManage() {
      this.$router.push("/class");
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