<script>
import { defineComponent, computed } from "vue";
import { createPayV2 } from "api";
import router from "@/router";
import QrCode from "@/components/common/QrCode";

export default defineComponent({
  components: {
    QrCode
  },
  setup() {
    const historyQuery = computed(() => router.history.current.query);

    // const handlePaySuccess = () =>
    //   LukeappApi.lukeapp({
    //     type: "set_payResult",
    //     data: {
    //       payResult: 1
    //     }
    //   });

    // if (LukeappApi.IscltApp()) {
    //   if (historyQuery.value.platform == "0") {
    //     // 接口重定向过来的
    //     handlePaySuccess();
    //   } else {
    //     // 移动端跳转来的
    //     (async () => {
    //       const params = { ...historyQuery.value };
    //       delete params.platform;

    //       const result = await createPayV2({
    //         ...params,
    //         payType: 1,
    //         appToH5Flag: true
    //       });
    //       const { data } = result;
    //       if (data) {
    //         const { payUrl, canPay } = data;
    //         if (canPay) {
    //           handlePaySuccess();
    //         } else {
    //           LukeappApi.open_browser(
    //             payUrl,
    //             1,
    //             "#fff",
    //             "b",
    //             "close",
    //             "关闭",
    //             "close",
    //             "close"
    //           );
    //         }
    //       }
    //     })();
    //   }
    // }

    return {
      historyQuery
    };
  }
});
</script>

<template>
  <div class="aliPay">
    <div
      class="header"
      @click="$router.replace({ path: '/user/order?type=0' })"
    >
      <van-icon class="arrow-left" name="arrow-left" color="#333" />
      <span style="font-size: 14px" class="arrow-left">返回</span>
      <div class="title-wrapper">
        <img class="icon" :src="require('@/assets/image/common/alipay.png')" />
        <div class="title">支付宝付款</div>
      </div>
    </div>
    <div class="price">{{ historyQuery.price }}</div>
    <div class="v2020v2-header__name">购买商品</div>
    <div class="v2021-container v2021-show">
      <a class="am-button am-button-blue v2021-btn J-startapp">
        <span class="v2021-continue">打开支付宝APP付款</span>
      </a>
      <div class="v2021-complete">
        <a
          class="v2021-complete__btn J-complete already-pay"
          @click="$router.replace({ path: '/user/order?type=0' })"
        >
          我已付款，返回查看订单
        </a>
        <div class="g-iphonex-bottom"></div>
      </div>
    </div>

    <van-overlay
      :show="true"
      :custom-style="{
        backgroundColor: '#fff'
      }"
    >
      <div class="aliPayWrapper">
        <p class="notify">
          请长按二维码保存至手机<br />打开支付宝扫一扫识别二维码进行付款
        </p>
        <qr-code
          v-if="historyQuery.payUrl"
          @click.stop
          class="qrCodeBox"
          :size="120"
          :value="historyQuery.payUrl"
          :avatarSize="30"
          :avatar="require('@/assets/image/common/alipay.png')"
        ></qr-code>
        <div class="price">{{ historyQuery.price }}</div>
      </div>
    </van-overlay>
  </div>
</template>

<style lang="scss" scoped>
.aliPay {
  text-align: center;
  font-family: PingFang SC, Helvetica Neue, Helvetica, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  .header {
    height: 44px;
    display: flex;
    align-items: center;
    padding: 10px 16px;
    .arrow-left {
      font-size: 25px;
      position: relative;
      z-index: 999;
      color: #333;
    }
    .title-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      .icon {
        width: 20px;
        height: 20px;
        margin-right: 3px;
      }
      .title {
        font-size: 17px;
        color: #333;
        font-weight: 600;
      }
    }
  }
  .price {
    text-align: center;
    margin-top: 28px;
    font-weight: 500;
    font-size: 45px;
    color: #333333;
    line-height: 42px;
    margin-bottom: 5px;
    &::before {
      content: "¥";
      font-size: 30px;
      margin-right: 6px;
    }
  }
  .btn-wrapper {
    padding: 28px 12px;
  }
  .v2020v2-header__name {
    font-size: 15px;
    margin-bottom: 10px;
    white-space: nowrap;
    width: 100%;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 18px;
  }
  .v2021-container {
    width: 100vw;
    height: auto;
    min-height: 400px;
    padding: 15px 12px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .am-button-blue {
    border-color: #1677ff;
    background: #1677ff;
  }
  .am-button {
    padding: 5px 15px;
  }
  .am-button-blue {
    border: 1px solid #0ae;
    color: #fff;
  }
  .am-button {
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    margin: 0;
    padding: 4px 8px;
    width: 100%;
    text-align: center;
    font-size: 18px;
    line-height: 2;
    border-radius: 4px;
    background-clip: padding-box;
  }
  a {
    color: #0af;
    text-decoration: none;
  }
  .v2021-complete {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: absolute;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    bottom: 24px;
    left: 12px;
    right: 12px;
  }
  .v2021-complete__btn {
    line-height: 30px;
    color: #4b6b99;
    font-size: 15px;
    font-weight: 400;
    padding: 5px 10px;
    background-color: #ffffff;
    border: none;
  }
  .already-pay {
    position: relative;
    z-index: 999;
    background-color: transparent;
    padding: 20px;
    color: #333;
  }

  .aliPayWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .notify {
      color: #333;
      font-size: 16px;
      width: 300px;
      text-align: center;
      line-height: 25px;
      margin-bottom: 10px;
    }
    .qrCodeBox {
      width: 120px;
      height: 120px;
      background-color: #fff;
    }
  }
}
</style>
