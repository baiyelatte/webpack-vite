<template>
  <van-pull-refresh
    class="goodListBox"
    v-model="refreshing"
    @refresh="onRefresh"
  >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <div
              class="shopBackgroundBox"
              :style="{
                backgroundImage: `url(${
                  shopData.showImgUrl ? shopData.showImgUrl : shopbgdefau
                })`
              }"
            >
              <div class="shopBg"></div>
            </div> -->
      <!-- 轮播图 -->
      <!-- <div class="shopBanner" v-if="shopData.imgArrayUrl">
              <van-swipe
                class="my-swipe"
                :autoplay="3000"
                indicator-color="white"
                ref="swipe"
              >
                <van-swipe-item
                  v-for="(item, index) in shopData.imgArrayUrls.filter(
                    (s) => s && s.trim()
                  )"
                  :key="index"
                >
                  <img v-lazy="item" alt="" />
                </van-swipe-item>
              </van-swipe>
            </div> -->
      <div class="goodBox" style="padding: 0 10px" v-if="isShowGoodList">
        <div ref="goodListLeftRef">
          <template v-for="(item, index) in goodListLeft">
            <GoodItem
              :goodItem="item"
              :key="index"
              :isShowShop="false"
              :id="'Y' + item.goodsId"
            />
          </template>
        </div>
        <div ref="goodListRightRef">
          <template v-for="(item, index) in goodListRight">
            <GoodItem
              :goodItem="item"
              :key="index"
              :isShowShop="false"
              :id="'Y' + item.goodsId"
            />
          </template>
        </div>
      </div>
      <div class="nodeData" v-if="!isShowGoodList">
        <van-empty description="暂无数据" />
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script setup>
import { ref, nextTick, onMounted, watch, toRefs, onActivated } from "vue";
import { Toast } from "vant";
import router from "@/router";
import store from "@/store";
import GoodItem from "@/components/goods/goodItem";
import { getQuery } from "api";

const props = defineProps({
  shopData: {
    type: Array,
    default: () => []
  },
  orderType: {
    type: Boolean,
    default: false
  },
  orderByName: {
    type: Number | String,
    default: 1
  },
  goodName: {
    type: String,
    default: ""
  }
});
const { shopData, orderType, orderByName, goodName } = toRefs(props);
const isShowGoodList = ref(false);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const goodListLeftRef = ref();
const goodListRightRef = ref();
const goodListLeft = ref([]);
const goodListRight = ref([]);
const route = router.currentRoute;
const shopId = ref(route.params.shopId);
const isShow = ref(true);
const onRefresh = () => {
  goodListLeft.value = [];
  goodListRight.value = [];
  pageNum.value = 1;
  getGoodList(true);
};
const onLoad = () => {
  pageNum.value += 1;
  getGoodList(true);
};
const pageNum = ref(1);
const pageSize = ref(10);

onMounted(() => {
  getGoodList();
});
onActivated(() => {
  router.beforeEach((to, from, next) => {
    if (to.meta.title === "门店主页" && from.meta.title === "商品详情页") {
      setTimeout(() => {
        document.querySelector(`#Y${from.params.id}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest"
        });
      }, 0);
    } else if (to.meta.title === "门店主页") {
      pageNum.value = 1;
      // getGoodList();
    }
    next();
  });
});
// watch(shopId,()=>{
//     pageNum.value = 1;
//   getGoodList();
// })
watch([orderType, orderByName, goodName], (newOrderType, oldValue) => {
  pageNum.value = 1;
  getGoodList();
});
function getGoodList(more = false) {
  loading.value = true;
  let toast = "";
  if (!more) {
    toast = Toast.loading({
      message: "加载中...",
      forbidClick: true
    });
  }

  const searParams = {
    shopId: route.params.shopId,
    orderByName: orderByName.value,
    orderType: orderType.value,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    content: goodName.value,
    agencyUnionid: route.query.agencyUnionid || null,
    fromPlatform: route.query.fromPlatform || null,
    shopGoodsCategoryId: route.query.categoryId ?? null
  };
  getQuery(searParams).then((res) => {
    if (res && res.errorCode === 1) {
      const { content = [], isHasNextPage } = res?.data;
      refreshing.value = false;
      isShowGoodList.value = true;
      if (more) {
        if (content.length > 0) {
          nextTick(() => {
            handleGoodData(content);
          });
        }
      } else {
        toast.clear();
        goodListLeft.value = [];
        goodListRight.value = [];
        nextTick(() => {
          handleGoodData(content);
        });
      }
      if (content.length == 0 || !isHasNextPage) finished.value = true;
    }
    loading.value = false;
  });
}
function handleGoodData(arr) {
  arr.forEach((element, index) => {
    if (index % 2 == 0) {
      goodListLeft.value.push(arr[index]);
    }
    if (index % 2 == 1) {
      goodListRight.value.push(arr[index]);
    }
  });
}
</script>

<style lang="scss" scoped>
.goodListBox {
  .shopBackgroundBox {
    // height: 140px;
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    left: 0;
    right: 0;
    background: #e2e1e2;
    .shopBg {
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.3);
    }
  }
  .shopBanner {
    padding: 0px 10px;
    // background: linear-gradient(to bottom, #17aec9 60%, #f9f9f9 60%);
    :deep(.van-swipe) {
      // background: #f6f6f6;
      width: 100%;
      max-height: 125px;
      border-radius: 10px;
      // box-shadow: 2Px 2Px 10Px 0px rgba(120, 120, 120, 0.3);
      img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
  .goodBox {
    display: flex;
    justify-content: space-between;
    > div {
      width: 49%;
      height: fit-content;
    }
  }
  .nodeData {
  }
}
</style>
