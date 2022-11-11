<template>
  <div class="usercom" @click="getDetails(goodslist.goodsId)">
    <div class="content">
      <div class="content_top">
        <div class="content_t">
          <div class="img-box">
            <img v-lazy="goodslist.logoImgUrl" alt="" />
          </div>
          <div class="goodsName">
            <div>{{ goodslist.goodsName }}</div>
            <template
              v-if="
                goodslist.fla && goodslist.limitSaleFlag && goodslist.killNumber
              "
            >
              <template
                v-if="
                  goodslist.killVoucherMoney && goodslist.killCanVoucherMoney
                "
              >
                <div class="goods-price">
                  <span class="price">¥{{ goodslist.killPayMoney }} </span>

                  <span class="price dyjico">{{
                    goodslist.killVoucherMoney
                  }}</span>
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
                    <span class="price dyjico"
                      >{{ goodslist.voucherMoney }}
                    </span>
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
                  <span
                    class="price"
                    v-if="
                      goodslist.payMoney == '' || goodslist.payMoney == null
                    "
                    >¥ 0
                  </span>
                  <span class="price" v-else>¥{{ goodslist.payMoney }} </span>
                  <span
                    class="price dyjico"
                    v-if="
                      goodslist.voucherMoney == '' ||
                      goodslist.voucherMoney == null
                    "
                  >
                    0
                  </span>
                  <span class="price dyjico" v-else
                    >{{ goodslist.voucherMoney }}
                  </span>
                </div>
              </div>
              <div v-else-if="goodslist.templateId == 2">
                <div class="goods-price">
                  <span class="price">¥{{ goodslist.showPrice }} </span>
                  <span class="linePrice"
                    ><del>{{ goodslist.linePrice }}</del>
                  </span>
                </div>
              </div>
            </template>
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <!-- <button class="tailMark">可享帮领红包27.8元</button> -->
              <button></button>
              <button class="tobuy">购买</button>
            </div>
            <div>
              <div class="tailMarkBox">
                <!-- <button class="tailMark1" v-if="goodslist.tailMark">
                  {{ goodslist.tailMark }}
                </button> -->
                <p class="buyNumber" v-if="goodslist.buyNumber >= 10">
                  已售{{ salesFun(goodslist.buyNumber) }}件
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="personalityTags" v-if="goodslist.personalityTags">
          <div
            v-for="(item1, index) in personalityTagsArrFun(
              goodslist.personalityTags
            )"
            :key="index"
          >
            <p>{{ item1 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getrecommend } from "api";
import { salesFun } from "@/utils/dom";
export default {
  name: "usercom",
  props: {
    goodslist: {}
  },
  data() {
    return {
      salesFun: salesFun,
      pageNum: 1, // 当前页数
      pageSize: 20, // 每页条数
      list: []
    };
  },
  created() {
    // this._getrecommend();
  },
  methods: {
    personalityTagsArrFun(val) {
      return val.split(",");
    },
    getDetails(id) {
      this.$emit("goDeatil", id);
      this.$router.push({
        path: `/detail/${id}?agencyUnionid=${
          this.$route.query.agencyUnionid || null
        }&fromPlatform=${this.$route.query.fromPlatform || null}`
      });
    }
    //   salesFun:salesFun,
    // _getrecommend() {
    //   getrecommend({
    //     pageNum: this.pageNum,
    //     pageSize: this.pageSize,
    //   }).then((res) => {
    //     console.log(res);
    //     if (res && res.errorCode === 1) {
    //       if (res.data) {
    //         this.list = res.data.content;
    //       }
    //     }
    //   });
    // },
  }
};
</script>
<style scoped lang="scss">
.usercom {
  // padding: 10px;
  //   background: #fff;
  .linePrice {
    font-size: 10px;

    font-weight: 500;
    color: #808080;
  }
  .content {
    .content_top {
      background: #fff;
      margin: 10px;
      padding: 10px;
      border-radius: 8px;
      //   display: flex;
      .content_t {
        display: flex;
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
            padding: 5px;
            // letter-spacing: 2px;
          }
        }
      }
      .goodsName {
        width: 75%;
        font-size: 15px;
        color: #282828;
        // margin: 10px;
        margin-left: 10px;
        .tailMarkBox {
          display: flex;
          margin-top: 5px;
        }
        .tobuy {
          background: #cf0000;
          width: 59px;
          color: #fff;
          text-align: center;
          border-radius: 8px;
          font-size: 15px;
          line-height: 22px;
          height: 22px;
          // padding: 4px;
          // vertical-align: middle;
        }
        > div {
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          // letter-spacing: 2px;
          line-height: 16px;
          font-size: 15px;
          .tailMark {
            background: #d1020c;
            color: white;
            font-size: 10px;
            border-radius: 10px;
            padding: 2px 5px;
            height: 19px;
            margin-right: 5px;
          }
          .tailMark1 {
            background: #46a3ff;
            color: white;
            font-size: 10px;
            border-radius: 10px;
            padding: 2px 5px;
            height: 19px;
            margin-right: 5px;
          }
          .buyNumber {
            color: #999999;
            font-size: 12px;
            line-height: 20px;
          }
        }

        .goods-price {
          padding: 10px 0;
          color: #cf0000;
          font-size: 17px;
        }
      }
    }
    .img-box {
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
