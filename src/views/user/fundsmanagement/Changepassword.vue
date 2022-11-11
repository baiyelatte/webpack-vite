<template>
  <div>
    <router-layout>
      <!-- <van-nav-bar :title="$route.meta.title" v-if="!$route.meta.CLAPP" left-arrow  @click-left="$router.back()" /> -->
      <van-nav-bar
        :title="title"
        v-if="!$route.meta.CLAPP"
        left-arrow
        @click-left="$router.back()"
      />
      <p class="pass">{{ title }}</p>
      <p class="passed">本人手机号获取验证码</p>
      <p class="passeds">{{ subTitle }}</p>
      <div class="password">
        <van-field
          readonly
          clickable
          v-model="value1"
          @touchstart.native.stop="show = true"
          placeholder="请输入6位数字密码"
          type="password"
          @focus="aaa"
        />
        <van-field
          readonly
          clickable
          v-model="value2"
          @touchstart.native.stop="showtwo = true"
          placeholder="请再输入6位数字密码"
          type="password"
          @focus="bbb"
        />
        <van-field
          v-model="value3"
          readonly
          clickable
          @touchstart.native.stop="showKeyboard = true"
          placeholder="请输入6位短信验证码"
          @focus="ccc"
        >
          <template #button>
            <van-button
              size="small"
              type="default"
              @click="code"
              :disabled="able"
              style="border: 0px; color: red"
              >{{ codeText }}</van-button
            >
          </template>
        </van-field>
        <div class="phoneNum">手机号码:{{ tel }}</div>
        <van-number-keyboard
          v-if="show"
          v-model="value1"
          :show="show"
          :maxlength="6"
          @blur="show = false"
        />

        <van-number-keyboard
          v-if="showtwo"
          v-model="value2"
          :show="showtwo"
          :maxlength="6"
          @blur="showtwo = false"
        />

        <van-number-keyboard
          v-if="showKeyboard"
          v-model="value3"
          :show="showKeyboard"
          :maxlength="6"
          @blur="showKeyboard = false"
        />

        <van-cell-group> </van-cell-group>
      </div>
      <van-button
        type="danger"
        size="normal"
        class="van_button"
        style="border-radius: 6px"
        @click="achieve"
        is-link
        >完成</van-button
      >
    </router-layout>
  </div>
</template>

