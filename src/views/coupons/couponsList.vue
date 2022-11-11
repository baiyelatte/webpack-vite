<template>
  <router-layout>
    <div
      class="couponsList"
      :style="{
        paddingTop:
          headerAttr.header === 1
            ? '1.22667rem'
            : `calc(1.22667rem + ${headerAttr.statusbar}px)`
      }"
    >
      <van-nav-bar
        :title="$route.meta.title"
        left-arrow
        @click-left="$router.back()"
        :style="{
          top: headerAttr.header === 1 ? '0' : headerAttr.statusbar + 'px'
        }"
      />
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        v-if="list.length"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
          offset="500"
        >
          <div
            class="couponsItem clearfix"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="left">
              <p v-if="item.couponType == 1">
                <span>￥</span>{{ item.couponDiscounts }}
              </p>
              <p v-if="item.couponType == 2">{{ item.couponDiscounts }}折</p>
              <p v-if="item.couponType == 3">{{ item.couponDiscounts }}</p>
              <p>
                {{ item.useLimit ? "满" + item.useLimit + "可用" : "无门槛" }}
              </p>
            </div>
            <div class="right">
              <button
                class="took"
                v-if="takeFun(item.couponValidStart, item.couponValidEnd)"
              >
                已生效
              </button>
              <button class="invalid" v-else>未生效</button>
              <div>
                <p>
                  {{ item.applyType === 3 ? "平台优惠卷" : "店铺优惠券" }}
                </p>
                <button
                  class="use"
                  v-if="takeFun(item.couponValidStart, item.couponValidEnd)"
                  @click="$router.push('/index')"
                >
                  去使用
                </button>
                <!-- <button class="particulars" v-else>详情</button> -->
              </div>
              <p class="validity">
                有效期{{ getTime(item.couponValidStart) }}-{{
                  getTime(item.couponValidEnd)
                }}
              </p>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
      <van-empty v-else description="暂无数据" />
    </div>
  </router-layout>
</template>
<script>
import { couponHold } from "api";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      pageNum: 1,
      pageSize: 10,
      headerAttr: LukeappApi.getattribute(),
      curDate: ""
    };
  },
  created() {
    this._couponHold();
  },
  methods: {
    _couponHold() {
      let toats;
      if (this.pageNum == 1) {
        toats = this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
      }
      couponHold({ pageNum: this.pageNum, pageSize: this.pageSize }).then(
        (res) => {
          this.refreshing = false;
          if (this.pageNum == 1) toats.clear();
          if (res.errorCode == 1) {
            this.curDate = res.timestamp;
            if (this.pageNum == 1) {
              this.list = [];
            }
            this.list = this.list.concat(res.data.content);
            if (
              res.data.content.length < this.pageSize ||
              !res.data.content.length
            ) {
              this.finished = true;
            } else {
              this.finished = false;
            }
          }
          this.loading = false;
        }
      );
    },
    getTime(time) {
      let str = time.split(" ")[0];
      return str.replace(/-/g, ".");
    },
    onRefresh() {
      this.finished = true;
      this.pageNum = 1;
      this._couponHold();
    },
    onLoad() {
      this.pageNum++;
      this._couponHold();
    },
    takeFun(beginDateStr, endDateStr) {
      let curDate = this.curDate;
      beginDateStr = beginDateStr.replace(/\-/g, "/");
      endDateStr = endDateStr.replace(/\-/g, "/");
      let beginDate = new Date(beginDateStr).getTime() / 1000;
      let endDate = new Date(endDateStr).getTime() / 1000;
      if (curDate >= beginDate && curDate <= endDate) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style scoped lang="scss">
.couponsList {
  :deep(.van-nav-bar) {
    background-color: #fff;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 1.22667rem;
  }
  .van-pull-refresh {
    min-height: calc(100vh - 1.22667rem);
  }
  .couponsItem {
    background-image: url("~@/assets/image/coupons/2.png");
    background-size: 100% 100%;
    padding: 10px;
    margin: 10px;
    position: relative;
    .left {
      float: left;
      width: 82px;
      height: 89px;
      background-image: url("~@/assets/image/coupons/1.png");
      background-size: 100% 100%;
      padding-top: 20px;
      p {
        font-size: 16px;
        color: #ffffff;
        margin-bottom: 10px;
        text-align: center;
      }
      p:nth-child(1) {
        span {
          font-size: 12px;
        }
      }
    }
    .right {
      float: left;
      font-size: 13px;
      margin-left: 15px;
      padding-top: 18px;
      width: calc(100% - 97px);
      > button {
        font-size: 11px;
        padding: 2px 5px;
        border-radius: 10px;
      }
      .invalid {
        color: #666666;
        background-color: #e7e7e7;
      }
      .took {
        background-color: #fff5f1;
        color: #ff8656;
        width: 60px;
        height: 19px;
      }
      > div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 19px;
        margin-top: 8px;
        > p {
          line-height: 19px;
          font-size: 13px;
          font-weight: 400;
          color: #333333;
        }
        button {
          padding: 2px 5px;
          font-size: 11px;
          background-color: #ffffff;
          margin-right: 10px;
        }
        .particulars {
          border: 1px solid #ff9f78;
          color: #ff9f78;
        }
        .use {
          background-color: #ca1c24;
          color: #ffffff;
          border-radius: 4px;
          width: 56px;
          height: 22px;
        }
      }
      .validity {
        color: #999999;
        margin-top: 8px;
      }
    }
  }
}
</style>
