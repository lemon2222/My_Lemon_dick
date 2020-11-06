<template>
  <div id="login">
    <div class="content">
      <div class="template">
        <el-input
          class="phone"
          prefix-icon="el-icon-user"
          placeholder="请输入手机号"
          v-model="phone"
        >
        </el-input>
        <el-input
          class="name"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          v-model="phone"
        >
        </el-input>
        <el-input
          class="code"
          prefix-icon="el-icon-message"
          placeholder="请输入短信验证码"
          v-model="code"
        >
          <div
            :class="
              /^1[3456789]\d{9}$/.test(phone) && codeText === '发送验证码'
                ? 'ok send'
                : 'send'
            "
            slot="suffix"
            @click="send"
          >
            {{ codeText }}
          </div>
        </el-input>
        <el-button
          :class="
            /^1[3456789]\d{9}$/.test(phone) && code ? 'login' : 'disable login'
          "
          @click="login"
          :disabled="!(/^1[3456789]\d{9}$/.test(phone) && code)"
          >登录</el-button
        >
      </div>
    </div>
    <Dialog
      :dialogVisible="dialogVisible"
      :userId="userId"
      v-on:close="dialogVisible = false"
    />
  </div>
</template>

<script>
import { postCode, postPhoneLogin } from "@/api/api";
import { _random } from "@/utils/utils";

export default {
  name: "Login",
  data() {
    return {
      img: {},
      phone: "",
      code: "",
      phoneCode: "",
      codeText: "发送验证码",
      schoolList: [],
      userId: "0",
    };
  },

  methods: {
    postCode() {
      let phoneCode = _random(1000, 9999);
      this.$message.success("发送成功");
      postCode({
        phone: this.phone,
        phoneCode: phoneCode,
      }).then((res) => {
        let { code, data } = res;
        console.log(data.code);
        if (code === 1) {
          this.phoneCode = data.code;
          this.code = data.code;
        }
      });
    },
    send() {
      if (
        /^1[3456789]\d{9}$/.test(this.phone) &&
        this.codeText === "发送验证码"
      ) {
        let second = 10;
        let time = setInterval(() => {
          second--;
          this.sendCode = second === 0 ? true : false;
          this.codeText = second === 0 ? "发送验证码" : `${second}s`;
          if (second < 1) {
            clearInterval(time);
          }
        }, 1000);
        this.postCode();
      }
    },
    postPhoneLogin() {
      let { phone, code, phoneCode } = this;
      let _message = this.$message({
        iconClass: "el-icon-loading",
        message: "正在进入淋β",
        duration: 15000,
        center: "center",
      });
      postPhoneLogin({
        phone: phone,
        code: code,
        phoneCode: phoneCode,
      }).then((res) => {
        let { data, code, message } = res;
        _message.close();
        if (code === 1) {
          this.userId = data.id;
          localStorage.setItem("router", JSON.stringify(res.data));
          this.$router.push({ name: "home" });
        }
        this.$message({
          message: message,
          type: code === 1 ? "success" : "error",
        });
      });
    },
    login() {
      this.postPhoneLogin();
    },
  },
  mounted: function () {
    if (localStorage.getItem("user")) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login/bg.png") no-repeat;
  background-size: cover;

  .content {
    background: #fff;
    width: 400px;
    height: 250px;
    border-radius: 10px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}

.template {
  width: 400px;
  height: 300px;
  text-align: center;

  .phone,
  .name,
  .code {
    border: 0;
    width: 340px;
    margin-top: 10px;
    list-style: none;
    color: rgb(35, 78, 139);
    .el-input__inner {
      border: 0px solid #fff;
      border-bottom: 1px solid #ddd;
    }
  }

  .code {
    .el-input__suffix {
      .el-input__suffix-inner {
        display: inline-block;
        height: 100%;

        .send {
          height: 100%;
          line-height: 40px;
          cursor: not-allowed;
        }
        .ok {
          color: rgb(35, 78, 139);
          cursor: pointer;
        }
      }
    }
  }

  .login {
    margin-top: 25px;
    width: 200px;
    height: 45px;
    background: rgb(35, 78, 139);
    border-radius: 5px;
    color: #fff;
  }
  .disable {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
