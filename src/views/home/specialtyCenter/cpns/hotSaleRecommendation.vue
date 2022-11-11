<!--
 * @Date: 2022-10-10 15:27:55
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-08 09:16:42
 * @FilePath: \mallh5\src\views\home\specialtyCenter\cpns\hotSaleRecommendation.vue
-->
<template>
  <!-- v-if="list" -->
  <div class="hotSaleRecommendation" v-if="list">
    <span class="hotSaleRecommendationP">{{ title }}</span>
    <!-- <van-swipe
      ref="swipeRef"
      class="my-swipe"
      :autoplay="0"
      :loop="false"
      :show-indicators="false"
      :width="90"
    >
      <van-swipe-item
        v-for="(image, index) in itemList ?? 10"
        :key="index"
        class="hotSaleRecommendationSwipe"
      >
        <img class="sortModuleImg" v-lazy="url" />
        <div class="shopBoxFooter">
          <p class="shopName">
            啊s啊吊袜带阿瓦达文档阿达伟大阿达文档瓦大阿文低洼地阿达哇大王的阿达阿瓦大王的伟
          </p>
          <p class="shopBoxFooterPriceP">
            <span class="shopBoxFooterPriceSpan">￥</span>999
          </p>
        </div>
      </van-swipe-item>
    </van-swipe> -->
    <swiper class="swiper" :options="swiperOption" ref="swiperSlideRef">
      <swiper-slide
        v-for="(image, index) in title === '热卖推荐'
          ? itemList.list
          : itemList"
        :key="index"
        class="hotSaleRecommendationSwipe"
      >
        <div @click="handleJump(image, title)">
          <img
            class="sortModuleImg"
            v-lazy="image.goodsImage ?? image.suggestGoodsImage"
          />
          <div class="shopBoxFooter">
            <img
              v-if="title === '优选店铺'"
              class="shopClass"
              v-lazy="image.logImage"
            />
            <p class="hotShopName">
              {{ image.goodsTitle ?? image.shopName }}
            </p>
            <p class="shopBoxFooterPriceP" v-if="title === '热卖推荐'">
              <span class="shopBoxFooterPriceSpan">￥</span
              >{{ image.salePrice }}
            </p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import router from "@/router";
const props = defineProps({
  title: {
    type: String,
    default: "热卖推荐"
  },
  itemList: {
    type: Array | Object,
    default: () => []
  }
});
const swiperOption = {
  slidesPerView: 3.5,
  spaceBetween: 8
};
const swiperSlideRef = ref();
const list = computed(() => {
  if (props.title == "热卖推荐") {
    if (props.itemList.list) {
      if (props.itemList.list.length == 0) {
        return false;
      } else {
        return true;
      }
    }
  } else {
    if (props.itemList == null || props.itemList.length == 0) {
      return false;
    } else {
      return true;
    }
  }
});
setTimeout(() => {
  // console.log(props.itemList.list.length, props.title);
  // console.log(
  //   props.itemList,
  //   props.title,
  //   swiperSlideRef.value.$el.dom7ElementDataStorage.swiper.onClick
  // );
}, 2000);
const swipeRef = ref();

function animate(obj, target, newValue) {
  var timer = setTimeout(() => {
    if (newValue <= target) {
      clearTimeout(timer);
    } else {
      console.log(obj.offset);
      obj.offset = newValue - 2;
    }
  }, 30);
}

// onMounted(() => {
//   const offsetD = computed(() => swipeRef.value.offset);
//   console.log(swipeRef.value.offset);
//   watch(offsetD, (newValue) => {
//     // if (newValue <= -579) {
//     //   console.log(newValue);
//     //   animate(swipeRef.value, -650, newValue);
//     // }
//     if (newValue == -579) {
//       swipeRef.value.offset = -650;
//     }
//   });
// });
const handleJump = (item, title) => {
  console.log(item, title);
  if (title === "热卖推荐") {
    router.push({
      name: `detail`,
      params: {
        id: item.goodsId
      }
    });
  } else {
    router.push({
      name: `shopinfo`,
      params: {
        shopId: item.shopId
      }
    });
  }
};
const url =
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftva1.sinaimg.cn%2Fbmiddle%2F006APoFYly1g2qtpp570xj303m03mjr6.jpg&refer=http%3A%2F%2Ftva1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667899253&t=fbb3f50c086cc62a9d32605ede28d73c";
</script>

<style lang="scss" scoped>
.hotSaleRecommendation {
  width: 351px;
  // height: 190px;
  background: linear-gradient(#ffe1de, #ffffff);
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 12px;
  position: relative;
  padding: 0 14px;
  z-index: 0;
  .hotSaleRecommendationP {
    font-size: 16px;
    color: #333333;
    font-weight: 700;
    position: absolute;
    left: 39px;
    top: 13px;
  }
  .my-swipe .van-swipe-item {
    width: 90px;
    height: 140px;
  }
  .hotSaleRecommendationSwipe {
    position: relative;
    width: 90px;
    height: 140px;
    margin-top: 38.5px;
    background-color: #fff;
    border-radius: 8px 8px 0px 0px;
    overflow: hidden;
    .sortModuleImg {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 70px;
    }
    .shopBoxFooter {
      position: absolute;
      bottom: 0px;
      text-align: center;
      width: 100%;
      height: 70px;
      padding: 5px;
      .hotShopName {
        width: 80px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 13px;
        color: #333333;
        font-weight: bold;
        letter-spacing: 0.5px;
        line-height: 16px;
        // padding-top: 28px;
      }
      .shopBoxFooterPriceP {
        position: absolute;
        bottom: 10px;
        color: red;
        font-size: 16px;
        .shopBoxFooterPriceSpan {
          color: red;
          font-size: 12px;
        }
      }
    }
  }
}

.hotSaleRecommendation::before {
  content: "";
  position: absolute;
  background: url("../../../../assets/image/newVersion/hot.png") no-repeat;
  background-size: 100%;
  width: 22px;
  height: 22px;
  left: 15px;
  top: 10px;
}
.shopClass {
  width: 34px;
  height: 34px;
  position: absolute;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
