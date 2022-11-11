<template>
  <div class="inner-box goods-item" @click="getDetails(goodslist.goodsId)">
    <div class="img-box"><img v-lazy="goodslist.logoImgUrl" alt="" /></div>
    <div class="text-box">
      <div class="title">
        <img
          v-if="goodslist.titleCardImage"
          :src="goodslist.titleCardImage"
          alt=""
        />
        {{ goodslist.goodsName }}
      </div>
      <template
        v-if="goodslist.fla && goodslist.limitSaleFlag && goodslist.killNumber"
      >
        <template
          v-if="goodslist.killVoucherMoney && goodslist.killCanVoucherMoney"
        >
          <div class="goods-price">
            <span class="price">¥{{ goodslist.killPayMoney }} </span>

            <span class="price dyjico">{{ goodslist.killVoucherMoney }}</span>
          </div>
        </template>
        <template v-else>
          <div class="goods-price">
            <span class="price">¥{{ goodslist.killPrice }} </span>
          </div>
        </template>
      </template>
      <template v-else>
        <div v-if="!goodslist.templateId">
          <template v-if="goodslist.canVoucherMoney">
            <div class="goods-price">
              <span class="price">¥{{ goodslist.payMoney }} </span>
              <span class="price dyjico">{{ goodslist.voucherMoney }} </span>
            </div>
          </template>
          <template v-else>
            <div class="goods-price">
              <span class="price">¥{{ goodslist.showPrice }} </span>
            </div>
          </template>
        </div>
        <div v-else-if="goodslist.templateId == 1">
          <div class="goods-price">
            <span class="price">¥{{ goodslist.payMoney }} </span>
            <span class="price dyjico">{{ goodslist.voucherMoney }} </span>
          </div>
        </div>
        <div v-else-if="goodslist.templateId == 2">
          <div class="goods-price">
            <span class="price">¥{{ goodslist.showPrice }} </span>
            <span class="linePrice">¥{{ goodslist.linePrice }} </span>
          </div>
        </div>
      </template>
      <div class="tailMarkBox">
        <button v-if="goodslist.tailMark" class="tailMark">
          {{ goodslist.tailMark }}
        </button>
        <p class="buyNumber" v-if="buyNumberFun(goodslist.buyNumber) >= 10">
          已售{{ buyNumberFun(goodslist.buyNumber) }}件
        </p>
      </div>
      <div
        v-if="
          goodslist.personalityTags &&
          (goodslist.templateId == 2 || goodslist.templateId == 1)
        "
        class="personalityTags"
      >
        <div v-for="(item, index) in personalityTagsArr" :key="index">
          <p>{{ item }}</p>
        </div>
      </div>
    </div>
    <div v-if="!goodslist.enableQuantity" class="sq">
      <img src="@/assets/image/sq.png" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "goodsitem",
  props: {
    goodslist: {}
  },
  data() {
    return {
      personalityTagsArr: []
    };
  },
  created() {
    if (this.goodslist.limitSaleFlag) {
      let s = new Date(
        this.goodslist.countdownStart?.replace(/-/g, "/")
      ).getTime();
      let t = this.goodslist.countdown * 60 * 1000;
      let m = s + t;
      let n = new Date().getTime();
      if (n >= s && n <= m && this.goodslist.limitSaleFlag) {
        this.goodslist.fla = true;
      } else {
        this.goodslist.fla = false;
      }
    }
    if (this.goodslist.personalityTags) {
      this.personalityTagsArr = this.goodslist.personalityTags.split(",");
    }
    this.goodslist.showPrice = this.fun(this.goodslist.showPrice);
    this.goodslist.payMoney = this.fun(this.goodslist.payMoney);
    this.goodslist.voucherMoney = this.fun(this.goodslist.voucherMoney);
    this.goodslist.linePrice = this.fun(this.goodslist.linePrice);
  },
  updated() {
    if (this.goodslist.limitSaleFlag) {
      let s = new Date(
        this.goodslist.countdownStart?.replace(/-/g, "/")
      ).getTime();
      let t = this.goodslist.countdown * 60 * 1000;
      let m = s + t;
      let n = new Date().getTime();
      if (n >= s && n <= m && this.goodslist.limitSaleFlag) {
        this.goodslist.fla = true;
      } else {
        this.goodslist.fla = false;
      }
    }
  },
  methods: {
    getDetails(id) {
      this.$emit("goDeatil", id);
      this.$router.push({
        path: `/detail/${id}?agencyUnionid=${
          this.$route.query.agencyUnionid || null
        }&fromPlatform=${this.$route.query.fromPlatform || null}`
      });
    },
    fun(val) {
      if (val >= 10000) {
        let num = val / 10000;
        return parseInt(num * 100) / 100 + "w";
      } else {
        return val;
      }
    },
    buyNumberFun(val) {
      let value = val.toString();
      if (val < 100) {
        return val;
      } else if (val < 1000) {
        return value[0] + "00" + "+";
      } else if (val < 10000) {
        return value[0] + "000" + "+";
      } else {
        let num = val / 10000;
        return parseInt(num) + "w" + "+";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.tailMarkBox {
  display: flex;
  margin-top: 5px;
}
.tailMark {
  background: #d1020c;
  color: white;
  font-size: 10px;
  border-radius: 10px;
  padding: 2px 5px;
  height: 16px;
  margin-right: 5px;
}
.linePrice {
  color: #999999;
  font-size: 14px;
  margin-left: 10px;
  text-decoration: line-through;
}
.personalityTags {
  display: flex;
  flex-wrap: wrap;
  padding: 5px 0;
  > div {
    margin-right: 5px;
    margin-top: 5px;
    font-size: 10px;
    border: 1px solid #d1020c;
    border-radius: 3px;
    p {
      color: #d1020c;
      padding: 2px;
    }
  }
}
.buyNumber {
  color: #999999;
  font-size: 12px;
  line-height: 16px;
}
.inner-box {
  margin-bottom: 8px;
  background: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  border-radius: 0.16rem;
  overflow: hidden;
  display: inline-block;
  position: relative;
  .img-box {
    width: 174px;
    height: 174px;
    img {
      display: block;
      width: 100%;
      height: 174px;
    }
  }
  .text-box {
    text-align: left;
    padding: 0.16rem 0.24rem 0.24rem;
  }
  .title {
    font-size: 14px;
    line-height: 20.424px;
    height: fit-content;
    @include no-wrap-multi(2);
    img {
      height: 17px;
      border: none;
      vertical-align: text-bottom;
    }
  }
  .goods-price {
    font-size: 32px;
    // font-weight: bolder;
    margin: 5px 0 0;
    // color: #ff5934;
    color: #d1020c;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .price {
    font-size: 16px;
    float: left;
  }
  .originPrice {
    float: left;
    margin-left: 5px;
    font-size: 14px;
    color: #999;
    text-decoration: line-through;
  }
  .sq {
    position: absolute;
    right: 6px;
    top: 6px;
    img {
      width: 43px;
      height: 43px;
    }
  }
}
.inner-box:nth-child(odd) {
  margin-left: inherit;
}
.fontdyj {
  font-size: 12px;
}
</style>
