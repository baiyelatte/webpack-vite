<template>
  <router-layout>
    <div>
      <div
        class="activity"
        :style="{
          paddingTop:
            headerAttr.header === 1
              ? '1.22667rem'
              : `calc(1.22667rem + ${headerAttr.statusbar}px)`
        }"
      >
        <!-- <div
          class="header-btn2 goodsback"
          :style="{
            top: headerAttr.header === 1 ? '0' : headerAttr.statusbar + 'px',
          }"
        >
          <i
            @click="_backlogin"
            class="van-icon van-icon-arrow-left van-nav-bar__arrow banner"
          />
          <span class="text_activity">官方补贴</span>
        </div> -->
        <van-nav-bar
          :title="$route.meta.title"
          left-arrow
          v-if="!isApp"
          @click-left="$router.back()"
          :style="{
            top: headerAttr.header === 1 ? '0' : headerAttr.statusbar + 'px'
          }"
        />
        <div class="activity_content" ref="list">
          <van-pull-refresh
            v-model="isLoading"
            @refresh="onRefresh"
            style="min-height: calc(100vh - 1.22667rem)"
          >
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
            >
              <div
                class="info"
                @click="
                  goDetail(
                    item.goodsId,
                    officialSubsidy,
                    item.officialSubsidyId,
                    item.enableQuantity
                  )
                "
                v-for="(item, index) in activitylist"
                :key="index"
              >
                <van-card>
                  <template #title>
                    <div
                      class="van-card__title van-multi-ellipsis--l2 title_text"
                    >
                      {{ item.goodsName }}
                    </div>

                    <div v-if="item.canVoucherMoney" class="butie">
                      <div style="color: red">
                        {{ item.tagContent ? item.tagContent : "补贴价" }}
                        <span
                          class="van-card__price-currency"
                          style="color: #d1020c"
                          >¥</span
                        >
                        <span
                          class="van-card__price-integer"
                          style="color: #d1020c"
                          >{{ priceFun(item.payMoney) }}</span
                        >
                        <span
                          class="dyjico"
                          style="color: #d1020c"
                          v-show="item.canVoucherMoney && item.payMoney"
                          >{{ priceFun(item.voucherMoney) }}</span
                        >
                      </div>
                      <div style="color: #666666">
                        原价
                        <span
                          class="van-card__price-currency"
                          style="color: #666666"
                          >¥</span
                        >

                        <span
                          class="van-card__price-integer"
                          style="color: #666666"
                          >{{ priceFun(item.minNormalPrice) }}</span
                        >
                      </div>
                    </div>

                    <div v-else class="butie">
                      <div style="color: red">
                        {{ item.tagContent ? item.tagContent : "补贴价" }}
                        <span
                          class="van-card__price-currency"
                          style="color: #d1020c"
                          >¥</span
                        >

                        <span
                          class="van-card__price-integer"
                          style="color: #d1020c"
                          >{{ priceFun(item.minActivityPrice) }}</span
                        >
                      </div>
                      <div style="color: #666666">
                        原价
                        <span
                          class="van-card__price-currency"
                          style="color: #666666"
                          >¥</span
                        >

                        <span
                          class="van-card__price-integer"
                          style="color: #666666"
                          >{{ priceFun(item.minNormalPrice) }}</span
                        >
                      </div>
                      <!-- <span class="tailMarkText" v-if="item.tailMark">{{
                        item.tailMark
                      }}</span> -->
                    </div>
                  </template>
                  <template #thumb>
                    <div class="van-image">
                      <img
                        style="width: 100%; height: 100%"
                        :src="item.logoImgUrl"
                        alt=""
                      />
                    </div>
                  </template>

                  <template #price>
                    <div class="peopleNumber" v-if="item.buyNumber >= 10">
                      {{ salesFun(item.buyNumber) }}人付款
                    </div>
                    <div class="buy" v-if="item.enableQuantity > 0">
                      <span class="buy_text">购买</span>
                    </div>
                    <div class="buy buy1" v-else>
                      <span class="buy_text" style="">已抢完</span>
                    </div>
                  </template>
                </van-card>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
    </div>
  </router-layout>
</template>

