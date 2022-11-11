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
          <div style="display: flex">
            <img class="lock" src="../../assets/image/lock_icon.png" alt="" />
            <span class="await">等待商家处理</span><br />
          </div>

          <!-- <van-count-down auto-start :time="time" format=" 还剩 HH 时 mm 分" /> -->

          <!-- <span class="times">
             <van-count-down :time="time" format=" 还剩 HH 时 mm 分" />
          </span> -->
        </div>
        <!-- <img src="../../assets/image/a.png" width="63px" height="63px" /> -->
      </div>

      <div class="bg">
        <div class="await1">您已成功提交退货退款申请，请耐心等待商家处理</div>
        <!-- <div class="await2">
          申请原因：{{ afterSalesInfo.applyReason }}
          {{ afterSalesInfo.applyExplain }}
        </div> -->
        <div class="await2">
          <!-- 你已提交申请,等待商家处理,您可与商家协商,支持修改后再次提交。如商家在24小时未操作，系统将自动同意。 -->
          商家同意后，您可按照给出的退货地址退货
          ，并记录退货运单号，若商家拒绝申请，您可与商家协商，修改申请后再次提交，商家会重新处理，商家超过24小时未处理，退货退款申请将达成，请按照系统给出的退货地址退货。
        </div>
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
            @click="modifyOrder"
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
          <span class="await">商家已同意申请，请尽早退货</span>
          <van-count-down auto-start :time="time" format=" 还剩 HH 时 mm 分" />
          <!-- <span class="times">待发货</span> -->
        </div>
        <!-- <img src="../../assets/image/a.png" width="63px" height="63px" /> -->
      </div>

      <div class="bgs">
        <div class="bg1 reConfug">
          <div class="await2 agree" style="display: flex; align-items: center">
            <span
              style="
                width: 6px;
                height: 6px;
                background: #6abf57;
                display: block;
                border-radius: 3px;
                margin-right: 3px;
              "
            ></span>
            <span> 未经商家同意，请您不要使用到付或平邮，以免商家拒签货物</span>
          </div>
          <div class="await2" style="display: flex; align-items: center">
            <span
              style="
                width: 6px;
                height: 6px;
                background: #6abf57;
                display: block;
                border-radius: 3px;
                margin-right: 3px;
              "
            ></span>
            <span> 寄出货物后请填写货物信息，逾期未处理，退货申请将关闭</span>
          </div>
          <div class="van-hairline--bottom"></div>
          <!-- 地址 -->
          <!-- <van-icon class="mapico" name="location" size="16" /> -->
          <div class="handleclick">
            <van-button
              size="small"
              plain
              type="danger"
              @click="handlerevoke"
              style="margin-right: 15px"
              >撤销申请</van-button
            >
            <van-button
              size="small"
              plain
              type="danger"
              @click="handleLog"
              style="margin-right: 15px"
              >我已寄出，请填写物流信息</van-button
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 3: 买家已退货,等待商家收货 -->
    <div class="shows arrows" v-else-if="type === 3">
      <div class="title-box">
        <div class="text">
          <span class="await">买家已退货,等待商家收货</span>
          <van-count-down auto-start :time="time" format=" 还剩 HH 时 mm 分" />
        </div>
        <!-- <img src="../../assets/image/a.png" width="63px" height="63px" /> -->
      </div>

      <div class="bgs3">
        <div class="bg1">
          <div class="await2 agree" style="display: flex; align-items: center">
            <span
              style="
                width: 6px;
                height: 6px;
                background: #6abf57;
                display: block;
                border-radius: 3px;
                margin-right: 3px;
              "
            ></span>
            <span
              >商家未在一定期限内确认收货并同意退款或未拒绝退款，本次退款将自动达成，系统将直接退款给您</span
            >
          </div>
          <div class="await2" style="display: flex; align-items: center">
            <span
              style="
                width: 6px;
                height: 6px;
                background: #6abf57;
                display: block;
                border-radius: 3px;
                margin-right: 3px;
              "
            ></span>
            <span
              >如商家拒绝退款，您可以与商家协商修改申请，再次发起，商家会重新处理。在无法和商家达成一致的情况下，您可以联系平台客服寻求帮助。</span
            >
          </div>
          <!-- <div class="await2">重新处理.在无法和商家达成一致的情况下,您可以联系平台客服</div>
            <div class="await2">寻求帮助</div> -->
          <div class="van-hairline--bottom"></div>
          <!-- 地址 -->
          <van-icon class="mapico" name="location" size="16" />
          <div
            class="
              van-cell__value van-cell__value--alone
              van-contact-card__value
            "
          >
            <img
              class="locations2"
              src="../../assets/image/wuliu.png"
              width="26.67px"
              height="26.67px"
            />
            <div @click="logisticsMessage">
              <div class="relation">
                <!-- <div class="relation1" >{{ expressDetail[0].context }}</div> -->
                <div class="relation1 express-text">
                  {{ afterSalesInfo.expName }}
                </div>
                <div class="relation1 express-text">
                  {{ afterSalesInfo.expSn }}
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
      <div class="title-box">
        <div class="text">
          <div style="display: flex">
            <!-- <img class="lock" src="../../assets/image/tksuccess.png" alt=""> -->
            <span class="await">已退款</span><br />
          </div>
          <!-- <span class="await">已退款</span><br /> -->
          <!-- <span class="times">日期</span> -->
        </div>
        <!-- <img src="../../assets/image/a.png" width="63px" height="63px" /> -->
      </div>

      <!-- <span class="times">还剩23时12分</span> -->
      <!-- <p class="img">
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </p> -->
      <div class="bgs3">
        <div class="bg1">
          <div class="await2">·商家已发货,请及时确认收货</div>
          <div class="await2">·逾期为收获,系统将自动确认收货</div>
          <div class="van-hairline--bottom"></div>
          <van-button size="small" plain type="danger">确认收货</van-button>
          <!-- 地址 -->
          <van-icon class="mapico" name="location" size="16" />
          <div
            class="
              van-cell__value van-cell__value--alone
              van-contact-card__value
            "
          >
            <img
              class="locations2"
              src="../../assets/image/wuliu.png"
              width="26.67px"
              height="26.67px"
            />
            <div class="relation">
              <div>退货物流:</div>
              <div class="relation1">物流</div>
            </div>
            <van-cell class="van-icons1" is-link />
          </div>
        </div>
      </div>
    </div>

    <!-- 5: 退款成功  -->
    <div class="shows arrows" v-else-if="type === 5">
      <div class="title-box">
        <div class="text">
          <div style="display: flex">
            <img class="lock" src="../../assets/image/tksuccess.png" alt="" />
            <span class="await">退款成功</span><br />
          </div>
          <!-- <span class="await">已退款</span><br /> -->
          <!-- <span class="times">日期</span> -->
        </div>
        <!-- <img src="../../assets/image/a.png" width="63px" height="63px" /> -->
      </div>

      <div class="bg1">
        <!-- 地址 -->
        <van-icon class="mapico" name="location" size="16" />
        <div class="tkmoney">
          <span>退款金额：¥{{ afterSalesInfo.applyRefundMoney }}</span>
        </div>
        <div
          class="line"
          style="
            width: 327px;
            height: 1px;
            background: #ebebeb;
            margin: 16px auto;
          "
        ></div>
        <!-- <div class="van-cell__value van-cell__value--alone van-contact-card__value">
             <img  class='locations3' src="../../assets/image/journalism.png" width="26.67px" height="26.67px" />
              <div class="relation">
              <div>退货物流:</div>
              <div class="relation1" >物流</div>
              </div>
              <van-cell class='van-icons1' is-link />
          </div> -->
        <div
          class="van-cell__value van-cell__value--alone van-contact-card__value"
          style="display: flex; margin: 0"
        >
          <img
            class="locationsW"
            src="../../assets/image/wuliu.png"
            width="26.67px"
            height="26.67px"
          />
          <div class="relation" @click="logisticsMessage">
            <!-- <div class="relation1" >{{ expressDetail[0].context }}</div> -->
            <div class="relation1 express-text">
              您的快递已签收,
              签收人在【菜鸟的福州杨桥新苑3号楼店】领取。如有疑问请电联:（15980253708）,
              投诉电话:（9519666）, 您的快递已经妥投。风里来雨里去,
              只为客官您满意。上有老下有小,
              赏个好评好不好？【请在评价快递员处帮忙点亮五颗星星哦~】
            </div>
            <van-cell class="van-icons" is-link />
          </div>
          <!-- <van-cell class="van-icons" is-link /> -->
        </div>
      </div>
    </div>

    <!-- 6: 退款失败 -->

    <div class="shows arrows" v-else-if="type === 6">
      <div class="title-box">
        <div class="text">
          <div style="display: flex">
            <img class="lock" src="../../assets/image/tkfaile.png" alt="" />
            <span class="await">退款失败</span><br />
          </div>
          <!-- <span class="await">退货失败</span><br /> -->
          <!-- <span class="times">还剩23时12分</span> -->
        </div>
        <!-- <img src="../../assets/image/a.png" width="63px" height="63px" /> -->
      </div>

      <div class="bg">
        <div class="await1">商家拒绝了您的退款申请</div>
        <div class="await2">拒绝原因：{{ afterSalesInfo.refuseReason }}</div>
        <div class="await2">
          如果您在3天内未与卖家协商修改申请或申请维权，退款申请将自动关闭
        </div>
        <!-- <div class="await2">或申请维权,换货申请将自动关闭</div> -->
        <div class="van-hairline--bottom"></div>
        <div class="handleclick">
          <!-- <van-button size="small" class="modify" plain type="danger" @click="handlerevoke" >撤销申请</van-button> -->
          <van-button
            size="small"
            class="modify"
            plain
            type="danger"
            @click="service"
            >客服介入</van-button
          >
          <!-- <van-button
            size="small"
            class="modify"
            plain
            type="danger"
            @click="anew"
            >修改申请</van-button
          > -->
        </div>
      </div>
    </div>

    <!-- 7：商家拒绝申请 -->
    <div class="arrows" v-else-if="type === 7">
      <div class="title-box">
        <div class="text">
          <div style="display: flex">
            <img class="lock" src="../../assets/image/tkfaile.png" alt="" />
            <span class="await">退款失败</span><br />
          </div>

          <!-- <van-count-down auto-start :time="time" format=" 还剩 HH 时 mm 分" /> -->

          <!-- <span class="times">
             <van-count-down :time="time" format=" 还剩 HH 时 mm 分" />
          </span> -->
        </div>
        <!-- <img src="../../assets/image/a.png" width="63px" height="63px" /> -->
      </div>

      <div class="bg">
        <div class="await1">商家拒绝了您的退款申请</div>
        <div class="await2">原因是：{{ afterSalesInfo.refuseReason }}</div>
        <div class="await2">
          如果您在3天内未与卖家协商修改申请或申请维权，退款申请将自动关闭
        </div>
        <div class="van-hairline--bottom"></div>
        <div class="handleclick">
          <!-- <van-button size="small" class="modify" plain type="danger" @click="handlerevoke" >撤销申请</van-button> -->
          <van-button
            size="small"
            class="modify"
            plain
            type="danger"
            @click="service"
            >客服介入</van-button
          >
          <van-button
            size="small"
            class="modify"
            plain
            type="danger"
            @click="anew"
            >修改申请</van-button
          >
        </div>
      </div>
    </div>

    <div class="bg2">
      <span class="await3">退款信息</span>
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
          <div class="item fx1">订单编号:</div>
          <span class="item text">
            <span class="van-card__price-integer"></span>
            {{ afterSalesInfo.aftersaleSn }}
          </span>
        </div>
        <div class="cardlist">
          <div class="item fx1">货物状态:</div>
          <span class="item text">
            <span class="van-card__price-integer"></span>
            {{
              afterSalesInfo.consigneeStatus === 1 ? "我已收到货" : "未收到货"
            }}
            <!-- {{ afterSalesInfo.consigneeStatus | filterConsigneeStatus }} -->
          </span>
        </div>

        <div class="cardlist">
          <div class="item fx1">退款金额:</div>
          <span class="item text refund-money"
            ><span class="van-card__price-integer"></span> ￥{{
              afterSalesInfo.applyRefundMoney
            }}
          </span>
        </div>

        <div class="cardlist">
          <div class="item fx1">退款原因:</div>
          <span class="item text">
            <span class="van-card__price-integer"></span>
            {{ afterSalesInfo.applyReason }}
          </span>
        </div>

        <div class="cardlist">
          <div class="item fx1">退款说明:</div>
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
            <div class="maijia">
              <div class="t"></div>
              <div class="txt">联系卖家</div>
            </div>
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
        title="物流"
        left-arrow
        @click-left="
          refundback();
          refund.showrefund = false;
        "
      />
      <Returnlogistics
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
      :style="{ height: '60%' }"
      closeable
    >
      <van-nav-bar title="物流详情" />
      <van-steps active-color="red" direction="vertical" :active="0">
        <van-step v-for="(item, index) in expressDetail" :key="index">
          <div>{{ item.context }}</div>
          <p>{{ item.time }}</p>
        </van-step>
        <!-- <van-step v-for="(item,index) in wuliudata.data" :key="index">
            <div>{{item.context}}</div>
            <p>{{item.time}}</p>
          </van-step> -->
      </van-steps>
    </van-popup>
  </div>
