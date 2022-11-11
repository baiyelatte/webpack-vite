<template>
  <div class="xsmsBox">
    <div class="top">
      <van-icon
        class="backIcon"
        name="arrow-left"
        color="#fff"
        size="24"
        @click="$router.back()"
      />
      <div class="flexBox topTitle">
        <img class="titleImg" src="../../assets/image/home/xsqg.png" alt="" />
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 刷新次数: {{ count }}</p> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <div class="shopLists" v-if="list.length > 0">
          <div
            class="shopItem flexBox"
            v-for="(item, index) in list"
            :key="index"
          >
            <img class="shopImg" :src="item.logoImgUrl" alt="左边" />
            <div class="right">
              <div class="title">{{ item.goodsName }}</div>
              <div class="lineRow flexBox">
                <div class="rowAll">
                  <!-- <div class="rowInner" :style="{width: (item.buyNumber / item.xxx)*100}"></div> -->
                  <div
                    class="rowInner"
                    :style="{
                      width: (item.buyNumber / item.enableQuantity) * 100 + '%'
                    }"
                  ></div>
                  <img
                    :style="{
                      left: (item.buyNumber / item.enableQuantity) * 100 + '%'
                    }"
                    class="step"
                    src="../../assets/image/home/step.png"
                    alt=""
                  />
                </div>
                <div>
                  已售{{ (item.buyNumber / item.enableQuantity) * 100 }}%
                </div>
              </div>
              <div class="biaoqian">
                <div class="bq">{{ item.personalityTags }}</div>
              </div>
              <div class="bottom">
                <div
                  class="priceBox"
                  style="display: flex; align-items: center"
                >
                  <div class="price">¥{{ item.showPrice }}</div>
                  <span class="price dyjico">{{ item.voucherMoney }} </span>
                </div>
                <div class="buyBtn">购买</div>
              </div>
            </div>
          </div>
        </div>
        <div class="shopLists empty" v-else>
          <p>暂无秒杀商品</p>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getPromotionGoodsInfo } from "api";
export default {
  data() {
    return {
      count: 0,
      isLoading: false,
      loading: false,
      finished: false,
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      getPromotionGoodsInfo({
        goodsCateLevelOne: 11659,
        status: 1
      }).then((res) => {
        toast.clear();
        this.isLoading = false;
        if (res && res.errorCode == 1) {
          if (res.data.content.length > 0) {
            this.list = res.data.content;
            this.loading = false;
            this.finished = true;
          }
        }
      });
    },
    // 下拉刷新
    onRefresh() {
      this.isLoading = false;
      this.count++;
    },
    onLoad() {
      // // 加载状态结束
      this.loading = false;
      // // 数据全部加载完成
      this.getList();
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1);
      //     }
      //     // 加载状态结束
      //     this.loading = false;
      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true;
      //     }
      //   }, 1000);
    }
  }
};
</script>
<style lang="scss">
.xsmsBox {
  .flexBox {
    display: flex;
    align-items: center;
  }
  .top {
    position: relative;
    padding: 20px;
    .backIcon {
      position: absolute;
      left: 20px;
      top: 20px;
    }
    .topTitle {
      justify-content: center;
    }
    background: linear-gradient(#fd5e5c, #ff2b29);
    .titleImg {
      width: 88px;
    }
  }
  .shopLists {
    // padding: 20px;
    padding: 0 25px;
    .shopItem {
      padding: 20px 0;
      border-bottom: 1px solid #efeeee;
      .shopImg {
        width: 100px;
        height: 100px;
      }
    }
    .right {
      margin-left: 20px;
      .title {
        font-size: 15px;
        color: #333330;
        font-weight: bold;
        // margin-bottom: 5px;
      }
      .lineRow {
        font-size: 11px;
        color: #999999;
        margin: 5px 0;
        .rowAll {
          width: 116px;
          height: 11px;
          background: #fee8e5;
          border-radius: 6px;
          position: relative;
          margin-right: 5px;
          .rowInner {
            position: absolute;
            left: 0;
            top: 0;
            width: 20px;
            height: 100%;
            background-color: #cc2e2e;
            border-radius: 5px;
          }
          .step {
            position: absolute;
            top: 50%;
            transform: translateY(-50%) translateX(-7px);
            left: 0;
            width: 14px;
            height: 14px;
          }
        }
      }
      .biaoqian {
        width: 55px;
        height: 15px;
        border-radius: 3px;
        border: 1px solid #bb0101;
        font-size: 11px;
        line-height: 15px;
        color: #bb0101;
        text-align: center;
      }
      .bottom {
        margin-top: 5px;
        display: flex;
        .priceBox {
          color: #bb0000;
          .price {
            font-size: 15px;
            font-weight: 500;
            line-height: 21px;
          }
          .dyjico {
            font-size: 13px;
            font-weight: 400;
            line-height: 19px;
          }
        }
        .buyBtn {
          margin-left: 65px;
          width: 56px;
          height: 27px;
          background: #cc2e2e;
          border-radius: 4px;
          line-height: 27px;
          text-align: center;
          color: #fff;
          font-size: 14px;
        }
      }
    }
  }
  .empty {
    font-size: 12px;
    color: #777;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
  }
}
</style>
