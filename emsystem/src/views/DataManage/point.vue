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
    <el-alert title="设置指标点" type="success" :closable="false"> </el-alert>
    <div style="float: left; display: flex">
      <el-select
        style="
          width: 140px;
          margin-right: 10px;
          margin-top: 10px;
          margin-left: 10px;
        "
        v-model="InitSearch.yearId"
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
        v-model="InitSearch.majorName"
        placeholder="请输入专业名"
      ></el-input>
      <el-input
        style="
          width: 180px;
          margin-left: 10px;
          margin-right: 10px;
          margin-top: 10px;
        "
        v-model="InitSearch.graduationNo"
        placeholder="请输入毕业要求编号"
      ></el-input>
      <el-input
        style="width: 180px; margin-right: 10px; margin-top: 10px"
        v-model="InitSearch.pointNo"
        placeholder="请输入指标点编号"
      ></el-input>
      <el-input
        style="width: 180px; margin-top: 10px; margin-right: 10px"
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
      @click="addPoint"
      type="success"
      >新增指标点</el-button
    >

    <!--新增指标点对话框-->
    <el-dialog
      title="新增指标点"
      :visible.sync="pointDialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form
        :model="addValidateForm"
        ref="addValidateForm"
        label-width="100px"
      >
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
            v-model="addValidateForm.majorValue"
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
            @click="getCorrespondingGra"
            icon="el-icon-search"
            circle
          ></el-button>
        </el-form-item>
        <el-form-item label="选择毕业要求">
          <el-select
            :disabled="showGradua"
            v-model="addSubmit.uid"
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
        </el-form-item>
        <el-form-item label="指标点编号" prop="pass">
          <el-input v-model="addSubmit.pointNo"></el-input>
        </el-form-item>
        <el-form-item label="指标点内容" prop="pass">
          <el-input v-model="addSubmit.pointContent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormAdd()">提交</el-button>
          <el-button @click="resetFormAdd()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

 <!--修改指标点对话框-->
    <el-dialog
      title="修改指标点"
      :visible.sync="pointDialogVisibleEdit"
      width="40%"
      :before-close="handleCloseEdit"
    >
      <el-form
        :model="editSubmitForm"
        ref="editSubmitForm"
        label-width="100px"
      >
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
            v-model="editSubmitForm.majorName"
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
            @click="getCorrespondingGra"
            icon="el-icon-search"
            circle
          ></el-button>
        </el-form-item>
        <el-form-item label="选择毕业要求">
          <el-select
            :disabled="showGradua"
            v-model="editSubmitForm.uid"
            :placeholder="editSubmitForm.graduationNo"
          >
            <el-option
              v-for="item in graduationObject"
              :key="item.uid"
              :label="item.contentSearch"
              :value="item.uid"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指标点编号" prop="pass">
          <el-input v-model="editSubmitForm.pointNo"></el-input>
        </el-form-item>
        <el-form-item label="指标点内容" prop="pass">
          <el-input v-model="editSubmitForm.pointContent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormEdit()">提交</el-button>
          <el-button @click="resetFormedit()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--显示用户下所有的指标点-->
    <el-table
      :cell-style="{ textAlign: 'center' }"
      :data="Alldata"
      border
      style="width: 100%"
    >
      <el-table-column header-align="center" prop="yearId" label="年级">
      </el-table-column>
      <el-table-column header-align="center" prop="majorName" label="专业">
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="graduationNo"
        label="毕业要求编号"
      >
      </el-table-column>
      <el-table-column header-align="center" prop="pointNo" label="指标点编号">
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="pointContent"
        label="指标点内容"
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
      //表格中用于唯一确定该指标点数据的id
      onlyPointId: "",
      //修改指标点的表单绑定的数据
      editSubmitForm:{
        majorValue: "",
        uid: "",
        pointNo:"",
        pointContent:"",
      },
      pointDialogVisibleEdit: false, //修改指标点对话框
      //新增指标点提交的表单
      addSubmit: {
        userId: "",
        uid: "",
        pointNo: "",
        pointContent: "",
      },
      //修改指标点提交的表单
      editSubmit: {
        userId: "",
        pointId: "",
        uid: "",
        pointNo: "",
        pointContent:""
      },
      graduationObject: [], //存放毕业要求的数组，用于新增时选择毕业要求
      searchGra: {
        gradeSearch: "", //2020
        majorSearch: "", //软件工程
        noSearch: "",
        contentSearch: "",
      },
      showGradua: true, //是否禁用选择毕业要求
      pointDialogVisible: false, //新增指标点的对话框
      searchMajor: {
        //根据年级查询专业
        userId: "",
        gradeId: "",
      },
      addValidateForm: {
        //新增指标点表单
        yearValue: "",
        majorValue: "",
      },
      userId: "",
      InitSearch: {
        userId: "",
        yearId: "",
        majorName: "",
        graduationNo: "",
        pointNo: "",
        pointContent: "",
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
      Alldata: [], //动态合并大表格存放的数据
      tableData: [], //接收全部指标点
      //删除数组
      deleteObject: {
        userId: "",
        pointArray: [],
      },
      majorOptions: [],
      spanArr1: [], // 记录每一行的合并数
      pos1: "", // 记录索引
      spanArr2: [], // 记录每一行的合并数
      pos2: "", // 记录索引
    };
  },
  created() {
    this.getUserId();
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.post(
        "getAlltarget",
        this.InitSearch
      );
      console.log(this.InitSearch)
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.tableData = res.data;
      this.Alldata = this.tableData;
      this.getSpanArr(this.Alldata);
    },
    async tableFilter() {
      const { data: res } = await this.$http.post(
        "getAlltarget",
        this.InitSearch
      );
      if (res.meta.status != "200") return this.$message.error("搜索失败！");
      this.$message.success("搜索成功！");
      this.tableData = res.data;
      this.Alldata = this.tableData;
      this.getSpanArr(this.Alldata);
    },
    getUserId() {
      this.userId = this.$route.params.userId;
      this.InitSearch.userId = this.userId;
      //console.log(this.InitSearch)
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
    handleClose() {
      this.pointDialogVisible = false;
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
    //新增指标点
    async handleCommand(command) {
      //选择年级时自动查询专业
      this.searchMajor.gradeId = command;
      this.searchGra.gradeSearch = command;
      this.searchMajor.userId = this.userId
      console.log(this.searchMajor);
      const { data: res } = await this.$http.post("getMajor", this.searchMajor);
      if (res.meta.status != "200") return this.$message.error("查询失败！");
      this.majorOptions = res.data.majorData;
      this.$message.success("查询成功！");
    },
    addPoint() {
      this.pointDialogVisible = true;
    },
    //根据年级专业查询对应毕业要求
    async getCorrespondingGra() {
      this.searchGra.majorSearch = this.addValidateForm.majorValue;
      const { data: res } = await this.$http.post(
        "getAllGraduationReq",
        this.searchGra
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.graduationObject = res.data.tableData;
      console.log(this.searchGra);
      console.log("测试毕业要求");
      console.log(this.graduationObject);
      this.showGradua = false;
    },
    //新增指标点对话框中重置表单
    resetFormAdd() {
      (this.addValidateForm.majorValue = ""),
        (this.addSubmit.uid = ""),
        (this.addSubmit.pointNo = ""),
        (this.addSubmit.pointContent = "");
    },
    //新增指标点对话框提交表单
    async submitFormAdd() {
      this.addSubmit.userId = this.userId;
      const { data: res } = await this.$http.post(
        "addTargetPoint",
        this.addSubmit
      );
      if (res.meta.status != "200") return this.$message.error("新增失败！");
      this.$message.success("新增成功！");
      this.resetFormAdd()
      this.getList()
      this.handleClose()
    },
    //大表格查询时，清空已输入的搜索项
    filterReset() {
      (this.InitSearch.yearId = ""),
        (this.InitSearch.majorName = ""),
        (this.InitSearch.graduationNo = ""),
        (this.InitSearch.pointNo = ""),
        (this.InitSearch.pointContent = "");
    },
    //删除指标点
    async handleDelete(row) {
      //console.log(row);
      this.deleteObject.pointArray.push(row.pointId)
      this.deleteObject.userId = this.userId
      const { data: res } = await this.$http.post(
        "deleteTargetPoint",
        this.deleteObject
      );
      if (res.meta.status != "200") return this.$message.error("删除失败！");
      this.$message.success("删除成功！");
      this.getList()
    },
    //修改指标点
    handleCloseEdit(){
      this.pointDialogVisibleEdit = false
    },
    //打开修改指标点的对话框 进行数据绑定
    EditRequirement(row){
      this.editSubmitForm.majorName = row.majorName,
      this.editSubmitForm.graduationNo = row.graduationNo,
      this.editSubmitForm.pointNo = row.pointNo ,
      this.editSubmitForm.uid = row.uid,
      this.editSubmitForm.pointContent = row.pointContent;
      this.onlyPointId = row.pointId
      this.pointDialogVisibleEdit = true
    },
    //修改指标点表单提交
    async submitFormEdit(){
      this.editSubmit.userId = this.userId
      this.editSubmit.pointId = this.onlyPointId
      this.editSubmit.uid = this.editSubmitForm.uid
      this.editSubmit.pointNo = this.editSubmitForm.pointNo
      this.editSubmit.pointContent = this.editSubmitForm.pointContent
      const { data: res } = await this.$http.post(
        "editTargetPoint",
        this.editSubmit
      );
      if (res.meta.status != "200") return this.$message.error("修改失败！");
      this.$message.success("修改成功！");
      this.getList()
      this.handleCloseEdit()
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