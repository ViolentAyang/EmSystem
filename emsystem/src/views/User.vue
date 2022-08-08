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
    <el-card class="box-card">
      <avue-form
        class="form"
        v-model="obj"
        :option="option1"
        @submit="submit"
        @error="error"
      ></avue-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.obj.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userId: "",
      pwdcommit: {
        username: "",
        password: "",
        newPassword: "",
      },
      obj: {},
      option1: {
        column: [
          {
            label: "账号",
            prop: "username",
            rules: [
              {
                required: true,
                message: "请输入账号",
                trigger: "blur",
              },
            ],
          },
          {
            label: "旧密码",
            prop: "password",
            type: "password",
            rules: [{ validator: validatePass, trigger: "blur" }],
          },
          {
            label: "新密码",
            prop: "newPassword",
            type: "password",
            rules: [{ validator: validatePass, trigger: "blur" }],
          },
          {
            label: "确认密码",
            prop: "repassword",
            type: "password",
            rules: [{ validator: validatePass2, trigger: "blur" }],
          },
        ],
      },
    };
  },
  created() {
    this.getUserId();
  },
  methods: {
    getUserId() {
      this.userId = this.$route.params.userId;
    },
    logout(){
      window.sessionStorage.clear();
      this.$router.push("/login");
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
      window.location.reload();
    },
    teacherManager(){
      this.$router.push({
        name: "teacherManager",
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
    async submit(form, done) {
      //this.$message.success(JSON.stringify(form));
      this.pwdcommit.username = this.obj.username;
      this.pwdcommit.password = this.obj.password;
      this.pwdcommit.newPassword = this.obj.newPassword;
      console.log(this.pwdcommit);
      const { data: res } = await this.$http.post(
        "updatePassword",
        this.pwdcommit
      );
      if (res.meta.status != "200") return this.$message.error("修改失败！");
      this.$message.success("修改成功！");
      done();
    },
    error(err) {
      this.$message.success("请查看控制台");
      console.log(err);
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
  margin-bottom: 100px;
}
.box-card {
  width: 80%;
  margin: auto;
}
</style>