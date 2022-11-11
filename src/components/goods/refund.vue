<template>
  <div class="refundbox">
    <van-card
      :desc="refunddta.goodsSkuName"
      :title="refunddta.goodsName"
      :thumb="refunddta.goodsLogoImgUrl"
      style="margin-top: 0px"
    >
    </van-card>
    <!-- <div class="h10"></div> -->
    <van-cell-group>
      <van-cell
        title="货物状态"
        :value="GoodsStatel.tit"
        is-link
        @click="GoodsStatel.show = true"
      />
    </van-cell-group>
    <!-- <van-cell-group class="cell-no-border" >
      <van-cell :label="'可修改，最多可退款￥'+refunddta.itemPayMoney" class="paymoney">
        <template #title>
          <div class="cell-box">
            <van-field v-model="refunddta.itemPayMoney" class="re-back-money" type="number" @input="_payinput" label="退款金额：" placeholder="选填" />
            <van-field v-if="refunddta.goodsVoucherMoney" v-model="refunddta.goodsVoucherMoney" class="re-back-money" type="number" @input="_payinput" label="抵用金：" />
          </div>
        </template>
      </van-cell>
    </van-cell-group> -->
    <van-cell-group class="cell-no-border">
      <van-cell :label="'可修改，最多可退款￥' + PayMoney1" class="paymoney">
        <template #title>
          <div class="cell-box">
            <van-field
              v-model="PayMoney"
              class="re-back-money"
              type="number"
              @input="_payinput"
              label="退款金额："
              placeholder="选填"
            />
            <van-field
              v-if="refunddta.voucherMoneyType != 1"
              v-model="refunddta.itemVoucherMoney"
              class="re-back-money"
              type="number"
              :readonly="true"
              @input="_payinput"
              label="抵用金："
            />
            <!-- <van-field
              v-if="refunddta.itemVoucherMoney"
              v-model="refunddta.itemVoucherMoney"
              class="re-back-money"
              type="number"
              @input="_payinput"
              label="抵用金："
            /> -->
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell
        title="退款原因"
        :value="RefundReason.tit"
        is-link
        @click="RefundReason.show = true"
      />
    </van-cell-group>

    <van-field
      row="2"
      type="textarea"
      autosize
      v-model="applyExplain"
      label="退款说明："
    />

    <div class="h10"></div>
    <div class="uploadimg">
      <div class="tit">上传图片</div>
      <van-uploader
        v-model="fileList"
        :after-read="_upshopimg"
        :max-count="6"
        accept="image/*,video/*"
        multiple
      />
    </div>
    <div class="h10"></div>
    <div style="margin: 16px">
      <van-button
        block
        type="danger"
        @click="save(refunddta.itemRefundStatus)"
        native-type="submit"
      >
        提交申请
      </van-button>
    </div>
    <!-- 货物状态 -->
    <van-popup
      round
      v-model="GoodsStatel.show"
      @click-overlay="goodsclosel"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div class="van-picker__toolbar">
        <button
          type="button"
          class="van-picker__cancel"
          @click="
            goodsclosel();
            GoodsStatel.show = false;
          "
        >
          取消
        </button>
        <div class="van-ellipsis van-picker__title">货物状态</div>
        <button
          type="button"
          class="van-picker__confirm"
          @click="
            _GoodsState();
            GoodsStatel.show = false;
          "
        >
          确认
        </button>
      </div>
      <van-radio-group v-model="GoodsStatel.radio" style="margin-top: 10px">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in GoodsStatel.group"
            :key="index"
            :title="item.name"
            clickable
            @click="GoodsStatel.radio = item.id"
          >
            <template #right-icon>
              <van-radio :name="item.id" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>

    <!-- 退款原因 -->
    <van-popup
      round
      v-model="RefundReason.show"
      position="bottom"
      :style="{ height: '30%' }"
      @click-overlay="refundclose"
    >
      <div class="van-picker__toolbar">
        <button
          type="button"
          class="van-picker__cancel"
          @click="
            refundclose();
            RefundReason.show = false;
          "
        >
          取消
        </button>
        <div class="van-ellipsis van-picker__title">退款原因</div>
        <button
          type="button"
          class="van-picker__confirm"
          @click="
            _RefundReason();
            RefundReason.show = false;
          "
        >
          确认
        </button>
      </div>
      <van-radio-group v-model="RefundReason.radio" style="margin-top: 10px">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in RefundReason.group"
            :key="index"
            :title="item.name"
            clickable
            @click="RefundReason.radio = item.id"
          >
            <template #right-icon>
              <van-radio :name="item.id" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>

    <van-popup
      class="a"
      v-model="GoodsState.show"
      @click-overlay="goodsclose"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar
        title="售后详情"
        left-arrow
        @click-left="
          refundback();
          GoodsState.show = false;
        "
      />
      <v-exchange
        :chuli="chuli"
        :refunddta="refunddta"
        ref="refunds"
        :aftersaleType="aftersaleType"
        @revok="revok"
        @modifyOrder="modifyOrder"
        :refundrefresh="refundrefresh"
      ></v-exchange>
    </van-popup>

    <!-- 退款详情 -->
    <!-- <van-popup class="a" v-model="GoodsState.show" @click-overlay="goodsclose" position="bottom" :style="{ height: '100%' }"> 
         <v-refunds :refunddta="refunddta" ref="refunds" :aftersaleType="aftersaleType" :refundrefresh="refundrefresh"></v-refunds>
      </van-popup>   -->

    <!-- 导航栏 -->
    <!-- <van-popup  class="a" v-model="GoodsState.show" @click-overlay="goodsclose" position="bottom" :style="{ height: '100%' }">
     <van-nav-bar
            class="arrows"
            title="退款详情"
            left-arrow
            @click-left="onClickLeft"
           />
        <span class="await">等待商家处理</span><br>
        <span class="times" >还剩23时12分</span>
        <p>
         <img src="../../assets/image/组 3.png" width="63px" height="63px" /> 
         </p>
        <div class="bg">
        <span class="await1">你已成功提交退款申请，请耐心等待商家处理</span><br>
        <span class="await2">商家同意或超过24小时未处理,系统将退款给您商家拒绝，</span><br>
        <span class="await2">您可以重新发起申请或联系平台客服</span><br>
        <div class="van-hairline--bottom">
          <van-button class="revoke" round type="default">撤销申请</van-button>
          <van-button class="modify" round type="default">修改申请</van-button>
        </div>
        </div>
        <div class="bg2">
        <span class='await3'>退款信息</span>
        <van-card
            :desc="refunddta.goodsSkuName"
            :title="refunddta.goodsName"
            :thumb="refunddta.goodsLogoImgUrl" style="margin-top:0px;">
          </van-card>
        </div> 
  
        <div class="bg4">
        <div class="cardbox">
              <div class="cardlist1">
                <div class="item fx1">售后编号:</div>
                <span class="item"><span class="van-card__price-integer"></span></span>
              </div>
              <div class="cardlist">
                <div class="item fx1">货物状态:</div>
                <span class="item"><span class="van-card__price-integer"></span></span>
              </div>

              <div class="cardlist">
                <div class="item fx1">退款金额:</div>
                <span class="item"><span class="van-card__price-integer"></span></span>
              </div>

              <div class="cardlist">
                <div class="item fx1">退款原因:</div>
                <span class="item"><span class="van-card__price-integer"></span></span>
              </div>
              <div class="cardlist">
                <div class="item fx1">退款说明:</div>
                <span class="item"><span class="van-card__price-integer"></span></span>
              </div>

              <div class="cardlist">
                <div class="item fx1">申请时间:</div>
                <span class="item"><span class="van-card__price-integer"></span></span>
              </div>
              <div class="van-hairline--bottom" style= 'margin-top:12px ,font-size: 0.67px'></div>
            
            <div class="contact-node">
              <div class="view" >
                <van-icon class="iconimg"  size="20" color="#1989fa" /> 
                <img class="t" src="../../assets/image/复制.png"  />
                 <span class="txt">联系卖家</span>
                <div class="line"></div>
              </div>
              <span class="ca">|</span>
              
              <div class="view" > 
                <van-icon class="iconimg"  size="20" color="#1989fa" /> 
             <img class="d" src="../../assets/image/分期－联系客服.png"  /> 
             <span class="txt1">联系诚聊客服</span>
              </div>
            </div>
            </div>
        </div>
     </van-popup>
     -->
  </div>
