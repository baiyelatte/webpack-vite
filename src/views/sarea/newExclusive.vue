<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!isApp"
      left-arrow
      @click-left="$router.back()"
      :style="{
        top: headerAttr.header === 1 ? '0' : headerAttr.statusbar + 'px'
      }"
    />
    <div class="preferential" v-if="goodsListArr && goodsListArr.length > 0">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div class="top"></div>
        <div class="goods_lists">
          <!-- <div class="downTime">{{ downTime }}</div> -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="list_onLoad_more"
          >
            <div style="display: flex; justify-content: space-between">
              <div class="list_left">
                <div
                  class="inner-box goods-item"
                  v-if="index % 2 == 0"
                  v-for="(item, index) in goodsListArr"
                  :key="index"
                  @click="getDetails(item.goodsId)"
                >
                  <div class="img-box">
                    <img :src="item.logoImgUrl" alt="" />
                  </div>
                  <div class="text-box">
                    <div class="title">
                      {{ item.goodsName }}
                    </div>
                    <div v-if="item.canVoucherMoney" class="goods-price">
                      <span class="price">¥{{ fun(item.payMoney) }} </span>
                      <span
                        class="dyjico"
                        style="color: #d1020c"
                        v-show="item.canVoucherMoney && item.payMoney"
                        >{{ priceFun(item.voucherMoney) }}</span
                      >
                      <span class="linePrice">¥{{ fun(item.showPrice) }} </span>
                    </div>
                    <div v-else class="goods-price">
                      <span class="price">¥{{ fun(item.showPrice) }} </span>
                      <span class="linePrice">¥{{ fun(item.linePrice) }} </span>
                    </div>
                    <div class="tailMarkBox">
                      <button
                        v-if="item.tailMark != '' && item.tailMark != null"
                        class="tailMark"
                      >
                        {{ item.tailMark }}
                      </button>
                      <p class="buyNumber">
                        已售{{ buyNumberFun(item.buyNumber) }}件
                      </p>
                    </div>
                    <div class="personalityTags">
                      <div
                        v-for="(item2, index) in chageArr(item.personalityTags)"
                        :key="index"
                      >
                        <p>{{ item2 }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list_right">
                <div
                  class="inner-box goods-item"
                  v-if="index % 2 == 1"
                  v-for="(item, index) in goodsListArr"
                  :key="index"
                  @click="getDetails(item.goodsId)"
                >
                  <div class="img-box">
                    <img :src="item.logoImgUrl" alt="" />
                  </div>
                  <div class="text-box">
                    <div class="title">
                      {{ item.goodsName }}
                    </div>
                    <div v-if="item.canVoucherMoney" class="goods-price">
                      <span class="price">¥{{ fun(item.payMoney) }} </span>
                      <span
                        class="dyjico"
                        style="color: #d1020c"
                        v-show="item.canVoucherMoney && item.payMoney"
                        >{{ priceFun(item.voucherMoney) }}</span
                      >
                      <span class="linePrice">¥{{ fun(item.showPrice) }} </span>
                    </div>
                    <div v-else class="goods-price">
                      <span class="price">¥{{ fun(item.showPrice) }} </span>
                      <span class="linePrice">¥{{ fun(item.linePrice) }} </span>
                    </div>
                    <div class="tailMarkBox">
                      <button
                        v-if="item.tailMark != '' && item.tailMark != null"
                        class="tailMark"
                      >
                        {{ item.tailMark }}
                      </button>
                      <p class="buyNumber">
                        已售{{ buyNumberFun(item.buyNumber) }}件
                      </p>
                    </div>
                    <div class="personalityTags">
                      <div
                        v-for="(item2, index) in chageArr(item.personalityTags)"
                        :key="index"
                      >
                        <p>{{ item2 }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </div>
      </van-pull-refresh>
    </div>
    <div class="nodesdata" v-else>
      <van-empty description="暂无数据" />
    </div>
  </router-layout>
</template>
<script>
import { getLists } from "@/api";
import { priceFun } from "@/utils/dom";
export default {
  name: "newExclusive",
  data() {
    return {
      refreshing: false,
      loading: false, // 加载状态
      finished: false, // 是否加载
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页条数
      goodsListArr: [],
      downTime: null,
      downTimeInstance: null,
      headerAttr: LukeappApi.getattribute(),
      isApp: LukeappApi.IscltApp()
    };
  },
  created() {
    this._getLists();
    this.handleDownTime();
  },
  methods: {
    priceFun: priceFun,
    handleDownTime() {
      const todayTenHour = this.$dayjs(
        this.$dayjs().format("YYYY-MM-DD") + " 10:00"
      ).$d;
      const expiresTime =
        todayTenHour > this.$dayjs().$d
          ? todayTenHour
          : this.$dayjs(
              this.$dayjs().add(1, "day").format("YYYY-MM-DD") + " 10:00"
            ).$d;

      const downTimeTrigger = () => {
        this.downTime = this.$dayjs(0)
          .subtract(8, "hour")
          .millisecond(expiresTime - this.$dayjs().$d)
          .format("HH:mm:ss");
      };
      downTimeTrigger();
      this.downTimeInstance = setInterval(downTimeTrigger, 1000);
    },
    getDetails(id) {
      this.$emit("goDeatil", id);
      this.$router.push({
        path: `/detail/${id}?pageFrom=new&agencyUnionid=${
          this.$route.query.agencyUnionid || null
        }&fromPlatform=${this.$route.query.fromPlatform || null}`
      });
    },
    list_onLoad_more() {
      console.log(1);
      this.pageNum += 1;
      this._getLists();
    },
    onRefresh() {
      this.orderrefresh = false;
      this.pageNum = 1;
      this._getLists(true);
    },
    _getLists(isRefresh) {
      this.loading = true;
      let userinfo = JSON.parse(window.localStorage.getItem("userinfo")) || [];
      let searparams = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        token: userinfo.token
      };
      getLists(searparams).then((res) => {
        this.refreshing = false;
        if (res && res.errorCode == 1) {
          this.loading = false;
          this.goodsListArr = [
            ...(isRefresh ? [] : this.goodsListArr),
            ...res.data.list
          ];
          this.finished = !res.data.hasNextPage;
        } else {
          this.loading = false;
          this.finished = true;
        }
      });
    },
    chageArr(str) {
      if (!str) {
        return;
      }
      return str.split(",");
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
  },
  destroyed() {
    clearInterval(this.downTimeInstance);
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
:deep(.van-pull-refresh) {
  min-height: calc(100% - 223px);
}
.preferential {
  height: calc(100vh - 46px);
  overflow: auto;
  width: 100vw;
  font-size: 14px;
  .top {
    width: 100vw;
    height: 223px;
    background-image: url("~@/assets/image/activity/exclusivelyNewcomers.png");
    background-repeat: no-repeat;
    background-size: contain;
  }
  .goods_lists {
    // background-image: url("~@/assets/image/activity/编组4@2x.png");
    // background-size: 100%;
    // background-attachment: fixed;
    min-height: calc(100vh - 223px);
    width: 100%;
    // background-repeat: no-repeat;
    padding: 10px;
    transform: translateY(-1px);

    // .downTime {
    //   text-align: center;
    //   font-size: 33px;
    //   color: #fff;
    //   padding: 7px;
    // }
    .list_left,
    .list_right {
      width: 49%;
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
        margin: 5px 0 0;
        color: #d1020c;
        overflow: hidden;
        display: flex;
        align-items: center;
      }
      .price {
        font-size: 16px;
        float: left;
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
  }
  .goods_lists:before {
    content: "";
    background: url("~@/assets/image/activity/exclusivelyNewcomersBg.png");
    background-size: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
}
</style>
