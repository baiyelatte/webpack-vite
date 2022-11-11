<template>
  <div
    class="inner-box goods-item"
    @click="getDetails(goodItem.goodsId)"
    :style="goodStyle"
  >
    <div class="areaTag" v-if="!!goodItem.ribbonTag">
      <img src="@/assets/image/areaTag.png" alt="" />
      <span>{{ goodItem.ribbonTag ?? "杭州市·滨江区" }}</span>
    </div>
    <div class="img-box">
      <img v-lazy="goodItem.goodsImage ?? goodItem.logoImgUrl" alt="" />
    </div>
    <div class="text-box">
      <div class="title">
        <!-- <img v-if="goodItem.shopImage" :src="goodItem.shopImage" alt="" /> -->
        {{ goodItem.goodsTitle ?? goodItem.goodsName }}
      </div>
      <!-- <template
        v-if="goodItem.fla && goodItem.limitSaleFlag && goodItem.killNumber"
      >
        <template
          v-if="goodItem.killVoucherMoney && goodItem.killCanVoucherMoney"
        >
          <div class="goods-price">
            <span class="price">¥{{ goodItem.killPayMoney }} </span>

            <span class="price dyjico">{{ goodItem.killVoucherMoney }}</span>
          </div>
        </template>
        <template v-else>
          <div class="goods-price">
            <span class="price">¥{{ goodItem.killPrice }} </span>
          </div>
        </template>
      </template> -->
      <template>
        <div v-if="!goodItem.templateId">
          <template v-if="goodItem.canVoucherMoney">
            <div class="goods-price">
              <span class="price"
                >¥{{ goodItem.salePrice ?? goodItem.payMoney }}
              </span>
              <span class="price dyjico">{{ goodItem.voucherMoney }} </span>
            </div>
          </template>
          <template v-else>
            <div class="goods-price">
              <span class="price"
                >¥{{ goodItem.salePrice ?? goodItem.showPrice }}
              </span>
            </div>
          </template>
        </div>
        <div v-else-if="goodItem.templateId == 1">
          <div class="goods-price">
            <span
              class="price"
              v-if="
                (goodItem.salePrice ?? goodItem.payMoney == '') ||
                (goodItem.salePrice ?? goodItem.payMoney == null)
              "
              >¥ 0
            </span>
            <span class="price" v-else
              >¥{{ goodItem.salePrice ?? goodItem.payMoney }}
            </span>
            <span
              class="price dyjico"
              v-if="
                goodItem.voucherMoney == '' || goodItem.voucherMoney == null
              "
            >
              0
            </span>
            <span class="price dyjico" v-else
              >{{ goodItem.voucherMoney }}
            </span>
          </div>
        </div>
        <div v-else-if="goodItem.templateId == 2">
          <div class="goods-price">
            <span class="price"
              >¥{{ goodItem.salePrice ?? goodItem.showPrice }}
            </span>
            <span class="linePrice"
              >¥{{ goodItem.throughLinePrice ?? goodItem.linePrice }}
            </span>
            <span
              class="buyNumber"
              v-if="goodItem.saleCount >= 10 || goodItem.buyNumber >= 10"
            >
              销售{{ buyNumberFun(goodItem.saleCount ?? goodItem.buyNumber) }}
            </span>
          </div>
        </div>
      </template>
      <!-- <div class="tailMarkBox">
        <button v-if="goodItem.tailMark" class="tailMark">
          {{ goodItem.tailMark  }}
        </button>
        <p class="buyNumber" v-if="goodItem.buyNumber >= 10">
          已售{{ buyNumberFun(goodItem.buyNumber) }}件
        </p>
      </div> -->
      <div
        v-if="
          goodItem.personalityTags &&
          (goodItem.templateId == 2 || goodItem.templateId == 1)
        "
        class="personalityTags"
      >
        <div v-for="(item, index) in personalityTagsArr" :key="index">
          <p>{{ item }}</p>
        </div>
      </div>
    </div>
    <div v-if="!goodItem.enableQuantity" class="sq">
      <img src="@/assets/image/sq.png" alt="" />
    </div>
    <div
      class="shopName"
      v-if="isShowShop"
      @click.stop="$router.push({ path: `/shopinfo/` + goodItem.shopId })"
    >
      <img v-if="goodItem.shopImage" :src="goodItem.shopImage" alt="" />
      <span>{{ goodItem.shopName ?? "雨前龙井旗舰店" }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "goodItem",
  props: {
    goodItem: {},
    goodStyle: {},
    isShowShop: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      personalityTagsArr: []
    };
  },
  created() {
    if (this.goodItem?.limitSaleFlag) {
      let s = new Date(
        this.goodItem.countdownStart?.replace(/-/g, "/")
      ).getTime();
      let t = this.goodItem.countdown * 60 * 1000;
      let m = s + t;
      let n = new Date().getTime();
      if (n >= s && n <= m && this.goodItem.limitSaleFlag) {
        this.goodItem.fla = true;
      } else {
        this.goodItem.fla = false;
      }
    }

    if (this.goodItem?.personalityTags) {
      this.personalityTagsArr = this.goodItem.personalityTags
        .split(",")
        .filter((item) => item);
    }
    this.goodItem.showPrice = this.fun(this.goodItem.showPrice);
    this.goodItem.payMoney = this.fun(this.goodItem.payMoney);
    this.goodItem.voucherMoney = this.fun(this.goodItem.voucherMoney);
    this.goodItem.linePrice = this.fun(this.goodItem.linePrice);
  },
  updated() {
    if (this.goodItem.limitSaleFlag) {
      let s = new Date(
        this.goodItem.countdownStart?.replace(/-/g, "/")
      ).getTime();
      let t = this.goodItem.countdown * 60 * 1000;
      let m = s + t;
      let n = new Date().getTime();
      if (n >= s && n <= m && this.goodItem.limitSaleFlag) {
        this.goodItem.fla = true;
      } else {
        this.goodItem.fla = false;
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
  .buyNumber {
    color: #999999;
    font-size: 12px;
    line-height: 16px;
  }
}
.tailMark {
  background: #f43030;
  color: white;
  font-size: 10px;
  border-radius: 10px;
  padding: 2px 5px;
  height: 16px;
  margin-right: 5px;
}
.linePrice {
  color: #999999;
  font-size: 11px;
  margin-left: 5px;
  text-decoration: line-through;
}
.personalityTags {
  display: flex;
  flex-wrap: wrap;
  > div {
    margin-right: 5px;
    margin-bottom: 5px;
    font-size: 10px;
    border: 1px solid #f43030;
    border-radius: 3px;
    p {
      color: #f43030;
      padding: 2px;
      letter-spacing: 1px;
    }
  }
}

.inner-box {
  margin-bottom: 10px;
  background: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  display: inline-block;
  position: relative;
  .areaTag {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    padding: 0 12px 0 10px;
    position: absolute;
    top: 0;
    left: 0;
    > img {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    > span {
      z-index: 1;
      font-size: 12px;
      color: #ffffff;
    }
  }
  .shopName {
    padding: 5px 10px;
    line-height: 15px;
    display: flex;
    align-items: center;
    border-top: 1px solid #f2f2f2;
    > img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 5px;
    }
    > span {
      color: #333;
      letter-spacing: 1px;
      font-size: 13px;
    }
  }
  .img-box {
    img {
      display: block;
      width: 100%;
      height: 130px;
    }
  }
  .text-box {
    text-align: left;
    padding: 6px 10px 5px;
    padding-bottom: 0;
  }
  .title {
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    height: fit-content;
    color: #333333;
    @include no-wrap-multi(2);
    img {
      height: 17px;
      border: none;
      vertical-align: text-bottom;
    }
  }
  .goods-price {
    position: relative;
    font-size: 32px;
    // font-weight: bolder;
    margin: 5px 0;
    // color: #ff5934;
    overflow: hidden;
    display: flex;
    align-items: center;
    .price {
      color: #f43030;
      font-size: 17px;
      font-weight: 550;
    }
    .buyNumber {
      position: absolute;
      right: 0;
      color: #999999;
      font-size: 11px;
    }
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
