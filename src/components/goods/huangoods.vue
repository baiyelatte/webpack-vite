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

    <van-cell-group>
      <!--  <van-cell title="货物状态" :value="GoodsState.tit" is-link @click="GoodsState.show = true"/> -->
      <van-cell
        title="换货原因："
        :value="RefundReason.tit"
        is-link
        @click="RefundReason.show = true"
      />
    </van-cell-group>
    <van-cell-group class="tuih">
      <van-field
        rows="2"
        v-model="applyExplain"
        type="textarea"
        label="换货说明："
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

    <div
      class="van-cell van-cell--center van-cell--borderless van-contact-card van-contact-card--edit"
    >
      <van-icon class="mapico" name="location" size="16" />
      <div
        class="van-cell__value van-cell__value--alone van-contact-card__value"
      >
        <div>
          {{ nowOrderdata.consigneeName }}：
          {{ nowOrderdata.consigneeMobile }}
        </div>
        <div>
          {{ nowOrderdata.consigneeProvince }}
          {{ nowOrderdata.consigneeCity }}
          {{ nowOrderdata.consigneeCounty }}
          {{ nowOrderdata.consigneeAddress }}
        </div>
      </div>
    </div>

    <div style="margin: 16px">
      <van-button
        block
        type="danger"
        @click="save(refunddta.itemRefundStatus)"
        native-type="submit"
      >
        提交申请1
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
        <div class="van-ellipsis van-picker__title">换货原因</div>
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
            @click="RefundReason.radio = `${item.id}`"
          >
            <template #right-icon>
              <van-radio :name="`${item.id}`" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>

    <van-popup
      class="a"
      v-model="GoodsStates.show"
      @click-overlay="goodsclose"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar
        title="换货详情"
        left-arrow
        @click-left="
          refundback();
          GoodsStates.show = false;
        "
      />
      <Fordetails
        :huan="huan"
        :refunddta="refunddta"
        ref="refunds"
        :aftersaleType="aftersaleType"
        @revok1="revok1"
        @modifyOrders="modifyOrders"
        :refundrefresh="refundrefresh"
      ></Fordetails>
    </van-popup>
  </div>
</template>

<script>
import { _uploadFiler } from "@/utils/dom";
import { applyAftersale, getAftersale, editAftersale } from "api";
// import vExchange from '@/components/goods/exchange.vue'
import Fordetails from "@/components/goods/fordetails.vue";
export default {
  name: "huangoods",
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
    //  vRefunds
    // vExchange,
    Fordetails
  },
  created() {
    this.initData();
  },
  data() {
    return {
      huanIsInit: "",
      GoodsStates: { show: false },
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
      PayMoney: this.refunddta.itemPayMoney,

      nowOrderdata: {
        consigneeName: "",
        consigneeMobile: "",
        consigneeProvince: "",
        consigneeCity: "",
        consigneeCounty: "",
        consigneeAddress: ""
      },
      huan: false
    };
  },
  mounted() {
    // if( window.localStorage.getItem('huangoods') !=='') {
    //   if( window.localStorage.getItem('huangoods') === 'true') {
    //     this.GoodsStates.show = true
    //   } else if ( window.localStorage.getItem('huangoods') ==='false') {
    //  }{
    //     this.GoodsStates.show = true
    //   }
    // }
    if (this.isRemodify) {
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
      });
    }
  },
  methods: {
    _payinput() {
      if (this.PayMoney > this.refunddta.itemPayMoney) {
        this.$toast("不能大于实付金额！");
        return;
      }
      if (this.PayMoney < 0) {
        this.$toast("金额不能小于0！");
        return;
      }
    },
    initData() {
      // 获取当前订单信息
      let nod = window.localStorage.getItem("getOrderData");
      this.nowOrderdata = JSON.parse(nod);
    },
    revok1() {
      this.$emit("revok1");
      this.GoodsStates.show = false;
    },
    modify(aftersaleType) {
      this.GoodsStates.show = false;
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
    },
    inits() {},
    // inits(){},
    refundrefresh() {
      this.refund.GoodsStates = false;
      this.$emit("refresh");
    },

    _upshopimg(file) {
      let self = this;
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
        this.$toast("请选择换货原因");
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
      // console.log('shuj',this.refunddta);
      this.huan = true;
      let judgStatus = status;
      if (!judgStatus) {
        judgStatus = window.localStorage.getItem("isInit") || null;
      }
      if (this.RefundReason.radio == "") {
        this.$toast("请选择换货原因");
        return;
      }
      let data = {
        orderItemId: this.refunddta.id,
        aftersaleType: this.aftersaleType,
        applyRefundMoney: this.PayMoney,
        consigneeStatus: this.RefundReason.radio, // 货物状态
        applyReasonType: this.GoodsState.radio, // 退款原因
        // applyReasonType:this.RefundReason.radio,
        applyExplain: this.applyExplain,
        applyImageUrls: JSON.parse(JSON.stringify(this.upimgfile)).join(",")
        // return
      };
      /*
      else{
        // console.log('this.refunddta', this.refunddta)
        this.GoodsStates.show=true
        let data = {
          orderItemId: this.refunddta.id,  
          // aftersaleType: 2,
          aftersaleType: 3,
          consigneeStatus:1,
          applyRefundMoney: this.PayMoney,
          applyReasonType:this.RefundReason.radio,
          // consigneeStatus: this.RefundReason.radio, // 退款原因
          // applyReasonType: this.GoodsState.radio, // 货物状态
          applyExplain: this.applyExplain,
          applyImageUrls: JSON.parse(JSON.stringify(this.upimgfile)).join(','),
          applyRefundVoucherMoney:this.refunddta.itemVoucherMoney || 0
        }
       */

      let check = window.localStorage.getItem("huanIsInit");
      // console.log("check huanIsInit-----------",check)
      //         console.log("this-----------",this)

      if (check != 1 && this.afterSaleId == null) {
        // if(data.applyExplain==null||data.applyExplain==""){
        //   this.$toast("换货原因不能为空");
        //   return;
        // }
        applyAftersale(data).then((res) => {
          if (res && res.errorCode == 1) {
            this.GoodsStates.show = true;
            // this.$refs.refunds._getAftersale()
            // 缓存状态：已成功首次申请换货
            window.localStorage.setItem("huanIsInit", 1);
            window.localStorage.getItem("isInit") || null;
          }
          //  window.localStorage.setItem('huanIsInit',1)

          // this.$router.push({name:'order',query:{ type:'11' }})
        });
      } else {
        editAftersale({ id: this.afterSaleId, ...data }).then((res) => {
          if (res && res.errorCode == 1) {
            this.afterSalesInfo = res.data;
            this.$refs.refunds._getAftersale();
          }
        });
      }
    }
  },
  // 修改申请
  modifyOrders(isRemodify) {
    // this._isRemodify = isRemodify
    this.GoodsStates.show = false;
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
    });
    // this.$parent.refreshRefund()
    // getAftersale({
    //   orderSn: ,
    //   orderItemId:
    // }).then(res => {
    //   console.log(res)
    // })
  }
};
</script>

<style lang="scss" scoped>
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
  .van-icon {
    font: inherit;
  }
  .van-icon-photograph::before {
    content: "+";
    font-size: 52px;
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
.mapico {
  background-color: #fc0000;
  border-radius: 100%;
  padding: 6px;
  color: #fff;
}
.van-contact-card::before {
  background: none;
}
</style>