</template>

<script>
import { _uploadFiler } from "@/utils/dom";
import { applyAftersale, getAftersale, editAftersale } from "api";
import vRefunds from "@/components/goods/refunds.vue";
import vExchange from "@/components/goods/exchange.vue";

export default {
  // import Reimburses from '@/components/goods/reimburses.vue'

  name: "refund",
  props: {
    refunddta: {},
    aftersaleType: [Number, String],
    isRemodify: {
      type: Boolean,
      default: false
    }
  },
  components: {
    // Reimburses
    vRefunds,
    vExchange
  },
  data() {
    return {
      show: false,
      GoodsState: { show: false },
      fileList: [],
      upimgfile: [],
      RefundReason: {
        show: false,
        radio: "",
        tit: "请选择",
        group: [
          { id: 1, name: "多拍/拍错/不想要" },
          { id: 2, name: "未按约定时间发货" }
        ]
      },
      GoodsStatel: {
        show: false,
        radio: "",
        tit: "请选择",
        group: [
          { id: 1, name: "我已收到货" },
          { id: 2, name: "未收到货" }
        ]
      },
      applyExplain: "",
      PayMoney: "",
      PayMoney1: "",
      // PayMoney: this.refunddta.itemPayMoney,
      // PayMoney:
      //   this.refunddta.voucherMoneyType == 2
      //     ? this.refunddta.itemVoucherPayMoney
      //     : this.refunddta.itemPayMoney,
      // PayMoney1:
      //   this.refunddta.voucherMoneyType == 2
      //     ? this.refunddta.itemVoucherPayMoney
      //     : this.refunddta.itemPayMoney,
      chuli: false
      // PayMoney:this.refunddta.itemVoucherPayMoney
    };
  },

  created() {
    // console.log(window.localStorage.getItem('getOrderData'))
    let s = JSON.parse(window.localStorage.getItem("getOrderData"));

    const { itemCanUseCoupon, itemPromotionAmount } = this.refunddta;

    if (itemCanUseCoupon) {
      this.PayMoney = this.PayMoney1 = itemPromotionAmount;
      return;
    }

    if (s && s.orderItemVOList.length == 1) {
      if (s.voucherMoneyType == 1) {
        this.PayMoney = s.payMoney;
        this.PayMoney1 = s.payMoney;
        // this.$set(s,payMoney,payMoney)
      } else {
        this.PayMoney = s.voucherPayMoney;
        this.PayMoney1 = s.voucherPayMoney;
        // this.$set(s,voucherPayMoney,s.voucherPayMoney)
      }
      if (this.refunddta.canVoucherMoney) {
        if (this.refunddta.voucherMoneyType == 1) {
          this.PayMoney = s.payMoney;
          this.PayMoney1 = s.payMoney;
        } else {
          this.PayMoney = s.voucherPayMoney;
          this.PayMoney1 = s.voucherPayMoney;
        }
      } else {
        this.PayMoney = s.payMoney;
        this.PayMoney1 = s.payMoney;
      }
    } else {
      if (this.refunddta.voucherMoneyType == 1) {
        this.PayMoney = this.refunddta.itemPayMoney;
        this.PayMoney1 = this.refunddta.itemPayMoney;
      } else {
        this.PayMoney = this.refunddta.itemVoucherPayMoney;
        this.PayMoney1 = this.refunddta.itemVoucherPayMoney;
      }
      if (this.refunddta.canVoucherMoney) {
        if (this.refunddta.voucherMoneyType == 1) {
          this.PayMoney = this.refunddta.itemPayMoney;
          this.PayMoney1 = this.refunddta.itemPayMoney;
        } else {
          this.PayMoney = this.refunddta.itemVoucherPayMoney;
          this.PayMoney1 = this.refunddta.itemVoucherPayMoney;
        }
      } else {
        this.PayMoney = this.refunddta.itemVoucherPayMoney;
        this.PayMoney1 = this.refunddta.itemVoucherPayMoney;
      }
    }
    // console.log(this.isRemodify,this.refunddta.itemRefundStatus);
    // console.log(this.aftersaleType);
    // if (canVoucherMoney) {
    //   this.PayMoney=this.refunddta.itemVoucherPayMoney;
    // } else {
    //   this.PayMoney=this.refunddta.itemPayMoney;
    // }
  },
  mounted() {
    if (!this.isRemodify && this.refunddta.itemRefundStatus == 3) {
      getAftersale({
        orderSn: this.refunddta.orderSn,
        orderItemId: this.refunddta.id
      }).then((res) => {
        this.afterSaleId = res.data.id;
        this.applyExplain = res.data.applyExplain;
        this.RefundReason.tit = res.data.applyReason;
        this.RefundReason.radio = res.data.applyReasonType;
        this.RefundReason.group.forEach((item) => {
          if (res.data.applyReason == item.name) {
            this.RefundReason.radio = item.id;
          }
        });
        const consigneeStatusInfo = this.GoodsStatel.group.filter(
          (group) => group.id == res.data.consigneeStatus
        )[0];

        this.GoodsStatel.tit = consigneeStatusInfo.name;
        this.GoodsStatel.radio = consigneeStatusInfo.id;
        //  this.GoodsStatel.tit=res.data.consigneeStatus==1;
        // console.log(111, res.data);
        res.data.applyImageUrls &&
          res.data.applyImageUrls.split(",").forEach((item) => {
            this.fileList.push({
              url: item,
              isImage: true
            });
          });
        this.PayMoney = res.data.applyRefundMoney;
        console.log(this.payMoney);
        // this.fileList = res.data.JSON.parse(JSON.stringify(this.upimgfile)).join(',')
        // this.fileList = JSON.parse(JSON.stringify(this.upimgfile)).join(',')
        //  this.fileList = JSON.parse(res.data.applyImageUrls)
      });
    }
    if (!this.isRemodify && this.refunddta.itemRefundStatus == 2) {
      getAftersale({
        orderSn: this.refunddta.orderSn,
        orderItemId: this.refunddta.id
      }).then((res) => {
        this.afterSaleId = res.data.id;

        this.PayMoney = res.data.applyRefundMoney;
      });
    }
  },
  methods: {
    revok() {
      this.$emit("revok");
      this.GoodsState.show = false;
    },
    // showPopup(){this.show=true},
    _payinput() {
      // if (this.PayMoney > this.refunddta.itemPayMoney) {
      //   this.$toast('不能大于实付金额！')
      //   return
      // }
      // if (this.PayMoney < 0) {
      //   this.$toast('金额不能小于0！')
      //   return
      // }
    },
    _upshopimg(file) {
      let self = this;
      if (Array.isArray(file) && file.length > 0) {
        file.forEach((item) => {
          item.status = "uploading";
          item.message = "上传中...";
          _uploadFiler(item, 7)
            .then((res) => {
              item.status = "done"; // 上传成功
              self.upimgfile.push(res);
            })
            .catch(() => {
              item.status = "failed";
              item.message = "上传失败";
              self.upimgfile = [];
            });
        });
      } else {
        file.status = "uploading";
        file.message = "上传中...";
        _uploadFiler(file, 7)
          .then((res) => {
            file.status = "done"; // 上传成功
            self.upimgfile.push(res);
          })
          .catch(() => {
            file.status = "failed";
            file.message = "上传失败";
            self.upimgfile = [];
          });
      }
    },
    refundclose() {
      if (this.RefundReason.tit == "请选择") {
        this.RefundReason.tit = "请选择";
        this.RefundReason.radio = "";
      }
    },
    goodsclosel() {
      if (this.GoodsStatel.tit == "请选择") {
        this.GoodsStatel.tit = "请选择";
        this.GoodsStatel.radio = "";
      }
    },
    goodsclose() {
      if (this.GoodsStatel.tit == "请选择") {
        this.GoodsStatel.tit = "请选择";
        this.GoodsStatel.radio = "";
      }
    },
    _GoodsState() {
      if (this.GoodsStatel.radio == "") {
        this.$toast("请选择货物状态");
        return;
      }
      this.GoodsStatel.tit =
        this.GoodsStatel.group[this.GoodsStatel.radio - 1].name;
    },
    refundrefresh() {
      this.refunds.showrefund = false;
      this.$emit("refresh");
    },
    _RefundReason() {
      if (this.RefundReason.radio == "") {
        this.$toast("请选择退款原因");
        return;
      }
      this.RefundReason.tit =
        this.RefundReason.group[this.RefundReason.radio - 1].name;
    },
    inits() {
      // this.GoodsState.radio = ''
      this.GoodsStatel.radio = "";
      this.RefundReason.radio = "";
      // this.GoodsState.tit = '请选择'
      this.GoodsStatel.tit = "请选择";
      this.RefundReason.tit = "请选择";
    },
    refundback() {
      this.$refs.refunds.type = 1;
      this.$emit("defrefresh");
      this.$router.go(-1);
      // this.$router.push({path:'/order'})
    },
    save(status) {
      let judgeStatus = status;
      if (!judgeStatus) {
        judgeStatus = window.localStorage.getItem("isInit_refund") || null;
      }
      // this.GoodsState.show= true
      if (this.GoodsStatel.radio == "") {
        this.$toast("请选择货物状态");
      } else if (this.RefundReason.radio == "") {
        this.$toast("请选择退款原因");
      } else {
        let data = {
          orderItemId: this.refunddta.id,
          // aftersaleType: this.aftersaleType,
          aftersaleType: 1,
          applyRefundMoney: this.PayMoney,
          applyReasonType: this.RefundReason.radio, // 退款原因
          consigneeStatus: this.GoodsStatel.radio, // 货物状态
          applyExplain: this.applyExplain,
          applyImageUrls: JSON.parse(JSON.stringify(this.upimgfile)).join(","),
          applyRefundVoucherMoney: this.refunddta.itemVoucherMoney || 0
        };
        // console.log(data);
        let money =
          this.refunddta.voucherMoneyType == 1
            ? this.refunddta.itemPayMoney
            : this.refunddta.itemVoucherPayMoney;
        if (this.PayMoney > money || this.PayMoney < 0) {
          this.$toast("请检查退款金额");
        } else {
          if (judgeStatus == null) {
            this.chuli = true;
            applyAftersale(data).then((res) => {
              // console.log('apply',res);
              if (res && res.errorCode == 1) {
                this.$toast("提交成功");
                this.$emit("refundrefresh");
                window.localStorage.setItem("isInit_refund", 6);
                this.inits();
                this.$router.go(-1);
              }

              // this.GoodsState.show=true
            });
          } else if (judgeStatus != 1) {
            editAftersale({ id: this.afterSaleId, ...data }).then((res) => {
              if (res && res.errorCode == 1) {
                this.afterSalesInfo = res.data;
                this.GoodsState.show = true;

                //  this.PayMoney=data.applyRefundMoney
                //  this.$refs.refunds._getAftersale()
                //  console.log(this.PayMoney);
              }
            });
          }
        }
      }
    },
    // 修改申请
    modifyOrder() {
      // this._isRemodify = isRemodify
      this.GoodsState.show = false;
      getAftersale({
        orderSn: this.refunddta.orderSn,
        orderItemId: this.refunddta.id
      }).then((res) => {
        this.applyExplain = res.data.applyExplain;
        this.afterSaleId = res.data.id;
        this.RefundReason.tit = res.data.applyReason;
        this.RefundReason.radio = res.data.applyReasonType;
        this.RefundReason.group.forEach((item) => {
          if (res.data.applyReason == item.name) {
            this.RefundReason.radio = item.id;
          }
        });

        // this.fileList = res.data.JSON.parse(JSON.stringify(this.upimgfile)).join(',')
        // this.fileList = JSON.parse(JSON.stringify(this.upimgfile)).join(',')
        // console.log(this.fileL);
      });
      // this.$parent.refreshRefund()
      // getAftersale({
      //   orderSn: ,
      //   orderItemId:
      // }).then(res => {
      //   console.log(res)
      // })
    },
    onClickLeft() {
      this.$router.go(-1);
      // Toast('返回');
    }
  },
  watch: {
    refunddta: function (val) {
      const { itemCanUseCoupon, itemPromotionAmount } = this.refunddta;

      if (itemCanUseCoupon) {
        this.PayMoney = this.PayMoney1 = itemPromotionAmount;
        return;
      }

      if (this.refunddta.voucherMoneyType == 1) {
        this.PayMoney = this.refunddta.itemPayMoney;
        this.PayMoney1 = this.refunddta.itemPayMoney;
      } else {
        this.PayMoney = this.refunddta.itemVoucherPayMoney;
        this.PayMoney1 = this.refunddta.itemVoucherPayMoney;
      }
      if (this.refunddta.canVoucherMoney) {
        if (this.refunddta.voucherMoneyType == 1) {
          this.PayMoney = this.refunddta.itemPayMoney;
          this.PayMoney1 = this.refunddta.itemPayMoney;
        } else {
          this.PayMoney = this.refunddta.itemVoucherPayMoney;
          this.PayMoney1 = this.refunddta.itemVoucherPayMoney;
        }
      } else {
        this.PayMoney = this.refunddta.itemVoucherPayMoney;
        this.PayMoney1 = this.refunddta.itemVoucherPayMoney;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.paymoney {
  display: flex;
  justify-content: space-between;
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
  padding-top: 10px;
}
img {
  position: absolute;
  top: 59px;
  line-height: 63px;
  margin-left: 243.67px;
}
.a {
  background-color: #f2f2f2;
}
.bg {
  margin-top: 30px;
  background-color: #ffffff;
  weight: 338.67px;
  height: 133.33px;
  margin-left: 10.67px;
  margin-right: 10.67px;
  border-radius: 9.33px;
}
.await1 {
  color: #212121;
  top: 147.33px;
  margin-left: 24.33px;
  font-size: 13px;
}
.await2 {
  color: #999999;
  top: 147.33px;
  margin-left: 24.33px;
  font-size: 13px;
  display: inline-block;
  white-space: nowrap;
}
.van-hairline--bottom {
  // margin-bottom: 81.33px;
  padding-top: 13.33px;
  color: #e6e6e6;
}
.bg2 {
  margin-top: 10px;
  background-color: #ffffff;
  width: 338.67px;
  height: 118px;
  margin-left: 10.67px;
  margin-right: 10.67px;
  border-radius: 9.33px;
}

.bg3 {
  margin-top: 20px;
  background-color: #ffffff;
  width: 338.67px;
  height: 118px;
  margin-left: 10.67px;
  margin-right: 10.67px;
  border-radius: 9.33px;
}
.bg4 {
  margin-top: 20px;
  background-color: #ffffff;
  width: 338.67px;
  height: 280px;
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
}
.cardlist1 {
  margin-top: 10px;
  display: flex;
  margin-left: 9.67px;
  font-size: 11px;
  padding: 6px;
  color: #999999;
}
.cardlist {
  margin-top: 10px;
  display: flex;
  margin-left: 9.67px;
  font-size: 11px;
  padding: 5px;
  color: #999999;
}
.txt {
  margin-top: -5px;
  display: flex;
  margin-left: 71.67px;
  font-size: 11px;
  color: #212121;
}
.txt1 {
  margin-top: -80px;
  display: flex;
  margin-left: 229.67px;
  font-size: 11px;
  color: #212121;
}
.c {
  margin-bottom: 24.67px;
  display: flex;
  margin-left: 168.67px;
  font-size: 11px;
  weight: 0.67px;
  height: 20px;
  color: #cf0000;
}
.ca {
  margin-bottom: 24.67px;
  display: flex;
  margin-left: 168.67px;
  font-size: 11px;
  weight: 0.67px;
  height: 20px;
  color: #cf0000;
}
.t {
  weight: 12.83px;
  height: 12.97px;
  margin-top: 746px;
  margin-left: 51.67px;
}
.d {
  weight: 12.83px;
  height: 12.97px;
  margin-top: 746px;
  margin-left: 209.33px;
}
:deep(.van-cell .van-field__label) {
  margin-right: -6px !important;
}
:deep(.re-back-money .van-field__body) {
  position: relative;
  &::before {
    position: absolute;
    left: -15px;
    top: 0;
    content: "￥";
    color: #ee0a24;
  }
  .van-field__control {
    color: #ee0a24;
  }
}
:deep(.uploadimg) {
  .van-uploader__upload {
    .van-icon {
      font: inherit;
    }
    .van-icon-photograph::before {
      content: "+";
      font-size: 52px;
    }
  }
}
// 在加号后面显示
:deep(.van-uploader__wrapper) {
  // flex-direction:row-reverse
}
:deep(.cell-no-border) {
  .van-cell::after {
    border-bottom: 0;
  }
  .cell-box {
    display: flex;
  }
}
</style>
