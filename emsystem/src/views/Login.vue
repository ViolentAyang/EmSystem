<template>
  <div class="loginbody">
    <div class="logindata">
      <div class="logintext">
        <h2>Welcome</h2>
      </div>
      <div class="formdata">
        <el-form ref="formRef" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              clearable
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              clearable
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool">
        <div>
          <el-checkbox v-model="checked" @change="remenber"
            >记住密码</el-checkbox
          >
        </div>
        <div>
          <span class="shou" @click="forgetpas">忘记密码？</span>
        </div>
      </div>
      <div class="butt">
        <el-button type="primary" plain @click="login">负责人登录</el-button>
        <el-button type="warning" plain @click="teacherLogin"
          >教师登录</el-button
        >
        <el-button class="shou" @click="register">注册</el-button>
      </div>

      <!--注册-->
    </div>
    <el-dialog
      :modal="false"
      title="注册"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleFormReg"
        status-icon
        :rules="rulesReg"
        ref="ruleFormRef"
        label-width="100px"
        class="demo-ruleFormReg"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            type="name"
            v-model="ruleFormReg.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleFormReg.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="registerCommit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      userId: "",
      dialogVisible: false,
      form: {
        username: "",
        password: "",
      },
      teacherform: {
        teacherNo: "",
        teacherPassword: "",
      },
      ruleFormReg: {
        name: "",
        pass: "",
      },
      registerdata: {
        username: "",
        password: "",
      },
      checked: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
        ],
      },
      rulesReg: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    /*if (localStorage.getItem("news")) {
      this.form = JSON.parse(localStorage.getItem("news"));
      this.checked = true;
    }*/
  },
  methods: {
    login(form) {
      this.$refs.formRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.form);
        if (res.meta.status != "200") return this.$message.error("登录失败！");
        this.$message.success("登录成功！");
        this.userId = res.data.userId;
        //console.log(res.data.userId);
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push({
          name: "Home",
          params: { userId: this.userId },
        });
      });
    },
    async teacherLogin() {
      this.teacherform.teacherNo = this.form.username;
      this.teacherform.teacherPassword = this.form.password;
      const { data: res } = await this.$http.post("teacherLogin", this.teacherform);
      if (res.meta.status != "200") return this.$message.error("登录失败！");
      const msg = res.meta.msg
      this.$message.success(msg);
      this.userId = res.data.userId;
      window.sessionStorage.setItem("token", res.data.token);
      this.$router.push({
        name: "courseList",
        params: { userId: this.userId,
        teacherNo:this.teacherform.teacherNo },
      });
    },
    remenber(data) {
      this.checked = data;
      if (this.checked) {
        localStorage.setItem("news", JSON.stringify(this.form));
      } else {
        localStorage.removeItem("news");
      }
    },
    forgetpas() {
      this.$message({
        type: "info",
        message: "功能尚未开发额😥",
        showClose: true,
      });
    },
    register() {
      this.dialogVisible = true;
    },
    registerCommit() {
      this.registerdata.username = this.ruleFormReg.name;
      this.registerdata.password = this.ruleFormReg.pass;
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "register",
          this.registerdata
        );
        if (res.meta.status != "200") return this.$message.error("注册失败！");
        this.$message.success("注册成功！");
      });
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
.loginbody {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-image: url("../assets/login2.png");
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
  line-height: 100%;
  padding-top: 150px;
}

.logintext {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
  text-shadow: 2px 2px 4px #000000;
}

.logindata {
  width: 400px;
  height: 300px;
  transform: translate(-50%);
  margin-left: 50%;
}

.tool {
  display: flex;
  justify-content: space-between;
  color: #606266;
}

.butt {
  margin-top: 10px;
  text-align: center;
}

.shou {
  cursor: pointer;
  color: #606266;
}

/*ui*/
/* /deep/ .el-form-item__label {
  font-weight: bolder;
  font-size: 15px;
  text-align: left;
}

/deep/ .el-button {
  width: 100%;
  margin-bottom: 10px;

} */
</style>

