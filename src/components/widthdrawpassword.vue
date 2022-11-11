<template>
  <div class="widthdrawpassword">
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />
    <van-number-keyboard v-model="value" :show="showKeyboard" />
    <!-- 数字键盘 -->
  </div>
</template>
<script>
import { checkPaymentPassWord } from "api";
import { md5par, getStorage } from "@/utils/dom";
export default {
  data() {
    return {
      value: "",
      showKeyboard: true
    };
  },
  created() {},
  methods: {
    _checkPaymentPassWord() {
      let userinfo = getStorage("userinfo");
      checkPaymentPassWord({
        uid: userinfo.uid,
        passWord: this.$md5(this.value + md5par())
      }).then((res) => {
        if (res.errorCode == 1) {
          this.$emit("passwordSucceed");
        } else {
          this.value = "";
        }
      });
    }
  },
  watch: {
    value(val) {
      if (val.length == 6) {
        this._checkPaymentPassWord();
      }
    }
  }
};
</script>
<style scoped lang="scss">
.widthdrawpassword {
}
</style>
