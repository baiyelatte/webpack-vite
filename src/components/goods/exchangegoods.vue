<template>
  <div class="refundbox">
    <van-card
      :desc="refunddta.goodsSkuName"
      :title="refunddta.goodsName"
      :thumb="refunddta.goodsLogoImgUrl"
      style="margin-top: 0px"
    >
    </van-card>

    <div class="h10"></div>
    <!-- <van-cell-group class="cell-no-border"  v-if="refunddta.goodsVoucherMoney">
      <van-cell :label="'可修改，最多可退款￥'+PayMoney1" class="paymoney">
        <template #title>
         <div class="cell-box">
            <van-field v-model="PayMoney1" class="re-back-money" type="number" @input="_payinput" label="退款金额：" placeholder="选填" />
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
              @input="_payinput"
              :readonly="true"
              label="抵用金："
            />
            <!-- <van-field v-if="refunddta.itemVoucherMoney" v-model="refunddta.itemVoucherMoney" class="re-back-money" type="number" @input="_payinput" label="抵用金：" /> -->
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <!--  <van-cell title="货物状态" :value="GoodsState.tit" is-link @click="GoodsState.show = true"/> -->
      <van-cell
        title="退货退款原因："
        :value="RefundReason.tit"
        is-link
        @click="RefundReason.show = true"
      />
    </van-cell-group>
    <van-cell-group class="tuih">
      <van-field
        rows="2"
        maxlength="30"
        v-model="applyExplain"
        type="textarea"
        label="退货退款说明："
      />
    </van-cell-group>
    <div class="h10"></div>

    <div class="uploadimg">
      <div class="tit">上传图片：（最多6张）</div>
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

    <!-- 退款原因 -->
    <van-popup
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
        <div class="van-ellipsis van-picker__title">退货退款原因</div>
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
  </div>
</template>

<script>
import { _uploadFiler } from "@/utils/dom";
import { applyAftersale, getAftersale, editAftersale } from "api";
import vExchange from "@/components/goods/exchange.vue";

