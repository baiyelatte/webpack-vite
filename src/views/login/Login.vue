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
          @input="onInputPhone"
          clearable
          type="tel"
          placeholder="请输入手机号码"
        />
        <van-field
          v-model="passwd"
          clearable
          type="password"
          placeholder="请输入密码"
        />
      </div>
      <div class="md-example-child-button loginbtn">
        <van-button
          type="danger"
          :disabled="userNameDisabled"
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
          @click="_smslogin"
          >验证码登录</van-button
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
    <router-view></router-view>
  </router-layout>
</template>

<!--码登录-->
<script>
import { pwlogin } from "api";
import { mapGetters, mapActions } from "vuex";
import { regphone, md5par, getOpenId, isWeixin } from "@/utils/dom";
import wechatShare from "@/utils/wxShare.class.js";
import CommonHeader from "@/components/CommonHeader.vue";
import logo1IMG from '../../assets/image/logo1.png'
export default {
  name: "login",
  data() {
    return {
      tel: "",
      passwd: "",
      loadingbtn: false,
      loadingtit: "登录中...",
      userNameDisabled: true,
      wechatShare: null
    };
  },
  computed: {
    ...mapGetters(["getdellFlag", "turnRoute"])
  },
  components: {
    CommonHeader
  },
  mounted() {
    this.wechatShare = new wechatShare();
    this.wechatShare.check({
      title: "诚聊购",
      desc: "全领域，商城一体化营销搭建平台",
      imgUrl: window.location.origin + logo1IMG,
      link: window.location.href
    });
  },
  methods: {
    ...mapActions(["userinfo"]),
    onInputPhone(e) {
      if (regphone(e)) {
        this.userNameDisabled = false;
      }
    },
    _smslogin() {
      let redirect = this.$route.query.redirect;
      this.$router.replace({
        path: "/smslogin",
        query: { redirect: redirect }
      });
    },
    _login() {
      const that = this;
      if (that.tel === "") {
        that.$toast("请输入手机号码");
        return;
      }
      if (that.passwd === "") {
        that.$toast("请输入密码");
        return;
      }
      if (!regphone(that.tel)) {
        that.$toast("输入正确的手机号");
        return;
      }
      let Params = {
        phone: that.tel,
        passwd: that.$md5(that.passwd + md5par())
      };
      that.loadingbtn = true;
      pwlogin(Params)
        .then((result) => {
          that.loadingbtn = false;
          if (result.errorCode === 1) {
            that.userinfo(result.data);
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
    }
  }
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
    margin-top: 168px;
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
@media (max-height: 600px) {
  .forgotp_box {
    display: none;
  }
}
</style>
