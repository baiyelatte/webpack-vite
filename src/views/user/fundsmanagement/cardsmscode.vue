<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell
      title="填入短信验证码"
      :label="`验证码已发送至${mapgetuserinfo.phone}`"
    />
    <van-password-input
      class="passwordinputbox"
      :value="smscode"
      :mask="false"
      :gutter="10"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      v-model="smscode"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    />
    <div class="btnbox">
      <van-button
        type="danger"
        :disabled="btndisabled"
        :loading="loadingbtn"
        :loading-text="loadingtext"
        block
        @click="submit"
        >{{ $route.query.accountType | fielsbtnname }}</van-button
      >
    </div>
  </router-layout>
</template>

<script>
import { addAccount } from "api";
import { mapGetters } from "vuex";
export default {
  name: "cardsmscode",
  data() {
    return {
      loadingbtn: false,
      loadingtext: "绑定中...",
      smscode: "",
      showKeyboard: false,
      btndisabled: true
    };
  },
  filters: {
    fielsbtnname(type) {
      let txt = "";
      switch (Number(type)) {
        case 1:
          txt = "绑定支付宝";
          break;
        case 4:
          txt = "绑定银行卡";
          break;

        default:
          txt = "绑定银行卡";
          break;
      }
      return txt;
    }
  },
  computed: {
    ...mapGetters({
      mapgetuserinfo: "getuserinfo"
    })
  },
  methods: {
    submit() {
      let that = this;
      that.$route.query.smscode = that.smscode;
      that.loadingbtn = true;
      addAccount(that.$route.query).then((res) => {
        that.loadingbtn = false;
        if (res && res.errorCode == 1) {
          that.$toast("绑定成功");
          setTimeout(() => {
            that.$router.go(-2);
          }, 1000);
        }
      });
    }
  },
  created() {},
  watch: {
    smscode(value) {
      if (value.length === 6) {
        this.btndisabled = false;
      } else {
        this.btndisabled = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.passwordinputbox {
  margin-top: 10px;
  li {
    border-radius: 2px;
    @include border1($color-999);
  }
}
</style>
