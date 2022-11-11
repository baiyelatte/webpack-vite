<template>
  <div>
    <router-layout>
      <van-nav-bar
        title="请输入支付密码"
        v-if="!$route.meta.CLAPP"
        left-arrow
        @click-left="$router.back()"
      />
      <p class="pass">请输入支付密码</p>
      <van-password-input
        :value="value"
        :gutter="10"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <p v-if="judgePasswordTruly" class="error-password">密码错误重新输入</p>
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
        @click="goAltenate"
        is-link
        >完成</van-button
      >
    </router-layout>
  </div>
</template>

<script>
import { addWithdraw } from "api";
import { mapGetters } from "vuex";
export default {
  name: "widthdrawpassword",
  data() {
    return {
      value: "",
      // errorInfo: "",
      showKeyboard: true,
      actionMoney: 0,
      accountId: 0,
      judgePasswordTruly: false
    };
  },
  watch: {},

  computed: {
    ...mapGetters({
      getwalletinfo: "getwalletinfo"
    })
  },
  created() {},
  methods: {
    // ...mapActions([
    //   'putwalletinfo'
    // ]),
    goAltenate() {
      this.judgePasswordTruly = false;
      this.actionMoney = this.$route.params.actionMoney;
      this.accountId = this.$route.params.accountId;
      this.paymentPassWord = this.value.substring(0, 6);
      this.paymentPassWord.toString();
      let { actionMoney, accountId, $toast, $router } = this;
      if (this.value == "" || this.value.length < 6) {
        this.$toast({ message: "请正确输入密码！", position: "top" });
        return;
      }
      if (this.value.length >= 6) {
        // this.value=this.value.substring(0,6)
        // addWithdraw({actionMoney:actionMoney,accountId:accountId,paymentPassWord:this.paymentPassWord})
        addWithdraw({
          actionMoney: actionMoney,
          accountId: accountId,
          paymentPassWord: this.$md5(this.paymentPassWord + "8CCAw%2B")
        }).then((res) => {
          // putwalletinfo()
          // $router.push({name:'widthdrawpassword'})
          if (res && res.errorCode == 1) {
            $toast.success("提现成功");
            $router.push({ name: "wdetails", params: { id: res.data.id } });
          } else {
            if (res.msg == "密码错误请重新输入") {
              this.judgePasswordTruly = true;
            }
            // this.judgePasswordTruly = true;
            // $toast.fail(res.msg);
          }
        });
      }

      window.localStorage.setItem("isSetPayPwd", 1);
      /* this.$router.push({
        name: "wallet",
        params: { password: this.value }    
      }); */
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
//   .placeholder {
//   width: 40px;
//   height: 40px;
//   background: #CCCCCC;
//   padding: 28.67px ;
//   margin: 29.33px
// }
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
.error-password {
  color: #e36e74;
  font-size: 14px;
  margin: 10px 0 0 35px;
}
</style>
