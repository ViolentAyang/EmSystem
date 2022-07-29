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
        v-model="noFilter"
        placeholder="请输入毕业要求编号"
      ></el-input>
      <el-input
        style="width: 180px; margin-top: 10px; margin-right: 10px"
        v-model="contentFilter"
        placeholder="请输入毕业要求内容"
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
        @click="resetSearch"
        type="primary"
        icon="el-icon-refresh"
        >重置</el-button
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
        :model="addValidateForm"
        ref="addValidateForm"
        label-width="100px"
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
          <el-select v-model="addValidateForm.yearValue" placeholder="请选择">
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
            v-model="addValidateForm.majorValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in majorOptions"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="毕业要求">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addValidateForm.graText"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetFormAdd()">重置</el-button>
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
        :model="editValidateForm"
        ref="editValidateForm"
        label-width="100px"
      >
        <el-alert
          style="margin-bottom: 5px"
          title="选择年级后进行搜索可以获得该年级对应所有的专业"
          type="warning"
        >
        </el-alert>
        <el-form-item label="请选择年级">
          <el-select v-model="editValidateForm.yearValue" placeholder="请选择">
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
            @click="getCorrespondingMajorEdit"
            icon="el-icon-search"
            circle
          ></el-button>
        </el-form-item>
        <el-form-item label="请选择专业">
          <el-select
            :disabled="showMajorEdit"
            v-model="editValidateForm.majorValue"
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
        <el-form-item label="毕业要求">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="editValidateForm.graText"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormEdit()"
            >提交</el-button
          >
          <el-button @click="resetFormEdit()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--显示用户下所有的班级年级专业-->
    <el-table
      :span-method="objectSpanMethod"
      :cell-style="{ textAlign: 'center' }"
      :data="Alldata"
      border
      style="width: 100%"
    >
      <el-table-column header-align="center" prop="gradeId" label="年级">
      </el-table-column>
      <el-table-column header-align="center" prop="majorName" label="专业">
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="noSearch"
        label="毕业要求编号"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="contentSearch"
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
      userId: '',
      yearFilter: "", //过滤年级
      majorFilter: "", //过滤专业
      noFilter: "", //过滤毕业要求编号
      contentFilter: "", //过滤毕业要求内容

      showMajorEdit: true, //修改页面 防止接口冲突
      showMajor: true, //是否允许使用专业下拉框，若未选择年级则禁用
      yearValue: "", //新增毕业要求 选择年级下拉框的绑定值
      majorValue: "", //新增毕业要求 选择专业下拉框的绑定值
      requireDialogVisible: false, //新增毕业要求
      EditDialogVisible: false, //修改毕业要求对话框
      gradeSearch: {
        //查询年级对应的专业
        gradeId: "",
      },
      //新增对话框绑定的
      addValidateForm: {
        yearValue: "",
        majorValue: "",
        graText: "",
      },
      //前端新增发送的请求
      addNewReq: {
        gradeSearch: "",
        majorSearch: "",
        contentSearch: "",
      },
      editValidateForm: {
        yearValue: "",
        majorValue: "",
        graText: "",
      },
      editForm: {
        uid: "",
        gradeSearch: "",
        majorSearch: "",
        noSearch: "", 
        contentSearch: "",
      },
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
      searchAll: {
        gradeSearch: "",
        majorSearch: "",
        noSearch: "",
        contentSearch: "",
      },
      //删除数组
      deleteArray: {
        reqArray: [],
      },
      Alldata:[],
      spanArr1: [], // 记录每一行的合并数
      pos1: '', // 记录索引
      spanArr2: [], // 记录每一行的合并数
      pos2: '' // 记录索引
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
        "getAllGraduationReq",
        this.searchAll
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      //新增动态合并
      this.tableData = res.data.tableData;
      this.Alldata = this.tableData;
      this.getSpanArr(this.Alldata);
      //console.log(res.data.tableData);
      //console.log("测试初始化数据");
      //console.log(res);
    },
    addRequire() {
      this.requireDialogVisible = true;
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
    //大表格数据过滤
    async tableFilter() {
      this.searchAll.gradeSearch = this.yearFilter;
      this.searchAll.majorSearch = this.majorFilter;
      this.searchAll.noSearch = this.noFilter;
      this.searchAll.contentSearch = this.contentFilter;
      const { data: res } = await this.$http.post(
        "getAllGraduationReq",
        this.searchAll
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.tableData = res.data.tableData;
      this.resetSearch();
    },
    //重置大表格搜索
    resetSearch() {
      this.yearFilter = "";
      this.majorFilter = "";
      this.noFilter = "";
      this.contentFilter = "";
    },
    //根据年级获取对应的专业
    async getCorrespondingMajor() {
      this.gradeSearch.gradeId = this.addValidateForm.yearValue;
      const { data: res } = await this.$http.post("getMajor", this.gradeSearch);
      //console.log("测试查询专业");
      //console.log(res.data.majorData);
      if (res.meta.status != "200") return this.$message.error("查询失败！");
      this.majorOptions = res.data.majorData;
      this.showMajor = false;
      this.$message.success("查询成功！");
    },
    async getCorrespondingMajorEdit() {
      this.gradeSearch.gradeId = this.yearValue;
      const { data: res } = await this.$http.post("getMajor", this.gradeSearch);
      //console.log("测试查询专业");
      //console.log(res.data.majorData);
      if (res.meta.status != "200") return this.$message.error("查询失败！");
      this.majorOptions = res.data.majorData;
      this.showMajorEdit = false;
      this.$message.success("查询成功！");
    },
    //新增毕业要求
    async submitForm() {
      this.addNewReq.gradeSearch = this.addValidateForm.yearValue;
      this.addNewReq.majorSearch = this.addValidateForm.majorValue;
      this.addNewReq.contentSearch = this.addValidateForm.graText;
      //console.log(this.addNewReq)
      const { data: res } = await this.$http.post(
        "addGraduationReq",
        this.addNewReq
      );
      if (res.meta.status != "200") return this.$message.error("新增失败！");
      this.$message.success("新增成功！");
      this.getList();
      this.resetFormAdd();
    },
    resetFormAdd() {
      (this.addValidateForm.yearValue = ""),
        (this.addValidateForm.majorValue = ""),
        (this.addValidateForm.graText = "");
    },
    resetFormEdit() {
      (this.editValidateForm.yearValue = ""),
        (this.editValidateForm.majorValue = ""),
        (this.editValidateForm.graText = "");
    },
    async handleDelete(row) {
      console.log(row.uid);
      this.deleteArray.reqArray.push(row.uid);
      console.log(this.deleteArray)
      const { data: res } = await this.$http.post(
        "deleteGraduationReq",
        this.deleteArray
      );
      if (res.meta.status != "200") return this.$message.error("删除失败！");
      this.$message.success("删除成功！");
      this.getList();
    },
    handleCloseEdit() {
      this.EditDialogVisible = false;
      this.editForm.uid = ""
    },
    handleClose() {
      this.requireDialogVisible = false;
    },
    async submitFormEdit(){
      this.editForm.gradeSearch = this.editValidateForm.yearValue;
      this.editForm.majorSearch = this.editValidateForm.majorValue;
      this.editForm.contentSearch = this.editValidateForm.graText;
      const { data: res } = await this.$http.post(
        "editGraduationReq",
        this.editForm
      );
      if (res.meta.status != "200") return this.$message.error("修改失败！");
      this.$message.success("修改成功！");
      this.handleCloseEdit()
      this.getList();
    },
    //打开修改对话框后进行数据绑定
    EditRequirement(row) {
      //console.log("测试修改对话框数据绑定")
      //console.log(row)
      this.editForm.uid = row.uid; //打开对话框时，把uid就已经绑定上，关闭页面时清空
      this.editValidateForm.yearValue = row.gradeId;
      this.editValidateForm.majorValue = row.majorName;
      this.editValidateForm.graText = row.contentSearch;
      this.EditDialogVisible = true;
    },
    //动态合并表格
   getSpanArr (data) {
    (this.spanArr1 = []), // 记录每一行的合并数
        (this.pos1 = ""), // 记录索引
        (this.spanArr2 = []), // 记录每一行的合并数
        (this.pos2 = ""); // 记录索引
        for (let i = 0; i < data.length; i++) { // 第一列
            if (i === 0) {
                this.spanArr1.push(1)
                this.pos1 = 0
            } else {
                // 判断当前元素与上一个元素是否相同
                if (data[i].gradeId === data[i - 1].gradeId) {
                    this.spanArr1[this.pos1] += 1
                    this.spanArr1.push(0)
                } else {
                    this.spanArr1.push(1)
                    this.pos1 = i
                }
            }
        }
        for (let i = 0; i < data.length; i++) { // 第二列
            if (i === 0) {
                this.spanArr2.push(1)
                this.pos2 = 0
            } else {
                // 判断当前元素与上一个元素是否相同
                if (data[i].gradeId === data[i - 1].gradeId && data[i].majorName === data[i - 1].majorName) {
                    this.spanArr2[this.pos2] += 1
                    this.spanArr2.push(0)
                } else {
                    this.spanArr2.push(1)
                    this.pos2 = i
                }
            }
        }
      },
      objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) { // 第一列
          const _row = this.spanArr1[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        if (columnIndex === 1) { // 第二列
          const _row = this.spanArr2[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
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