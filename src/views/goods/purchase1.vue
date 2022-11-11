<template>
  <router-layout :backgroundColor="'#c90601'">
    <!--  overflow: scroll -->
    <div ref="scrollBox" style="height: 100vh">
      <div
        class="purchase"
        :style="{
          backgroundImage:
            list.length !== 0
              ? 'url(' +
                require('@/assets/image/activity/miaosha_bg2.png') +
                ')'
              : 'url(' +
                require('@/assets/image/activity/miaosha_bg.png') +
                ')',
          paddingTop: '10px'
        }"
      >
        <div class="header" v-if="isShow">
          <i
            @click="_backlogin"
            class="van-icon van-icon-arrow-left van-nav-bar__arrow banner"
          />
          <span class="text_activity">秒杀专区</span>
        </div>
        <div class="header" v-else>
          <van-nav-bar
            fixed
            :placeholder="true"
            safe-area-inset-top
            :title="$route.meta.title"
            v-if="!$route.meta.CLAPP"
            left-arrow
            @click-left="$router.back()"
          />
          <!-- <span class="text_activity">限时秒杀</span> -->
        </div>

        <div class="activity_content" ref="list" :style="{ height: h }">
          <van-pull-refresh
            v-if="list.length"
            v-model="isLoading"
            @refresh="onRefresh"
          >
            <div class="wrapper">
              <div
                v-for="(item, index) in list"
                :key="index"
                class="item"
                @click="goDetail(item.goodsId, list1.id, item.skuKillInventory)"
              >
                <div>
                  <img :src="item.logoImgUrl" alt="" />
                  <div class="right-box">
                    <div class="title">
                      {{ item.goodsName }}
                    </div>
                    <div
                      style="font-size: 12px; margin-top: 10px"
                      v-if="item.buyNumber >= 10"
                    >
                      已售{{ salesFun(item.buyNumber) }}件
                    </div>

                    <!-- <div
                      style="font-size: 12px; margin-top: 10px"
                      v-if="salesFun(item.buyNumber) >= 10"
                    >
                      {{ salesFun(item.buyNumber) }}人已付款
                    </div> -->
                    <div style="display: flex; flex-direction: column">
                      <div style="display: flex; align-items: center">
                        <div>
                          <div v-if="flgT">
                            <div
                              class="price left"
                              v-if="
                                item.skuCanVoucherMoney == 1 &&
                                item.canVoucherMoney
                              "
                            >
                              <div class="price_cls">
                                <span
                                  class="van-card__price-currency"
                                  style="color: red; font-size: 14px"
                                  >¥</span
                                >
                                <span class="van-card__price-integer">{{
                                  priceFun(item.skuPayMoney)
                                }}</span>

                                <span class="dyjico">{{
                                  priceFun(item.skuVoucherMoney)
                                }}</span>
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
                                  >{{ priceFun(item.skuKillPrice) }}
                                </span>
                              </div>
                            </div>
                          </div>
                          <!-- <div v-else>
                          <div class="price left" v-if="item.canVoucherMoney">
                            <div class="price_cls">
                              <span
                                class="van-card__price-currency"
                                style="color: red; font-size: 16px"
                                >¥</span
                              >

                              <span class="van-card__price-integer">{{
                                priceFun(item.payMoney)
                              }}</span>

                              <span class="dyjico">{{
                                priceFun(item.voucherMoney)
                              }}</span>
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
                                >{{ priceFun(item.showPrice) }}</span
                              >
                            </span>
                        
                          </div>
                        </div> -->
                        </div>
                        <div class="bottom-box">
                          <div class="buy right" v-if="item.skuKillInventory">
                            <span
                              class="buy_text"
                              @click="
                                goDetail(
                                  item.goodsId,
                                  list1.id,
                                  item.skuKillInventory
                                )
                              "
                              >立即购买</span
                            >
                          </div>
                          <div v-else>
                            <!-- <div>
                          原价购买
                        </div> -->
                            <div class="buy complete right">
                              <!-- <div
                            class="buy_text"
                            style="color: red; font-size: 6px"
                            >原价购买</div
                          > -->
                              <div class="buy_text">已抢完</div>
                              <!-- <div
                            class="buy_text"
                            style="color: red; font-size: 6px"
                            >原价购买</div
                          > -->
                            </div>
                          </div>
                        </div>
                      </div>

                      <del style="color: #ccc; font-size: 14px"
                        >￥{{ priceFun(item.showPrice) }}</del
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div style="height: 5px"></div>
            </div>
          </van-pull-refresh>
          <div class="empty" v-else>
            <p>暂无秒杀商品</p>
          </div>
        </div>
      </div>
    </div>
  </router-layout>
</template>