<script>
import { getactivityZone, getrecommend, officialSubsidy } from "api";
import { Dialog } from "vant";
import { mapGetters } from "vuex";
import Vue from "vue";
import { salesFun, priceFun } from "@/utils/dom";
export default {
  name: "Activityzone",
  data() {
    return {
      show: true,
      activitylist: [],
      page: 0,
      isLoading: false,
      loading: false,
      finished: false,
      id: 0,
      luck: {},
      addresslist: [],
      voucherMoney: 0,
      phone: "",
      imgurl: require("@/assets/image/luck_top.png"),
      personalityTagsArr: [],
      //  cancanDefault:true
      // 补贴
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页条数
      officialSubsidy: true,
      headerAttr: LukeappApi.getattribute(),
      isApp: LukeappApi.IscltApp()
    };
  },
  created() {
    window.onresize = () => this.getHeight();
    this._getactivityZone();
  },
  mounted() {},
  methods: {
    salesFun: salesFun,
    priceFun: priceFun,
    tagsFun(val) {
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
    goDetail(id, officialSubsidy, officialSubsidyId, enableQuantity) {
      if (officialSubsidy && enableQuantity != 0) {
        this.$router.push({
          path: `/detail/${id}?agencyUnionid=${
            this.$route.query.agencyUnionid || null
          }&fromPlatform=${this.$route.query.fromPlatform || null}`,
          query: { officialSubsidy, officialSubsidyId, enableQuantity }
        });
      } else {
        this.$router.push({
          path: `/detail/${id}?agencyUnionid=${
            this.$route.query.agencyUnionid || null
          }&fromPlatform=${this.$route.query.fromPlatform || null}`
        });
      }
    },
    _getactivityZone(a) {
      this.page++;

      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      if (a == 1) {
        this.isLoading = true;
      }

      officialSubsidy({ pageNum: this.page, pageSize: 10 }).then((res) => {
        if (res && res.errorCode === 1) {
          if (this.page == 1) {
            this.activitylist = [];
          }

          for (let i = 0; i < res.data.list.length; i++) {
            this.activitylist.push(res.data.list[i]);
          }

          this.isLoading = false;
          this.loading = false;
          if (res.data.list.length < 10) {
            this.finished = true;
          } else {
            this.finished = false;
          }

          toast.clear();
        }
      });
    },
    onRefresh() {
      this.page = 0;
      this.finished = true;
      this._getactivityZone();
    },
    onLoad() {
      this._getactivityZone();
    }
  }
};
</script>

<style scoped lang="scss">
.activity {
  :deep(.van-nav-bar) {
    background-color: #fff;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 1.22667rem;
  }
}
.peopleNumber {
  margin-top: 10px;
  font-size: 11px;
  color: #999;
  float: left;
}
.butie {
  margin-top: 10px;
  > div {
    margin-top: 10px;
  }
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
.van-popup {
  background-color: transparent;
}
.luck {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .luck_top {
    padding-top: 50px;

    img {
      width: 291px;
    }
    position: relative;
  }
  .luck_bottom {
    width: 147px;
    height: 30px;
    background-image: url(../../assets/image/award/bg19.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 15px;
    color: #ff491e;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.van-image {
  width: 100%;
  height: 100%;
}
.activity {
  background: #f5f5f5;
  .banner {
    color: #333333;
    margin-left: 10px;
  }
}
.activity_middle {
  margin: 140px 1.94667rem 40px 2.94667rem;
}
.activity_middle_text {
  width: 220px;
  height: 54px;
  font-size: 40px;
  font-weight: bold;
  color: #fcfbfb;
}
.text_activity {
  font-size: 18px;
  margin: 0 auto;

  font-weight: 500;
  color: #333333;
}

.activity_content {
  border-radius: 10px;

  .info {
    margin: 10px;
  }
}
.van-card {
  padding: 10px !important;
  border-radius: 10px;
  background: #fff !important;
}
.buy {
  // padding-top: 4px;
  width: 72px;
  height: 29px;
  background: linear-gradient(66deg, #ff3c09 0%, #ff1d3e 100%);
  border-radius: 8px;
  line-height: 29px;
  text-align: center;
  float: right;
}
.buy1 {
  background: RGBA(233, 233, 233, 1);
}
.van-card__price {
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .price_cls {
    padding-top: 8px;
  }
}
.buy_text {
  width: 55px;

  font-size: 14px;

  font-weight: 500;
  color: #fefefe;
  // padding-left: 10px;
}
.fa {
  color: #ff7502;
  margin-left: 10px;
}
.van-card__bottom {
  margin-top: 10px;
}
.price_cls {
  color: #d20202;
  padding-top: 8px;
}
.title_text {
  font-size: 13px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  font-weight: 500;
  color: #333333;
}
.van-card__content {
  // padding: 10px 10px 4px 0;
}
.van-card__thumb {
  width: 40%;
  height: 130px;
}
// .van-card__thumb img {
//   border-radius: 0;
// }
.goodsback {
  // padding: 15px;
  height: 1.22667rem;
  line-height: 1.22667rem;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #ededed;
  z-index: 1;
  i {
    line-height: 1.22667rem;
  }
}
.van-card__thumb img {
  border-radius: 6px;
}
.stick {
  margin-left: 10px;
  color: rgb(210, 2, 2);
}
.tailMarkText {
  display: block;

  width: fit-content;
  background: #d1020c;
  color: white;
  font-size: 10px;
  border-radius: 10px;
  padding: 2px 5px;
  height: 16px;
  margin-right: 5px;
  // margin-top: 5px;
}
</style>
