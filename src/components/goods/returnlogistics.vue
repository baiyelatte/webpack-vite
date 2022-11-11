<template>
  <div class="refundbox">
    <van-cell-group>
      <van-field
        v-model="receiveName"
        label="收货人："
        placeholder="请输入收货人"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        readonly
        clickable
        name="area"
        :value="value"
        label="地区选择"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>
      <!-- <van-field v-model="receiveAddr1" label="收货地址：" placeholder="请输入收货地址"/> -->
      <!-- <van-area :area-list="areaList" label="收货地址：" placeholder="请输入收货地址"/> -->
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="receiveAddr2"
        label="详细地址:"
        placeholder="请输入详细地址"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="receiveTel"
        label="联系电话:"
        placeholder="请输入联系电话"
      />
    </van-cell-group>
    <van-cell-group>
      <!--  <van-cell title="货物状态" :value="GoodsState.tit" is-link @click="GoodsState.show = true"/> -->
      <van-cell
        title="物流公司："
        :value="RefundReason.tit"
        is-link
        @click="RefundReason.show = true"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="expSn"
        label="快递单号："
        placeholder="请输入快递单号"
      />
    </van-cell-group>

    <van-cell-group>
      <van-field
        rows="2"
        v-model="shipExplain"
        type="textarea"
        placeholder="请填写退货说明"
        label="退货说明："
      />
    </van-cell-group>
    <div class="uploadimg">
      <div class="tit">上传凭证</div>
      <van-uploader
        v-model="expUrls"
        :after-read="_upshopimg"
        :max-count="6"
        accept="image/*,video/*"
        multiple
      />
    </div>

    <div style="margin: 16px">
      <van-button block type="danger" @click="save" native-type="submit">
        提交退货信息
      </van-button>
    </div>
    <!-- 货物状态 -->

    <!-- 选择物流公司 -->
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
        <div class="van-ellipsis van-picker__title">选择物流公司</div>
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
      <van-radio-group v-model="RefundReason.radio">
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
  </div>
</template>

<script>
import { _uploadFiler } from "@/utils/dom";
// import { applyAftersale } from "api";
import { returnShipments, logistics } from "api";
import areaList from "@/utils/area";
export default {
  name: "returnlogistics",
  props: {
    refunddta: {},
    aftersaleType: [Number, String],
    afterSalesInfo: {}
  },
  data() {
    return {
      value: "",
      showArea: false,
      areaList, // 数据格式见 Area 组件文档
      fileList: [],
      upimgfile: [],
      RefundReason: {
        show: false,
        radio: "",
        tit: "请选择",
        group: []
      },
      GoodsState: {
        show: false,
        radio: "",
        tit: "请选择"
        /*   group: [
          { id: 1, name: "我已收到货" },
          { id: 2, name: "未收到货" }
        ] */
      },
      applyExplain: "",
      PayMoney: this.refunddta.itemPayMoney,

      value: "",
      value1: "",
      value2: "",
      value3: "",
      receiveName: "",
      receiveTel: "",
      receiveAddr1: "",
      receiveAddr2: "",
      expName: "",
      expId: "",
      expSn: "",
      expUrls: [],
      shipExplain: ""
    };
  },
  created() {
    this._logistics();
  },
  methods: {
    onConfirm(values) {
      this.value = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    },
    refundback() {
      this.$refs.refund.inits();
      this.$emit("defrefresh");
    },
    // inits(){},
    refundrefresh() {
      this.refund.showrefund = false;
      this.$emit("refresh");
    },
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
        this.$toast("请选择退货退款原因");
        return;
      }
      this.RefundReason.tit =
        this.RefundReason.group[this.RefundReason.radio - 1].name;
    },
    inits() {
      this.GoodsState.radio = "";
      this.RefundReason.radio = "";
      this.RefundReason.tit = "请选择";
    },
    save() {
      // this.$emit('handleModify',3,false,data)

      if (this.receiveName == "") {
        this.$toast("请输入收货人");
        return;
      }
      if (this.value == "") {
        this.$toast("请输入收货地址");
        return;
      }
      if (this.receiveAddr2 == "") {
        this.$toast("请输入详细地址");
        return;
      }
      if (this.receiveTel == "") {
        this.$toast("请输入联系电话");
        return;
      }
      if (this.expSn == "") {
        this.$toast("请输入快递单号");
        return;
      }
      // if (this.shipExplain == "") {
      //   this.$toast("请填写退货说明");
      //   return;
      // }
      // if (this.expUrls == "") {
      //   this.$toast("请上传上传凭证");
      //   return;
      // }
      // expUrls

      let data = {
        id: this.afterSalesInfo.id,
        receiveName: this.receiveName,
        receiveTel: this.receiveTel,
        receiveAddr: this.value + this.receiveAddr2,
        expName: this.RefundReason.tit,
        expId: this.RefundReason.radio,
        expSn: this.expSn,
        // expUrls: this.expUrls,
        shipExplain: this.shipExplain,
        expUrls: JSON.parse(JSON.stringify(this.upimgfile)).join(",")
      };
      this.$emit("handleModify", 3, false, data);
      returnShipments(data).then((res) => {
        if (res && res.errorCode == 1) {
          this.$emit("handleModify", 3, false, data);
          this.$toast("提交退货信息成功...");
          // this.$emit("refundrefresh");
          // this.inits();
        } else {
        }
      });
    },
    //获取物流平台
    _logistics() {
      logistics().then((res) => {
        this.RefundReason.group = res.data;
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
.van-radio-group {
  height: calc(100% - 1.17333rem);
  overflow-y: auto;
}
</style>
