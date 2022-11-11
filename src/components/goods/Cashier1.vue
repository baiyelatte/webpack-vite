<template>
  <div id="Cashier">
    <div style="background: #f2f2f2">
      <div
        class="van-hairline--top-bottom van-picker__toolbar;"
        style="background: #fff"
      ></div>
      <van-cell-group class="wealybox">
        <van-radio-group v-model="payType">
          <van-cell-group>
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
        </van-radio-group>
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
import { createPayV2, getUserInfo } from "api";
import { mapGetters, mapMutations, mapState } from "vuex";
import { isWeixin, getStorage, getOpenId } from "@/utils/dom";
import { Dialog } from "vant";
import payChannel from "@/mixins/payChannel";
import QrCode from "@/components/common/QrCode";
export default {
  name: "Cashier1",
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
    isSetPayPwd: {
      default: 0
    },
    payResultMoney: {
      type: Number | String,
      default: 0
    }
  },
  data() {
    return {
      payType: "",
      apply: null,
      iswechat: isWeixin(), // 判断是不是微信浏览器
      // openId: getStorage("openid2") || null
      aliPayQrCodeVisible: false,
      aliPayUrl: "",
      shadeFlg: false
    };
  },
  mixins: [payChannel],
  computed: {
    ...mapGetters(["getuserinfo", "getOpenIdGetters"]),
    ...mapState("order", ["channelId"])
  },
  mounted() {},
  created() {
    // if (this.orderdata.payType == 5) {
    //   this.triggerPay(this.orderdata.payType);
    // }
  },
  methods: {
    ...mapMutations("order", ["changeRedirectUrl"]),
    payment() {
      if (!this.payType) {
        this.$toast("请选择支付方式");
        return;
      }
      if (this.payType == 3) {
        if (this.isSetPayPwd == 0) {
          Dialog.confirm({
            message: "请设置支付密码"
          })
            .then(() => {
              this.$router.push({
                path: "/user/wallet/Changepassword",
                query: {
                  isSetPassword: true
                }
              });
            })
            .catch(() => {
              // on cancel
            });
          return;
        }
        this.$emit("passwordOpen");
      } else {
        this.triggerPay(this.payType);
      }
    },
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
        // console.log(self.orderdata)
        const toast = this.$toast.loading({
          message:
            this.iswechat && type === 1 ? "正在生成二维码..." : "支付中...",
          // "支付中...",
          forbidClick: true
        });
        //  alert(self.openId);
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

        // this.changeRedirectUrl(redirectUrl);

        // console.log(this.orderdata.payBillType)
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
                      price: this.payResultMoney
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
              window.location.href = payUrl;
              this.goToUserOrder();
              localStorage.setItem("wxshowcash", true);
            } else if (type == 3) {
              self.$router.replace({
                name: "paysuccess",
                query: { payType: 3 }
              });
            } else if (type == 4) {
              //调用jsApiCall传入jsapi参数，发起支付
              // self.jsApiCall(res.data.payMap);
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
            this.$toast(res.msg);
            // this.$emit("cancel");
          }
          if (res && res.errorCode == 40001) {
            getOpenId();
          }
          if (res.errorCode == 10001) {
            this.$nextTick(() => this.$toast(res.msg));
            // this.$emit("cancel");
          }
        });
      }
    },
    jsApiCall(jsapi) {
      let that = this;
      //正式发起微信支付
      // eslint-disable-next-line no-undef

      WeixinJSBridge.invoke("getBrandWCPayRequest", jsapi, function (res) {
        localStorage.setItem("failMsg", JSON.stringify(res));

        if (res.err_msg == "get_brand_wcpay_request:ok") {
          that.$router.replace({ name: "paysuccess", query: { payType: 4 } });
          // alert("支付成功")
          //你的业务逻辑
        } else {
          alert("支付失败");
          // alert(JSON.stringify(res.err_msg))
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.payment {
  background-color: #cf0000;
  width: 336px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  border-radius: 5px;
}
.wealybox {
  .van-cell--clickable {
    padding: 20px;
    align-items: center;
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
    img {
      width: 22px;
      height: 22px;
      margin-right: 10px;
    }
  }
  :deep(.van-radio__icon--checked .van-icon) {
    border-color: #cf0000;
    background-color: #cf0000;
  }
  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
  }
}
.aliPayWrapper {
  display: flex;
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
</style>