export default {
  name: "exchangegoods",
  props: {
    refunddta: {},
    aftersaleType: [Number, String],
    isRemodify: {
      type: Boolean,
      default: false
    },
    isRemodify1: {
      type: Boolean,
      default: false
    }
  },
  components: {
    // Reimburses
    //  vRefunds
    vExchange
  },
  data() {
    return {
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
      applyExplain: "",
      // PayMoney: this.refunddta.itemPayMoney,
      // PayMoney1: this.refunddta.itemVoucherPayMoney,
      PayMoney1: "",
      PayMoney: "",
      // PayMoney: this.refunddta.voucherMoneyType==2?this.refunddta.itemVoucherPayMoney:this.refunddta.itemPayMoney,
      chuli: false
      // PayMoney:this.refunddta.itemVoucherPayMoney
    };
  },
  created() {
    // console.log(this.refunddta,'----');
    // console.log(this.isRemodify);
    let s = JSON.parse(localStorage.getItem("getOrderData"));

    const { itemCanUseCoupon, itemPromotionAmount } = this.refunddta;

    if (itemCanUseCoupon) {
      this.PayMoney = this.PayMoney1 = itemPromotionAmount;
      return;
    }

    if (s.orderItemVOList.length == 1) {
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

    // if (this.refunddta.voucherMoneyType == 1) {
    //   this.PayMoney = this.refunddta.itemPayMoney;
    //   this.PayMoney1 = this.refunddta.itemPayMoney;
    // } else {
    //   this.PayMoney = this.refunddta.itemVoucherPayMoney;
    //   this.PayMoney1 = this.refunddta.itemVoucherPayMoney;
    // }
    // if (this.refunddta.canVoucherMoney) {
    //   if (this.refunddta.voucherMoneyType == 1) {
    //     this.PayMoney = this.refunddta.itemPayMoney;
    //     this.PayMoney1 = this.refunddta.itemPayMoney;
    //   } else {
    //     this.PayMoney = this.refunddta.itemVoucherPayMoney;
    //     this.PayMoney1 = this.refunddta.itemVoucherPayMoney;
    //   }
    // } else {
    //   this.PayMoney = this.refunddta.itemVoucherPayMoney;
    //   this.PayMoney1 = this.refunddta.itemVoucherPayMoney;
    // }
  },
  watch: {
    refunddta: function (val) {
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
  },
  mounted() {
    if (this.isRemodify && this.refunddta.itemRefundStatus != null) {
      getAftersale({
        orderSn: this.refunddta.orderSn,
        orderItemId: this.refunddta.id
      }).then((res) => {
        this.applyExplain = res.data.applyExplain;
        this.afterSaleId = res.data.id;
        this.RefundReason.tit = res.data.applyReason;
        this.RefundReason.radio = res.data.applyReasonType;
        // this.RefundReason.group.forEach(item => {
        //   console.log(res.data.applyReason, item.name);
        //   if (res.data.applyReason == item.name) {
        //     this.RefundReason.radio = item.id
        //     this.RefundReason.tit=item.name
        //   }
        // })

        res.data.applyImageUrls &&
          res.data.applyImageUrls.split(",").forEach((item) => {
            this.fileList.push({
              url: item,
              isImage: true
            });
          });
        this.PayMoney = res.data.applyRefundMoney;
        // this.fileList = res.data.JSON.parse(JSON.stringify(this.upimgfile)).join(',')
        // this.fileList = JSON.parse(JSON.stringify(this.upimgfile)).join(',')
        //  this.fileList = JSON.parse(res.data.applyImageUrls)
      });
    }
    if (!this.isRemodify && this.refunddta.itemRefundStatus != null) {
      getAftersale({
        orderSn: this.refunddta.orderSn,
        orderItemId: this.refunddta.id
      }).then((res) => {
        this.afterSaleId = res.data.id;
        // this.applyExplain = res.data.applyExplain
        // this.RefundReason.tit = res.data.applyReason
        // this.RefundReason.radio = res.data.applyReasonType

        // res.data.applyImageUrls&&res.data.applyImageUrls.split(',').forEach(item=>{
        //   console.log(item,'1122');
        //   this.fileList.push({
        //     url:item,
        //     isImage:true
        //   })
        // })
        this.PayMoney = res.data.applyRefundMoney;
      });
    }
  },
  methods: {
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

    revok() {
      this.$emit("revok");
      this.GoodsState.show = false;
    },
    modify(aftersaleType) {
      this.GoodsState.show = false;
      this.aftersaleType = aftersaleType;
    },
    refundclose() {
      if (this.RefundReason.tit == "请选择") {
        this.RefundReason.tit = "请选择";
        this.RefundReason.radio = "";
      }
    },

    goodsclose() {
      if (this.GoodsStatel.tit == "请选择") {
        this.GoodsStatel.tit = "请选择";
        this.GoodsStatel.radio = "";
      }
    },
    //  refundrefresh () {
    //     this.refund.showrefund = false
    //     this.$emit('refresh')
    //   },
    refundback() {
      this.$refs.refunds.type = 1;
      this.$emit("defrefresh");
      this.$router.go(-1);
      // this.$router.push({path:'/order'})
    },
    inits() {},
    // inits(){},
    refundrefresh() {
      this.refund.GoodsState = false;
      this.$emit("refresh");
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

    /*     _GoodsState () {
      if(this.GoodsState.radio == ''){
        this.$toast('请选择货物状态')
        return
      }
      this.GoodsState.tit = this.GoodsState.group[this.GoodsState.radio-1].name
    }, */
    _RefundReason() {
      if (this.RefundReason.radio == "") {
        this.$toast("请选择退货退款原因");
        return;
      }
      this.RefundReason.tit =
        this.RefundReason.group[this.RefundReason.radio - 1].name;
    },
    inits() {
      // this.GoodsState.radio = ''
      this.RefundReason.radio = "";
      // this.GoodsState.tit = '请选择'
      this.RefundReason.tit = "请选择";
    },
    save(status) {
      console.log(status, "263");
      let judgeStatus = status;
      if (!judgeStatus) {
        judgeStatus = window.localStorage.getItem("isInit_refund") || null;
      }
      if (this.RefundReason.radio == "") {
        this.$toast("请选择退货退款原因");
        // return
      } else {
        // console.log('this.refunddta', this.refunddta)
        // this.GoodsState.show=true
        let data = {
          orderItemId: this.refunddta.id,
          // aftersaleType: 2,
          aftersaleType: 2,
          consigneeStatus: 1,
          applyRefundMoney: this.PayMoney,
          applyReasonType: this.RefundReason.radio,
          // consigneeStatus: this.RefundReason.radio, // 退款原因
          // applyReasonType: this.GoodsState.radio, // 货物状态
          applyExplain: this.applyExplain,
          applyImageUrls: JSON.parse(JSON.stringify(this.upimgfile)).join(","),
          applyRefundVoucherMoney: this.refunddta.itemVoucherMoney || 0
        };
        let money =
          this.refunddta.voucherMoneyType == 1
            ? this.refunddta.itemPayMoney
            : this.refunddta.itemVoucherPayMoney;
        if (this.PayMoney > money || this.PayMoney < 0) {
          this.$toast("请检查退款金额");
        } else {
          // return
          //  console.log(111);
          if (judgeStatus == null) {
            this.chuli = true;
            // console.log(data,'ssshhhh');
            applyAftersale(data).then((res) => {
              // console.log(data);
              if (res && res.errorCode == 1) {
                //  this.PayMoney=data.applyRefundMoney
                // this.$refs.refunds._getAftersale()
                this.$store.commit("setAfterSaleInfo", res.data);
                window.localStorage.setItem("isInit_refund", 6);
                this.GoodsState.show = true;
              }
              // this.$router.push({name:'order',query:{ type:'11' }})
            });
          } else if (judgeStatus != 1) {
            editAftersale({ id: this.afterSaleId, ...data }).then((res) => {
              if (res && res.errorCode == 1) {
                this.afterSalesInfo = res.data;
                this.GoodsState.show = true;

                //  this.PayMoney=data.applyRefundMoney
                this.$refs.refunds?._getAftersale();
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
    }
  }
};
</script>

<style lang="scss" scoped>
:deep(.van-uploader__wrapper) {
  // flex-direction:row-reverse
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

:deep(.van-cell .van-field__label) {
  margin-right: -6px !important;
  // width: 30%;
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
:deep(.cell-no-border) {
  .van-cell::after {
    border-bottom: 0;
  }
  .cell-box {
    display: flex;
  }
}
:deep(.tuih) {
  .van-field__label {
    width: 30%;
  }
}
</style>
