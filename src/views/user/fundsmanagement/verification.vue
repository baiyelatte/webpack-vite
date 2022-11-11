<template>
  <div>
    <router-layout>
      <van-nav-bar
        title="输入验证码"
        v-if="!$route.meta.CLAPP"
        left-arrow
        @click-left="$router.back()"
      />
      <p class="pass">请输入验证码：</p>
      <van-password-input
        :value="value"
        :gutter="10"
        :mask="false"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        v-model="value"
        :show="showKeyboard"
        @blur="showKeyboard = false"
      />
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
import { changePaymentPassWord, getUserInfo } from "api";
export default {
  name: "alternatepassword",
  data() {
    return {
      value: "",
      errorInfo: "",
      codes: "",
      showKeyboard: true,
      a: this.$route.params
    };
  },
  watch: {},

  computed: {},
  created() {},
  methods: {
    achieve() {
      let phone = this.a.phone;
      let passwd = this.a.passwd;
      let that = this;
      if (this.value === "") {
        this.$toast("请输入验证码");
        return;
      }
      if (this.value.length !== 6) {
        this.$toast("请输入验证码");
        return;
      }

      changePaymentPassWord({
        phone: phone,
        passwd: passwd,
        smsCode: this.value
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
              that.$router.go(-2);
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
    }
  }
};
</script>

<style scoped lang="scss">
.pass {
  margin: 5px;
  padding: 29.33px;
  font-size: 15px;
  color: #666666;
}
.a {
  padding: 28.67px;
  width: 90%;
  margin-left: 16px;
  height: 159.67dp;
}
.input-box {
  input {
    width: 40px;
    height: 40px;
    border: 2px solid #cccccc;
    border-radius: 8px;
    padding: 10px;
  }

  .input-content {
    width: 80%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    margin-top: 1px;
  }
}

.van_button {
  width: 90%;
  height: 40px;
  margin: 0 auto;
  display: block;
  margin-top: 120px;
}
li.van-password-input__item {
  border-color: 1px #cccccc;
}
</style>
