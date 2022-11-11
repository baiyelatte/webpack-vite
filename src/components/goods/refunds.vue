<template>
  <div class="refundbox">
    <!-- 导航栏 -->
    <van-nav-bar
      class="arrows"
      title="换货详情"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 1 -->
    <div>
      <span class="await">等待商家处理</span><br />
      <span class="times">还剩23时12分</span>
      <p>
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </p>
      <div class="bg">
        <div class="await1">·你已成功提交换货申请,请耐心等待商家处理</div>
        <div class="await2">·商家同意或超过24小时未处理,换货申请将达成</div>
        <div class="await2">·商家拒绝,您可以修改申请再次发起或联系平台客服</div>
        <div class="van-hairline--bottom"></div>
        <van-button size="small" plain type="danger">修改申请</van-button>
      </div>
    </div>
    <!-- 2 -->
    <div class="shows">
      <span class="await">商家已同意申请，请尽早退货</span><br />
      <span class="times">还剩23时12分</span>
      <p class="img">
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </p>
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
          <van-icon class="mapico" name="location" size="16" />
          <div
            class="van-cell__value van-cell__value--alone van-contact-card__value"
          >
            <img
              class="locations"
              src="../../assets/image/b.png"
              width="26.67px"
              height="26.67px"
            />
            <div class="relation">
              <div>退货地址:</div>
              <div class="relation1">联系人:</div>
              <div class="relation1">联系电话:</div>
            </div>
            <div class="van-hairline--bottom"></div>
          </div>
          <van-button size="small" plain type="danger" class="buttons"
            >我已寄出，填写物流信息</van-button
          >
        </div>
      </div>
    </div>

    <!-- 3 -->
    <div class="shows">
      <span class="await">货物已退回,等待商家发货</span><br />
      <span class="times">还剩23时12分</span>
      <p class="img">
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </p>
      <div class="bgs3">
        <div class="bg1">
          <div class="await2">
            ·商家逾期为收货,系统默认商家已收到货物并寄出新的商品
          </div>
          <div class="await2">
            ·如商家拒绝发货,您可以与商家协商修改申请,再次发起,商家会
          </div>
          <div class="await2">
            重新处理.在无法和商家达成一致的情况下,您可以联系平台客服
          </div>
          <div class="await2">寻求帮助</div>
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
            <div class="relation">
              <div>退货物流:</div>
              <div class="relation1">物流</div>
            </div>
            <van-cell class="van-icons" is-link />
          </div>
        </div>
      </div>
    </div>

    <!-- 4 -->
    <div class="shows">
      <span class="await">商家已发货,请确认收货</span><br />
      <span class="times">还剩23时12分</span>
      <p class="img">
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </p>
      <div class="bgs3">
        <div class="bg1">
          <div class="await2">·商家已发货,请及时确认收货</div>
          <div class="await2">·逾期为收获,系统将自动确认收货</div>
          <div class="van-hairline--bottom"></div>
          <van-button size="small" plain type="danger">确认收货</van-button>
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
              <div>退货物流:</div>
              <div class="relation1">物流</div>
            </div>
            <van-cell class="van-icons1" is-link />
          </div>
        </div>
      </div>
    </div>

    <!-- 5 -->
    <div class="shows">
      <span class="await">换货成功</span><br />
      <span class="times">日期</span>
      <p class="img">
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </p>
      <div class="bgs4">
        <!-- 地址 -->
        <van-icon class="mapico" name="location" size="16" />
        <div
          class="van-cell__value van-cell__value--alone van-contact-card__value"
        >
          <img
            class="locations3"
            src="../../assets/image/journalism.png"
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

    <!-- 6 -->

    <div class="shows">
      <span class="await">换货失败</span><br />
      <span class="times">还剩23时12分</span>

      <p>
        <img src="../../assets/image/a.png" width="63px" height="63px" />
      </p>
      <div class="bg6">
        <div class="await1">商家拒绝了您的退款申请</div>
        <div class="await2">愿意是:商品已经破坏,无法换货</div>
        <div class="await2">
          您可与卖家协商,修改申请,再次提交,卖家会重新处理,
        </div>
        <div class="await2">或申请维权,换货申请将自动关闭</div>
        <div class="van-hairline--bottom"></div>
        <van-button size="small" plain type="danger">修改申请</van-button>
      </div>
    </div>

    <div class="bg2">
      <span class="await3">原商品信息</span>
      <van-card
        :desc="refunddta.goodsSkuName"
        :title="refunddta.goodsName"
        :thumb="refunddta.goodsLogoImgUrl"
        style="margin-top: 0px"
      >
      </van-card>
    </div>
    <div class="bg3">
      <span class="await3">换货后商品信息</span>
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
        <div class="cardlist1">
          <div class="item fx1">售后编号:</div>
          <span class="item"
            ><span class="van-card__price-integer"></span
          ></span>
        </div>
        <div class="cardlist">
          <div class="item fx1">收货地址:</div>
          <span class="item"
            ><span class="van-card__price-integer"></span
          ></span>
        </div>

        <div class="cardlist">
          <div class="item fx1">收货手机:</div>
          <span class="item"
            ><span class="van-card__price-integer"></span
          ></span>
        </div>

        <div class="cardlist">
          <div class="item fx1">收货人:</div>
          <span class="item"
            ><span class="van-card__price-integer"></span
          ></span>
        </div>

        <div class="cardlist">
          <div class="item fx1">换货原因:</div>
          <span class="item"
            ><span class="van-card__price-integer"></span
          ></span>
        </div>

        <div class="cardlist">
          <div class="item fx1">换货说明:</div>
          <span class="item"
            ><span class="van-card__price-integer"></span
          ></span>
        </div>

        <div class="cardlist">
          <div class="item fx1">申请时间:</div>
          <span class="item"
            ><span class="van-card__price-integer"></span
          ></span>
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
            <div class="kefu">
              <div class="d"></div>
              <div class="txt1">联系诚聊客服</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _uploadFiler } from "@/utils/dom";
