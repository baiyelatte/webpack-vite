<template>
  <router-layout :backgroundColor="'#c90601'">
    <div>
      <div class="purchase" style="padding-top: 10px">
        <div class="header">
          <i
            @click="_backlogin"
            class="van-icon van-icon-arrow-left van-nav-bar__arrow banner"
          />
          <!-- <span class="text_activity">限时秒杀</span> -->
          <span class="text_activity">限时抢购</span>
        </div>
        <div class="activity_content" ref="list" :style="{ height: h }">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div v-if="list.length !== 0">
              <div
                v-for="(item, index) in list"
                :key="index"
                class="item"
                @click="goDetail(item.goodsId)"
              >
                <div>
                  <img :src="item.logoImgUrl" alt="" />
                  <div class="right-box">
                    <div class="title">
                      <img
                        v-if="item.titleCardImage"
                        :src="item.titleCardImage"
                        alt=""
                      />
                      {{ item.goodsName }}
                    </div>
                    <div style="margin-top: 10px">
                      <div
                        v-if="
                          item.flgT && item.limitSaleFlag && item.killNumber
                        "
                      >
                        <div
                          class="price left"
                          v-if="
                            item.killVoucherMoney && item.killCanVoucherMoney
                          "
                        >
                          <div class="price_cls">
                            <span
                              class="van-card__price-currency"
                              style="color: red; font-size: 14px"
                              >¥</span
                            >
                            <span class="van-card__price-integer">{{
                              item.killPayMoney
                            }}</span>

                            <span class="dyjico">{{
                              item.killVoucherMoney
                            }}</span>
                            <button
                              v-if="item.tailMark"
                              style="margin-left: 5px"
                              class="tailMark"
                            >
                              {{ item.tailMark }}
                            </button>
                          </div>
                        </div>
                        <div class="price left" v-else>
                          <div class="price_cls">
                            <span
                              class="van-card__price-currency"
                              style="color: red; font-size: 14px"
                              >¥</span
                            >
                            <span
                              class="van-card__price-integer"
                              style="color: red"
                              >{{ item.killPrice }}
                            </span>
                            <button
                              v-if="item.tailMark"
                              style="margin-left: 5px"
                              class="tailMark"
                            >
                              {{ item.tailMark }}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div v-else>
                        <div class="price left" v-if="item.canVoucherMoney">
                          <div class="price_cls">
                            <span
                              class="van-card__price-currency"
                              style="color: red; font-size: 16px"
                              >¥</span
                            >

                            <span class="van-card__price-integer">{{
                              item.payMoney
                            }}</span>

                            <span class="dyjico">{{ item.voucherMoney }}</span>
                            <button
                              v-if="item.tailMark"
                              style="margin-left: 5px"
                              class="tailMark"
                            >
                              {{ item.tailMark }}
                            </button>
                          </div>
                        </div>
                        <div class="price left" v-else>
                          <span>
                            <span
                              class="van-card__price-currency"
                              style="color: red; font-size: 14px"
                              >¥</span
                            >

                            <span
                              class="van-card__price-integer"
                              style="color: red"
                              >{{ item.showPrice }}</span
                            >
                          </span>
                          <button
                            v-if="item.tailMark"
                            style="margin-left: 5px"
                            class="tailMark"
                          >
                            {{ item.tailMark }}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      style="font-size: 12px; margin-top: 10px"
                      v-if="salesFun(item.buyNumber) >= 10"
                    >
                      已售{{ salesFun(item.buyNumber) }}件
                    </div>
                    <div class="bottom-box">
                      <div class="buy right" v-if="item.killNumber">
                        <span class="buy_text" @click="goDetail(item.goodsId)"
                          >立即购买</span
                        >
                      </div>
                      <div class="buy complete right" v-else>
                        <span class="buy_text">已抢完</span>
                        <span
                          class="buy_text"
                          style="color: red; font-size: 6px"
                          >原价购买</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="item.personalityTags" class="personalityTags">
                  <div
                    v-for="(item1, index) in personalityTagsArrFun(
                      item.personalityTags
                    )"
                    :key="index"
                  >
                    <p>{{ item1 }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="empty" v-else-if="!list && list.length == 0">
              <p>期待下一场活动</p>
            </div>
          </van-pull-refresh>
        </div>
      </div>
    </div>
  </router-layout>
</template>

<script>
import { getActivityTime, repeatBuy } from "api";
import { salesFun } from "@/utils/dom.js";
import LoginVue from "../login/Login.vue";
export default {
  name: "Activityzone",
  data() {
    return {
      show: true,
      h: 0,
      isLoading: false,
      imgurl: require("@/assets/image/luck_top.png"),
      list: [],
      flgT: false,
      personalityTagsArr: []
    };
  },
  created() {},
  watch: {},
  mounted() {
    this.getHeight();
    window.onresize = () => this.getHeight();

    this.getList();
  },
  methods: {
    salesFun: salesFun,
    personalityTagsArrFun(val) {
      return val.split(",");
    },
    _backlogin() {
      this.$router.go(-1);
    },
    getHeight() {
      let offsetTop = this.$refs.list.offsetTop;
      let H = window.innerHeight;
      this.h = H - offsetTop + "px";
    },
    goDetail(id) {
      // this.$router.push({
      //   path: `/detail/${id}?agencyUnionid=${
      //     this.$route.query.agencyUnionid || null
      //   }&fromPlatform=${this.$route.query.fromPlatform || null}`,
      // });

      let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
      // console.log(userinfo);
      if (userinfo) {
        //   repeatBuy({ goodsId: id, userId: userinfo.uid }).then((res) => {
        //     console.log(res);
        //     if (res.data == 0) {
        this.$router.push({
          path: `/detail/${id}?agencyUnionid=${
            this.$route.query.agencyUnionid || null
          }&fromPlatform=${this.$route.query.fromPlatform || null}`
        });
        //     } else {
        //       this.$toast("您已购买过此秒杀商品!");
        //     }
        //   });
      } else {
        // this.$router.push("/login").catch(() => {});
        // this.$router.push("/smslogin").catch(() => {});
        let fullPath = this.$route.fullPath;
        this.$router.replace({
          path: "/smslogin",
          query: { redirect: fullPath }
        });
      }
    },
    onRefresh() {
      this.getList();
    },
    getList() {
      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      getActivityTime().then((res) => {
        toast.clear();
        this.isLoading = false;
        if (res.errorCode == 1) {
          this.list = res.data.content;

          for (let i = 0; i < res.data.content.length; i++) {
            // console.log(res.data.content[i].personalityTags);
            if (res.data.content[i].personalityTags) {
              this.personalityTagsArr =
                res.data.content[i].personalityTags.split(",");
            }
            // console.log(this.personalityTagsArr);
            if (res.data.content[i].limitSaleFlag) {
              let s = new Date(
                res.data.content[i].countdownStart.replace(/-/g, "/")
              ).getTime();
              let t = res.data.content[i].countdown * 60 * 1000;
              let m = s + t;
              let n = new Date().getTime();
              // console.log(s, t, m, n);
              if (n >= s && n <= m) {
                // console.log("限时秒杀");

                this.list[i].flgT = true;
                // console.log(this.list);
              } else {
                // console.log("正常");
                this.list[i].flgT = false;
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.van-card__price-integer {
  color: red;
}
:deep(.price_cls) {
  display: flex;
  align-items: center;
}
.personalityTags {
  margin: 0 10px;
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #c2c2c2;
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
.tailMark {
  background: #d1020c;
  color: white;
  font-size: 10px;
  border-radius: 10px;
  padding: 2px 5px;
  vertical-align: text-bottom;
  height: 16px;
  line-height: 10px;
  margin-right: 5px;
}
.purchase {
  .title {
    font-size: 14px;
    line-height: 20.424px;
    height: fit-content;
    img {
      height: 17px;
      border: none;
      vertical-align: text-bottom;
    }
  }
  width: 100vw;
  height: 100vh;
  background-image: url(../../assets/image/activity/883.png);
  // background-image: url(../../assets/image/Activityzone.png);
  background-size: 100%;
  .empty {
    font-size: 20px;
    color: #1a1a1a;
    text-align: center;
    margin-top: 10vh;
  }
  .activity_content {
    margin-top: 50px;
  }
  .van-pull-refresh {
    height: 100%;
    overflow: auto;
  }
  .header {
    position: relative;
  }
  .banner {
    color: #ffffff;
    margin-left: 10px;
  }
  .text_activity {
    height: 16px;
    font-size: 17px;
    font-family: PingFang SC;
    color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 10px;
  }
  .item {
    background-color: #fff;
    margin: 10px;
    border-radius: 5px;
    > div:nth-child(1) {
      padding: 10px 10px 5px 10px;
      display: flex;
      > img {
        width: 120px;
        height: 120px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      .right-box {
        margin-left: 5px;
        background: #fff;
        width: calc(100% - 120px);
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        position: relative;
        .goodsName {
          font-size: 16px;
          color: black;
          margin: 10px;
        }
        .buy {
          width: 75px;
          height: 28px;
          background: linear-gradient(66deg, #d1020c 0%, #ff7200 100%);
          border-radius: 14px;
          .buy_text {
            display: block;
            line-height: 28px;
            text-align: center;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #fefefe;
          }
        }
        .complete {
          background: linear-gradient(66deg, #747372 0%, #474747 100%);
        }
        .bottom-box {
          // padding: 0 10px;
          padding: 10px;
          position: absolute;
          // bottom: 11px;
          bottom: -8px;
          width: 100%;
          // top:70px;
          .left {
            float: left;
          }
          .right {
            float: right;
          }
          .price {
            line-height: 28px;
          }
        }
      }
    }
  }
}
</style>
