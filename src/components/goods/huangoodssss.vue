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
      <!-- <van-cell title="换货商品" :value="GoodsState.tit" is-link @click="GoodsState.show = true"/> -->
      <van-cell
        title="换货原因："
        :value="RefundReason.tit"
        is-link
        @click="RefundReason.show = true"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        row="2"
        type="textarea"
        v-model="applyExplain"
        label="换货说明："
      />
    </van-cell-group>
    <div class="h10"></div>
    <div class="uploadimg">
      <div class="tit">上传图片：（最多上传6张）</div>
      <van-uploader
        v-model="fileList"
        :after-read="_upshopimg"
        :max-count="3"
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
          {{ orderdata.consigneeName }}：{{ orderdata.consigneeMobile }}
        </div>
        <div>
          {{ orderdata.consigneeProvince }}{{ orderdata.consigneeCity
          }}{{ orderdata.consigneeCounty }}{{ orderdata.consigneeAddress }}
        </div>
      </div>
    </div>
    <div style="margin: 16px">
      <van-button block type="danger" @click="save" native-type="submit">
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

    <!-- 换货详情 -->
    <!-- <van-popup class="a" v-model="GoodsState.show" @click-overlay="goodsclose" position="bottom" :style="{ height: '100%' }"> -->
    <!-- 导航栏 -->
    <!-- <van-nav-bar
            class="arrows"
            title="换货详情"
            left-arrow
            @click-left="onClickLeft"
           />
        <span class="await">等待商家处理</span><br>
        <span class="times">还剩23时12分</span>
        <p>
        <img src="../../assets/image/组 3.png" width="63px" height="63px" />
        </p>
        <div class="bg">
        <span class="await1">你已成功提交换货申请，请耐心等待商家处理</span><br>
        <span class="await2">商家同意或超过24小时未处理，换货申请将达成</span><br>
        <span class="await2">商家拒绝，您可以修改申请再次发起或联系平台客服</span><br>
        <div class="van-hairline--bottom"></div>
        </div>
        <div class="bg2">
        <span class='await3'>原商品信息</span>
        <van-card
            :desc="refunddta.goodsSkuName"
            :title="refunddta.goodsName"
            :thumb="refunddta.goodsLogoImgUrl" style="margin-top:0px;">
          </van-card>
        </div>
        <div class="bg3">
        <span class='await3'>换货后商品信息</span>
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
                <div class="item fx1">收货地址:</div>
                <span class="item"><span class="van-card__price-integer"></span></span>
              </div>

              <div class="cardlist">
                <div class="item fx1">收货手机:</div>
                <span class="item"><span class="van-card__price-integer"></span></span>
              </div>

              <div class="cardlist">
                <div class="item fx1">收货人:</div>
                <span class="item"><span class="van-card__price-integer"></span></span>
              </div>

              <div class="cardlist">
                <div class="item fx1">换货原因:</div>
                <span class="item"><span class="van-card__price-integer"></span></span>
              </div>

              <div class="cardlist">
                <div class="item fx1">换货说明:</div>
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
     </van-popup> -->
  </div>
</template>

<script>
import { _uploadFiler } from "@/utils/dom";
import { applyAftersale } from "api";
export default {
  name: "huangoods",
  props: {
    refunddta: {},
    orderdata: {},
    aftersaleType: Number
  },
  data() {
    return {
      fileList: [],
      upimgfile: [],
      RefundReason: {
        show: false,
        radio: "",
        tit: "请选择",
        group: [
          { id: 1, name: "多拍、拍错、不想要" },
          { id: 2, name: "未按约定时间发货" }
        ]
      },
      GoodsState: {
        // show: false,
        radio: "",
        tit: "请选择"
        /*   group: [
          { id: 1, name: "我已收到货" },
          { id: 2, name: "未收到货" }
        ] */
      },
      applyExplain: "",
      PayMoney: this.refunddta.itemPayMoney
    };
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
    refundclose() {
      if (this.RefundReason.tit == "请选择") {
        this.RefundReason.tit = "请选择";
        this.RefundReason.radio = "";
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
        this.$toast("请选择换货原因");
        return;
      }
      this.RefundReason.tit =
        this.RefundReason.group[this.RefundReason.radio - 1].name;
    },
    inits() {
      this.GoodsState.radio = "";
      this.RefundReason.radio = "";
      // this.GoodsState.tit = '请选择'
      this.RefundReason.tit = "请选择";
    },
    save() {
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
      };
      applyAftersale(data).then((res) => {
        if (res && res.errorCode == 1) {
          this.$toast("退款中...");
          this.$emit("refundrefresh");
          this.inits();
        }
      });
    }
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
</style>