import { applyAftersale } from "api";
export default {
  name: "v-refunds",
  props: {
    refunddta: {},
    aftersaleType: Number
  },
  data() {
    return {
      GoodsState: { show: false }
    };
  },
  methods: {
    goodsclose() {
      if (this.GoodsState.tit == "请选择") {
        this.GoodsState.tit = "请选择";
        this.GoodsState.radio = "";
      }
    },
    onClickLeft() {
      this.$router.go(-1);
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
img {
  position: absolute;
  top: 50px;
  // margin-top: 10px;
  line-height: 63px;
  margin-left: 243.67px;
}
.a {
  background-color: #f2f2f2;
}
.bg {
  margin-top: 20px;
  background-color: #ffffff;
  weight: 338.67px;
  height: 140.67px;
  margin-left: 10.33px;
  margin-right: 10.67px;
  border-radius: 9.33px;
}
.bg1 {
  margin-top: 20px;
  background-color: #ffffff;
  weight: 312px;
  height: 71.33px;
  //  margin-left: 10.33px;、
  margin-right: 3.33px;
  border-radius: 9.33px;
}
.bgs {
  margin-top: 10px;
  background-color: #ffffff;
  weight: 338.67px;
  height: 240.67px;
  margin-left: 10.33px;
  margin-right: 16.33px;
  border-radius: 9.33px;
}
.await1 {
  padding-top: 10px;
  color: #212121;
  margin-left: 10.33px;
  font-size: 13px;
  margin-top: 10px;
  // top: 10px;
  // margin-bottom:10px;
}
.await2 {
  padding-top: 10px;
  margin-left: 10.33px;
  // margin-right: 1.33px;
  padding-right: -2px;
  color: #999999;
  font-size: 12px;
  // margin-bottom:10px;
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
  weight: 338.67px;
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
  padding-top: 3px;
}
.cardlist1 {
  margin-top: 10px;
  display: flex;
  margin-left: 9.67px;
  font-size: 11px;
  padding: 6px;
  color: #999999;
}
.item.fx1 {
  margin-top: 10px;
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
  width: 12.83px;
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
  margin-left: 244px;
  margin-top: 8px;
}
.van-card {
  border-radius: 9.33px;
}
.shows {
  display: none;
}
.buttons {
  weight: 173.33px;
  height: 26.67px;
  border-radius: 13.33px;
  text-align: center;
  margin-left: 145.33px;
  margin-right: 10.33px;
  margin-top: 13.33px;
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
.locations {
  margin-left: 10.33px;
  margin-top: -16px;
}
.van-icons {
  bottom: 35px;
  height: 41px;
  margin-left: 295.33px;
}
.van-icons1 {
  bottom: 45px;
  margin-left: 295.33px;
}
.locations2 {
  margin-left: 13.33px;
  margin-top: -18px;
}
.locations3 {
  margin-left: 13.33px;
  margin-top: -27px;
}
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
// .van-cell__value1 {
//   margin-top: 10px;
// }
</style>
