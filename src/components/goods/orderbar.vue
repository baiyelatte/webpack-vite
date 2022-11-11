<template>
  <div class="or_barbox">
    <div class="or_acntionbar" v-if="OrderListBar.orderStatus">
      <div class="contection" v-if="pageName == '/user/order'" @click="service">
        <i class="kefu"><van-icon name="chat-o" size="14px" /></i>
        <span>联系客服</span>
        <!-- <a class="phone" :href="'tel:' + OrderListBar.sellerPhone"></a> -->
      </div>
      <span
        v-if="
          OrderListBar.orderStatus == 1 ||
          OrderListBar.orderStatus == 2 ||
          OrderListBar.orderStatus == 3
        "
      >
        <van-button
          size="small"
          @click="cancelorder(OrderListBar)"
          style="margin-right: 10px"
          >取消订单</van-button
        >
        <van-button
          size="small"
          plain
          type="danger"
          @click="cashierclick(OrderListBar)"
          >立即支付</van-button
        >
      </span>
      <!-- <span v-if="OrderListBar.orderStatus == 4">
          <van-button size="small" @click="addressChange(OrderListBar)">修改地址</van-button>
      </span> -->

      <!-- <span v-if="OrderListBar.orderStatus == 7 || OrderListBar.orderStatus >= 10" style="margin-left: 10px">
         <van-button  size="small" @click="deleteorder(OrderListBar)" >删除订单</van-button>   
      </span> -->

      <!-- <span v-if="(OrderListBar.orderItemVOList[0].refundStatus == null || OrderListBar.orderItemVOList[0].refundStatus == 2) && OrderListBar.orderItemVOList[0].itemStatus == 4 ||  OrderListBar.orderItemVOList[0].itemStatus == 6 || OrderListBar.orderItemVOList[0].itemStatus == 10">
        <van-button size="small" plain type="danger" @click="refundclick(OrderListBar)">申请退款</van-button>
      </span> -->

      <!-- <span v-if="OrderListBar.orderStatus == 5">
        <van-button size="small" @click="checkLogistics(OrderListBar)"
          >查看物流</van-button
        >
      </span> -->
      <span v-if="OrderListBar.orderStatus == 5" style="margin-left: 10px">
        <van-button
          size="small"
          plain
          type="danger"
          @click="Confirmclick(OrderListBar)"
          >确认收货</van-button
        >
      </span>
      <span v-if="OrderListBar.orderStatus == 6" style="margin-left: 10px">
        <van-button
          size="small"
          plain
          type="danger"
          @click="evaluationclick(OrderListBar)"
          >评价</van-button
        >
      </span>
      <!-- 商家主动退款 -->
      <template
        v-if="
          (OrderListBar.orderStatusValue & 0x1) > 0 &&
          OrderListBar.orderStatus == 34
        "
      >
        <span>
          <van-button
            size="small"
            @click="handleReject(OrderListBar)"
            style="margin-right: 10px"
            >拒绝申请</van-button
          >
          <van-button
            size="small"
            plain
            type="danger"
            @click="handleAgree(OrderListBar)"
            >同意申请</van-button
          >
        </span>
      </template>
    </div>

    <!--收银台-->
    <van-popup
      get-container="body"
      v-model="cashier.showCashier"
      position="bottom"
      style="border-top-left-radius: 16px; border-top-right-radius: 16px"
      @close="$emit('refresh')"
    >
      <Cashier
        ref="Cashier"
        @passwordOpen="passwordOpen"
        @cancel="handleCancelClick"
        :orderdata="cashier.orderdata"
        @errorCode="errorCode"
      />
    </van-popup>
    <!--收银台-->
    <!-- 评价 -->
    <van-popup
      get-container="body"
      v-model="evaluation.showPicker"
      position="bottom"
      :style="'height:' + winheight + 'px;background:#f7f8fa;'"
    >
      <van-nav-bar
        title="发表评价"
        right-text="发布"
        left-arrow
        @click-left="evblock"
        @click-right="save"
      />
      <Evaluation
        :propevdata="evaluation.data"
        ref="childEvaluation"
        @evblock="evblock"
      />
    </van-popup>
    <!-- 评价 -->
    <!-- 退款 -->
    <van-popup
      get-container="body"
      v-model="refund.showrefund"
      position="bottom"
      :style="'height:' + winheight + 'px;background:#f7f8fa;'"
    >
      <van-nav-bar
        title="退款"
        left-arrow
        @click-left="
          refundback();
          refund.showrefund = false;
        "
      />
      <Refund
        :refunddta="refund.refunddata"
        ref="refund"
        :aftersaleType="aftersaleType"
        :refundrefresh="refundrefresh"
      />
    </van-popup>
    <!-- 退款 -->

    <!-- 支付密码 -->
    <van-popup
      class="passwordBox"
      v-model="passwordFlag"
      position="bottom"
      :close-on-click-overlay="false"
      style="border-top-left-radius: 16px; border-top-right-radius: 16px"
    >
      <van-icon name="cross" class="cross" @click="passwordClose" />
      <div class="van-action-sheet__header">
        <p>请输入支付密码</p>
      </div>
      <widthdrawpassword
        ref="widthdrawpassword"
        @passwordSucceed="passwordSucceed"
      ></widthdrawpassword>
    </van-popup>
    <template
      v-if="
        $router.currentRoute.meta.title == '我的订单' &&
        (OrderListBar.orderStatusValue & 0x1) > 0 &&
        OrderListBar.orderStatus == 34
      "
    >
      <div class="refundDiv">
        <span style="color: red; font-size: 12px">商家退款原因：</span>
        <p style="font-size: 12px; letter-spacing: 1px; margin-top: 3px">
          {{ OrderListBar.applyRefundMerchantRemark }}
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import { postoperation, getShop, getAudit } from "api";
import Evaluation from "@/components/goods/evaluation";
import Cashier from "@/components/goods/Cashier";
import widthdrawpassword from "@/components/widthdrawpassword";
import Refund from "@/components/goods/refund";
import { Dialog } from "vant";
export default {
  name: "orderbar",
  props: {
    OrderListBar: {}
  },
  data() {
    return {
      winheight: document.documentElement.clientHeight,
      refund: {
        // 退款
        refunddata: {},
        showrefund: false
      },
      evaluation: {
        // 评价
        showPicker: false,
        data: {}
      },
      cashier: {
        // 收银台
        orderdata: 0,
        showCashier: false
      },
      passwordFlag: false,
      aftersaleType: "" // 售后类型
    };
  },
  components: {
    Cashier,
    Evaluation,
    widthdrawpassword,
    Refund
  },
  computed: {
    pageName() {
      return this.$route.path;
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    handleReject(item) {
      getAudit({ orderSn: item.orderSn, auditFlag: false });
      this.$emit("refresh");
    },
    handleAgree(item) {
      getAudit({ orderSn: item.orderSn, auditFlag: true });
      this.$emit("refresh");
    },
    handleCancelClick() {
      this.$emit("refresh");
      this.cashier.showCashier = false;
    },
    service() {
      window.location.href = `https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b97817351957717cdbb1fb3b53708374ba573672f4fb385cf664728f448ddbba361c3cf4aa02bfe2f013d383c44d38a81ff`;
    },
    refundback() {
      this.$refs.refund.inits();
      this.$emit("defrefresh");
    },
    errorCode() {
      this.passwordFlag = false;
      this.$refs.widthdrawpassword.value = "";
    },
    passwordSucceed() {
      this.$refs.Cashier.triggerPay(3);
    },
    passwordClose() {
      this.passwordFlag = false;
    },
    passwordOpen() {
      this.cashier.showCashier = false;
      this.passwordFlag = true;
    },
    save() {
      this.$refs.childEvaluation.save();
    },
    refundrefresh() {
      this.refund.showrefund = false;
      this.$emit("refresh");
    },
    evblock() {
      this.evaluation.showPicker = false;
      this.$emit("refresh");
      this.$refs.childEvaluation.reset();
    },
    cancelorder(item) {
      this.$confirm({
        title: "提示",
        message: "确定要取消该订单？"
      })
        .then(() => {
          postoperation({ orderType: 2, orderSn: item.orderSn, type: 7 }).then(
            (res) => {
              if (res && res.errorCode == 1) {
                this.$toast({
                  duration: 3000,
                  message: "订单已取消",
                  icon: "success"
                });
                setTimeout(() => {
                  this.$emit("refresh");
                }, 300);
              } else {
                this.$toast(res.msg);
              }
            }
          );
        })
        .catch(() => {});
    },
    deleteorder(item) {
      this.$confirm({
        title: "提示",
        message: "确定要删除该订单？"
      })
        .then(() => {
          postodelete({ orderType: 2, orderSn: item.orderSn, type: 10 }).then(
            (res) => {
              if (res && res.errorCode == 1) {
                this.$toast({
                  duration: 3000,
                  message: "订单已删除",
                  icon: "success"
                });
                setTimeout(() => {
                  this.$emit("refresh");
                }, 300);
              } else {
                this.$toast(res.msg);
              }
            }
          );
        })
        .catch(() => {});
    },
    cashierclick(item) {
      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      getShop({ shopId: item.shopId }).then((res) => {
        toast.clear();
        if (res.data.shopStatus != 1) {
          Dialog.alert({
            message: "当前店铺暂不支持购买。",
            showConfirmButton: false,
            closeOnClickOverlay: true
          });
          setTimeout(() => {
            Dialog.close();
          }, 2000);
          return;
        } else {
          this.cashier.showCashier = true;
          this.cashier.orderdata = {
            PayBillType: 2,
            ...item
          };
        }
      });
    },
    refundclick(item) {
      console.log(item);
      this.aftersaleType = 1;
      this.refund.showrefund = true;
      this.refund.refunddata = item;
      // this.$emit('orderrefresh')
    },
    Confirmclick(item) {
      let toast = this.$toast.loading({
        message: "",
        forbidClick: true
      });
      postoperation({
        orderSn: item.orderSn,
        type: 6,
        orderType: 2,
        orderItemId: item.orderId
      }).then((res) => {
        toast.clear();
        if (res && res.errorCode == 1) {
          this.$emit("refresh");
        }
      });
    },
    evaluationclick(item) {
      this.evaluation.data = item;
      this.evaluation.showPicker = true;
      this.$emit("orderrefresh");
    },
    addressChange(item) {},
    checkLogistics(item) {}
  }
};
</script>
<style scoped lang="scss">
.passwordBox {
  // height: 60vh;
  height: 380px;
  .cross {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
  }
}
.or_acntionbar {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
  span {
    display: flex;
  }
  .van-button {
    display: block;
    border-radius: 80px;
    padding: 8px 20px;
    text-align: center;
  }
  .contection {
    display: flex;
    font-size: 12px;
    margin-right: auto;
    align-items: center;
    color: red;

    .kefu {
      margin-right: 3px;
    }
  }
}
.refundDiv {
  display: flex;
  flex-direction: column;
}
</style>
