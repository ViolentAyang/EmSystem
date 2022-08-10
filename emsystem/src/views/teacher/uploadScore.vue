<template>
  <div>
    <div id="guide">
      <div style="margin-top: 10px; margin-left: 20px; float: left">
        工程认证达成度定型化管理系统
      </div>
      <div style="margin-top: 10px; float: right">
        <el-button @click="classManage" type="success" plain
          >返回课程列表</el-button
        >
        <el-button
          @click="logout"
          style="margin-right: 10px; margin-bottom: 5px"
          type="danger"
          plain
          >退出登录</el-button
        >
      </div>
    </div>
    <div style="display: flex">
      <el-button
        style="margin-left: 10px; margin-top: 10px"
        type="primary"
        @click="handleGet"
        >下载模版</el-button
      >
      <div style="width: 20px"></div>
      <el-upload
        :auto-upload="false"
        :show-file-list="false"
        action="action"
        :on-change="handleChange"
      >
        <el-button style="margin-top: 10px" type="primary"
          >导入 excel</el-button
        >
      </el-upload>
      <el-button
        @click="handleUpload"
        style="margin-top: 10px; margin-left: 10px"
        type="primary"
        >上传成绩</el-button
      >
    </div>
    <br />
    <avue-crud :option="option" :data="list"></avue-crud>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teacherNo:"",
      userId: "",
      list: [],
      courseNo: "",
      option: {},
      uploadObject: {
        userId: "",
        courseNo: "",
        scoreArray: [],
      },
      //需要传给后端的数据
      needObject: {
        classId: "",
        userId: "",
        courseNo: "",
        needArray: [],
      },
      //用于存放每一行的指标点数组
      rowArray: [],
      //接收后端传回来的指标点数组
      pointArray: [],
      //用于存放每一行的指标点数组
      rowArray : [],
      classId:"",
    };
  },
  created() {
    this.getUserId();
    this.getOption();
  },
  methods: {
    async getOption() {
      const { data: res } = await this.$http.post(
        "getCourseTargetPoint",
        this.$route.params
      );
      if (res.meta.status != "200") return this.$message.error("获取失败！");
      this.$message.success("获取成功！");
      this.option = res.data;
      this.pointArray = res.data.points;
    },
    getUserId() {
      //console.log(this.$route.params);
      this.userId = this.$route.params.userId;
      this.courseNo = this.$route.params.courseNo;
      this.teacherNo = this.$route.params.teacherNo;
      this.classId = this.$route.params.classId;
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    classManage() {
      this.$router.push({
        name: "courseList",
        params:{ 
          userId: this.userId,
          teacherNo:this.teacherNo },
      });
    },
    handleGet() {
      fetch("getDemo", {
        method: "GET",
      })
        .then((res) => res.blob())
        .then((data) => {
          const blobUrl = window.URL.createObjectURL(data);
          const a = document.createElement("a");
          a.download = "demo" + ".xlsx";
          a.href = blobUrl;
          a.click();
        });
    },
    handleChange(file, fileLis) {
      this.$Export.xlsx(file.raw).then((data) => {
        this.list = data.results;
        //console.log(this.list);
      });
    },
    async handleUpload() {
      for (var item of this.list) {
        for (var arr of this.pointArray) {
          const str1 = "指标点Id(" + arr.tpId + ")";
          const str2 = "指标点(" + arr.tpNo + ")教师评成绩";
          const str3 = "指标点(" + arr.tpNo + ")学生评成绩";
          //每一行的指标点对象
          const newObject = {
            pointId: "",
            teacherEstimate: "",
            studentEstimate: "",
          };
          newObject.pointId = item[str1];
          newObject.teacherEstimate = item[str2];
          newObject.studentEstimate = item[str3];
          this.rowArray.push(newObject);
        }
        //this.needObject.needArray.push(this.rowArray);
        //this.needObject.needArray.push(this.rowArray);
        //this.rowArray = []
      }
      this.needObject.needArray = this.rowArray
      //console.log(this.needObject.needArray)
      this.needObject.userId = this.userId;
      this.needObject.classId = this.classId;
      this.needObject.courseNo = this.courseNo;
      const { data: res } = await this.$http.post("recordCourseScore", this.needObject);
      //if (res.meta.status != "200") return this.$message.error("上传失败！");
      this.$message.success("上传成功！");
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
</style>