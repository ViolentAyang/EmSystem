<template>
  <div>
    <div id="guide">
      <div style="margin-top: 10px; margin-left: 20px; float: left">
        工程认证达成度定型化管理系统
      </div>
      <div style="margin-top: 10px; float: right">
        <el-button @click="home" type="danger" plain> 首页 </el-button>
        <el-button @click="dataClick" type="primary" plain>数据管理</el-button>
        <el-button @click="classManage" type="success" plain
          >专业达成度</el-button
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
    <el-alert title="设置班级 年级 专业" type="success" :closable="false">
    </el-alert>

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
        placeholder="请输入班级名"
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
        margin-right: 30px;
        margin-top: 10px;
        margin-bottom: 10px;
        float: right;
      "
      @click="setClass"
      type="success"
      >设置班级</el-button
    >
    <el-button
      style="
        margin-right: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
        float: right;
      "
      @click="setMajor"
      type="success"
      >设置专业</el-button
    >

    <!--设置专业对话框-->
    <el-dialog
      title="设置专业"
      :visible.sync="majorDialogVisible"
      width="40%"
      :before-close="handleCloseMajor"
    >
      <el-form
        :inline="true"
        :model="MajordynamicValidateForm"
        ref="MajordynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
      >
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
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in MajordynamicValidateForm.domains"
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
          ><el-button @click.prevent="removeDomainMajor(domain)"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitFormMajor('MajordynamicValidateForm')"
            >提交</el-button
          >
          <el-button @click="addDomainMajor">新增专业</el-button>
          <el-button @click="resetFormMajor('MajordynamicValidateForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--设置班级对话框-->

    <el-dialog
      title="设置班级"
      :visible.sync="classDialogVisible"
      width="40%"
      :before-close="handleCloseClass"
    >
      <el-form
        :inline="true"
        :model="ClassdynamicValidateForm"
        ref="ClassdynamicValidateForm"
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
            @click="getCorrespondingMajor"
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
          <el-select
            :disabled="showMajor"
            v-model="majorValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in majorOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in ClassdynamicValidateForm.domains"
          :label="'班级' + index"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true,
            message: '班级不能为空',
            trigger: 'blur',
          }"
        >
          <el-input size="small" v-model="domain.value"></el-input
          ><el-button @click.prevent="removeDomainClass(domain)"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitFormClass('ClassdynamicValidateForm')"
            >提交</el-button
          >
          <el-button @click="addDomainClass">新增班级</el-button>
          <el-button @click="resetFormClass('ClassdynamicValidateForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--显示用户下所有的班级年级专业-->
    <el-table
      :span-method="objectSpanMethod"
      :cell-style="{ textAlign: 'center' }"
      :data="allTableData"
      border
      style="width: 100%"
    >
      <el-table-column header-align="center" prop="gradeId" label="年级">
      </el-table-column>
      <el-table-column header-align="center" prop="majorName" label="专业">
      </el-table-column>
      <el-table-column header-align="center" prop="className" label="班级">
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
      userId: '',
      showMajor: true, //是否允许使用专业下拉框，若未选择年级则禁用
      yearFilter: "", //大表格进行筛选年级
      majorFilter: "", //大表格进行筛选专业
      classFilter: "", //大表格进行筛选班级
      yearValue: "", //设置专业时 选择年级下拉框的绑定值
      majorValue: "", //设置班级时 选择专业下拉框的绑定值
      yearDialogVisible: false, //设置年级对话框
      majorDialogVisible: false, //设置专业对话框
      classDialogVisible: false, //设置班级对话框
      gradeSearch: {
        //用于查询年级对应的专业
        userId : "",
        gradeId: "",
      },
      allTableData: [],
      MajorSubmit: {
        //设置专业提交的数据
        userId: "",
        gradeId: "",
        majorArray: [],
      },
      ClassSubmit: {
        //设置班级提交的数据
        userId:"",
        gradeId: "",
        majorId: "",
        classArray: [],
      },
      //过滤 如果全部为空 则返回所有数据
      InitSearch: {
        userId: "",
        gradeSearch: "",
        majorSearch: "",
        classSearch: "",
      },
      MajordynamicValidateForm: {
        //专业动态表单增减
        domains: [
          {
            value: "",
          },
        ],
      },
      ClassdynamicValidateForm: {
        //班级动态表单增减
        domains: [
          {
            value: "",
          },
        ],
      },
      singleDeleteArray: {
        userId: "",
        classArray: [],
      },
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
      data: [], //列表数据
      indexDescArr: [],
      firstLevelIndexArr: [], // 一个空的数组，用于存放第一列每一行记录的合并数  控制第一列的合并
      firstLevelIndexPos: 0, // firstLevelIndexArr 的索引
      spanArr1: [], // 记录每一行的合并数
      pos1: "", // 记录索引
      spanArr2: [], // 记录每一行的合并数
      pos2: "", // 记录索引
    };
  },
  created() {
    // 页面初始化函数
    this.getUserId();
    this.getList();
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.post(
        "getAllMajorClass",
        this.InitSearch
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      //新增动态合并
      this.allTableData = res.data.tableData;
      this.data = this.allTableData;
      this.getSpanArr(this.data);

      console.log(res.data.tableData);
      console.log("测试初始化数据");
      console.log(res);
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
      this.InitSearch.userId = this.userId;
    },
    dataClick() {
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

    //设置专业的函数
    submitFormMajor(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //this.MajorSubmit.gradeId = this.MajordynamicValidateForm[0]
          console.log(this.MajordynamicValidateForm);
          this.MajorSubmit.gradeId = this.yearValue;
          this.MajorSubmit.userId = this.userId;
          for (
            let i = 0;
            i < this.MajordynamicValidateForm.domains.length;
            i++
          ) {
            console.log(this.MajordynamicValidateForm.domains[i].value);
            this.MajorSubmit.majorArray.push(
              this.MajordynamicValidateForm.domains[i].value
            );
          }
          console.log("测试提交的数据");
          const { data: res } = await this.$http.post(
            "addMajor",
            this.MajorSubmit
          );
          console.log(this.MajorSubmit);
          //console.log(this.MajordynamicValidateForm.domains[0].value);
          this.resetFormMajor(formName);
          if (res.meta.status != "200")
            return this.$message.error("提交失败！");
          this.$message.success("提交成功！");
          this.getList();
          this.majorDialogVisible = false;
          console.log(res);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetFormMajor(formName) {
      this.$refs[formName].resetFields();
      this.yearValue = "";
    },
    removeDomainMajor(item) {
      var index = this.MajordynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.MajordynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomainMajor() {
      this.MajordynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    async handleDelete(row) {
      console.log(row);
      this.singleDeleteArray.userId = this.userId;
      this.singleDeleteArray.classArray.push(row.classId);
      console.log("测试单选删除数组");
      console.log(this.singleDeleteArray);
      const { data: res } = await this.$http.post(
        "deleteClass",
        this.singleDeleteArray
      );
      console.log("测试单选删除接口");
      console.log(res);
      if (res.meta.status != "200") return this.$message.error("删除失败！");
      this.getList();
      //this.$router.go(0);
      this.$message.success("删除成功！");
    },
    //设置班级的函数
    removeDomainClass(item) {
      var index = this.ClassdynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.ClassdynamicValidateForm.domains.splice(index, 1);
      }
    },
    submitFormClass(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //this.ClassSubmit.gradeId = this.ClassdynamicValidateForm[0]
          console.log(this.ClassdynamicValidateForm);
          this.ClassSubmit.userId = this.userId;
          this.ClassSubmit.gradeId = this.yearValue;
          this.ClassSubmit.majorId = this.majorValue;
          for (
            let i = 0;
            i < this.ClassdynamicValidateForm.domains.length;
            i++
          ) {
            console.log(this.ClassdynamicValidateForm.domains[i].value);
            this.ClassSubmit.classArray.push(
              this.ClassdynamicValidateForm.domains[i].value
            );
          }
          console.log("测试提交的数据");
          console.log(this.ClassSubmit);
          this.gradeSearch.userId = this.userId;
          this.gradeSearch.gradeId = this.yearValue;
          if (this.majorValue == "") return this.$message.error("请选择专业！");
          const { data: res } = await this.$http.post(
            "addClass",
            this.ClassSubmit
          );
          if (res.meta.status != "200")
            return this.$message.error("添加失败！");
          this.getList();
          this.$message.success("添加成功！");
          this.classDialogVisible = false;
          //this.$router.go(0)
          //console.log(this.ClassdynamicValidateForm.domains[0].value);
          this.resetFormClass(formName);
          //alert("提交成功!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetFormClass(formName) {
      this.$refs[formName].resetFields();
      this.yearValue = "";
      this.majorValue = "";
    },
    addDomainClass() {
      this.ClassdynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    //关闭班级对话框
    handleCloseClass() {
      this.classDialogVisible = false;
      this.resetFormClass("ClassdynamicValidateForm");
    },
    //关闭专业对话框
    handleCloseMajor() {
      this.majorDialogVisible = false;
      this.resetFormMajor("MajordynamicValidateForm");
    },
    //获取年级对应的专业
    async getCorrespondingMajor() {
      this.gradeSearch.userId = this.userId;
      this.gradeSearch.gradeId = this.yearValue;
      const { data: res } = await this.$http.post("getMajor", this.gradeSearch);
      console.log("测试查询专业");
      console.log(res.data.majorData);
      if (res.meta.status != "200") return this.$message.error("查询失败！");
      this.majorOptions = res.data.majorData;
      this.showMajor = false;
      this.$message.success("查询成功！");
    },
    //筛选表格数据
    async tableFilter() {
      this.InitSearch.gradeSearch = this.yearFilter;
      this.InitSearch.majorSearch = this.majorFilter;
      this.InitSearch.classSearch = this.classFilter;
      console.log("测试大搜索");
      console.log(this.InitSearch);
      const { data: res } = await this.$http.post(
        "getAllMajorClass",
        this.InitSearch
      );
      if (res.meta.status != "200") return this.$message.error("搜索失败！");
      this.$message.success("搜索成功！");
      this.allTableData = res.data.tableData;
      this.clearData();
    },
    //清空搜索数据
    clearData() {
      this.yearFilter = "";
      this.majorFilter = "";
      this.classFilter = "";
    },
    //动态合并表格
    getSpanArr(data) {
      (this.spanArr1 = []), // 记录每一行的合并数
        (this.pos1 = ""), // 记录索引
        (this.spanArr2 = []), // 记录每一行的合并数
        (this.pos2 = ""); // 记录索引
      for (let i = 0; i < data.length; i++) {
        // 第一列
        if (i === 0) {
          this.spanArr1.push(1);
          this.pos1 = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].gradeId === data[i - 1].gradeId) {
            this.spanArr1[this.pos1] += 1;
            this.spanArr1.push(0);
          } else {
            this.spanArr1.push(1);
            this.pos1 = i;
          }
        }
      }
      for (let i = 0; i < data.length; i++) {
        // 第二列
        if (i === 0) {
          this.spanArr2.push(1);
          this.pos2 = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (
            data[i].gradeId === data[i - 1].gradeId &&
            data[i].majorName === data[i - 1].majorName
          ) {
            this.spanArr2[this.pos2] += 1;
            this.spanArr2.push(0);
          } else {
            this.spanArr2.push(1);
            this.pos2 = i;
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        // 第一列
        const _row = this.spanArr1[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (columnIndex === 1) {
        // 第二列
        const _row = this.spanArr2[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
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