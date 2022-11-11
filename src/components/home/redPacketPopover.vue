<!--
 * @Author: Crush
 * @Date: 2022-01-10 14:04:25
 * @LastEditTime: 2022-11-11 16:57:57
 * @FilePath: \vite_vue2.7\src\components\home\redPacketPopover.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved. 
-->
<template>
  <div>
    <van-overlay :show="innerVisible" :z-index="101">
      <div class="pop-wrapper">
        <div class="bg-wrapper">
          <van-image
            class="bg-image"
            lazy-load
            :src="require('../../assets/image/' + bgImg)"
          />
          <van-image
            class="close"
            :src="require('../../assets/image/home/close.png')"
            @click="innerVisible = false"
          >
          </van-image>
          <div class="content">
            <div class="title">{{ title }}</div>
            <div class="price">{{ priceComputed }}</div>
            <div class="rules" v-if="data">
              {{ data.useLimit ? "满" + data.useLimit + "可用" : "无门槛" }}
            </div>
            <div class="expires">{{ getTime }}</div>
          </div>

          <div class="footer">
            <div class="use-btn" @click="handleUse">立即使用</div>
            <div class="extra-info">全品类商品可用</div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { getDateRange } from "@/utils/dom";
export default {
  name: "redPacketPopover",
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    title: {
      default: "恭喜抢到锦鲤红包",
      type: String
    },
    bgImg: {
      default: "home/red-carp.png",
      type: String
    },
    data: {
      default: () => ({}),
      type: Object
    }
  },
  data() {
    return {
      innerVisible: false
    };
  },
  methods: {
    handleUse() {
      this.innerVisible = false;
      this.$emit("handleUse");
    }
  },
  watch: {
    visible: {
      handler(value) {
        this.innerVisible = value;
      },
      immediate: true
    }
  },
  computed: {
    priceComputed() {
      const { couponType, couponDiscounts } = this.data || {};
      return [
        "",
        "￥" + couponDiscounts,
        couponDiscounts + "折",
        "￥" + couponDiscounts
      ][couponType];
    },
    getTime() {
      const { couponValidStart, couponValidEnd } = this.data || {};

      return getDateRange(couponValidStart, couponValidEnd);
    }
  }
};
</script>

<style scoped lang="scss">
.pop-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #d12a26;
  .bg-wrapper {
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
    width: 302px;
    height: 298px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .bg-image {
      width: 100%;
      position: absolute;
      top: 0;
      z-index: -1;
    }
    .close {
      position: absolute;
      width: 21.5px;
      right: 28.5px;
      top: 9px;
    }
    .content {
      margin-top: 25px;
      display: flex;
      flex-direction: column;
      height: 140px;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 21.35px;
        font-weight: 800;
      }
      .price {
        // margin-top: 20.5px;
        font-size: 44.48px;
      }
      .rules {
        // margin-top: 17.5px;
        font-size: 13.34px;
      }
      .expires {
        // margin-top: 9px;
        font-size: 10.68px;
      }
    }
    .footer {
      margin-bottom: 15px;
      .use-btn {
        font-size: 22px;
        width: 210px;
        height: 40px;
        border-radius: 80px;
        font-weight: 600px;
        color: #c90207;
        background-image: linear-gradient(#ffe5c5, #ffd9af);
        line-height: 40px;
      }
      .extra-info {
        margin-top: 19px;
        font-size: 10.68px;
        color: #fefefe;
      }
    }
  }
}
</style>
