<template>
  <div class="refundbox">
    <!-- 导航栏 -->
    <!-- <van-nav-bar
    class="arrows"
    title="退货退款详情"
    left-arrow
    @click-left="onClickLeft"
/> -->
    <!-- 1: 等待商家处理 -->
    <div class="arrows" v-if="type === 1">
      <div class="title-box">
        <div class="text">
          <span class="await">等待商家处理</span><br />
          <van-count-down auto-start :time="time" format=" 还剩 HH 时 mm 分" />
        </div>
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </div>

      <div class="bg">
        <div class="await1">你已成功提交换货申请,请耐心等待商家处理</div>
        <div class="await2">·商家同意或超过24小时未处理,换货申请将达成</div>
        <div class="await2">·商家拒绝,您可以修改申请再次发起或联系平台客服</div>
        <div class="van-hairline--bottom"></div>
        <div class="handleclick">
          <van-button
            size="small"
            class="modify"
            plain
            type="danger"
            @click="handlerevoke"
            >撤销申请</van-button
          >
          <van-button
            size="small"
            class="modify"
            plain
            type="danger"
            @click="modifyOrders"
            >修改申请</van-button
          >
        </div>
      </div>
    </div>
    <!-- <div class="h10"></div> -->
    <!-- 2: 商家已同意申请，请尽早退货 -->
    <div class="shows arrows" v-else-if="type === 2">
      <div class="title-box">
        <div class="text">
          <span class="await">商家已同意申请，请尽早退货</span><br />
          <span class="times">还剩23时12分</span>
        </div>
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </div>

      <div class="bgs">
        <div class="bg1">
          <div class="await2">
            ·未经商家同意,请您不要使用到付或平邮,以免商家拒签货物
          </div>
          <div class="await2">
            ·寄出货物后请填写货物信息,逾期未处理,换货申请将关闭
          </div>
          <div class="await2">
            ·请在包裹内留下纸条,备注您的换货信息,以便商家及时处理
          </div>
          <div class="van-hairline--bottom"></div>
          <!-- 地址 -->
          <!-- <van-icon class="mapico" name="location" size="16" /> -->

          <van-button
            size="small"
            plain
            type="danger"
            @click="handleLog"
            class="buttons"
            >我已寄出，填写物流信息</van-button
          >
        </div>
      </div>
    </div>

    <!-- 3: 买家已退货,等待商家收货 -->
    <div class="shows" v-else-if="type === 3">
      <div class="title-box">
        <div class="text">
          <span class="await">货物已退货,等待商家收货</span><br />
          <span class="times">还剩23时12分</span>
        </div>
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </div>

      <div class="bgs3">
        <div class="bg1">
          <div class="await2 agree">
            ·商家逾期未收货,系统默认商家已收到货物并寄出新的商品
          </div>
          <div class="await2">
            ·如商家拒绝发货,您可以与商家协商修改申请,再次发起,商家
          </div>
          <div class="await2">
            会重新处理,在无法和商家达成一致的情况下,您可以联系平台客服寻求帮助
          </div>
          <div class="van-hairline--bottom"></div>
          <!-- 地址 -->
          <van-icon class="mapico" name="location" size="16" />
          <div
            class="van-cell__value van-cell__value--alone van-contact-card__value"
          >
            <img
              class="locations2"
              src="../../assets/image/journalism.png"
              width="26.67px"
              height="26.67px"
            />
            <div @click="logisticsMessage">
              <div class="relation">
                <!-- <div class="relation1" >{{ expressDetail[0].context }}</div> -->
                <div class="relation8 express-text">
                  您的快递已签收,
                  签收人在【菜鸟的福州杨桥新苑3号楼店】领取。如有疑问请电联:（15980253708）,
                  投诉电话:（9519666）, 您的快递已经妥投。风里来雨里去,
                  只为客官您满意。上有老下有小,
                  赏个好评好不好？【请在评价快递员处帮忙点亮五颗星星哦~】
                </div>
              </div>
              <van-cell class="van-icons" is-link />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 8: 商家已收货，等待商家重新发货 -->
    <div class="shows" v-else-if="type === 8">
      <div class="title-box">
        <div class="text">
          <span class="await">等待商家重新发货</span><br />
        </div>
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </div>

      <div class="bgs3">
        <div class="bg1">
          <div class="await2 agree">
            ·商家逾期未收货,系统默认商家已收到货物并寄出新的商品
          </div>
          <div class="await2">
            ·如商家拒绝发货,您可以与商家协商修改申请,再次发起,商家
          </div>
          <div class="await2">
            会重新处理,在无法和商家达成一致的情况下,您可以联系平台客服寻求帮助
          </div>
          <div class="van-hairline--bottom"></div>
          <!-- 地址 -->
          <van-icon class="mapico" name="location" size="16" />
          <div
            class="van-cell__value van-cell__value--alone van-contact-card__value"
          >
            <img
              class="locations2"
              src="../../assets/image/journalism.png"
              width="26.67px"
              height="26.67px"
            />
            <div @click="logisticsMessage">
              <div class="relation">
                <!-- <div class="relation1" >{{ expressDetail[0].context }}</div> -->
                <div class="relation8 express-text">
                  您的快递已签收,
                  签收人在【菜鸟的福州杨桥新苑3号楼店】领取。如有疑问请电联:（15980253708）,
                  投诉电话:（9519666）, 您的快递已经妥投。风里来雨里去,
                  只为客官您满意。上有老下有小,
                  赏个好评好不好？【请在评价快递员处帮忙点亮五颗星星哦~】
                </div>
              </div>
              <van-cell class="van-icons" is-link />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4: 商家已发货,请确认收货 -->
    <div class="shows" v-else-if="type === 4">
      <span class="await">商家已发货,请确认收货</span><br />
      <span class="times">还剩23时12分</span>
      <p class="imgss">
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </p>

      <div class="bgs3">
        <div class="bg1">
          <div class="await2">·商家已发货,请及时确认收货</div>
          <div class="await2">·逾期为收获,系统将自动确认收货</div>
          <div class="van-hairline--bottom"></div>
          <van-button
            size="small"
            plain
            type="danger"
            class="affirm"
            @click="confirms"
            >确认收货</van-button
          >
          <!-- 地址 -->
          <van-icon class="mapico" name="location" size="16" />
          <div
            class="van-cell__value van-cell__value--alone van-contact-card__value"
          >
            <img
              class="locations5"
              src="../../assets/image/journalism.png"
              width="26.67px"
              height="26.67px"
            />
            <div class="relation">
              <div class="p">
                <div>退货物流:</div>
                <div class="relation1">物流</div>
              </div>
            </div>
            <van-cell class="van-icons1" is-link />
          </div>
        </div>
      </div>
    </div>

    <!-- 5: 换货成功 -->
    <div class="shows" v-else-if="type === 5">
      <div class="title-box">
        <div class="text"><span class="await">换货成功</span><br /></div>
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </div>

      <div class="bgs4">
        <!-- 地址 -->
        <van-icon class="mapico" name="location" size="16" />
        <div
          class="van-cell__value van-cell__value--alone van-contact-card__value"
        >
          <img
            class="locations2"
            src="../../assets/image/journalism.png"
            width="26.67px"
            height="26.67px"
          />
          <div class="relation">
            <div class="p2">
              <div>退货物流:</div>
              <div class="relation1">物流</div>
            </div>
          </div>
          <van-cell class="van-icons1" is-link />
        </div>
      </div>
    </div>

    <!-- 6: 换货失败 -->

    <div class="shows" v-else-if="type === 6">
      <div class="title-box">
        <div class="text"><span class="await">换货失败</span><br /></div>
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </div>

      <div class="bg">
        <div class="await1">商家拒绝了您的退款申请</div>
        <div class="await2">愿意是:商品已经破坏,无法换货</div>
        <div class="await2">
          您可与卖家协商,修改申请,再次提交,卖家会重新处理,
        </div>
        <div class="await2">或申请维权,换货申请将自动关闭</div>
        <div class="van-hairline--bottom"></div>
        <div class="bo">
          <van-button size="small" plain type="danger" @click="modifyOrders"
            >修改申请</van-button
          >
        </div>
      </div>
    </div>

    <!-- 7: 商家拒绝 -->
    <div v-if="type === 7">
      <div class="title-box">
        <div class="text">
          <span class="await">商家拒绝</span><br />

          <van-count-down auto-start :time="time" format=" 还剩 HH 时 mm 分" />
        </div>
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </div>

      <div class="bg">
        <div class="await1">你已成功提交换货申请,商家拒绝</div>
        <div class="await2">
          ·商家拒绝申请，您可与商家协商,修改申请后,再次提交,商家会重新处理
        </div>
        <div class="await2">
          ·商家超过24小时未处理，换货申请将达成，请按照系统给出的换货地址换货
        </div>
        <div class="van-hairline--bottom"></div>
        <div class="handleclick">
          <!-- <van-button size="small" class="modify" plain type="danger" @click="handlerevoke" >撤销申请</van-button>-->
          <van-button
            size="small"
            class="modify"
            plain
            type="danger"
            @click="modifyOrders"
            >修改申请</van-button
          >
        </div>
      </div>
    </div>

    <div class="bg2">
      <span class="await3">商品信息</span>
      <van-card
        :desc="refunddta.goodsSkuName"
        :title="refunddta.goodsName"
        :thumb="refunddta.goodsLogoImgUrl"
        style="margin-top: 0px"
      >
      </van-card>
    </div>

    <div class="bg4">
      <div class="cardbox">
        <div class="cardlist">
          <div class="item fx1">售后编号:</div>
          <span class="item text">
            <span class="van-card__price-integer"></span>
            {{ afterSalesInfo.aftersaleSn }}
          </span>
        </div>
        <div class="cardlist" v-if="type == 1 || type == 2">
          <div class="item fx1">收货地址:</div>
          <span class="item text">
            <span class="van-card__price-integer"></span>
            {{ orderData.consigneeProvince }}
            {{ orderData.consigneeCity }}
            {{ orderData.consigneeCounty }}
            {{ orderData.consigneeAddress }}
          </span>
        </div>
        <div class="cardlist" v-if="type == 1 || type == 2">
          <div class="item fx1">收货手机:</div>
          <span class="item text">
            <span class="van-card__price-integer"></span>
            {{ orderData.consigneeMobile }}
          </span>
        </div>
        <div class="cardlist" v-if="type == 1 || type == 2">
          <div class="item fx1">收货人:</div>
          <span class="item text">
            <span class="van-card__price-integer"></span>
            {{ orderData.consigneeName }}
          </span>
        </div>
        <div class="cardlist" v-if="type != 1 && type != 2">
          <div class="item fx1">卖家收货地址:</div>
          <span class="item text">
            <span class="van-card__price-integer"></span>
            <!-- 通过接口获取保存的填写数据 -->
            {{ toSellerShipments.receiveAddr }}
          </span>
        </div>
        <div class="cardlist" v-if="type != 1 && type != 2">
          <div class="item fx1">卖家收货手机:</div>
          <span class="item text">
            <span class="van-card__price-integer"></span>
            <!-- 通过接口获取保存的填写数据 -->
            {{ toSellerShipments.receiveTel }}
            <!-- {{ afterSalesInfo.consigneeStatus | filterConsigneeStatus }} -->
          </span>
        </div>

        <div class="cardlist" v-if="type != 1 && type != 2">
          <div class="item fx1">卖家收货人:</div>
          <span class="item text"
            ><span class="van-card__price-integer"></span>
            <!-- 通过接口获取保存的填写数据 -->
            {{ toSellerShipments.receiveName }}
          </span>
        </div>

        <div class="cardlist">
          <div class="item fx1">换货原因:</div>
          <span class="item text">
            <span class="van-card__price-integer"></span>
            {{ afterSalesInfo.applyReason }}
          </span>
        </div>

        <div class="cardlist">
          <div class="item fx1">换货说明:</div>
          <span class="item text">
            <span class="van-card__price-integer"></span>
            {{ afterSalesInfo.applyExplain }}
          </span>
        </div>

        <div class="cardlist">
          <div class="item fx1">申请时间:</div>
          <span class="item text">
            <span class="van-card__price-integer"></span>
            {{ afterSalesInfo.applyTime }}
          </span>
        </div>
        <div
          class="van-hairline--bottom"
          style="margin-top:12px ,font-size: 0.67px"
        ></div>

        <div class="contact-node">
          <div class="view">
            <!-- 联系卖家 -->
            <span
              ><a :href="relateTel" style="display: block">
                <div class="maijia">
                  <div class="t"></div>
                  <div class="txt">联系卖家</div>
                </div>
              </a>
            </span>
            <div class="ca">|</div>
            <div class="kefu" @click="service">
              <div class="d"></div>
              <div class="txt1">联系诚聊客服</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-popup
      get-container="body"
      v-model="refund.showrefund"
      position="bottom"
      :style="'height:' + winheight + 'px;background:#f7f8fa;'"
    >
      <van-nav-bar
        title="填写退货物流"
        left-arrow
        @click-left="
          refundback();
          refund.showrefund = false;
        "
      />
      <Information
        :refunddta="refunddta"
        ref="refund"
        :afterSalesInfo="afterSalesInfo"
        :aftersaleType="aftersaleType"
        :refundrefresh="refundrefresh"
        @handleModify="handleModify"
      />
    </van-popup>

    <van-popup
      v-model="showWuLiu"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
    >
      <van-steps direction="vertical" :active="0">
        <van-step v-for="(item, index) in expressDetail" :key="index">
          <h3>{{ item.context }}</h3>
          <p>{{ item.time }}</p>
        </van-step>
      </van-steps>
    </van-popup>
  </div>
