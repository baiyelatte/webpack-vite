<template>
  <router-layout>
    <van-nav-bar
      title="设置/修改登录密码"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="_backlogin"
    />
    <div class="loginbox my-passwordlogin">
      <div class="loginbox">
        <van-field
          v-model="tel"
          type="tel"
          @input="_focusanem"
          left-icon="lock"
          clearable
          placeholder="请输入手机号"
        >
          <template #left-icon>
            <img class="pic" src="@/assets/image/common/phone.png" alt="" />
          </template>
        </van-field>
        <van-field
          v-model="codes"
          clearable
          type="digit"
          placeholder="请输入验证码"
        >
          <template #button>
            <van-button
              class="codeText"
              size="small"
              :disabled="codedisabled"
              @click="_smscode"
              type="danger"
              >{{ codeText }}</van-button
            >
          </template>
          <template #left-icon>
            <img class="pic" src="@/assets/image/common/lock.png" alt="" />
          </template>
        </van-field>
        <van-field
          v-model="newpassword"
          :type="passwordType"
          clearable
          placeholder="请输入新密码"
        >
          <template slot="right-icon">
            <span class="solts" @click="switchPasswordType">
              <van-icon name="eye" v-if="passwordType === 'password'" />
              <van-icon name="closed-eye" v-else />
            </span>
          </template>
          <template #left-icon>
            <img class="pic" src="@/assets/image/common/lock.png" alt="" />
          </template>
        </van-field>
        <van-field
          v-model="againpassword"
          clearable
          :type="passwordType1"
          placeholder="请再输入一次新密码"
        >
          <template slot="right-icon">
            <span class="solts" @click="switchPasswordType1">
              <van-icon name="eye" v-if="passwordType1 === 'password'" />
              <van-icon name="closed-eye" v-else />
            </span>
          </template>
          <template #left-icon>
            <img class="pic" src="@/assets/image/common/lock.png" alt="" />
          </template>
        </van-field>
      </div>
      <div class="md-example-child-button loginbtn">
        <van-button
          type="danger"
          :disabled="usernamedisabled"
          :loading="loadingbtn"
          :loading-text="loadingtit"
          size="normal"
          block
          @click="_login"
          >确认</van-button
        >
        <van-button
          class="logout"
          type="danger"
          size="normal"
          block
          @click="$router.push('/cancellation')"
          >账号注销</van-button
        >
      </div>
    </div>
  </router-layout>
</template>

<!--码登录-->
<script>
import { modifyPwd, smscode } from "api";
import { mapActions } from "vuex";
import { regphone, md5par } from "@/utils/dom";
import LoginVue from "./Login.vue";

export default {
  name: "smslogin",
  data() {
    return {
      tel: "",
      codes: "",
      newpassword: "",
      againpassword: "",
      loadingbtn: false,
      loadingtit: "修改中...",
      usernamedisabled: true,
      codedisabled: true,
      smscode: "",
      codeText: "发送验证码",
      time: 60,
      passwordType: "password", //输入框类型
      passwordType1: "password"
    };
  },
  methods: {
    switchPasswordType() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
    switchPasswordType1() {
      this.passwordType1 =
        this.passwordType1 === "password" ? "text" : "password";
    },
    ...mapActions(["userinfo"]),
    _focusanem(e) {
      if (regphone(e)) {
        this.usernamedisabled = false;
        this.codedisabled = false;
      }
    },
    _backlogin() {
      this.$router.back();
    },
    _login() {
      const that = this;
      // that.$router.back()
      if (that.tel === "") {
        that.$toast("请输入帐号");
        return;
      }
      if (that.codes === "") {
        that.$toast("请输入验证码");
        return;
      }
      if (that.newpassword === "") {
        that.$toast("请输入新密码");
        return;
      }
      if (that.againpassword === "") {
        that.$toast("请再次输入新密码");
        return;
      }
      if (!regphone(that.tel)) {
        that.$toast("输入正确的手机号");
        return;
      }
      if (that.newpassword != that.againpassword) {
        that.$toast("输入的密码不一致");
        return;
      }
      let Params = {
        phone: that.tel,
        smsCode: that.codes,
        passwd: that.$md5(that.newpassword + md5par())
      };
      that.loadingbtn = true;
      modifyPwd(Params)
        .then((result) => {
          that.loadingbtn = false;
          if (result.errorCode == 1) {
            that.userinfo(result.data);
            that.$toast("密码修改成功");
            setTimeout(() => {
              that.loadingtit = "重置密码";
              // console.log(that.$route.name);
              if (that.$route.name == "forgotpassword") {
                // that.$router.replace("/smslogin");
                let fullPath = this.$route.fullPath;
                this.$router.replace({
                  path: "/smslogin",
                  query: { redirect: fullPath }
                });
              } else {
                // that.$router.back();
                //  that.$router.replace("/smslogin");
                let fullPath = this.$route.fullPath;
                this.$router.replace({
                  path: "/smslogin",
                  query: { redirect: fullPath }
                });
              }
            }, 500);
          } else {
            setTimeout(() => {
              that.loadingtit = "重置密码";
            }, 500);
          }
        })
        .catch((err) => {});
    },
    _smscode() {
      const that = this;
      if (!regphone(that.tel)) {
        that.$toast("手机号码格式不正确");
        return;
      }
      if (that.tel === "") {
        that.$toast("手机号不能为空");
        return;
      }
      const Params = {
        smsType: 2,
        phone: that.tel
      };
      smscode(Params)
        .then((result) => {
          if (result.errorCode == 1) {
            let { msg, getsj } = result.data;
            that.time = getsj;
            // that.smscode = result.data.smscode
            that.codedisabled = true;
            that.timer();
            this.$toast(msg);
          }
        })
        .catch((err) => {});
    },
    // 倒计时
    timer() {
      if (this.time > 0) {
        this.codeText = this.time + "s后重新获取";
        this.time--;
        setTimeout(this.timer, 1000);
      } else {
        this.codedisabled = false;
        this.time = 60;
        this.codeText = "发送验证码";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.logout {
  margin-top: 15px;
  background-color: #fff;
  color: #cf0000;
  border: 1px solid #cf0000;
}
:deep(.van-field__left-icon) {
  height: fit-content;
}
.van-cell {
  align-items: center;
}
.pic {
  width: 17px;
  height: 17px;
  margin-right: 10px;
  display: block;
}
.my-passwordlogin {
  padding: 20px;
}
.my-codelogin {
  padding: 0 20px;
}
.yzm {
  margin-top: 10px;
}
.loginbtn {
  margin-top: 30px;
}
.loginbox {
  border-radius: 4px;
  overflow: hidden;
  .van-cell {
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      right: 0;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid #ebedf0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
  .md-example-child-button .md-button {
    margin-top: 20px;
  }
}
</style>
