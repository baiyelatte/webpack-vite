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
          <div class="DLinear">
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
      <div v-if="orderdata.orderStatus == 5 || orderdata.orderStatus == 6">
        <div
          @click="
            $router.push({
              name: 'steps',
              query: { expId: orderdata.expId, expSn: orderdata.expSn }
            })
          "
          class="van-cell van-cell--center van-cell--borderless van-contact-card van-contact-card--edit"
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
      <div
        class="van-cell van-cell--center van-cell--borderless van-contact-card van-contact-card--edit"
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
      <van-cell-group>
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
      <!-- v-if="item.itemStatus==11" -->
      <div v-for="item in orderdata.orderItemVOList" :key="item.shopId">
        <van-card
          class="ordercard"
          :num="item.buyNum"
          :desc="item.goodsSkuName"
          :title="item.goodsName"
          :thumb="item.goodsLogoImgUrl"
          style="margin-top: 0px"
        >
          <template #tags>
            <div class="m">
              <!-- <span v-if="item.refundStatus == 1" style="color: #fc0000">退款成功</span>
                  <span v-else-if="item.refundStatus == 2">退款失败</span>
                  <span v-else-if="item.refundStatus == 3">审核中</span> -->
              <van-button
                class="s"
                @click="dumpToDetail(item, 'waitExit')"
                v-if="item.itemRefundStatus == 1"
                >同意申请</van-button
              >
              <van-button
                class="s"
                @click="dumpToDetail(item, 'refuse')"
                v-else-if="item.itemRefundStatus == 2"
                >拒绝申请</van-button
              >
              <van-button
                class="s"
                @click="dumpToDetail(item)"
                v-else-if="item.itemRefundStatus == 3"
                >审核中1211</van-button
              >
              <van-button
                class="s"
                @click="dumpToDetail(item)"
                v-else-if="item.itemRefundStatus == 4"
                >撤销申请111</van-button
              >
              <van-button
                class="s"
                @click="dumpToDetail(item, 'dai')"
                v-else-if="item.itemRefundStatus == 5"
                >待退货</van-button
              >
              <van-button
                class="s"
                @click="dumpToDetail(item, 'tui')"
                v-else-if="item.itemRefundStatus == 6"
                >退货中</van-button
              >
              <van-button
                class="s"
                @click="dumpToDetail(item, 'failed')"
                v-else-if="item.itemRefundStatus == 27"
                >商家拒绝</van-button
              >
              <van-button
                class="s"
                @click="dumpToDetail(item, 'success')"
                v-else-if="item.itemRefundStatus == 28"
                >商家收货</van-button
              >

              <!-- 换货 -->
              <van-button
                class="s"
                @click="dumpToDetail(item, 'sellerSend')"
                v-else-if="item.itemRefundStatus == 30"
                >待商家重新发货</van-button
              >
              <van-button
                class="s"
                @click="dumpToDetail(item, 'buyerRecieve')"
                v-else-if="item.itemRefundStatus == 31"
                >待买家收货</van-button
              >
              <van-button
                class="s"
                @click="dumpToDetail(item, 'huanSuccess')"
                v-else-if="item.itemRefundStatus == 32"
                >换货成功</van-button
              >
              <van-button
                class="s"
                @click="dumpToDetail(item, 'huanFailed')"
                v-else-if="item.itemRefundStatus == 33"
                >换货失败</van-button
              >

              <!-- 换货中: 点击跳转换货详情界面 -->
              <van-button
                class="s"
                @click="dumpToDetail(item)"
                v-else-if="item.itemStatus == 11"
                >售后中</van-button
              >
              <van-button
                class="s"
                @click="refundclick2(item)"
                v-else-if="item.itemStatus == 4"
                >退款</van-button
              >
              <van-button
                class="s"
                @click="refundclick3(item)"
                v-else-if="item.itemStatus == 5"
                >申请售后111</van-button
              >
              <van-button
                class="s"
                @click="refundclick3(item)"
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
                parseFloat(item.itemVoucherPayMoney).toFixed(2)
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
            ><span class="van-card__price-currency">¥</span
            ><span class="van-card__price-integer">{{
              orderdata.goodsMoney
            }}</span></span
          >
        </div>
        <div class="cardlist">
          <div class="item fx1">运费</div>
          <span
            class="item"
            v-if="orderdata.orderItemVOList[0].itemFreightMoney == 0"
            ><span class="van-card__price-currency">免运费</span></span
          >
          <span
            class="item"
            v-if="orderdata.orderItemVOList[0].itemFreightMoney > 0"
            ><span class="van-card__price-currency">¥</span
            ><span class="van-card__price-integer">{{
              orderdata.orderItemVOList[0].itemFreightMoney
            }}</span></span
          >
        </div>
        <div class="cardlist carbig">
          <div class="item fx1">实付款</div>
          <span class="item" style="color: #ee0a24">
            <span class="van-card__price-currency">¥</span>
            <span
              class="van-card__price-integer"
              v-if="orderdata.voucherMoneyType == 2"
              >{{
                orderdata.orderStatus == 7 ? 0 : orderdata.voucherPayMoney
              }}</span
            >
            <span class="van-card__price-integer" v-else>{{
              orderdata.orderStatus == 7 ? 0 : orderdata.payMoney
            }}</span>
          </span>
        </div>
        <div
          class="cardlist carbig"
          v-show="
            orderdata.orderItemVOList[0].canVoucherMoney &&
            orderdata.voucherMoneyType == 2
          "
        >
          <div class="item fx1">抵用金</div>
          <span class="item" style="color: #ee0a24">
            <span class="van-card__price-integer"
              >-{{ orderdata.orderItemVOList[0].itemVoucherMoney }}</span
            >
          </span>
        </div>
      </div>
      <div style="height: 10px"></div>
      <div class="cardbox">
        <div class="headtit">订单信息</div>
        <div class="cardlist">
          <div class="item fx1">订单编号</div>
          <span class="item"
            ><span class="van-card__price-integer">{{
              orderdata.showSn
            }}</span></span
          >
        </div>
        <div class="cardlist">
          <div class="item fx1">下单时间</div>
          <span class="item"
            ><span class="van-card__price-integer">{{
              orderdata.createTime
            }}</span></span
          >
        </div>
      </div>
      <div class="contact-node">
        <div class="view" @click="copy(orderdata.showSn)">
          <van-icon class="iconimg" name="coupon-o" size="20" color="#1989fa" />
          <span class="txt">复制订单号</span>
          <div class="line"></div>
        </div>
        <div class="view">
          <van-icon class="iconimg" name="phone-o" size="20" color="#1989fa" />
          <span class="txt">联系卖家</span>
        </div>
      </div>
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
        title="退货退款详情"
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
        @modifyOrder="modifyOrder"
        :refundrefresh="refundrefresh"
      ></v-exchange>
    </van-popup>
    <!-- 申请换货-->
    <van-popup
      get-container="body"
      v-model="refund.showrefundDetails"
      position="bottom"
      :style="'height:' + winheight + 'px;background:#f7f8fa;'"
    >
      <van-nav-bar
        title="申请换货"
        left-arrow
        @click-left="
          refundback();
          refund.showrefundDetails = false;
        "
      />
      <huangoods
        :refunddta="refund.refunddata"
        ref="refund"
        :aftersaleType="aftersaleType"
        :exangeType="exangeType"
        @revok="revok"
        :refundrefresh="refundrefresh"
      />
    </van-popup>
    <!-- 换货详情-->
    <van-popup
      get-container="body"
      v-model="refund.exchangeDetails"
      position="bottom"
      :style="'height:' + winheight + 'px;background:#f7f8fa;'"
    >
      <van-nav-bar
        title="换货详情"
        left-arrow
        @click-left="
          refundback();
          refund.exchangeDetails = false;
        "
      />
      <Fordetails
        :refunddta="refund.refunddata"
        ref="refund"
        :aftersaleType="aftersaleType"
        :exangeType="exangeType"
        @revok="revok"
        @modifyOrders="modifyOrders"
        :refundrefresh="refundrefresh"
      />
    </van-popup>

    <router-view></router-view>
  </router-layout>
