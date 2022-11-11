<template>
  <router-layout :headerAttrFlag="false">
    <CommonHeader
      :backgroundColor="'#f7f8fa'"
      :titleColor="'black'"
      :leftColor="'black'"
    />
    <div class="loginbox my-passwordlogin">
      <div class="logo"><img src="@/assets/image/logo.png" alt="" /></div>
      <div class="loginbox">
        <van-field
          v-model="tel"
          type="tel"
          @input="_focusanem"
          clearable
          placeholder="请输入帐号"
          is-highlight
        >
          <template #button>
            <van-button
              size="small"
              :disabled="codedisabled"
              @click="_smscode"
              type="danger"
              >{{ codeText }}</van-button
            >
          </template>
        </van-field>
        <van-field
          v-model="codes"
          clearable
          maxlength="6"
          type="digit"
          placeholder="请输入验证码"
          is-highlight
        />
        <!-- <van-field
          v-model="referrer"
          clearable
          type="digit"
          placeholder="邀请码(选填)"
          is-highlight
        /> -->
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
          >登录</van-button
        >
        <van-button
          type="danger"
          class="yzm"
          plain
          size="normal"
          block
          @click="_gopasswordlogin"
          >账号登录</van-button
        >
      </div>
      <div class="baike">
        未注册用户，可通过验证码直接注册登录
        <!-- <router-link class="agreement" to="/agreement" tag="a">《服务协议》</router-link>
          <router-link class="agreement" to="/agreement" tag="a">《隐私政策》</router-link> -->
      </div>
      <div class="forgotp_box">
        <router-link class="forgotp" to="/forgotpassword" tag="a"
          >忘记密码</router-link
        >
      </div>
    </div>
  </router-layout>
</template>

<!--码登录-->
<script>
import { codelogin, smscode } from "api";
import { mapGetters, mapActions } from "vuex";
import { regphone, isWeixin, getOpenId } from "@/utils/dom";
import wechatShare from "@/utils/wxShare.class.js";
import CommonHeader from "@/components/CommonHeader.vue";
import logo1IMG from '../../assets/image/logo1.png'
export default {
  name: "smslogin",
  data() {
    return {
      tel: "",
      codes: "",
      loadingbtn: false,
      loadingtit: "登录中...",
      usernamedisabled: true,
      codedisabled: true,
      smscode: "",
      codeText: "发送验证码",
      time: 60,
      wechatShare: null,
      referrer: ""
    };
  },
  computed: {
    // ...mapGetters({
    //   getdellFlag: "getdellFlag",
    // }),
    ...mapGetters(["getdellFlag", "turnRoute"])
  },
  created() {
    this.referrer = sessionStorage.getItem("inviteCode");
  },
  mounted() {
    const isAutoOpenRedPacket = /^\/index[\s\S]*origin=clm/.test(
      this.$route.query?.redirect
    );

    if (isAutoOpenRedPacket) {
      this.$route.query.redirect = "/index?autoOpen=true";
    }
    this.wechatShare = new wechatShare();
    this.wechatShare.check({
      title: "诚聊购",
      desc: "全领域，商城一体化营销搭建平台",
      imgUrl: window.location.origin + logo1IMG,
      link: window.location.href
    });
  },
  components: {
    CommonHeader
  },
  methods: {
    ...mapActions(["userinfo"]),
    _focusanem(e) {
      if (regphone(e)) {
        this.usernamedisabled = false;
        this.codedisabled = false;
      }
    },
    _gopasswordlogin() {
      let redirect = this.$route.query.redirect;
      this.$router.replace({ path: "/login", query: { redirect } });
    },
    _login() {
      const that = this;
      if (that.tel === "") {
        that.$toast("请输入帐号");
        return;
      }
      if (that.codes === "") {
        that.$toast("请输入验证码");
        return;
      }
      if (!regphone(that.tel)) {
        that.$toast("输入正确的手机号");
        return;
      }
      let Params = {
        phone: that.tel,
        smscode: that.codes, //that.$md5(that.codes + '8CCAw%2B')
        referrer: that.referrer
      };
      that.loadingbtn = true;
      codelogin(Params)
        .then((result) => {
          that.loadingbtn = false;
          if (result.errorCode === 1) {
            that.userinfo(result.data);
            // that.set_tokencon(result.data.token)
            setTimeout(() => {
              that.loadingtit = "登录成功";
              isWeixin() && getOpenId();
              // if (this.turnRoute.path === "/plorder") {
              //   this.$router.push({
              //     path: "/plorder",
              //     query: this.turnRoute.query,
              //   });
              //   return;
              // }

              // if (this.getdellFlag) {
              //   that.$router.back();
              // } else {
              //   that.$route.query.outlogin == "loginswitch"
              //     ? that.$router.back()
              //     : that.$router.replace("/");
              // }

              if (this.$route.query.redirect) {
                this.$router.replace({ path: this.$route.query.redirect });
              } else {
                this.$router.replace("/");
              }
            }, 500);
          } else {
            setTimeout(() => {
              that.loadingtit = "登录";
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    _smscode() {
      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
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
        smsType: 0,
        phone: that.tel
      };
      smscode(Params)
        .then((result) => {
          if (result.errorCode == 1) {
            let { msg, getsj } = result.data;
            that.time = getsj;
            that.codedisabled = true;
            that.timer();
            this.$toast(msg);
            toast.clear();
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.my-passwordlogin {
  padding: 0 20px;
  height: 100vh;
  position: relative;
}
.my-codelogin {
  padding: 0 20px;
}
.yzm {
  margin-top: 10px;
}
.baike {
  margin-top: 20px;
  font-size: $font-size-small;
  text-align: center;
  .agreement {
    color: $blue;
  }
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
  .forgotp_box {
    margin-top: 160px;
    text-align: center;
    .forgotp {
      margin: 0 auto;
      color: $blue;
      font-size: $font-size-medium;
    }
  }
  .md-example-child-button .md-button {
    margin-top: 20px;
  }
}
</style>
