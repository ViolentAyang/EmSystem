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
      } else if (value !== this.obj.newpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      pwdcommit: {
        username: "",
        password: "",
        newpassword: "",
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
            prop: "newpassword",
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
  methods: {
    data() {
      this.$router.push("/data");
    },
    home() {
      this.$router.push("/home");
    },
    user() {
      window.location.reload();
    },
    about() {
      this.$router.push("/about");
    },
    classManage() {
      this.$router.push("/class");
    },
    /*username:"",
      password:"",
      newpassword:""*/
    async submit(form, done) {
      this.$message.success(JSON.stringify(form));
      this.pwdcommit.username = this.obj.username;
      this.pwdcommit.password = this.obj.password;
      this.pwdcommit.newpassword = this.obj.newpassword;
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