</template>

<script>
import { _uploadFiler } from "@/utils/dom";
import { getAftersale, revokeAftersale, getExpressDetail } from "api";
import Returnlogistics from "@/components/goods/returnlogistics.vue";
import { Dialog, Step, Steps, CountDown } from "vant";

import { mapGetters } from "vuex";

export default {
  name: "v-exchange",
  components: {
    Returnlogistics
  },
  props: {
    refunddta: {},
    aftersaleType: [Number, String],
    exangeType: {
      type: Number,
      default: 1
    },
    chuli: { default: false }
  },

  data() {
    return {
      time: 0,
      active: 0,
      winheight: document.documentElement.clientHeight,
      GoodsState: { show: false },
      type: this.exangeType,
      refund: {
        showrefund: false
      },
      afterSalesInfo: {},
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
  computed: {
    ...mapGetters(["getAfterSaleInfo1"])
  },
  watch: {
    getAfterSaleInfo1: {
      handler: function (val, oldVAL) {
        this.detailsFunction(val);
      },
      deep: true
    }
  },
  filters: {
    filterConsigneeStatus(type) {
      if (type === 1) return "我已收到货";
      else if (type === 2) return "未收到货";
    }
  },
  created() {
    if (!this.chuli) {
      this._getAftersale();
    }
    //  this._getAftersale()
  },
  mounted() {
    // console.log("exangeType=====", this.exangeType);
    this._getAftersale();
  },
  methods: {
    service() {
      window.location.href = `https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b97817351957717cdbb1fb3b53708374ba573672f4fb385cf664728f448ddbba361c3cf4aa02bfe2f013d383c44d38a81ff`;
    },
    handleModify(type, isshow, data) {
      this._getAftersale();
      this.type = type;
      if (isshow === false) this.refund.showrefund = false;
      this.reData = data;
      // this.afterSalesInfo=data
      // this.$emit('modify',1)
    },
    logisticsMessage() {
      this.showWuLiu = true;
      this._getExpressDetail(); //写这

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
          this.$emit("revok");

          revokeAftersale({
            id: this.afterSalesInfo.id,
            opType: 1
          }).then((res) => {
            if (res && res.errorCode == 1) {
              this.$router.push({ name: "order", query: { type: "5" } });
            } else if (res && res.errorCode == 10001) {
              // Dialog.confirm({
              //   // title: '标题',
              //   message: res.msg
              // });
            }
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
          this.detailsFunction(res.data);
          //  this._getExpressDetail() 改了这
          /* this.afterSalesInfo = res.data
                 this.RefundReason.tit = res.data.applyReason
                
                 this.RefundReason.group.forEach(item => {
                    if (res.data.applyReason == item.name) {
                     this.RefundReason.radio = item.id
                   }
                })
                const curTimer = new Date().getTime() // 获取当前时间时间戳 1621166350189
                const fluterTimer = (new Date(res.data.applyTime).getTime()) + 60 * 60 * 24 * 1000  // 获取申请时间+1天(24小时)的时间戳
                // const fluterTimer = 1621166350189 + 60 * 60 * 24 * 1000  // 获取申请时间+1天(24小时)的时间戳
                const subTime = fluterTimer - curTimer // 计算时间戳差值
                this.time = subTime <= 0 ? 0 : subTime // 如果差值为负数则说明时间已超过24小时，否则选择距24小时所剩时间 */
        }
      });
    },
    detailsFunction(data) {
      this.afterSalesInfo = data;
      this.RefundReason.tit = data.applyReason;
      this.RefundReason.group.forEach((item) => {
        if (data.applyReason == item.name) {
          this.RefundReason.radio = item.id;
        }
      });
      const curTimer = new Date().getTime(); // 获取当前时间时间戳 1621166350189

      const fluterTimer =
        new Date(data.applyTime).getTime() + 60 * 60 * 24 * 1000; // 获取申请时间+1天(24小时)的时间戳
      // const fluterTimer = 1621166350189 + 60 * 60 * 24 * 1000  // 获取申请时间+1天(24小时)的时间戳
      const subTime = fluterTimer - curTimer; // 计算时间戳差值
      this.time = subTime <= 0 ? 0 : subTime; // 如果差值为负数则说明时间已超过24小时，否则选择距24小时所剩时间
    },
    modifyOrder() {
      this.$emit(
        "modifyOrder",
        true,
        this.afterSalesInfo.aftersaleType == 1 ? "申请退款" : "申请退货退款"
      );

      // this._getAftersale()
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
      //   applyRefundVoucherMoney:this.afterSalesInfo.applyRefundVoucherMoney || 0
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
        expId: this.afterSalesInfo.expId,
        expSn: this.afterSalesInfo.expSn
      }).then((res) => {
        if (res && res.errorCode == 1) {
          this.expressDetail = res.data && res.data.data;
        }
      });
    },
    anew() {
      // console.log("修改申请");
      this.$emit(
        "anew",
        true,
        this.afterSalesInfo.aftersaleType == 1 ? "申请退款" : "申请退货退款"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.van-icon {
  margin-top: -10px;
}
.van-count-down {
  margin-left: 5.08px;
  font-size: 11px;
  padding-top: 1px;
}
.cardbox {
  padding-top: 10px;
}
.handleclick {
  display: flex;
  justify-content: flex-end;
  height: 50px;
  .modify {
    margin-bottom: 12px;
    margin-right: 20px;
  }
}
.title-box {
  display: flex;
  // margin-top: 8px;
  justify-content: space-between;
  // background-color: #f2f2f2;
  background-image: url(~@/assets/image/tkxq_bg.png);
  background-size: cover;
  align-items: center;
  height: 90px;
  .text {
    line-height: 19px;
    margin-top: -3px;
    display: flex;
    margin-left: 18px;
    flex-direction: column;
  }
  .lock {
    width: 30px;
    height: 30px;
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
  // height: 68.67px;
  margin-left: 4.33px;
  font-size: 18px;
  color: #212121;
  padding-top: 6px;
}
.times {
  margin-top: 29.33px;
  margin-left: 16px;
  font-size: 10px;
  color: #212121;
  margin-bottom: 29.33px;
}
// img {
//   position: absolute;
//   // top: 50px;
//   // margin-top: 10px;
//   line-height: 63px;
//   margin-left: 243.67px;
// }
.a {
  background-color: #f2f2f2;
}
.bg {
  margin-top: -24.375px;
  background-color: #ffffff;
  //  weight: 338.67px;
  //  height: 140.67px;
  margin-left: 10.33px;
  margin-right: 10.67px;
  border-radius: 9.33px;
  margin-bottom: 3px;
  // padding:20px atuo 10px;
}
.bg1 {
  margin: -18.375px auto 0 auto;
  background-color: #ffffff;
  width: 351px;
  // height: 71.33px;
  //  margin-left: 10.33px;
  // margin-right: 1.33px;
  border-radius: 9.33px;
  .tkmoney {
    font-size: 18px;
    margin-left: 12px;
    padding-top: 12px;
  }
  &.reConfug {
    height: auto;
  }
}
.bgs {
  // margin-top: 10px;
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
  height: 130px;
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
  //  weight: 338.67px;
  //  height: 280px;
  margin-left: 10.67px;
  margin-right: 10.67px;
  border-radius: 9.33px;
  margin-bottom: 24.67px;
  padding: 10px 0;
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
  // padding-top: 3px;
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
.buttons {
  // weight: 173.33px;
  // height: 26.67px;
  border-radius: 13.33px;
  text-align: center;
  align-items: center;
  margin-left: 142.5px;
  // margin-right: 10.33px;
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
  margin-left: 3.67px;
  margin-right: 37px;
  margin-top: 13.33px;
  color: #212121;
  font-size: 13.67px;
  .relation1 {
    width: 279.2426px;
    height: 40px;
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
.locations {
  margin-left: 10.33px;
  margin-top: 20px;
}
.van-icons {
  bottom: 35px;
  height: 41px;
  margin-left: 257.83px;
}
.van-icons1 {
  bottom: 45px;
  margin-left: 295.33px;
}
.locations2 {
  margin-left: 13.33px;
  margin-top: 10px;
}
.locationsW {
  margin-left: 13.33px;
  margin-top: 20px;
}
.locations3 {
  margin-left: 13.33px;
  margin-top: -27px;
}
.bgs3 {
  // margin-top: 20px;
  background-color: #ffffff;
  width: 338.67px;
  height: 190.33px;
  margin-left: 10.33px;
  margin-right: 10.33px;
  border-radius: 9.33px;
}
.bgs4 {
  margin-top: 30px;
  background-color: #ffffff;
  width: 338.67px;
  height: 74.33px;
  margin-left: 10.33px;
  margin-right: 10.33px;
  border-radius: 9.33px;
}
.bg6 {
  margin-top: 20px;
  background-color: #ffffff;
  width: 338.67px;
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
// .van-cell__value1 {
//   margin-top: 10px;
// }
</style>
