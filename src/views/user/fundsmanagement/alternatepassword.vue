<template>
  <div>
    <router-layout>
      <van-nav-bar
        :title="$route.meta.title"
        v-if="!$route.meta.CLAPP"
        left-arrow
        @click-left="$router.back()"
      />
      <p class="pass">请再输入密码</p>
      <van-password-input
        :value="value"
        :gutter="10"
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
        @click="paymentPassWord"
        >完成</van-button
      >
    </router-layout>
  </div>
</template>

<script>
import { addPaymentPassWord } from "api";
export default {
  name: "alternatepassword",

  data() {
    return {
      value: "",
      errorInfo: "",
      showKeyboard: true,
      password: ""
    };
  },
  watch: {},

  computed: {},
  created() {},
  mounted() {
    this.password = this.$route.params.password;
  },
  methods: {
    paymentPassWord() {
      if (this.value.length > 6) {
        this.value = this.value.substring(0, 6);
      }
      if (this.password !== this.value) {
        this.$toast({ message: "两次密码不正确！", position: "top" });
        return;
      }
      let flag = "1";

      addPaymentPassWord({ passwd: this.$md5(this.value + "8CCAw%2B") }).then(
        (res) => {
          if (res.success === true) {
            flag = "2";
            window.localStorage.setItem("isSetPayPwd", 1);
            /*    addPaymentPassWord({ passwd: this.$md5(this.value + " 8CCAw%2B") }).then(
        (res) => {
          if (res.success === true) {
            flag = '2'; */
            this.$router.push({
              name: "wallet",
              path: "wallet",
              query: { password: this.value, pay: flag }
            });
          } else {
            this.$toast({ message: "密码设置失败，请重试！", position: "top" });
          }
        }
      );
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
