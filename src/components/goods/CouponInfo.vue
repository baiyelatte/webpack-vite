<!--
 * @Author: Admin
 * @Date: 2022-03-14 15:37:11
 * @LastEditors: Crush
 * @LastEditTime: 2022-03-17 16:11:12
 * @FilePath: \mallh5\src\components\goods\CouponInfo.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved. 
-->
<script>
import { defineComponent, computed } from "vue";

import { RightSvg } from "@/assets/image/svg";

import { getDateRange } from "@/utils/dom";

const couponTypeEnum = [
  "店铺优惠券",
  "指定店铺商品可用",
  "指定店铺商品可用",
  "全品类商品可用"
];

export default defineComponent({
  name: "CouponInfo",
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    selectId: {
      type: String,
      default: ""
    }
  },
  components: { RightSvg },
  setup({ data }) {
    const {
      couponType,
      couponDiscounts,
      couponValidStart,
      couponValidEnd,
      applyType
    } = data;
    const priceComputed = computed(
      () =>
        [
          "￥" + couponDiscounts,
          couponDiscounts + "折",
          "￥" + couponDiscounts
        ][couponType - 1]
    );

    const getTime = computed(() =>
      getDateRange(couponValidStart, couponValidEnd)
    );

    const couponName = computed(() => couponTypeEnum[applyType]);

    return {
      priceComputed,
      getTime,
      couponName
    };
  }
});
</script>

<template>
  <div class="couponInfo">
    <div class="leftBox">
      <div class="price">
        {{ priceComputed }}
      </div>
      <div class="rules">
        {{ data.useLimit ? "满" + data.useLimit + "可用" : "无门槛" }}
      </div>
    </div>
    <div class="rightBox">
      <div class="couponName">
        {{ couponName }}
      </div>
      <div class="expires">
        {{ getTime }}
      </div>
      <div class="select" v-if="selectId === data.id">
        <right-svg />
      </div>
      <div class="unSelect" v-else></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.couponInfo {
  margin: 10px 0;
  display: flex;
  position: relative;
  .leftBox {
    position: relative;
    background-image: linear-gradient(to right, #ffae93, #ff4783);
    width: 130px;
    height: 80px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    color: #fff;
    text-align: center;

    .price {
      margin-top: 10px;
      font-size: 24px;
    }

    .rules {
      margin-top: 20px;
      font-size: 13px;
    }

    &::after {
      content: "";
      display: block;
      width: 6px;
      height: 100%;
      background-size: 6px 6px;
      background-repeat: repeat-y;
      background-image: radial-gradient(#fff 2px, transparent 2px);
      position: absolute;
      top: 0;
      right: -3px;
    }
  }
  .rightBox {
    width: 221px;
    position: relative;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: #ececec 2px 2px 5px;
    .couponName {
      margin: 12px 16px;
      color: #333;
      font-size: 16px;
    }
    .expires {
      color: #999;
      position: absolute;
      left: 16px;
      bottom: 5px;
      font-size: 11px;
      padding-top: 10px;
      border-top: #ddd 0.5px dashed;
    }
    .select,
    .unSelect {
      position: absolute;
      right: 20px;
      bottom: 30px;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      text-align: center;
    }
    .select {
      line-height: 25px;
      background-image: linear-gradient(#ffaf94, #ff4b84);
    }
    .unSelect {
      border: 0.5px rgba($color: #bdbdbd, $alpha: 0.3) solid;
    }
  }

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: calc(50% - 7px);
    background-color: #fff;
    width: 14px;
    height: 14px;
    border-radius: 100%;
    z-index: 5;
  }

  &::before {
    left: -7px;
  }
  &::after {
    right: -7px;
    box-shadow: #ececec 2px 2px 5px inset;
  }
}
</style>
