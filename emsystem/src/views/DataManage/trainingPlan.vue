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
    <el-alert title="设置培养计划" type="success" :closable="false">
    </el-alert>
    <el-button
      style="
        margin-right: 30px;
        margin-top: 10px;
        margin-bottom: 10px;
        float: right;
      "
      @click="setClass"
      type="success"
      >新增培养计划</el-button
    >
  

    <!--设置班级对话框-->
    <el-dialog
      title="设置班级"
      :visible.sync="classDialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form
        :inline="true"
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-alert
          style="margin-bottom: 5px"
          title="选择年级后进行搜索可以获得该年级对应所有的专业"
          type="warning"
        >
        </el-alert>
        <el-form-item
          label="请选择年级"
          :rules="{
            required: true,
            message: '必须先选年级',
            trigger: 'blur',
          }"
        >
          <el-select v-model="yearValue" placeholder="请选择">
            <el-option
              v-for="item in yearOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>

          <el-button
            style="margin-left: 10px"
            icon="el-icon-search"
            circle
          ></el-button>
        </el-form-item>
        <el-form-item
          label="请选择专业"
          :rules="{
            required: true,
            message: '必须先选专业',
            trigger: 'blur',
          }"
        >
          <el-select v-model="majorValue" placeholder="请选择">
            <el-option
              v-for="item in majorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :label="'专业' + index"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true,
            message: '专业不能为空',
            trigger: 'blur',
          }"
        >
          <el-input size="small" v-model="domain.value"></el-input
          ><el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')"
            >提交</el-button
          >
          <el-button @click="addDomain">新增专业</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
          <el-button type="danger" @click="yearDialogVisible = false"
            >取 消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--显示用户下所有的班级年级专业-->
    <el-table
      :cell-style="{ textAlign: 'center' }"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column header-align="center" prop="yearTable" label="课程编号">
      </el-table-column>
      <el-table-column header-align="center" prop="majorTable" label="课程名">
      </el-table-column>
      <el-table-column header-align="center" prop="classTable" label="学时">
      </el-table-column>
      <el-table-column header-align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
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
      userId: '',
      yearValue: "", //设置专业时 选择年级下拉框的绑定值
      majorValue: "", //设置班级时 选择专业下拉框的绑定值
      yearDialogVisible: false, //设置年级对话框
      majorDialogVisible: false, //设置专业对话框
      classDialogVisible: false, //设置班级对话框
      dynamicValidateForm: {
        //动态表单增减
        domains: [
          {
            value: "",
          },
        ],
      },
      tableData: [
        { yearTable: "10", majorTable: "01", classTable: "45" },
        { yearTable: "10", majorTable: "02", classTable: "85232" },
        { yearTable: "10", majorTable: "01", classTable: "8561" },
        { yearTable: "10", majorTable: "02", classTable: "454" },
        { yearTable: "10", majorTable: "01", classTable: "856896" },
        { yearTable: "20", majorTable: "02", classTable: "8686" },
      ],
      classOptions: [
        { id: "600", name: "1班" },
        { id: "601", name: "2班" },
        { id: "602", name: "3班" },
        { id: "603", name: "4班" },
        { id: "604", name: "5班" },
        { id: "605", name: "6班" },
      ],
      yearOptions: [
        { id: "2019", name: "2019级学生" },
        { id: "2020", name: "2020级学生" },
        { id: "2021", name: "2021级学生" },
        { id: "2022", name: "2022级学生" },
        { id: "2023", name: "2023级学生" },
      ],
      majorOptions: [
        { value: "01", label: "会计学" },
        { value: "02", label: "财务管理" },
        { value: "03", label: "审计学" },
        { value: "04", label: "金融学" },
        { value: "05", label: "金融工程" },
        { value: "06", label: "市场营销" },
        { value: "07", label: "物流管理" },
        { value: "08", label: "国际经济与贸易" },
        { value: "09", label: "电子商务" },
      ],
    };
  },
  created() {
    this.getUserId();
  },
  methods: {
    setYear() {
      this.yearDialogVisible = !this.yearDialogVisible;
    },
    setMajor() {
      this.majorDialogVisible = !this.majorDialogVisible;
    },
    setClass() {
      this.classDialogVisible = !this.classDialogVisible;
    },
   getUserId() {
      this.userId = this.$route.params.userId;
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

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
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