<script>
import { selectGood, repeatBuy } from "api";
import { salesFun, priceFun } from "@/utils/dom.js";
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
      personalityTagsArr: [],
      list1: "",
      isShow: true
    };
  },
  created() {},
  watch: {},
  mounted() {
    this.getHeight();
    window.onresize = () => this.getHeight();
    this.getList();
    this.$nextTick(() => {
      document
        .querySelector("#_purchase1")
        ?.addEventListener("scroll", this.handleScrollTop, true);
    });
  },
  activated() {},
  methods: {
    handleScrollTop() {
      if (
        document.querySelector("#_purchase1").scrollTop >
        document.querySelector(".van-pull-refresh__track").offsetTop
      ) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
    salesFun: salesFun,
    priceFun: priceFun,
    _backlogin() {
      this.$router.go(-1);
    },
    getHeight() {
      let offsetTop = this.$refs.list.offsetTop;
      let H = window.innerHeight;
      this.h = H - offsetTop + "px";
    },
    goDetail(id, activityId, skuKillInventory) {
      console.log(this.$refs.scrollBox.scrollTop, "====");
      sessionStorage.setItem("topHere", this.$refs.scrollBox.scrollTop);
      // console.log(activityId);
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
        if (activityId && skuKillInventory != 0) {
          this.$router.push({
            path: `/detail/${id}?agencyUnionid=${
              this.$route.query.agencyUnionid || null
            }&fromPlatform=${this.$route.query.fromPlatform || null}`,
            query: { activityId, skuKillInventory }
          });
        } else {
          this.$router.push({
            path: `/detail/${id}?agencyUnionid=${
              this.$route.query.agencyUnionid || null
            }&fromPlatform=${this.$route.query.fromPlatform || null}`
          });
        }
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
      selectGood().then((res) => {
        toast.clear();
        this.isLoading = false;
        if (res.errorCode == 1) {
          // console.log(this.list);
          this.list = res.data.good || [];
          this.list1 = res.data;

          // for(let i = 0;i < res.data.good.length;i++) {
          //   if(res.data.good[i].skus.length>1){

          //     let s=0
          //     for(let j = 0;j < res.data.good[i].skus.length;j++) {
          //       s+=res.data.good[i].skus[j].skuKillInventory

          //     }

          //     res.data.good[i].skuKillInventory=s;

          //   }

          // }
          console.log(res.data.beginTime, "begintime");
          let s = new Date(res.data.beginTime?.replace(/-/g, "/")).getTime();
          let t = res.data.resetTime * 60 * 1000;
          let m = s + t;
          let n = new Date().getTime();
          if (n >= s && n <= m) {
            // console.log("限时秒杀");

            this.flgT = true;
            // console.log(this.list);
          } else {
            this.flgT = false;
          }
          //从详情页返回高度不变
          this.$nextTick(() => {
            this.$refs.scrollBox.scrollTop =
              sessionStorage.getItem("topHere") || 0;
            sessionStorage.removeItem("topHere");
          });
          return;
          for (let i = 0; i < res.data.good.length; i++) {
            if (res.data.good[i]) {
              let s = new Date(
                res.data.good[i].beginTime.replace(/-/g, "/")
              ).getTime();
              let t = res.data.good[i].resetTime * 60 * 1000;
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
    // line-height: 20.424px;
    overflow: hidden;
    text-overflow: ellipsis; /* 文本溢出时显示省略号来代表被修剪的文本 */
    display: -webkit-box; /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 */
    -webkit-box-orient: vertical; /* 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 */
    -webkit-line-clamp: 2; /* 文本需要显示多少行 */

    // height: fit-content;
    img {
      height: 17px;
      border: none;
      vertical-align: text-bottom;
    }
  }
  width: 100vw;
  height: 100vh;
  // background-image: url(../../assets/image/activity/883.png);
  // background-image: url(../../assets/image/Activityzone.png);
  background-size: 100%;
  background-repeat: no-repeat;

  .empty {
    font-size: 12px;
    color: #777;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
  }
  .activity_content {
    margin-top: 50px;
    .wrapper {
      min-height: calc(100vh - 160px);
    }
  }
  .van-pull-refresh {
    // height: 100%;
    // overflow: auto;
  }
  .header {
    > div {
      height: 100%;
    }
    position: relative;
  }
  .banner {
    color: #ffffff;
    margin-left: 10px;
  }
  .text_activity {
    height: 16px;
    font-size: 17px;

    color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 10px;
  }
  .item:nth-child(1) {
    margin-top: 73px;
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
        // position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 10px;
        .goodsName {
          font-size: 16px;
          color: black;
          margin: 10px;
        }
        .buy {
          width: 75px;
          height: 28px;
          background: linear-gradient(
            66deg,
            rgba(255, 148, 41, 1) 0%,
            rgba(255, 114, 0, 1) 100%
          );
          border-radius: 14px;
          .buy_text {
            display: block;
            line-height: 28px;
            text-align: center;
            font-size: 13px;
            font-weight: 500;
            color: #fefefe;
          }
        }
        .complete {
          background: linear-gradient(66deg, #f6c594 0%, #f8af67 100%);
        }
        .bottom-box {
          padding: 10px;
          // position: absolute;

          bottom: -8px;
          width: 100%;

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
