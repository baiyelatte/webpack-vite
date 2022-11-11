<template>
  <div id="Cashier">
    <div style="background: #f2f2f2">
      <div
        class="van-hairline--top-bottom van-picker__toolbar;"
        style="background: #fff"
      >
        <!-- <button type="button" class="van-picker__cancel"></button> -->
        <div class="van-action-sheet__header">选择支付方式</div>
        <!-- <button type="button" class="van-picker__confirm"></button> -->
      </div>
      <van-cell-group class="wealybox">
        <template v-for="channel in channelList">
          <van-cell
            :key="channel.channelId"
            @click="handlePay(channel)"
            :title="channel.channelTitle"
            :icon="channel.iconUrl"
            is-link
          ></van-cell>
        </template>
        <van-loading
          v-if="!channelList.length"
          class="spinner"
          type="spinner"
          color="#1989fa"
        />
      </van-cell-group>
      <van-cell style="margin-top: 10px">
        <div style="text-align: center" @click="cancel">取消</div>
      </van-cell>
      <div v-html="apply"></div>
      <van-overlay
        :show="aliPayQrCodeVisible"
        @click="aliPayQrCodeVisible = false"
      >
        <div class="aliPayWrapper">
          <p class="notify">
            请长按二维码保存至手机<br />打开支付宝扫一扫识别二维码进行付款
          </p>
          <qr-code
            v-if="aliPayUrl"
            @click.stop
            class="qrCodeBox"
            :size="120"
            :value="aliPayUrl"
            :avatarSize="30"
            :avatar="require('@/assets/image/common/alipay.png')"
          ></qr-code>
        </div>
      </van-overlay>
    </div>
  </div>
</template>
<script>
import { createPayV2 } from "api";
import { mapGetters, mapState } from "vuex";
import { isWeixin, getStorage, getOpenId, localCache } from "@/utils/index";
import QrCode from "@/components/common/QrCode";
import payChannel from "@/mixins/payChannel";
export default {
  name: "Cashier",
  components: {
    QrCode
  },
  props: {
    winwidth: {
      default: document.documentElement.clientWidth
    },
    winheight: {
      default: document.documentElement.clientHeight
    },
    orderdata: {
      default: 0
    },
    payResultMoney: {
      type: Number | String,
      default: 0
    }
  },
  mixins: [payChannel],
  data() {
    return {
      apply: null,
      iswechat: isWeixin(), // 判断是不是微信浏览器
      openId: getStorage("openid2") || null,
      aliPayQrCodeVisible: false,
      aliPayUrl: ""
    };
  },
  computed: {
    ...mapGetters(["getuserinfo", "getOpenIdGetters"]),
    ...mapState("order", ["channelId"]),
    isSetPayPwd() {
      return localCache.getCache("isSetPayPwd");
    }
  },
  mounted() {},
  created() {
    // if (this.orderdata.payType == 5) {
    // console.log(this.orderdata)
    //   this.triggerPay(this.orderdata.payType);
    // }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    goToUserOrder() {
      setTimeout(() => {
        this.$router.replace({ path: "/user/order?type=0" });
      }, 500);
    },
    // types='alipay_wap_pay'
    triggerPay(type, channelId) {
      let self = this;
      if (!self.orderdata) {
        self.$toast({
          duration: 3000,
          message: "订单id必须赋值",
          icon: "warning"
        });
        return;
      } else {
        const toast = this.$toast.loading({
          message:
            this.iswechat && type === 1 ? "正在生成二维码..." : "支付中...",
          // "支付中...",
          forbidClick: true
        });
        let parm = {
          payType: type,
          PayBillType: self.orderdata.PayBillType,
          sn:
            self.orderdata.PayBillType == 1
              ? self.orderdata.tradeSn
              : self.orderdata.orderSn, // tradeSn:交易单单号(1)  orderSn:订单单号(2)
          openId: self.getOpenIdGetters,
          appToH5Flag: false,
          channelId: channelId || this.channelId
        };

        createPayV2(parm).then((res) => {
          toast.clear();
          if (res && res.errorCode == 1) {
            let { payUrl, canPay } = res.data;

            if (type == 1) {
              if (canPay) {
                this.$router.replace({
                  name: "paysuccess",
                  query: { payType: 1 }
                });
              } else {
                if (this.iswechat) {
                  this.$router.replace({
                    name: "aliPay",
                    query: {
                      payUrl,
                      price: this.orderTotalMoney()
                    }
                  });
                } else {
                  this.goToUserOrder();
                  LukeappApi.open_browser(
                    payUrl,
                    1,
                    "#fff",
                    "b",
                    "close",
                    "关闭",
                    "close",
                    "close"
                  );
                }
              }
            } else if (type == 2) {
              localStorage.setItem("wxshowcash", true);
              this.goToUserOrder();
              window.location.href = payUrl;
            } else if (type == 3) {
              self.$router.replace({
                name: "paysuccess",
                query: { payType: 3 }
              });
            } else if (type == 4) {
              //调用jsApiCall传入jsapi参数，发起支付
              if (res.data.canPay == true) {
                this.$router.replace({
                  name: "paysuccess",
                  query: { payType: 4 }
                });
              } else if (res.data.canPay == false) {
                self.jsApiCall(res.data.payMap);
              }
            } else if (type == 8) {
              window.location.href = payUrl;
            }
          } else {
            this.$emit("errorCode");
          }
          if (res && res.errorCode == 40001) {
            getOpenId();
          }
          if (res.errorCode == 10001) {
            this.$nextTick(() => this.$toast(res.msg));
            this.$emit("cancel");
          }
        });
      }
    },

    jsApiCall(jsapi) {
      let that = this;
      //正式发起微信支付
      // eslint-disable-next-line no-undef
      // WeixinJSBridge.invoke(
      //   'getBrandWCPayRequest',
      //   jsapi,
      //   function (res) {
      WeixinJSBridge.invoke("getBrandWCPayRequest", jsapi, function (res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          that.$router.replace({ name: "paysuccess", query: { payType: 4 } });
          // alert("支付成功")
          //你的业务逻辑
        } else {
          alert("支付失败");
          // alert(JSON.stringify(res.err_msg))
        }
      });
    },

    orderTotalMoney() {
      const {
        canUseCoupon,
        promotionAmount,
        canVoucherMoney,
        voucherMoneyType,
        voucherPayMoney,
        payMoney
      } = this.orderdata || {};

      if (canUseCoupon) {
        return promotionAmount;
      }

      if (canVoucherMoney && voucherMoneyType == 2) {
        return voucherPayMoney;
      }

      return payMoney;
    }
  }
};
</script>
<style lang="scss" scoped>
.wealybox {
  .van-cell--clickable {
    padding: 20px;
    .van-cell__left-icon {
      font-size: 0.82667rem;
      color: #00c22a;
    }
    .van-icon-alipay {
      font-size: 0.82667rem;
      color: #0085d2;
    }
    .van-icon-card {
      font-size: 0.82667rem;
      color: #0045c2;
    }
  }
  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
  }
}
</style>
