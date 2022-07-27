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
    <el-alert title="修改毕业要求" type="success" :closable="false"> </el-alert>

    <div style="float: left; display: flex">
      <el-select
        style="
          width: 140px;
          margin-right: 10px;
          margin-top: 10px;
          margin-left: 10px;
        "
        v-model="yearFilter"
        placeholder="选择年级查询"
      >
        <el-option
          v-for="item in yearOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-input
        style="width: 180px; margin-right: 10px; margin-top: 10px"
        v-model="majorFilter"
        placeholder="请输入专业名"
      ></el-input>
      <el-input
        style="width: 180px; margin-top: 10px; margin-right: 10px"
        v-model="classFilter"
        placeholder="请输入毕业要求编号"
      ></el-input>
      <el-input
        style="width: 180px; margin-top: 10px; margin-right: 10px"
        v-model="classFilter"
        placeholder="请输入毕业要求内容"
      ></el-input>
      <el-button
        style="margin-right: 10px; margin-top: 10px; margin-bottom: 10px"
        @click="tableFilter"
        type="primary"
        icon="el-icon-search"
        >搜索·</el-button
      >
    </div>

    <el-button
      style="
        margin-right: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
        float: right;
      "
      @click="addRequire"
      type="success"
      >新增毕业要求</el-button
    >

    <!--新增毕业要求对话框-->
    <el-dialog
      title="设置班级"
      :visible.sync="requireDialogVisible"
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
            @click="getCorrespondingMajor"
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
          <el-select
            :disabled="showMajor"
            v-model="majorValue"
            placeholder="请选择"
          >
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
          :label="'毕业要求' + index"
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
          <el-button @click="addDomain">新增毕业要求</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--修改毕业要求对话框-->
    <el-dialog
      title="设置班级"
      :visible.sync="EditDialogVisible"
      width="40%"
      :before-close="handleCloseEdit"
    >
      <el-form
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
        <el-form-item label="请选择年级">
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
            @click="getCorrespondingMajor"
            icon="el-icon-search"
            circle
          ></el-button>
        </el-form-item>
        <el-form-item label="请选择专业">
          <el-select
            :disabled="showMajor"
            v-model="majorValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in majorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="毕业要求">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
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
      <el-table-column header-align="center" prop="yearTable" label="年级">
      </el-table-column>
      <el-table-column header-align="center" prop="majorTable" label="专业">
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="requirementNo"
        label="毕业要求编号"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="requirementContent"
        label="毕业要求内容"
      >
      </el-table-column>

      <el-table-column header-align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="EditRequirement(scope.row)"
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
      showMajor: true, //是否允许使用专业下拉框，若未选择年级则禁用
      yearValue: "", //新增毕业要求 选择年级下拉框的绑定值
      majorValue: "", //新增毕业要求 选择专业下拉框的绑定值
      
      requireDialogVisible: false, //新增毕业要求
      EditDialogVisible: false, //修改毕业要求对话框
      gradeSearch: {
        //查询年级对应的专业
        gradeId: "",
      },
      dynamicValidateForm: {
        //动态表单增减
        domains: [
          {
            value: "",
          },
        ],
      },
      tableData: [
        {
          yearTable: "2020",
          majorTable: "软件工程",
          requirementNo: "01",
          requirementContent: "需要学会开发",
        },
      ],
      yearOptions: [
        { id: "2018", name: "2018级" },
        { id: "2019", name: "2019级" },
        { id: "2020", name: "2020级" },
        { id: "2021", name: "2021级" },
        { id: "2022", name: "2022级" },
        { id: "2023", name: "2023级" },
        { id: "2024", name: "2024级" },
      ],
      majorOptions: [],
    };
  },
  methods: {
    addRequire() {
      this.requireDialogVisible = true;
    },
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
    //根据年级获取对应的专业
    async getCorrespondingMajor() {
      this.gradeSearch.gradeId = this.yearValue;
      const { data: res } = await this.$http.post("getMajor", this.gradeSearch);
      console.log("测试查询专业");
      console.log(res.data.majorData);
      if (res.meta.status != "200") return this.$message.error("查询失败！");
      this.majorOptions = res.data.majorData;
      this.showMajor = false;
      this.$message.success("查询成功！");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.dynamicValidateForm);
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
    handleDelete(row) {
      this.EditDialogVisible = true;
      console.log(row);
    },
    handleCloseEdit(){
      this.EditDialogVisible = false;
    },
    handleClose() {
      this.requireDialogVisible = false;
    },
    //打开修改对话框后进行数据绑定
    EditRequirement(row){

      this.EditDialogVisible = true;
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