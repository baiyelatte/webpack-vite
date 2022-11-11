<template>
  <div class="inner-box goods-item" @click="getDetails(goodslist.goodsId)">
    <div class="img-box"><img v-lazy="goodslist.logoImgUrl" alt="" /></div>
    <div class="text-box">
      <div class="title">{{ goodslist.goodsName }}</div>
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
      </template>
      <!-- <template
        v-if="
          (goodslist.canVoucherMoney && !goodslist.killNumber) ||
          (goodslist.killVoucherMoney &&
            goodslist.killCanVoucherMoney &&
            goodslist.fla &&
            goodslist.limitSaleFlag)
        "
      >
        <div class="goods-price">
          <span
            class="price"
            v-if="
              goodslist.limitSaleFlag &&
              goodslist.fla &&
              !goodslist.killVoucherMoney &&
              !goodslist.killNumber
            "
            >¥{{ goodslist.payMoney }}
          </span>
          <span
            class="price"
            v-else-if="
              goodslist.limitSaleFlag &&
              goodslist.fla &&
              goodslist.killVoucherMoney &&
              goodslist.killNumber
            "
            >¥{{ goodslist.killPayMoney }}
          </span>
          <span
            class="price"
            v-else-if="
              !goodslist.limitSaleFlag ||
              (!goodslist.fla && goodslist.killVoucherMoney)
            "
            >¥{{ goodslist.payMoney }}
          </span>
          <span
            class="price"
            v-else-if="
              !goodslist.limitSaleFlag ||
              (!goodslist.fla && !goodslist.killVoucherMoney)
            "
            >¥{{ goodslist.payMoney }}
          </span>
          <span
            class="price"
            v-else-if="
              goodslist.canVoucherMoney &&
              goodslist.limitSaleFlag &&
              goodslist.fla &&
              !goodslist.killNumber
            "
            >¥{{ goodslist.payMoney }}
          </span>

          <span
            class="price dyjico"
            v-show="
              goodslist.killVoucherMoney &&
              goodslist.limitSaleFlag &&
              goodslist.fla &&
              goodslist.killNumber
            "
            >{{ goodslist.killVoucherMoney }}</span
          >
          <span
            class="price dyjico"
            v-show="
              (goodslist.canVoucherMoney && !goodslist.limitSaleFlag) ||
              !goodslist.fla
            "
            >{{ goodslist.voucherMoney }}
          </span>
          <span
            class="price dyjico"
            v-show="
              goodslist.canVoucherMoney &&
              goodslist.limitSaleFlag &&
              goodslist.fla &&
              !goodslist.killNumber
            "
            >{{ goodslist.voucherMoney }}
          </span>
        
        </div>
      </template>

      <template v-else>
        <div class="goods-price">
          <span
            class="price"
            v-if="
              goodslist.limitSaleFlag && goodslist.fla && goodslist.killNumber
            "
            >¥{{ goodslist.killPrice }}
          </span>
          <span class="price" v-if="!goodslist.limitSaleFlag || !goodslist.fla"
            >¥{{ goodslist.showPrice }}
          </span>
          <span
            class="price"
            v-if="
              goodslist.limitSaleFlag && goodslist.fla && !goodslist.killNumber
            "
            >¥{{ goodslist.showPrice }}
          </span>

         
        </div>
      </template> -->
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
    return {};
  },
  created() {
    // console.log(this.goodslist);
    if (this.goodslist?.limitSaleFlag) {
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
  updated() {
    // console.log(this.goodslist);
    // console.log(this.goodslist.goodsName, this.goodslist.limitSaleFlag);
    // console.log("888888888888" + this.goodslist.limitSaleFlag);
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";

.inner-box {
  margin-bottom: 8px;
  background: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 49%;
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
    height: 40.848px;
    font-size: 14px;
    line-height: 20.424px;
    @include no-wrap-multi(2);
  }
  .goods-price {
    font-size: 32px;
    // font-weight: bolder;
    margin: 5px 0 0;
    color: #ff5934;
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
