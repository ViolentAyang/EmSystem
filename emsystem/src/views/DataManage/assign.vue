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
    <el-alert title="分配指标点" type="success" :closable="false"> </el-alert>
    <div style="float: left; display: flex">
      <el-input
        style="
          width: 180px;
          margin-left: 10px;
          margin-right: 10px;
          margin-top: 10px;
        "
        v-model="InitSearch.courseName"
        placeholder="请输入课程名"
      ></el-input>
      <el-input
        style="width: 180px; margin-right: 10px; margin-top: 10px"
        v-model="InitSearch.pointContent"
        placeholder="请输入指标点内容"
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
      @click="assignPoint"
      type="success"
      >分配指标点</el-button
    >
    <!--分配指标点对话框-->
    <el-dialog
      title="分配指标点"
      :visible.sync="assignDialogVisible"
      width="40%"
      :before-close="handleCloseAssign"
    >
      <el-form
        :model="addValidateForm"
        ref="addValidateForm"
        label-width="100px"
      >
        <el-form-item label="请输入课程名">
          <el-input v-model="addValidateForm.courseNameValue"></el-input>
        </el-form-item>
        <el-form-item label="查询毕业要求">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              请选择年级<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="2018">2018</el-dropdown-item>
              <el-dropdown-item command="2019">2019</el-dropdown-item>
              <el-dropdown-item command="2020">2020</el-dropdown-item>
              <el-dropdown-item command="2021">2021</el-dropdown-item>
              <el-dropdown-item command="2022">2022</el-dropdown-item>
              <el-dropdown-item command="2023">2023</el-dropdown-item>
              <el-dropdown-item command="2024">2024</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-select
            style="margin-left: 10px"
            v-model="addValidateForm.addMajorValue"
            placeholder="请选择专业"
          >
            <el-option
              v-for="item in majorOptions"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
          <el-button
            style="margin-left: 10px"
            @click="getgraduction"
            icon="el-icon-search"
            circle
          ></el-button>
        </el-form-item>
        <el-form-item label="选择毕业要求">
          <el-select
            v-model="addValidateForm.graduationNoAdd"
            placeholder="请选择"
          >
            <el-option
              v-for="item in graduationObject"
              :key="item.uid"
              :label="item.contentSearch"
              :value="item.uid"
            >
            </el-option>
          </el-select>
          <el-button
            style="margin-left: 10px"
            @click="getPoint"
            icon="el-icon-search"
            circle
          ></el-button>
        </el-form-item>
        <el-form-item label="选择指标点">
          <el-select
            v-model="addValidateForm.pointValueAdd"
            placeholder="请选择"
          >
            <el-option
              v-for="item in pointObject"
              :key="item.pointId"
              :label="item.pointContent"
              :value="item.pointId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支撑等级数" prop="pass">
          <el-input v-model="addValidateForm.supportNumValue"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAdd">提交</el-button>
          <el-button @click="handleResetAdd">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--修改已分配课程对话框-->
    <el-dialog
      title="修改分配信息"
      :visible.sync="editDialogVisible"
      width="40%"
      :before-close="handleCloseEdit"
    >
      <el-form
        :model="editValidateForm"
        ref="editValidateForm"
        label-width="100px"
      >
        <el-form-item label="请输入课程名">
          <el-input v-model="editValidateForm.courseNameValue"></el-input>
        </el-form-item>
        <el-form-item label="查询毕业要求">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              请选择年级<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="2018">2018</el-dropdown-item>
              <el-dropdown-item command="2019">2019</el-dropdown-item>
              <el-dropdown-item command="2020">2020</el-dropdown-item>
              <el-dropdown-item command="2021">2021</el-dropdown-item>
              <el-dropdown-item command="2022">2022</el-dropdown-item>
              <el-dropdown-item command="2023">2023</el-dropdown-item>
              <el-dropdown-item command="2024">2024</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-select
            style="margin-left: 10px"
            v-model="editValidateForm.editMajorValue"
            placeholder="请选择专业"
          >
            <el-option
              v-for="item in majorOptions"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
          <el-button
            style="margin-left: 10px"
            @click="getgraduction"
            icon="el-icon-search"
            circle
          ></el-button>
        </el-form-item>
        <el-form-item label="选择毕业要求">
          <el-select
            v-model="editValidateForm.graduationNoEdit"
            placeholder="请选择"
          >
            <el-option
              v-for="item in graduationObject"
              :key="item.uid"
              :label="item.contentSearch"
              :value="item.uid"
            >
            </el-option>
          </el-select>
          <el-button
            style="margin-left: 10px"
            @click="getPoint"
            icon="el-icon-search"
            circle
          ></el-button>
        </el-form-item>
        <el-form-item label="选择指标点">
          <el-select
            v-model="editValidateForm.pointValueEdit"
            placeholder="请选择"
          >
            <el-option
              v-for="item in pointObject"
              :key="item.pointId"
              :label="item.pointContent"
              :value="item.pointId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支撑等级数" prop="pass">
          <el-input v-model="editValidateForm.supportNumValue"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEdit">提交</el-button>
          <el-button @click="resetFormEdit">重置</el-button>
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
      <el-table-column header-align="center" prop="courseName" label="课程编号">
      </el-table-column>
      <el-table-column header-align="center" prop="pointContent" label="指标点">
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="supportNum"
        label="支撑等级数"
      >
      </el-table-column>
      <el-table-column header-align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
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
      graduationNoAdd: "", //新增时绑定毕业要求
      searchMajor: {
        //新增时查询专业
        userId: "",
        gradeId: "",
      },
      searchGra: {
        //新增时查询毕业要求
        userId: "",
        gradeSearch: "",
        majorSearch: "",
        noSearch: "",
        contentSearch: "",
      },
      courseNameValue: "", //新增时保存的课程名
      addMajorValue: "", //新增时保存的专业
      supportNumValue: "", //新增时保存的支撑等级数
      graduationObject: [],
      assignDialogVisible: false,
      InitSearch: {
        userId: "",
        courseName: "",
        pointContent: "",
      },
      addForm: {
        userId: "",
        courseName: "",
        pointId: "",
        supportNum: "",
      },
      deleteObject: {
        userId: "",
        courseName: "",
        pointId: "",
      },
      pointValueAdd: "", //新增时指标点绑定的值
      pointObject: [], //新增时指标点下拉框的值
      userId: "",
      tableData: [],
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
      searchPoint: {
        userId: "",
        graduationNo: "",
      },
      //新增表单
      addValidateForm: {
        courseNameValue: "",
        pointValueAdd: "",
        supportNumValue: "",
        addMajorValue: "",
        graduationNoAdd: "",
      },
      editDialogVisible: false, //编辑对话框
      editValidateForm: {
        courseNameValue: "",
        handleCommand: "",
        pointValueEdit: "",
        supportNumValue: "",
        editMajorValue: "",
        graduationNoEdit: "",
      },
      editSubmit: {
        userId: "",
        courseName: "",
        pointId: "",
        supportNum: "",
      },
    };
  },
  created() {
    this.getUserId();
    this.getList();
  },
  methods: {
    async getList() {
      this.InitSearch.userId = this.userId;
      const { data: res } = await this.$http.post(
        "getAllCourse",
        this.InitSearch
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.tableData = res.data;
    },
    async tableFilter() {
      this.InitSearch.userId = this.userId;
      const { data: res } = await this.$http.post(
        "getAllCourse",
        this.InitSearch
      );
      if (res.meta.status != "200") return this.$message.error("筛选失败！");
      this.$message.success("筛选成功！");
      this.tableData = res.data;
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
    assignPoint() {
      this.assignDialogVisible = true;
    },
    //分配指标点对话框的函数
    //1.选择年级时查询专业
    async handleCommand(command) {
      //选择年级时自动查询专业
      this.searchMajor.gradeId = command;
      this.searchGra.gradeSearch = command;
      this.searchMajor.userId = this.userId;
      //console.log(this.searchMajor);
      const { data: res } = await this.$http.post("getMajor", this.searchMajor);
      if (res.meta.status != "200") return this.$message.error("查询失败！");
      this.majorOptions = res.data.majorData;
      this.$message.success("查询成功！");
    },
    //2.查询毕业要求
    async getgraduction() {
      this.searchGra.userId = this.userId;
      this.searchGra.majorSearch = this.addMajorValue;
      const { data: res } = await this.$http.post(
        "getAllGraduationReq",
        this.searchGra
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.graduationObject = res.data.tableData;
      console.log(this.graduationObject);
    },
    //3.查询指标点
    async getPoint() {
      this.searchPoint.userId = this.userId;
      this.searchPoint.graduationNo = this.graduationNoAdd;
      const { data: res } = await this.$http.post(
        "getAlltarget",
        this.searchPoint
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.pointObject = res.data;
    },
    //4.提交新增
    async submitAdd() {
      this.addForm.userId = this.userId;
      this.addForm.courseName = this.addValidateForm.courseNameValue;
      this.addForm.pointId = this.addValidateForm.pointValueAdd;
      this.addForm.supportNum = this.addValidateForm.supportNumValue;
      const { data: res } = await this.$http.post("assignCourse", this.addForm);
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.getList();
      this.handleCloseAssign();
      this.handleResetAdd();
    },
    handleCloseAssign() {
      this.assignDialogVisible = false;
    },
    handleResetAdd() {
      this.addValidateForm.courseNameValue = "";
      this.addValidateForm.pointValueAdd = "";
      this.addValidateForm.supportNumValue = "";
      this.addValidateForm.addMajorValue = "";
      this.addValidateForm.graduationNoAdd = "";
    },
    //删除
    async handleDelete(row) {
      //console.log(row);
      this.deleteObject.userId = this.userId;
      this.deleteObject.courseName = row.courseName;
      this.deleteObject.pointId = row.pointId;
      const { data: res } = await this.$http.post(
        "deleteAssignCourse",
        this.deleteObject
      );
      if (res.meta.status != "200") return this.$message.error("删除失败！");
      this.$message.success("删除成功！");
      this.getList();
    },
    filterReset() {
      this.InitSearch.courseName = "";
      this.InitSearch.pointContent = "";
      this.getList();
    },
    //下面为修改
    handleEdit(row) {
      this.editValidateForm.courseNameValue = row.courseName;
      this.editValidateForm.pointValueEdit = row.pointId;
      this.editValidateForm.supportNumValue = row.supportNum;
      this.editDialogVisible = true;
    },
    async submitEdit() {
      this.editSubmit.userId = this.userId;
      this.editSubmit.courseName = this.editValidateForm.courseNameValue;
      this.editSubmit.pointId = this.editValidateForm.pointValueEdit;
      this.editSubmit.supportNum = this.editValidateForm.supportNumValue;
      const { data: res } = await this.$http.post("editAssignCourse", this.editSubmit);
      if (res.meta.status != "200") return this.$message.error("修改失败！");
      this.$message.success("修改成功！");
      this.getList();
      this.handleCloseEdit();
    },
    handleCloseEdit() {
      this.editDialogVisible = false;
    },
    resetFormEdit() {
      this.editValidateForm.courseNameValue = "";
      this.editValidateForm.pointValueEdit = "";
      this.editValidateForm.handleCommand = "";
      this.editValidateForm.editMajorValue = "";
      this.editValidateForm.graduationNoEdit = "";
      this.editValidateForm.supportNumValue = "";
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