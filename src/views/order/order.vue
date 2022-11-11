<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="$router.push('/user')"
    />
    <!-- @click-left="$router.back()" -->

    <div
      class="van-tabs-fixed"
      style="padding: 0 19.55px; background-color: #fff"
    >
      <van-tabs v-model="activeName" @click="status" :ellipsis="false">
        <van-tab title="全部" name="0"></van-tab>
        <van-tab title="待付款" name="2"></van-tab>
        <van-tab title="待发货" name="4"></van-tab>
        <van-tab title="待收货" name="5"></van-tab>
        <van-tab title="待评论" name="6"></van-tab>
        <van-tab title="退换货" name="11"></van-tab>
      </van-tabs>
    </div>
    <div class="nodesdata" v-if="orderdata && orderdata.length == 0">
      <van-empty description="暂无数据" />
    </div>
    <div
      v-else
      class="orderreshbox"
      :style="{ height: !$route.meta.CLAPP ? '86.55%' : '93.4%' }"
    >
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        :disabled="orderrefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            v-for="(item, index) in orderdata"
            :key="index"
            class="ordergroupbox"
          >
            <!-- <van-cell :value="item.orderStatus | DLineartit" class="goodspu"> -->
            <van-cell
              v-if="activeName == 11"
              :value="
                item.orderItemVOList[0].itemRefundStatus | filterRefundStatus
              "
              class="goodspu"
            >
              <template #title>
                <div class="dp_hd">
                  <div class="dp_icon">
                    <img
                      :src="item.shopLogoImgUrl"
                      style="
                        width: 100%;
                        display: inline-block;
                        vertical-align: middle;
                      "
                      alt=""
                    />
                  </div>
                  <h5>{{ item.shopName }}</h5>
                </div>
              </template>
            </van-cell>

            <van-cell
              v-else
              :value="item.orderStatus | DLineartit"
              class="goodspu"
            >
              <template #title>
                <div class="dp_hd">
                  <div class="dp_icon">
                    <img
                      :src="item.shopLogoImgUrl"
                      style="
                        width: 100%;
                        display: inline-block;
                        vertical-align: middle;
                      "
                      alt=""
                    />
                  </div>
                  <h5>{{ item.shopName }}</h5>
                </div>
              </template>
            </van-cell>
            <!-- {{item.orderItemVOList}} -->

            <van-card
              v-for="order in item.orderItemVOList"
              :key="order.shopId"
              @click="orederdetails(order.orderSn, order.itemStatus, item)"
              class="ordercard"
              :num="order.buyNum"
              :desc="order.goodsSkuName"
              :title="order.goodsName"
              :thumb="order.goodsLogoImgUrl"
              styl
              e="margin-top:0px;"
            >
              <template #price>
                <div class="price-box">
                  <span class="van-card__price-currency">¥</span>
                  <template
                    v-if="order.canVoucherMoney && order.voucherMoneyType == 2"
                  >
                    <!-- <span class="van-card__price-integer">{{ order.itemVoucherPayMoney }}</span> -->
                    <span class="van-card__price-integer">{{
                      order.goodsVoucherPayMoney
                    }}</span>
                    <div>
                      <span class="dyjico">{{ order.goodsVoucherMoney }}</span>
                    </div>
                  </template>
                  <template v-else>
                    <span class="van-card__price-integer">{{
                      parseFloat(order.goodsPrice).toFixed(2)
                    }}</span>
                  </template>
                  <span class="order-status">{{
                    order.itemRefundStatus | filterRefundStatus
                  }}</span>
                </div>
              </template>
              <template #tags>
                <span class="van-card__desc van-ellipsis"
                  >运费：
                  <template v-if="order.itemFreightMoney == 0">免邮</template>
                  <template v-else-if="order.itemFreightMoney > 0">{{
                    order.itemFreightMoney
                  }}</template>
                </span>
              </template>
            </van-card>
            <div class="ordertotal">
              <p
                v-if="
                  (item.orderStatusValue & 0x1) > 0 && item.orderStatus == 34
                "
                style="margin-bottom: 5px; font-weight: 400; color: red"
              >
                待用户确认
              </p>
              <span class="total"
                >总价 <span class="f12">￥</span>
                {{ totalPrice(item.orderItemVOList) }}
              </span>
              <span
                v-if="item.orderItemVOList[0].itemDiscountMoney > 0"
                class="total"
                >, 优惠<span class="f12">￥</span
                >{{ item.orderItemVOList[0].itemDiscountMoney }}</span
              >
              <template v-if="item.canUseCoupon">
                <span style="font-weight: 400; color: #999">, 优惠</span>
                <span class="f12" style="font-weight: 400; color: #999"
                  >￥</span
                >
                <span style="font-weight: 400; color: #999">{{
                  item.couponAmount
                }}</span>
              </template>
              <template v-if="item.orderStatus == 2">
                , 需付款<span class="f12">￥</span
                >{{ item.canUseCoupon ? item.promotionAmount : item.payMoney }}
              </template>
              <template
                v-if="
                  item.orderStatus == 4 ||
                  item.orderStatus == 5 ||
                  item.orderStatus == 6 ||
                  item.orderStatus == 7 ||
                  item.orderStatus == 11
                "
              >
                , 实付款<span class="f12">￥</span>
                <!-- <template
                  v-if="item.canVoucherMoney && item.voucherMoneyType == 2"
                >
                  {{ item.voucherPayMoney }}
                </template>
                <template v-else>
                  {{ item.payMoney }}
                </template> -->
                {{ item | orderTotalMoney }}
              </template>
            </div>
            <div class="footerbtn">
              <Orderbar
                :OrderListBar="item"
                :resultPayMoney="item | orderTotalMoney"
                @refresh="onRefresh"
                @orderrefresh="onorderrefresh"
                @defrefresh="ondefrefresh"
                @click="console.log(88)"
              />
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <router-view></router-view>
  </router-layout>
