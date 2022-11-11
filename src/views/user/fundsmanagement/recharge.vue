<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="witht_btn">
      <div
        class="van-icon btns alipay"
        @click="withtchanges(1)"
        :class="{ active: defaulactive == 1 }"
      >
        <i></i>支付宝
      </div>
      <div
        class="van-icon btns weixin"
        @click="withtchanges(2)"
        :class="{ active: defaulactive == 2 }"
      >
        <i></i>微信
      </div>
    </div>
    <div class="witht_hb">
      <p class="tits">充值金额</p>
      <div class="witht_hd">
        <span class="witht_tit">￥</span>
        <van-field
          placeholder="请输入充值金额"
          type="number"
          name="savingsMoney"
          v-model="savingsMoney"
          :rules="[{ required: true }]"
        />
      </div>
    </div>
    <div class="btnbox">
      <van-button type="danger" @click="sumit" block>充值</van-button>
    </div>
    <div v-html="apply"></div>
  </router-layout>
</template>

<script>
import { createPayBySavings } from "api";
export default {
  name: "recharge",
  data() {
    return {
      defaulactive: 1, // 默认显示支付宝
      savingsMoney: null,
      apply: null
    };
  },
  methods: {
    withtchanges(key) {
      let that = this;
      that.defaulactive = key;
    },
    sumit() {
      let that = this;
      if (!that.savingsMoney) {
        that.$toast("请输入充值金额");
        return;
      }
      createPayBySavings({
        savingsMoney: that.savingsMoney,
        payType: that.defaulactive
      }).then((res) => {
        if (res && res.errorCode == 1) {
          let { form, payUrl } = res.data;
          // 支付宝支付
          if (that.defaulactive == 1) {
            that.apply = form;
            that.$nextTick(() => {
              document.forms[0].submit();
            });
          } else if (that.defaulactive == 2) {
            localStorage.setItem("wxshowcash", true);
            window.location.href = payUrl;
          } else if (that.defaulactive == 3) {
            that.$router.replace({ name: "paysuccess", query: { payType: 3 } });
          } else if (that.defaulactive == 4) {
            //调用jsApiCall传入jsapi参数，发起支付
            that.jsApiCall(res.data.payMap);
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.witht_btn {
  background: #fff;
  display: flex;
  padding: 10px 0;
  margin-bottom: 15px;
  .btns {
    width: 300px;
    height: 45px;
    padding-bottom: 5px;
    border: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    overflow: hidden;
    position: relative;
    i {
      width: 16px;
      height: 16px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      display: block;
      margin: 0 4px -4px 0;
    }
  }
  .weixin {
    margin-right: 10px;
    margin-left: 10px;
    i {
      background-image: url(../../../assets/image/common/wx.png);
    }
  }
  .alipay {
    margin-left: 10px;
    i {
      background-image: url(../../../assets/image/common/alipay.png);
    }
  }
  .active {
    border-color: #f00;
    &::after {
      width: 50px;
      height: 50px;
      background: #f00;
      content: "";
      position: absolute;
      left: -32px;
      top: -32px;
      transform: rotate(45deg);
      z-index: 1;
    }
    &::before {
      width: 50px;
      height: 50px;
      content: "\F0C8";
      position: absolute;
      z-index: 2;
      left: 1px;
      top: 2px;
      color: #fff;
      font-size: 12px;
    }
  }
}
.witht_hb {
  padding: 20px;
  background: #fff;
  .tits {
    font-size: 14px;
    padding-bottom: 20px;
  }
  .witht_hd {
    display: flex;
    .witht_tit {
      display: flex;
      align-items: center;
    }
  }
}
</style>