</template>

<script>
import { _uploadFiler } from "@/utils/dom";
import {
  getAftersale,
  revokeAftersale,
  getExpressDetail,
  receiveShipments
} from "api";
import Returnlogistics from "@/components/goods/returnlogistics.vue";
import Information from "@/components/goods/information.vue";

import { Dialog, Step, Steps, CountDown } from "vant";

export default {
  name: "fordetails",
  components: {
    Returnlogistics,
    Information
  },
  props: {
    refunddta: {},
    aftersaleType: [Number, String],
    exangeType: {
      type: Number,
      default: 1
    }
  },
  updated() {
    // console.log('11wwwwwwwwww');
  },

  data() {
    return {
      // 商家联系电话
      relateTel: "",
      orderData: {},
      // 买家退货给卖家的物流信息
      toSellerShipments: {
        id: "",
        receiveName: "",
        receiveTel: "",
        receiveAddr: "",
        expName: "",
        expId: "",
        expSn: "",
        // expUrls: this.expUrls,
        shipExplain: "",
        expUrls: ""
      },
      time: 24 * 60 * 60 * 1000,
      active: 0,
      winheight: document.documentElement.clientHeight,
      GoodsStates: { show: false },
      type: this.exangeType,
      refund: {
        showrefund: false
      },
      afterSalesInfo: {},
      afterSalesData: {
        id: "",
        orderSn: "",
        orderItemId: "",
        receiveStatus: ""
      },
      RefundReason: {
        show: false,
        radio: "",
        tit: "请选择",
        group: [
          { id: 1, name: "多拍/拍错/不想要" },
          { id: 2, name: "未按约定时间发货" }
        ]
      },
      reData: {},
      showWuLiu: false,
      expressDetail: []
    };
  },
  filters: {
    filterConsigneeStatus(type) {
      if (type === 1) return "我已收到货";
      else if (type === 2) return "未收到货";
    }
  },
  created() {
    this.timer = setTimeout(() => {
      this._getAftersale();
    }, 1000);

    //  this._getAftersale()
    //  this._getExpressDetail()
  },
  methods: {
    service() {
      window.location.href = `https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b97817351957717cdbb1fb3b53708374ba573672f4fb385cf664728f448ddbba361c3cf4aa02bfe2f013d383c44d38a81ff`;
    },
    handleModify(type, isshow, data) {
      this.type = type;
      if (isshow === false) this.refund.showrefund = false;
      this.reData = data;
      // this.$emit('modify',1)
    },
    logisticsMessage() {
      this.showWuLiu = true;
      //  console.log(111);
      //  this.active=0
    },
    handleLog() {
      this.refund.showrefund = true;
    },
    refundback() {
      this.$refs.refund.inits();
      this.$emit("defrefresh");
    },
    inits() {},
    refundrefresh() {
      this.refund.showrefund = false;
      this.$emit("refresh");
    },
    goodsclose() {
      if (this.GoodsState.tit == "请选择") {
        this.GoodsState.tit = "请选择";
        this.GoodsState.radio = "";
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    handlerevoke() {
      Dialog.confirm({
        // title: '标题',
        message: "撤销申请后该笔订单将不再享有售后服务，请知悉。"
      })
        .then(() => {
          // on confirm
          this.$emit("revok1");

          revokeAftersale({
            id: this.afterSalesInfo.id,
            opType: 1
          }).then((res) => {
            if (res && res.errorCode == 1) {
            }
            this.$router.push({ name: "order", query: { type: "5" } });
          });
        })
        .catch(() => {});
    },
    _getAftersale() {
      getAftersale({
        orderSn: this.refunddta.orderSn,
        orderItemId: this.refunddta.id
      }).then((res) => {
        if (res && res.errorCode == 1) {
          this.afterSalesData = res.data;
          // 缓存获取getOrder接口返回数据
          let od = window.localStorage.getItem("getOrderData");
          let orderdata = JSON.parse(od);
          this.orderData = orderdata;
          this.relateTel = "tel:" + orderdata.sellerPhone;

          // 缓存中获取买家退货给卖家的物流信息
          let ss = localStorage.getItem("toSellerShipments");
          if (ss) {
            let tss = JSON.parse(ss);
            this.toSellerShipments = tss;
          }

          this.afterSalesInfo = res.data;

          this.RefundReason.tit = res.data.applyReason;
          this.RefundReason.group.forEach((item) => {
            if (res.data.applyReason == item.name) {
              this.RefundReason.radio = item.id;
            }
          });
        }
      });
    },
    //  modifyOrders1(){
    //     this.$emit('modifyOrders1', true)
    //  },
    modifyOrders() {
      this.$emit("modifyOrders", true);
      // console.log('refun',this.refunddta);
      //  let data = {
      //   orderItemId:this.afterSalesInfo.orderItemId,
      //   id: this.afterSalesInfo.id,
      //   aftersaleType: this.afterSalesInfo.aftersaleType,
      //   consigneeStatus:this.afterSalesInfo.consigneeStatus,
      //   applyRefundMoney: this.afterSalesInfo.applyRefundMoney,
      //   applyReasonType:this.RefundReason.radio,
      //   applyExplain: this.afterSalesInfo.applyExplain,
      //   applyImageUrls:this.afterSalesInfo.applyImageUrls,
      //   applyRefu哪个ndVoucherMoney:this.afterSalesInfo.applyRefundVoucherMoney || 0
      // }
      // console.log(this.data,'订单data');
      //   editAftersale((data)).then(res=>{
      //     console.log(data,'editAftersale');
      //     //  if(res && res.errorCode == 1){
      //     //    this.afterSalesInfo = res.data
      //     //  }
      //  })
    },

    _getExpressDetail() {
      // 查看物流详情
      getExpressDetail({
        expId: this.reData.expId,
        expSn: this.reData.expSn
      }).then((res) => {
        if (res && res.errorCode == 1) {
          this.expressDetail = res.data && res.data.data;
        }
      });
    },

    // 确认收货
    confirms() {
      let params = {
        id: this.afterSalesData.id,
        orderSn: this.afterSalesData.orderSn,
        orderItemId: this.afterSalesData.orderItemId,
        receiveStatus: 1
      };
      //  this.afterSalesData = res.params
      // console.log("params-------",params);
      //  console.log(params, '000000');
      receiveShipments(params).then((res) => {
        //  console.log("receiveShipments",res)
        if (res && res.errorCode == 1) {
          this.type = 5;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.affirm {
  margin-left: 260px;
}
.van-count-down {
  margin-left: 0.43547rem;
}
.cardbox {
  padding-top: 10px;
}
.handleclick {
  display: flex;
  justify-content: flex-end;
  .modify {
    margin-bottom: 12px;
    margin-right: 20px;
  }
}
.title-box {
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
  background-color: #f2f2f2;
  align-items: center;
  height: 63px;
  .text {
    line-height: 19px;
    margin-top: -3px;
  }
  img {
    width: 63px;
    height: 63px;
    margin-right: 40px;
  }
}
.paymoney {
  .van-cell {
    padding-left: 0;
    .van-field__control {
      color: #ff5000;
    }
  }
}
.refundbox {
  .uploadimg {
    background: #fff;
    padding: 10px;
    .tit {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
}
.await {
  height: 68.67px;
  margin-left: 16.33px;
  font-size: 15px;
  color: #212121;
}
.times {
  margin-top: 29.33px;
  margin-left: 16px;
  font-size: 10px;
  color: #212121;
  margin-bottom: 29.33px;
}
.imgs {
  // position: absolute;
  // top: px;
  margin-top: -73px;
  margin-left: 243.67px;
}
.imgss {
  // position: absolute;
  // top: px;
  margin-top: -60px;
  margin-left: 243.67px;
}
.a {
  background-color: #f2f2f2;
}
.bg {
  margin-top: 20px;
  background-color: #ffffff;
  //  weight: 338.67px;
  //  height: 140.67px;
  margin-left: 10.33px;
  margin-right: 10.67px;
  border-radius: 9.33px;
  margin-bottom: 3px;
  // padding:20px atuo 10px;
}
.arrows {
  height: 240px;
}
.bg1 {
  margin-top: 30px;
  background-color: #ffffff;
  width: 351px;
  height: 130.33px;
  //  margin-left: 10.33px;、
  margin-right: 3.33px;
  border-radius: 9.33px;
}
.bgs {
  margin-top: 10px;
  background-color: #ffffff;
  width: 338.67px;
  //  height: 240.67px;
  margin-left: 10.33px;
  margin-right: 16.33px;
  border-radius: 9.33px;
  margin-bottom: 20px;
}
.await1 {
  padding-top: 10px;
  color: #212121;
  margin-left: 10.33px;
  font-size: 13px;
  margin-top: 10px;
  // top: 10px;
  margin-bottom: 10px;
}
.await2 {
  // padding-top: 10px;
  margin-left: 10.33px;
  // margin-right: 1.33px;
  padding-right: -2px;
  color: #999999;
  font-size: 12px;
  line-height: 18px;
  // margin-bottom:10px;
}
.agree {
  padding-top: 20px;
}
.van-hairline--bottom {
  padding-top: 13.33px;
  color: #e6e6e6;
}
.bg2 {
  margin-top: 10px;
  background-color: #ffffff;
  weight: 338.67px;
  height: 150px;
  margin-left: 10.67px;
  margin-right: 10.67px;
  border-radius: 9.33px;
}

.bg3 {
  margin-top: 10px;
  background-color: #ffffff;
  weight: 338.67px;
  height: 130px;
  margin-left: 10.67px;
  margin-right: 10.67px;
  border-radius: 9.33px;
}
.bg4 {
  margin-top: 10px;
  background-color: #ffffff;
  weight: 338.67px;
  height: 255px;
  margin-left: 10.67px;
  margin-right: 10.67px;
  border-radius: 9.33px;
  margin-bottom: 24.67px;
}
.await3 {
  color: #212121;
  top: 13.33px;
  margin-left: 10px;
  font-size: 15.33px;
}
.arrows {
  color: #212121;
  font-size: 16.33px;
  background-color: #f2f2f2;
  padding-top: 3px;
  padding-bottom: 10px;
}
.cardlist {
  margin: 10px 0 0;
  display: flex;
  margin-left: 9.67px;
  font-size: 11px;
  padding: 6px;
  line-height: 16px;
  color: #999999;
  .text {
    color: #212121;
    display: inline-block;
    margin-left: 10px;
    margin-top: -3px;
  }
  .refund-money {
    color: #cf0000;
  }
}
.item.fx1 {
  line-height: 16px;
  // margin-top: 10px;
}
.cardlist {
  margin-top: -1px;
  display: flex;
  margin-left: 9.67px;
  font-size: 11px;
  padding: 5px;
  color: #999999;
}
// 联系卖家
.txt {
  margin-top: 16.33px;
  // display: flex;
  margin-left: 30px;
  font-size: 11px;
  color: #212121;
  margin-left: 5px;
}
// 联系诚聊客服
.txt1 {
  margin-top: 16.33px;
  // position: absolute;
  //  margin-top: -78px;
  // display: flex;
  margin-right: 5.67px;
  margin-left: -17px;
  font-size: 11px;
  color: #212121;
}
.c {
  // position: absolute;
  margin-bottom: 24.67px;
  display: flex;
  margin-left: 168.67px;
  font-size: 11px;
  width: 0.67px;
  height: 20px;
  color: #cf0000;
}
.contact-node {
  width: 100%;
}
.view {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// 图片
.t {
  width: 12.83px;
  height: 12.97px;
  background: url("../../assets/image/copy.png") no-repeat;
  margin: 0 10px;
  margin-top: 16.33px;
  // margin-top: 743px;
  margin-right: 2px;
}
.d {
  width: 14.2px;
  height: 12.97px;

  background: url("../../assets/image/service.png") no-repeat;
  margin-top: 16.33px;
  margin: 16.33 10px;
  // margin-top: 743px;
  margin-right: 25px;
}
.maijia,
.kefu {
  display: flex;
  // flex:3;
  align-items: center;
}
.maijia {
  margin-left: 20px;
}
.kefu {
  margin-right: 20px;
}
.ca {
  margin-top: 16.33px;
  // margin-top: -13px;
  // flex:3;
  // margin-bottom: 24.67px;
  // display: flex;
  // padding-bottom: -100px;
  // margin-left: 168.67px;
  font-size: 11px;
  // weight: 0.67px;
  // height: 30px;
  // line-height:30px;
  color: #cf0000;
}

.van-button {
  border-radius: 80px;
  padding: 0 0.31333rem;
  // margin-left: 244px;
  margin-top: 8px;
  margin-bottom: 20px;
}
.van-card {
  border-radius: 9.33px;
}
.shows {
  // display: none;
}
.buttons {
  weight: 173.33px;
  height: 26.67px;
  border-radius: 13.33px;
  text-align: center;
  margin-left: 145.33px;
  top: 10px;
  margin-right: 10.33px;
  // margin-top: 20px;
  color: #cf0000;
  font-size: 13.67px;
  word-break: keep-all;
  white-space: nowrap;
}
.mapico {
  display: none;
}
.relation {
  margin-left: 53.67px;
  margin-right: 37px;
  margin-top: 13.33px;
  color: #212121;
  font-size: 13.67px;
  .relation1 {
    margin-top: 6px;
  }
}
.uaddress {
  margin-left: 53.67px;
  margin-right: 37px;
  // margin-top: 13.33px;
  color: #212121;
  font-size: 13.67px;
  .relation1 {
    margin-top: 6px;
  }
}
.relation8 {
  margin-top: -48px;
}
.locations {
  margin-left: 10.33px;
  margin-top: 20px;
}
.van-icons {
  bottom: 35px;
  height: 41px;
  margin-left: 295.33px;
}
.van-icons1 {
  bottom: 40px;
  margin-left: 295.33px;
}
.locations2 {
  margin-left: 13.33px;
  margin-top: 18px;
}
.locations5 {
  margin-left: 13.33px;
  margin-top: 2px;
}
//  .locations3 {
//   margin-left:13.33px;
//   top: -7px;

// }
.bgs3 {
  margin-top: 20px;
  background-color: #ffffff;
  weight: 338.67px;
  height: 190.33px;
  margin-left: 10.33px;
  margin-right: 10.33px;
  border-radius: 9.33px;
}
.bgs4 {
  margin-top: 30px;
  background-color: #ffffff;
  weight: 338.67px;
  height: 74.33px;
  margin-left: 10.33px;
  margin-right: 10.33px;
  border-radius: 9.33px;
}
.bg6 {
  margin-top: 20px;
  background-color: #ffffff;
  weight: 338.67px;
  height: 150px;
  margin-left: 10.33px;
  margin-right: 10.63px;
  border-radius: 9.33px;
}
.van-cell__value {
  margin-top: 20px;
}
.bo {
  // background: #CF0000;
  margin-left: 70%;
  .van-button[data-v-e9216668] {
    margin-bottom: 0.21333rem;
  }
}
.express-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  padding: 0 20px;
}
.p {
  margin-top: -40px;
}
.p2 {
  margin-top: -46px;
}
</style>