</template>
<script>
import { getsOrderSimple, getShop } from "api";
import Orderbar from "@/components/goods/orderbar";
import { accAdd, accMul } from "@/utils/dom";
import { Col } from "vant";
export default {
  name: "order",
  data() {
    return {
      shopInfo: null,
      winheight: document.documentElement.clientHeight,
      activeName: this.$route.query.type == 0 ? "" : this.$route.query.type,
      orderStatus: 2,
      orderdata: [],
      loading: false, // 加载状态
      finished: false, // 是否加载
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页条数
      refreshing: false,
      orderrefresh: false,
      refund: {
        refunddata: {},
        showrefund: false
      },
      aftersaleType: "" //售后类型,
    };
  },
  filters: {
    DLineartit(id) {
      let data = "";
      switch (id) {
        case 2:
          data = "等待买家付款";
          break;
        case 3:
          data = "等待买家付款";
          break;
        case 4:
          data = "买家已付款";
          break;
        case 5:
          data = "卖家已发货";
          break;
        case 6:
          data = "交易成功";
          break;
        case 7:
          data = "支付超时,交易关闭";
          break;
        case 10:
          data = "交易完成";
          break;
        case 11:
          data = "售后中";
          break;
        case 12:
          data = "已退款";
          break;
        case 15:
          data = "交易完成";
          break;
      }
      return data;
    },
    filterRefundStatus(type) {
      let text = "";
      switch (type) {
        case 1:
          text = "商家已同意";
          break;
        case 2:
          text = "退款失败";
          break;
        case 3:
          text = "待商家同意";
          break;
        case 4:
          text = "";
          break;
        case 25:
          // 待退货
          text = "待退货";
          break;
        case 26:
          // 退货中
          text = "退货中";
          break;
        case 27:
          // 商家拒绝
          text = "退货失败";
          break;
        case 28:
          // 商家收货
          text = "已退款";
          break;
      }
      // if(orderdata.orderStatus==6){
      //   text = ''

      // }
      return text;
    },
    orderTotalMoney(item) {
      const {
        canUseCoupon,
        promotionAmount,
        canVoucherMoney,
        voucherMoneyType,
        voucherPayMoney,
        payMoney
      } = item || {};

      if (canUseCoupon) {
        return promotionAmount;
      }

      if (canVoucherMoney && voucherMoneyType == 2) {
        return voucherPayMoney;
      }

      return payMoney;
    }
  },
  components: {
    Orderbar
    // Refund
  },
  methods: {
    accAdd: accAdd,
    totalPrice(arr) {
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].voucherMoneyType == 2) {
          sum = accAdd(sum, accMul(arr[i].goodsVoucherPayMoney, arr[i].buyNum));
        } else {
          sum = accAdd(sum, accMul(arr[i].goodsPrice, arr[i].buyNum));
        }
        if (arr[i].itemFreightMoney) sum = accAdd(sum, arr[i].itemFreightMoney);
      }
      return sum;
    },
    ondefrefresh() {
      this.orderrefresh = false;
    },
    onorderrefresh() {
      this.orderrefresh = true;
    },
    orederdetails(orderSn, itemStatus, item) {
      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      getShop({ shopId: item.shopId }).then((res) => {
        this.shopInfo = res.data;
        toast.clear();
        this.$router.push({
          path: `/user/order/${orderSn}/-10000`,
          query: {
            itemStatus,
            shopInfo: this.shopInfo
          }
        });
      });
    },
    evblock() {
      this.onRefresh();
    },
    onRefresh() {
      this.orderrefresh = false;
      this.pageNum = 1;
      this._getsOrderSimple();
    },
    onLoad() {
      this.pageNum += 1;
      // this.loading = true
      this._getsOrderSimple(true);
    },
    status(index) {
      this.activeName = index === "0" ? null : index;
      this.pageNum = 1;
      this._getsOrderSimple();
    },
    accSub(arg1, arg2) {
      if (isNaN(arg1)) {
        arg1 = 0;
      }
      if (isNaN(arg2)) {
        arg2 = 0;
      }
      arg1 = Number(arg1);
      arg2 = Number(arg2);

      var r1, r2, m, n;
      try {
        r1 = arg1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
      n = r1 >= r2 ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    _getsOrderSimple(more) {
      let seft = this;
      let toast = "";
      if (!more) {
        toast = seft.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
      }
      getsOrderSimple({
        itemStatus: seft.activeName,
        pageNum: seft.pageNum,
        pageSize: seft.pageSize
      }).then((res) => {
        console.log(res, "getsOrderSimple.res");
        if (res && res.errorCode === 1) {
          seft.loading = false;
          seft.refreshing = false;
          if (more) {
            if (res.data.content.length > 0) {
              seft.orderdata = seft.orderdata.concat(res.data.content);
              seft.loading = !res.data.isHasNextPage;
              seft.finished = !res.data.isHasNextPage;
            } else {
              seft.loading = !res.data.isHasNextPage;
              seft.finished = !res.data.isHasNextPage;
            }
          } else {
            toast.clear();
            seft.loading = !res.data.isHasNextPage;
            seft.finished = !res.data.isHasNextPage;
            seft.orderdata = res.data.content;
          }
        } else {
          seft.finished = true;
          seft.finishedText = "- 没有更多了-";
        }
      });
    },
    // refundclick (item) {
    //   this.aftersaleType = 1
    //   this.refund.showrefund = true
    //   this.refund.refunddata = item
    //   this.$emit('orderrefresh')
    // },
    refundback() {
      this.$refs.refund.inits();
      this.$emit("defrefresh");
    },
    refundrefresh() {
      this.refund.showrefund = false;
      this.$emit("refresh");
    }
  },
  mounted() {
    this._getsOrderSimple();
  },
  created() {
    const { platform } = this.$route.query;
    if (platform == "0" && LukeappApi.IscltApp()) {
      LukeappApi.lukeapp({
        type: "set_payResult",
        data: {
          payResult: 0
        }
      });
    }
  },
  watch: {
    $route(_, { name }) {
      if (name === "orderdetails") {
        this.onRefresh();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.van-cell {
  padding: 0;
}
.van-pull-refresh {
  min-height: 100%;
}
.ordergroupbox {
  padding: 0 15px;
  border-radius: 10px;
  margin: 10px;
  overflow: hidden;
  background: #fff;
  padding-bottom: 5px;
  position: relative;
  .van-hairline--top-bottom::after {
    border: none;
  }
  .footerbtn {
    margin-top: 15px;
    z-index: 9999999;
  }
}

.f12 {
  font-size: 12px;
}
.ordercard.van-card {
  background: #fff;
  padding: 10px 0;
  .van-card__content {
    position: relative;
    flex-flow: initial;
    .van-card__desc {
      color: #999;
    }
    .van-card__bottom {
      margin-left: 20px;
      display: flex;
      flex-flow: column;
      align-items: flex-end;
    }
  }
  .van-card__footer {
    .ordertotal {
      font-size: 14px;
      color: #000;
      font-weight: 550;
      .total {
        color: #999;
        font-weight: 400;
      }
    }
  }
  .order-status {
    position: absolute;
    right: 0px;
    bottom: 10px;
  }
}
.ordertotal {
  text-align: right;
  font-size: 14px;
  color: #000;
  font-weight: 550;
  .total {
    color: #999;
    font-weight: 400;
  }
}
.goodspu {
  padding-top: 10px;
  .dp_hd {
    width: 220px;
    height: 24px;
    overflow: hidden;
    line-height: 24px;
    display: flex;
    align-items: center;
    .dp_icon {
      width: 20px;
      height: 20px;
      display: flex;
      flex-shrink: 0;
      flex-grow: 0;
      margin-right: 5px;
    }
    h5 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .van-cell__value {
    // color: rgb(255, 80, 0);
    color: #cb0d0d;
    font-size: 12px;
    font-weight: 550;
  }
}
.goodspu::after {
  border-bottom: 0;
}
.orderreshbox {
  height: 86.55%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.van-card__price {
  text-align: right;
}
.s {
  border-radius: 60px;
  width: 80px;
  height: 30px;
}

.box-text {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
