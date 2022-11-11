<template>
  <router-layout class="orderdetaibox">
    <div v-if="orderdata && Object.keys(orderdata).length > 0">
      <div class="or_hd">
        <van-nav-bar
          :title="$route.meta.title"
          v-if="!$route.meta.CLAPP"
          left-arrow
          @click-left="$router.back()"
        />
        <div class="oredheaderbox">
          <div :class="orderdata.orderStatus == 7 ? 'DLinear' : 'DLinear-copy'">
            <span>{{ orderdata.orderStatus | DLineartit }}</span>
            <span class="DTextView" v-if="orderdata.orderStatus == 2">{{
              orderdata.stayPayTitle
            }}</span>
            <span class="DTextView" v-if="orderdata.orderStatus == 7">{{
              orderdata.updateTime
            }}</span>
          </div>
          <div class="TImageView">
            <div class="imgico" :class="`icobg${orderdata.orderStatus}`"></div>
          </div>
        </div>
      </div>

      <div class="detailbox">
        <!-- 物流部分 -->
        <div v-if="orderdata.orderStatus == 5 || orderdata.orderStatus == 6">
          <div
            @click="
              $router.push({
                name: 'steps',
                query: { expId: orderdata.expId, expSn: orderdata.expSn }
              })
            "
            class="van-cell van-cell--center van-cell--borderless van-contact-card van-contact-card--edit logistics"
          >
            <img src="@/assets/image/common/step.png" class="setico" />
            <div
              class="van-cell__value van-cell__value--alone van-contact-card__value"
            >
              <div>{{ orderdata.exInfo }}</div>
            </div>
            <i class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
          </div>
          <div style="height: 10px"></div>
        </div>
        <!-- 收件人部分 -->
        <div
          class="van-cell van-cell--center van-cell--borderless van-contact-card van-contact-card--edit logistics"
        >
          <van-icon class="mapico" name="location" size="16" />
          <div
            class="van-cell__value van-cell__value--alone van-contact-card__value"
          >
            <div>
              {{ orderdata.consigneeName }}：{{ orderdata.consigneeMobile }}
            </div>
            <div>
              {{ orderdata.consigneeProvince }}{{ orderdata.consigneeCity
              }}{{ orderdata.consigneeCounty }}{{ orderdata.consigneeAddress }}
            </div>
          </div>
        </div>
        <div style="height: 10px"></div>
        <!-- 店铺购买商品信息部分 -->
        <div style="border-radius: 10.5px; overflow: hidden">
          <van-cell-group @click="handleJumpShops">
            <van-cell>
              <div style="float: left; width: 30px">
                <div
                  :style="'width:24px;height:24px;overflow:hidden;line-height:24px;float:left'"
                >
                  <img
                    alt=""
                    :src="orderdata.shopLogoImgUrl"
                    style="
                      width: 100%;
                      display: inline-block;
                      vertical-align: middle;
                    "
                  />
                </div>
              </div>
              <h5 style="width: calc(100% - 40px); float: left">
                {{ orderdata.shopName }}
              </h5>
            </van-cell>
          </van-cell-group>
          <div v-for="item in orderdata.orderItemVOList" :key="item.shopId">
            <van-card
              class="ordercard"
              :num="item.buyNum"
              :desc="item.goodsSkuName"
              :title="item.goodsName"
              :thumb="item.goodsLogoImgUrl"
              style="margin-top: 0px; background: #fff"
              @click="handleJumpGoods(item)"
            >
              <template #tags>
                <div class="m">
                  <!-- <span v-if="item.refundStatus == 1" style="color: #fc0000">退款成功</span>
                      <span v-else-if="item.refundStatus == 2">退款失败</span>
                      <span v-else-if="item.refundStatus == 3">审核中</span> -->

                  <!-- <van-button
                    class="s"
                    @click="dumpToDetail(item, 'refuse')"
                    v-if="item.itemRefundStatus == 2"
                    >退款失败</van-button
                  > -->
                  <van-button
                    class="s"
                    @click.stop="refundclick1(item)"
                    v-if="item.itemStatus == 4"
                    >退款</van-button
                  >
                  <!-- <van-button
                    class="s"
                    @click="dumpToDetail(item, 'refuse')"
                    v-else-if="item.itemRefundStatus == 2"
                    >退款失败</van-button
                  > -->
                  <van-button
                    class="s"
                    @click.stop="dumpToDetail(item, 'refuse')"
                    v-else-if="item.itemRefundStatus == 2"
                    >退款失败</van-button
                  >
                  <van-button
                    class="s"
                    @click.stop="dumpToDetail(item)"
                    v-else-if="item.itemRefundStatus == 3"
                    >待商家同意</van-button
                  >
                  <!-- <van-button class="s" v-else-if="item.itemRefundStatus == 4"
                    >撤销</van-button
                  > -->
                  <!-- <van-button
                    class="ms"
                    @click.stop="refundclick(item)"
                    v-else-if="item.itemStatus == 12"
                  ></van-button> -->
                  <van-button
                    class="s"
                    @click.stop="dumpToDetail(item, 'waitExit')"
                    v-else-if="item.itemRefundStatus == 1"
                    >同意申请</van-button
                  >
                  <van-button
                    class="s"
                    @click.stop="dumpToDetail(item, 'dai')"
                    v-else-if="item.itemRefundStatus == 25"
                    >待退货</van-button
                  >
                  <van-button
                    class="s"
                    @click.stop="dumpToDetail(item, 'tui')"
                    v-else-if="item.itemRefundStatus == 26"
                    >退货中</van-button
                  >
                  <van-button
                    class="s"
                    @click.stop="dumpToDetail(item, 'failed')"
                    v-else-if="item.itemRefundStatus == 27"
                    >退货失败</van-button
                  >
                  <van-button
                    class="s"
                    @click.stop="dumpToDetail(item, 'success')"
                    v-else-if="item.itemRefundStatus == 28"
                    >已退款</van-button
                  >
                  <!-- 退款中: 点击跳转退款详情界面 -->
                  <van-button
                    class="s"
                    @click.stop="dumpToDetail(item)"
                    v-else-if="item.itemStatus == 11"
                    >售后中</van-button
                  >
                  <!-- <van-button
                    class="s"
                    @click="refundclick1(item)"
                    v-else-if="item.itemStatus == 4"
                    >退款</van-button
                  > -->
                  <van-button
                    class="s"
                    @click.stop="refundclick(item)"
                    v-else-if="item.itemStatus == 5"
                    >申请售后</van-button
                  >
                  <van-button
                    class="s"
                    @click.stop="refundclick(item)"
                    v-else-if="item.itemStatus == 6"
                    >申请售后</van-button
                  >
                </div>
              </template>
              <template #price>
                <template
                  v-if="item.canVoucherMoney && orderdata.voucherMoneyType == 2"
                >
                  <span class="van-card__price-currency">¥</span>
                  <span class="van-card__price-integer">{{
                    parseFloat(item.goodsVoucherPayMoney).toFixed(2)
                  }}</span>
                  <span
                    class="dyjico"
                    v-show="item.canVoucherMoney && item.goodsVoucherMoney"
                    >{{ item.goodsVoucherMoney }}</span
                  >
                </template>
                <template v-else>
                  <span class="van-card__price-currency">¥</span>
                  <span class="van-card__price-integer">{{
                    parseFloat(item.goodsPrice).toFixed(2)
                  }}</span>
                </template>
              </template>
            </van-card>
          </div>
          <div class="cardbox" v-if="orderdata.orderItemVOList">
            <div class="cardlist">
              <div class="item fx1">商品总价</div>
              <span class="item"
                ><span class="van-card__price-currency">¥</span>
                <!-- <span class="van-card__price-integer" v-if="orderdata.voucherMoneyType==2">
    
              {{accAdd(orderdata.couponAmount,orderdata.voucherPayMoney)}}
                </span>
                <span class="van-card__price-integer" v-else>{{
                  orderdata.goodsMoney
                }}</span> -->
                <span class="van-card__price-integer">{{
                  totalPrice(orderdata.orderItemVOList)
                }}</span>
              </span>
            </div>
            <div class="cardlist">
              <div class="item fx1">运费</div>
              <span class="item" v-if="orderdata.freightMoney == 0"
                ><span class="van-card__price-currency">免运费</span></span
              >
              <span class="item" v-if="orderdata.freightMoney > 0"
                ><span class="van-card__price-currency">¥</span
                ><span class="van-card__price-integer">{{
                  orderdata.freightMoney
                }}</span></span
              >
            </div>
            <div
              class="cardlist carbig"
              v-show="orderdata.voucherMoneyType == 2"
              style="font-size: 13px"
            >
              <div class="item fx1">抵用金</div>
              <span class="item" style="color: #cb0d0d">
                <span class="van-card__price-integer"
                  >-{{ orderdata.voucherMoney }}</span
                >
              </span>
            </div>
            <div
              class="cardlist"
              v-if="orderdata.canUseCoupon && orderdata.orderStatus != 2"
            >
              <div class="item fx1">优惠</div>
              <p style="color: #cb0d0d; font-size: 12px">
                -￥{{ orderdata.couponAmount }}
              </p>
            </div>
            <div class="cardlist carbig">
              <div
                class="item fx1"
                style="
                  text-align: end;
                  padding-right: 10px;
                  font-weight: 500;
                  font-size: 16px;
                  color: #000;
                "
              >
                实付款
              </div>
              <span class="item" style="color: #ee0a24">
                <span class="van-card__price-currency">¥</span>
                <!-- <span
                  class="van-card__price-integer"
                  v-if="orderdata.voucherMoneyType == 2"
                  >{{
                    orderdata.orderStatus == 7 ? 0 : orderdata.voucherPayMoney
                  }}</span
                >
                <span class="van-card__price-integer" v-else>{{
                  orderdata.orderStatus == 7 ? 0 : orderdata.payMoney
                }}</span> -->
                <span class="van-card__price-integer">{{ calcRealPay }}</span>
              </span>
            </div>
            <div
              v-if="
                orderdata.orderStatus == 34 &&
                (orderdata.orderStatusValue & 0x1) > 0
              "
              class="refundDiv"
            >
              <span class="van-card__price-integer" style="color: red"
                >商家退款原因：</span
              >
              <span
                style="font-size: 14px; letter-spacing: 1px; margin-top: 3px"
              >
                {{ orderdata.applyRefundMerchantRemark }}
              </span>
            </div>
          </div>
        </div>
        <!-- 订单信息部分 -->
        <div style="height: 10px"></div>
        <div class="cardbox oedernews">
          <div class="headtit">订单详情</div>
          <div class="cardlist">
            <div class="item fx1">订单编号：</div>
            <span class="item" style="flex: 2"
              ><span class="van-card__price-integer">{{
                orderdata.showSn
              }}</span></span
            >
            <span style="color: #bb0000" @click="copy(orderdata.showSn)"
              >复制</span
            >
          </div>
          <div class="cardlist">
            <div class="item fx1">订单备注：</div>
            <span class="item" style="flex: 2.3"
              ><span class="van-card__price-integer">{{
                orderdata.remark
              }}</span></span
            >
          </div>
          <div class="cardlist">
            <div class="item fx1">下单时间：</div>
            <span class="item" style="flex: 2.3"
              ><span class="van-card__price-integer">{{
                orderdata.createTime
              }}</span></span
            >
          </div>
          <div class="contact-node">
            <div class="view">
              <van-icon
                class="iconimg"
                name="chat-o"
                size="20"
                color="#CB0D0D"
              />
              <span class="txt">联系客服</span>
              <a class="phone" :href="'tel:' + orderdata.sellerPhone"></a>
            </div>
          </div>
        </div>
        <!-- <div class="contact-node">
          <div class="view" @click="copy(orderdata.showSn)">
            <van-icon class="iconimg" name="coupon-o" size="20" color="#1989fa" />
            <span class="txt">复制订单号</span>
            <div class="line"></div>
          </div>
          <div class="view">
            <van-icon class="iconimg" name="phone-o" size="20" color="#1989fa" />
            <span class="txt">联系卖家</span>
            <a class="phone" :href="'tel:' + orderdata.sellerPhone"></a>
          </div>
        </div> -->
      </div>

      <!-- v-if="item.itemStatus==11" -->

      <div class="footer_order">
        <Orderbar :OrderListBar="orderdata" @refresh="onRefresh" />
      </div>
      <div style="height: 60px"></div>
    </div>
    <!-- 退款 -->
    <van-popup
      get-container="body"
      v-model="refund.showrefund1"
      position="bottom"
      :style="'height:' + winheight + 'px;background:#f7f8fa;'"
    >
      <van-nav-bar
        title="退款"
        left-arrow
        @click-left="
          refundback();
          refund.showrefund1 = false;
        "
      />
      <Refund
        :refunddta="refund.refunddata"
        ref="refund"
        :aftersaleType="aftersaleType"
        :refundrefresh="refundrefresh"
      />
    </van-popup>
    <van-popup
      get-container="body"
      v-model="refund.showrefund"
      position="bottom"
      :style="'height:' + winheight + 'px;background:#f7f8fa;'"
    >
      <van-nav-bar
        title="售后服务"
        left-arrow
        @click-left="
          refundback();
          refund.showrefund = false;
        "
      />
      <Sales
        :refunddta="refund.refunddata"
        :orderdata="orderdata"
        @revok="revok"
        :isRemodify="isRemodify"
        @modifyOrder="modifyOrder"
        ref="refund"
        :aftersaleType="aftersaleType"
        :refundrefresh="refundrefresh"
      />
    </van-popup>
    <!-- 退款详情 -->
    <van-popup
      get-container="body"
      v-model="refund.showrefundDetail"
      position="bottom"
      :style="'height:' + winheight + 'px;background:#f7f8fa;'"
    >
      <van-nav-bar
        title="售后详情"
        left-arrow
        @click-left="
          refundback();
          refund.showrefundDetail = false;
        "
      />
      <v-exchange
        :refunddta="refund.refunddata"
        ref="refund"
        :aftersaleType="aftersaleType"
        :exangeType="exangeType"
        @revok="revok"
        @anew="anew"
        @modifyOrder="modifyOrder"
        :refundrefresh="refundrefresh"
      ></v-exchange>
    </van-popup>

    <!-- 退款详情 -->

    <!-- <van-popup get-container="body" v-model="refund.showrefundDetail" position="bottom" :style="'height:'+(winheight)+'px;background:#f7f8fa;'">
        <van-nav-bar title="换货详情" left-arrow @click-left="refundback(); $router.go(-1)"  />
        <Fordetails  :refunddta="refund.refunddata" ref="refund" :aftersaleType="aftersaleType" :exangeType="exangeType" @revok="revok" @modifyOrder="modifyOrder" :refundrefresh="refundrefresh"></Fordetails>
      </van-popup>
     -->
    <router-view></router-view>
  </router-layout>