</template>
<script>
import { postgetOrder } from "api";
import Orderbar from "@/components/goods/orderbar";
import Refund from "@/components/goods/refund";
import Sales from "@/components/goods/sales";
import huangoods from "@/components/goods/huangoods";
import vExchange from "@/components/goods/exchange.vue";
import Fordetails from "@/components/goods/fordetails.vue";
// import vExchange from '@/components/goods/exchange.vue'
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
        showrefundDetail: false,
        showrefundDetails: false,
        exchangeDetails: false
      },
      aftersaleType: "", //售后类型
      exangeType: 1,
      isRemodify: false // 修改申请标识字段， 用来判断是否进入退货退款，且获取售后单详情
    };
  },
  components: {
    Orderbar,
    Refund,
    Sales,
    vExchange,
    Fordetails,
    huangoods
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
          data = "交易关闭";
          break;
        case 10:
          data = "交易完成";
          break;
        case 11:
          data = "售后中";
          break;
      }
      return data;
    }
  },
  created() {
    // alert(111)
    this._postgetOrder();
    // this._getsOrderSimple()
    if (this.$route.query.itemStatus == 11) {
      this.refund.showrefundDetails = false;
    }
  },

  methods: {
    copy(item) {
      let oInput = document.createElement("input");
      oInput.value = item;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$toast("订单号复制成功");
      oInput.remove();
    },
    onRefresh() {},
    //  orederdetails (orderSn) {
    //   this.$router.push('/user/orederdetails/' + orderSn)

    // },
    _postgetOrder() {
      window.localStorage.removeItem("isInit_refund");
      window.localStorage.removeItem("isInit");
      postgetOrder({ orderSn: this.$route.params.id, snType: 7 }).then(
        (res) => {
          if (res && res.errorCode == 1) {
            if (this.$route.query.itemStatus == 11) {
              this.refund.showrefundDetail = false;
              this.refund.showrefundDetails = false;
              res.data.orderItemVOList.forEach((item) => {
                if (item.itemStatus == this.$route.query.itemStatus) {
                  this.refund.refunddata = item;
                }
              });
            }
            this.orderdata = res.data;

            // 缓存getOrder接口返回的数据
            localStorage.setItem(
              "getOrderData",
              JSON.stringify(this.orderdata)
            );
          }
        }
      );
    },

    refundclick3(item) {
      // this.aftersaleType = 2
      this.aftersaleType = 3; //换货3
      this.refund.showrefund = true;
      this.refund.refunddata = item;
      // this.$emit('orderrefresh')
    },

    refundclick2(item) {
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

    // 跳转至换货详情界面
    dumpToDetail(item, type) {
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
      } else if (type == "sellerSend") {
        //商家重新发货30
        this.exangeType = 8;
      } else if (type == "buyerRecieve") {
        //待买家收货31
        this.exangeType = 4;
      } else if (type == "huanSuccess") {
        //换货成功32
        this.exangeType = 5;
      } else if (type == "huanFailed") {
        //换货失败33
        this.exangeType = 6;
      }

      this.aftersaleType = 1;
      if (this.$route.query.itemStatus == 11) {
        this.refund.exchangeDetails = true;
      } else {
        this.refund.showrefundDetail = true;
        this.refund.showrefundDetails = true;
      }
      this.refund.refunddata = item;
    },

    modifyOrder(isRemodify) {
      this.isRemodify = isRemodify;
      this.refund.showrefundDetail = false;
      this.refund.showrefundDetails = false;
      this.refund.showrefund = true;
    },
    modifyOrders(isRemodify) {
      if (isRemodify) {
        this.refund.showrefundDetails = true;
      } else {
        this.refund.showrefundDetails = false;
      }
      this.isRemodify = isRemodify;
      this.refund.showrefundDetail = false;
      // this.refund.showrefundDetails = false
      this.refund.showrefund = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.orderdetaibox {
  .icobg2 {
    background-image: url(~@/assets/image/common/dzf.png);
  }
  .icobg4 {
    background-image: url(~@/assets/image/common/dfh.png);
  }
  .icobg5 {
    background-image: url(~@/assets/image/common/dsh.png);
  }
  .icobg6,
  .icobg10,
  .icobg11 {
    background-image: url(~@/assets/image/common/dpj.png);
  }
  .icobg7 {
    background-image: url(~@/assets/image/common/close.png);
  }
  .or_hd {
    background: linear-gradient(to right, rgb(255, 144, 0), rgb(255, 80, 0))
      center center / cover no-repeat;
    :deep(.van-nav-bar__title),
    :deep(.van-nav-bar .van-icon),
    :deep(.van-nav-bar__text) {
      color: #fff;
    }
    .van-nav-bar {
      background: none;
    }
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
      margin-left: 44.16px;
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
      margin-left: 226.32px;
      visibility: visible;
      width: 150px;
      .imgico {
        width: 100%;
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
    right: 0;
    background: #fff;
    z-index: 9;
  }
  .contact-node {
    margin-top: 10px;
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
    }
  }
  .setico {
    width: 28px;
    height: 28px;
  }
}
.s {
  border-radius: 14px;
  width: 90px;
  height: 30px;
  background: #ffffff;
  color: #666;
}
.m {
  display: flex;
  justify-content: flex-end;
}
</style>