<script>
// import { changePaymentPassWord } from 'api'
import { changePaymentPassWord, getUserInfo } from "api";
import { smscode } from "api";
export default {
  name: "Changepassword",
  data() {
    return {
      able: false,
      show: false,
      showtwo: false,
      value1: "",
      smscode: "",
      codes: "",
      value2: "",
      showKeyboard: true,
      codeText: "获取短信验证码",
      tel: JSON.parse(localStorage.getItem("userinfo")).phone,
      value3: "",
      errorInfo: "",
      codes: "",
      showKeyboard: false,
      query: "",
      time: 59
    };
  },

  computed: {
    title() {
      return this.$route.query.isSetPassword ? "设置支付密码" : "重置支付密码";
    },
    subTitle() {
      return this.$route.query.isSetPassword
        ? "输入支付密码"
        : "输入新的支付密码";
    }
  },
  created() {},
  methods: {
    // 倒计时
    timer() {
      this.able = true;
      const that = this;
      var clock = setInterval(function () {
        if (that.time == 0) {
          clearInterval(clock);
          that.able = false;
          that.codeText = "发送验证码";
        } else {
          that.codeText = that.time + "s后重新获取验证码";
          that.able = true;
          that.time--;
        }
      }, 1000);
    },
    async code() {
      const that = this;
      if (
        this.value1 == "" ||
        this.value1.length !== 6 ||
        this.value2 == "" ||
        this.value2.length !== 6 ||
        this.value1 !== this.value2 ||
        this.password !== this.value
      ) {
        this.$toast({ message: "请正确输入新密码！", position: "top" });
        return;
      } else {
        that.able = true;
        that.timer();
        let codepamas = {
          phone: this.tel,
          smsType: 7
        };
        let params = {
          passwd: this.$md5(this.value1 + "8CCAw%2B"),
          smsCode: this.codes,
          phone: this.tel
        };

        await smscode(codepamas)
          .then((result) => {
            if (result.errorCode == 1) {
              that.able = false;
              that.query = params;
              // this.$router.push({
              //   name: "verification",
              params: params;
              // });
              return;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    achieve() {
      let phone = this.query.phone;
      let passwd = this.query.passwd;
      let that = this;
      if (this.value3 === "") {
        this.$toast("请输入验证码");
        return;
      }
      if (this.value3.length !== 6) {
        this.$toast("请输入验证码");
        return;
      }

      changePaymentPassWord({
        phone: phone,
        passwd: passwd,
        smsCode: that.value3
      }).then((res) => {
        if (res.errorCode == 1) {
          window.localStorage.setItem("isSetPayPwd", 1);
          // that.$router.push({
          //         name: "wallet",
          //         params: { password: passwd },
          //       });
          getUserInfo().then((res) => {
            if (res.errorCode == 1) {
              localStorage.setItem("userinfo", JSON.stringify(res.data));
              this.$toast("密码设置成功");
              that.$router.go(-1);
            }
          });
          /*  changePaymentPassWord({phone:phone,passwd:passwd,smsCode:this.value}).then(
        (res) => {

          if(res.errorCode == 1){
          that.$router.back(-2)
          that.$router.back({
                  name: "user",
                  params: { password: passwd },
                });
                if (this.value !== smsCode) {
                this.$toast('支付密码修改成功')
                return
      } */
        } else {
          that.$toast("验证码不正确");
        }
      });
    },
    aaa() {
      this.show = true;
      this.showtwo = false;
      this.showKeyboard = false;
    },
    bbb() {
      this.show = false;
      this.showtwo = true;
      this.showKeyboard = false;
    },
    ccc() {
      this.showKeyboard = true;
      this.show = false;
      this.showtwo = false;
    }
  }
};
</script>

<style scoped lang="scss">
.van-button:active::before {
  opacity: 0;
}

.van_button {
  width: 90%;
  height: 40px;
  margin: 0 auto;
  display: block;
  margin-top: 120px;
}
.pass {
  margin-left: 16.33px;
  padding-top: 19.67px;
  font-size: 15px;
  color: #666666;
}
.passed {
  margin-left: 16.33px;
  padding-top: 10px;
  font-size: 14px;
  color: #999999;
}
.passeds {
  margin-left: 16.33px;
  padding-top: 20px;
  font-size: 15px;
  color: #666666;
}
.a {
  margin-left: 3px;
  padding-top: 10px;
  font-size: 14px;
  color: #999999;
}
.password {
  margin-left: 16.33px;
  margin-right: 16.67px;
  padding-top: 10px;
  font-size: 14px;
  color: #999999;
}
.van-cell van-field {
  width: 80%;
}
.van_button {
  margin-left: 16px;
  margin-right: 16px;
  // padding-top: 88px;
  font-size: 16px;
  color: #ffffff;
}
.van_button::before {
  width: 328px;
  // height: 40px;
  margin-top: 16.67px;
}
// .van_button van-button van-button--danger van-button--normal {
//   height: 10px;
// }
.van-button--normal {
  margin-top: 16.67px;
}
.van_button[data-v-659f6d7a] {
  font-size: 16px;
}
div.a van-cell van-field {
  // margin-left: 16.33px;
  // margin-right: 16.67px;
  width: 80%;
  display: block;
  margin: 0 auto;
}
.phoneNum {
  margin-top: 40px;
  margin-left: 16px;
  margin-right: 16px;
  font-size: 15px;
  color: #212121;
}
</style>