</template>
<script>
import { postgetOrder, getGoodsInfo } from "api";
import { accAdd } from "@/utils/dom";
import Orderbar from "@/components/goods/orderbar";
import Refund from "@/components/goods/refund";
import Sales from "@/components/goods/sales";
import vExchange from "@/components/goods/exchange.vue";
import { accMul } from "@/utils/dom.js";
import { Dialog } from "vant";
// import Fordetails from '@/components/goods/fordetails.vue'

export default {
  name: "sales",
  data() {
    return {
      winheight: document.documentElement.clientHeight,
      orderdata: {},
      refund: {
        refunddata: {},
        showrefund: false,
        showrefund1: false,
        showrefundDetail: false
      },
      aftersaleType: "", //售后类型
      exangeType: 1,
      isRemodify: false, // 修改申请标识字段， 用来判断是否进入退货退款，且获取售后单详情
      snType: null,
      orderSn: null
    };
  },
  computed: {
    calcRealPay() {
      const {
        voucherMoneyType,
        canUseCoupon,
        promotionAmount,
        voucherPayMoney,
        payMoney
      } = this.orderdata;

      if (canUseCoupon) {
        return promotionAmount;
      }

      if (voucherMoneyType === 2) {
        return voucherPayMoney;
      }

      return payMoney;
    }
  },
  components: {
    Orderbar,
    Refund,
    Sales,
    vExchange
    // Fordetails,
    // Returnlogistics
  },
  filters: {
    DLineartit(id) {
      let data = "";
      switch (id) {
        case 2:
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
    reallyPayMoney(orderdata) {
      const {
        canUseCoupon,
        promotionAmount,
        voucherMoneyType,
        orderStatus,
        voucherPayMoney,
        payMoney
      } = orderdata || {};

      if (canUseCoupon) {
        return promotionAmount;
      }

      if (orderStatus === 7) {
        return 0;
      }

      if (voucherMoneyType === 2) {
        return voucherPayMoney;
      }

      return payMoney;
    }
  },
  created() {
    this._postgetOrder();
    // this._getsOrderSimple()
    // if (this.$route.query.show === 'true' && this.$route.query.itemStatus == 11) {
    //   this.refund.showrefundDetail = true
    // }
  },

  methods: {
    handleJumpShops() {
      if (
        this.$route.query.shopInfo === null ||
        this.$route.query.shopInfo.shopStatus === 3
      ) {
        Dialog.alert({
          message: "当前店铺已注销",
          showConfirmButton: false,
          closeOnClickOverlay: true
        });
      } else {
        this.$router.push({
          path: `/shopinfo/${this.orderdata.shopId}`
        });
      }
    },
    handleJumpGoods(item) {
      if (
        this.$route.query.shopInfo === null ||
        this.$route.query.shopInfo.shopStatus === 3
      ) {
        Dialog.alert({
          message: "当前店铺已注销",
          showConfirmButton: false,
          closeOnClickOverlay: true
        });
      } else {
        this.$router.push({
          path: `/detail/${item.goodsId}`,
          query: {
            agencyUnionid: item.agencyUnionid
          }
        });
      }
    },
    accAdd: accAdd,
    accMul: accMul,
    anew() {
      this.refund.showrefund = true;
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
    totalPrice(arr) {
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].voucherMoneyType == 2) {
          sum = accAdd(sum, accMul(arr[i].goodsVoucherPayMoney, arr[i].buyNum));
        } else {
          sum = accAdd(sum, accMul(arr[i].goodsPrice, arr[i].buyNum));
        }
      }
      return sum;
    },
    copy(item) {
      let oInput = document.createElement("input");
      oInput.value = item;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$toast("订单号复制成功");
      oInput.remove();
    },
    onRefresh() {
      this.$router.back();
    },
    //  orederdetails (orderSn) {
    //   this.$router.push('/user/orederdetails/' + orderSn)

    // },
    // 获取订单详情
    _postgetOrder() {
      window.localStorage.removeItem("isInit_refund");
      const { snType, orderSn } = this;
      postgetOrder({ orderSn, snType }).then((res) => {
        if (res && res.errorCode == 1) {
          // if (this.$route.query.itemStatus == 11) {
          //   this.refund.showrefundDetail = true
          //   res.data.orderItemVOList.forEach(item => {
          //     if (item.itemStatus == this.$route.query.itemStatus) {
          //       this.refund.refunddata = item

          //     }
          //   })
          // }
          this.orderdata = res.data;
          //  console.log(this.orderdata);
          // 缓存getOrder接口返回的数据
          localStorage.setItem("getOrderData", JSON.stringify(this.orderdata));
        }
      });
    },

    refundclick(item) {
      this.aftersaleType = 2;
      this.refund.showrefund = true;
      this.refund.refunddata = item;
    },

    refundclick1(item) {
      this.aftersaleType = 1;
      this.refund.showrefund1 = true;
      this.refund.refunddata = item;
      // this.$emit('orderrefresh')
    },
    refundback() {
      this.$refs.refund.inits();
      if (this.$route.query.itemStatus == 11) {
        this.$router.go(-1);
      }
      // this.$emit('defrefresh')
      // if(orderdata.orderStatus==11){
      //   this.$router.go(-1)
      // }
    },
    refundrefresh() {
      this.refund.showrefund = false;
      this.$emit("refresh");
    },
    revok() {
      this.refund.showrefund = false;
    },
    // 跳转至退款详情界面
    dumpToDetail(item, type) {
      // this.aftersaleType==1?'退款':'退货退款'

      if (type == "waitExit") {
        this.exangeType = 2;
      } else if (type == "failed") {
        this.exangeType = 6;
      } else if (type == "success") {
        this.exangeType = 5;
      } else if (type == "tui") {
        this.exangeType = 3;
      } else if (type == "dai") {
        this.exangeType = 2;
      } else if (type == "refuse") {
        this.exangeType = 7;
      }

      this.aftersaleType = 1;
      this.refund.showrefundDetail = true;
      this.refund.refunddata = item;
    },
    modifyOrder(isRemodify, title) {
      this.isRemodify = isRemodify;
      this.refund.showrefundDetail = false;
      if (title == "申请退货退款") {
        this.refund.showrefund = true;
      } else {
        this.refund.showrefund1 = true;
      }
    }
  },
  watch: {
    $route: {
      handler({ params: { snType, id } }) {
        this.snType = snType === "-10000" ? undefined : snType;
        this.orderSn = id;
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.ms {
  display: none !important;
}
// .or_acntionbar .van-button[data-v-17b9f0a4]{
//   margin-right: 10px;
// }
.orderdetaibox {
  .icobg2 {
    background-image: url(~@/assets/image/common/waitpays.png);
  }
  .icobg4 {
    background-image: url(~@/assets/image/common/no_deliver.png);
  }
  .icobg5 {
    background-image: url(~@/assets/image/common/deliver.png);
  }
  .icobg6,
  .icobg10,
  .icobg15 {
    background-image: url(~@/assets/image/common/success.png);
  }
  .icobg7 {
    background-image: url(~@/assets/image/common/falie.png);
  }
  .icobg11,
  .icobg12 {
    background-image: url(~@/assets/image/common/after_sale.png);
  }
  .or_hd {
    // background: linear-gradient(to right, rgb(255, 144, 0), rgb(255, 80, 0))
    //   center center / cover no-repeat;
    background: url(~@/assets/image/common/order_bg.png) center center / cover
      no-repeat;
    height: 177px;
    :deep(.van-nav-bar__title),
    :deep(.van-nav-bar .van-icon),
    :deep(.van-nav-bar__text) {
      color: #fff;
    }
    .van-nav-bar {
      background: none;
    }
  }
  .detailbox {
    width: 96%;
    margin: -46.875px auto 0 auto;
  }
  .logistics {
    border-radius: 10.5px;
  }
  .van-contact-card::before {
    background: none;
  }
  .van-hairline--top-bottom::after,
  .van-hairline--bottom::after {
    border: none;
  }
  .mapico {
    background-color: #fc0000;
    border-radius: 100%;
    padding: 6px;
    color: #fff;
    margin-right: 5.625px;
  }
  .oredheaderbox {
    height: 100px;
    position: relative;
    .DLinear {
      font-size: 16px;
      color: #fff;
      display: flex;
      overflow: hidden;
      position: absolute;
      left: 0px;
      top: 30.5px;
      height: auto;
      // margin-left: 44.16px;
      margin-left: 29.1px;
      flex-direction: column;
      width: 176.64px;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
    }
    .DLinear-copy {
      font-size: 16px;
      color: #fff;
      display: flex;
      overflow: hidden;
      position: absolute;
      left: 0px;
      // top: 30.5px;
      top: 45px;
      height: auto;
      margin-left: 29.1px;
      flex-direction: column;
      width: 176.64px;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
    }
    .TImageView {
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      overflow: hidden;
      position: absolute;
      height: 100px;
      // margin-left: 226.32px;
      margin-left: 275.7px;
      visibility: visible;
      width: 150px;
      .imgico {
        width: 40%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
      }
    }
    .DTextView {
      margin-top: 10px;
      font-size: 12px;
    }
  }
  .oedernews {
    border-radius: 10.5px;
  }
  .cardbox {
    background: #fff;
    padding: 10px;

    .headtit {
      font-size: 16px;
      margin: 10px 5px 15px 5px;
    }
    .cardlist {
      display: flex;
      font-size: 14px;
      padding: 6px;

      .van-card__price-currency {
        font-size: 12px;
      }
      .van-card__price-integer {
        font-size: 14px;
      }
      .fx1 {
        flex: 1;
      }
    }
    .carbig {
      font-size: 16px;
      .van-card__price-currency {
        font-size: 12px;
      }
      .van-card__price-integer {
        font-size: 18px;
      }
    }
  }
  .footer_order {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 10px;
    background: #fff;
    z-index: 9;
    width: 100%;
    padding-top: 10px;
    padding-right: 10px;
  }
  .contact-node {
    margin-top: 15px;
    border-top: 1px solid #ebebeb;
    display: flex;
    background-color: rgb(255, 255, 255);
    font-size: 14px;
    .view {
      padding: 12px 0;
      flex: 1 1 0%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      a {
        color: rgb(102, 102, 102);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .iconimg {
        margin-right: 5px;
      }
      .tit {
        font-size: 14px;
        color: #666;
      }
      .line {
        width: 1px;
        height: 30px;
        background-color: rgb(229, 229, 229);
        position: absolute;
        right: 0rem;
      }
      .phone {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
  }
  .setico {
    width: 28px;
    height: 28px;
  }
}
.s {
  border-radius: 14px;
  // width: 90px;
  height: 30px;
  background: #ffffff;
  color: #666;
}
.m {
  display: flex;
  justify-content: flex-end;
}
.refundDiv {
  display: flex;
  flex-direction: column;
}
</style>
