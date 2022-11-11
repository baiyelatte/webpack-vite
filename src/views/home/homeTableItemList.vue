<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="- 没有更多了-"
    offset="300"
    @load="onLoad"
  >
    <van-sticky class="van-sticky" offset-top="173" @scroll="handleScroll">
      <van-tabs
        v-if="isShowTabs"
        v-model="homeTable"
        background="transparent"
        class="homeTables"
        title-active-color="#333333"
        title-inactive-color="#666666"
      >
        <van-tab name="2" title="特产中心" />
        <van-tab name="3" title="城市馆" />
      </van-tabs>
      <div class="homeSubTables" v-if="isShowTwoLevTabs">
        <div class="box">
          <van-tabs
            v-model="homeSubTable"
            background="transparent"
            title-active-color="#333333"
            title-inactive-color="#666666"
          >
            <van-tab
              v-for="(item, index) in homeSubTableList"
              :key="'sub' + index"
              :name="item.categoryId ?? ''"
              :title="item.title"
            />
          </van-tabs>
          <h3 @click="handleJump($event)" class="h3">
            {{ homeTable == 2 ? "更多好物" : "更多店铺" }}
          </h3>
        </div>
      </div>
    </van-sticky>
    <!-- 特产中心或者城市馆 数据列表渲染 -->
    <div class="item-content">
      <div class="list-left" v-show="!isCityPavilion">
        <GoodItem
          v-for="(item, index) in leftItemList"
          :goodItem="item"
          :key="index"
        />
      </div>
      <div class="list-right" v-show="!isCityPavilion">
        <GoodItem
          v-for="(item, index) in rightItemList"
          :goodItem="item"
          :key="index"
        />
      </div>
      <div class="list-shop" v-show="isCityPavilion">
        <div
          v-if="divIsShow && isShowTabs"
          style="width: 100%; height: 1000px"
        ></div>
        <template
          v-for="(item, index) in isRankingList
            ? rankList
            : cityPavilionShopList"
        >
          <ShopItem
            @changeAttention="handleAttention"
            v-if="!(item.goodsInfoList === null)"
            :shopItem="item"
            :key="index"
            :isRankingList="isRankingList"
            :index="index"
          />
        </template>
      </div>
    </div>
  </van-list>
</template>

<script setup>
import {
  ref,
  onMounted,
  watch,
  toRefs,
  onActivated,
  nextTick,
  onDeactivated,
  reactive,
  onUnmounted,
  computed,
  onBeforeMount
} from "vue";
import GoodItem from "@/components/goods/goodItem";
import ShopItem from "@/components/goods/shopItem";
import { Toast } from "vant";
import router from "@/router";
import store from "@/store";
import {
  careChoose,
  getqueryShop,
  getTabMenuV2,
  getCityRankPreviewV2,
  getHotGoodsV2,
  getQueryConditionV2
} from "api";
import vue from "@/main";

const props = defineProps({
  pageNum: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  refreshing: {
    type: Boolean,
    default: false
  },
  cityId: {
    type: String | Number,
    default: () =>
      JSON.parse(localStorage.getItem("addressHome"))?.cityId ??
      vue.__proto__.defaultCity.cityId
  },
  isShowTabs: {
    type: Boolean,
    default: true
  },
  isShowTwoLevTabs: {
    type: Boolean,
    default: true
  },
  isRankingList: {
    type: Boolean,
    default: false
  },
  isShowCityHall: {
    type: Boolean,
    default: false
  },
  isHome: {
    type: Boolean,
    default: false
  },
  rankList: {
    type: Array,
    default: () => []
  }
});

// 类目展示
let initHomeSubTableList = [
  {
    table: "全部",
    id: 0
  },
  {
    table: "西湖龙井",
    id: 1
  },
  {
    table: "特色小吃",
    id: 2
  },
  {
    table: "速食藕粉",
    id: 3
  },
  {
    table: "特产",
    id: 4
  },
  {
    table: "西湖醋鱼",
    id: 5
  }
];
const emit = defineEmits(["request"]);
const { pageSize, pageNum, refreshing, cityId, isHome } = toRefs(props);
const homeTable = ref(2); // 特产中心、城市馆切换
const homeSubTable = ref(""); //  特产中心、城市馆下级类目切换
const homeSubTableList = ref([...initHomeSubTableList]);
const isCityPavilion = ref(false); //是否显示城市馆
const loading = ref(false);
const finished = ref(false);
const leftItemList = ref([]);
const rightItemList = ref([]);
const cityPavilionShopList = ref([]);

const currentPageNum = ref(pageNum.value);
const currentPageSize = ref(pageSize.value);

let offsetHeightTop = "173px";

// 首次切换顿挫优化
const divIsShow = ref(true);

const onLoad = () => {
  currentPageNum.value += 1;
  if (router.currentRoute.meta.title != "排行榜") {
    getItemList(true);
  }
};
const handleAttention = (isRank) => {
  currentPageNum.value = 1;
  isRank ? emit("request") : getItemList();
};
const pageWatch = watch([pageNum, pageSize], (newValue, oldValue) => {
  getItemList();
});
// 缓动动画
const cityHallScrollTop = ref(0);
const specialtyCenterScrollTop = ref(0);
const offsetTop = ref();
function animation(obj, target) {
  console.log(target);
  const e = document.querySelector(".home-bodys");
  if (
    obj &&
    target >=
      document.querySelector(".download").offsetHeight +
        document.querySelector(".van-list").offsetTop
  ) {
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
      var step = (target - obj.scrollTop) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if (obj.scrollTop >= target) {
        clearInterval(obj.timer);
      } else if (e) {
        //上方折叠的+屏幕的高度大于总高度 即滚动条触底
        if (e.scrollTop + e.offsetHeight >= e.scrollHeight) {
          clearInterval(obj.timer);
        }
      }
      obj.scrollTop = obj.scrollTop + step;
    }, 6);
  }
}
const handleScroll = ({ scrollTop, isFixed }) => {
  nextTick(() => {
    if (
      specialtyCenterScrollTop.value <=
      document.querySelector(".download")?.offsetHeight +
        document.querySelector(".van-list")?.offsetTop
    ) {
      specialtyCenterScrollTop.value =
        document.querySelector(".download")?.offsetHeight +
        document.querySelector(".van-list")?.offsetTop;
    }
    if (
      cityHallScrollTop.value <=
      document.querySelector(".download")?.offsetHeight +
        document.querySelector(".van-list")?.offsetTop
    ) {
      cityHallScrollTop.value =
        document.querySelector(".download")?.offsetHeight +
        document.querySelector(".van-list")?.offsetTop;
    }
  });
};

const handleScrollTop = () => {
  localStorage.setItem(
    "historyScroolTop",
    JSON.stringify(document.querySelector(".home-bodys")?.scrollTop)
  );
  if (homeTable.value == 2) {
    specialtyCenterScrollTop.value =
      document.querySelector(".home-bodys").scrollTop;
  } else if (homeTable.value == 3) {
    cityHallScrollTop.value = document.querySelector(".home-bodys").scrollTop;
  }
  // console.log("滚动高度", window.screenTop);
};
let firstPerform = 1;
onMounted(() => {
  document
    .querySelector(".home-bodys")
    ?.addEventListener("scroll", handleScrollTop, true);
  if (router.currentRoute.meta.title != "排行榜") {
    getItemList();
    handleGetTabMenuV2();
  }
});

const refreshingWatch = watch([refreshing], (newValue, oldValue) => {
  if (refreshing.value) {
    getItemList();
  }
});

watch(homeTable, (newValue, oldValue) => {
  currentPageNum.value = 1;
  if (oldValue != newValue) {
    isCityPavilion.value = newValue == 3;
    // if (
    //   isCityPavilion.value || props.isShowCityHall
    //     ? cityPavilionShopList.value.length == 0
    //     : leftItemList.value.length == 0
    // ) {
    //   getItemList();
    // }
    getItemList();
  }
  handleGetTabMenuV2();
  if (newValue == 3) {
    setTimeout(() => {
      divIsShow.value = false;
    }, 500);
  }
  nextTick(() => {
    const homeSroll = document.querySelector(".home-bodys");
    homeSroll.scrollTop =
      document.querySelector(".download").offsetHeight +
      document.querySelector(".van-list").offsetTop;
    if (newValue == 2 && firstPerform > 2) {
      animation(homeSroll, specialtyCenterScrollTop.value);
    } else if (newValue == 3 && firstPerform > 2) {
      animation(homeSroll, cityHallScrollTop.value);
    }
  });
  firstPerform++;
});
const subTableWatch = watch(homeSubTable, (newValue, oldValue) => {
  document.querySelector(".home-bodys").scrollTop =
    document.querySelector(".download").offsetHeight +
    document.querySelector(".van-list").offsetTop;
  getItemList();
});
const cityIdWatch = watch(cityId, (newValue) => {
  currentPageNum.value = 1;
  leftItemList.value = [];
  rightItemList.value = [];
  cityPavilionShopList.value = [];
  handleGetTabMenuV2();
  getItemList();
});

onActivated(() => {
  getItemList();
});
// getCityRankPreviewV2,getHotGoodsV2
function getItemList(more = false) {
  loading.value = true;
  if (!more) currentPageNum.value = 1;
  // const request =
  //   isCityPavilion.value || props.isShowCityHall
  //     ? getCityRankPreviewV2
  //     : getHotGoodsV2;
  const searParams = {
    pageNum: more ? currentPageNum.value : 1,
    pageSize: currentPageSize.value,
    resultType: isCityPavilion.value || props.isShowCityHall ? 3 : 2,
    cityId: cityId.value,
    keyWord: "",
    categoryId: homeSubTable.value,
    orderPolicy: isCityPavilion.value || props.isShowCityHall ? [2] : [1]
  };
  // if (isCityPavilion.value) {
  // searParams.cityId = cityId.value
  //   searParams.cityId = 0;
  // }
  getQueryConditionV2(searParams).then((res) => {
    if (res?.errorCode == 1) {
      const { list: content = [], hasNextPage = false } = res.data ?? [];
      if (isCityPavilion.value || props.isShowCityHall) {
        if (content.length >= 0) {
          cityPavilionShopList.value = more
            ? cityPavilionShopList.value.concat(content)
            : content;
        }
      } else {
        const [leftList, rightList] = arrSplitBySubscript(content);
        if (content.length >= 0) {
          leftItemList.value = more
            ? leftItemList.value.concat(leftList)
            : leftList;
          rightItemList.value = more
            ? rightItemList.value.concat(rightList)
            : rightList;
        }
      }
      if (content.length == 0 || !hasNextPage) finished.value = true;
    }
    loading.value = false;
  });
}
function arrSplitBySubscript(arr = [], splitNum = 2) {
  const oneArr = [];
  const twoArr = [];
  arr.forEach((item, index) => {
    if (index % splitNum != 0) {
      twoArr.push(item);
    } else {
      oneArr.push(item);
    }
  });
  return [oneArr, twoArr];
}

// 定位信息改变请求
const handleGetTabMenuV2 = () => {
  getTabMenuV2({
    homeType: 1,
    cityId: cityId.value,
    menuType: homeTable.value
  }).then((res) => {
    if (res.errorCode === 1) {
      homeSubTableList.value = res.data;
    }
  });
};

// 跳转
const handleJump = (e) => {
  if (homeTable.value == 2) {
    router.push("/specialtyCenter");
  } else {
    router.push("/cityHall");
  }
};
// beforeRouteLeave((to, from, next) => {
//   console.log(to, from, next);
// });

defineExpose({
  isCityPavilion,
  getItemList,
  cityId
});
</script>

<style lang="scss" scoped>
:deep(.van-sticky--fixed) {
  padding: 0 12px;
  background-color: #fff;
  z-index: 5;
}
.Classification {
  display: flex;
  justify-content: space-between;
  padding: 20px 26px 13px 29px;
  .Label {
    text-align: center;
    h5 {
      color: #161616;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 6px;
    }
    p {
      font-size: 12px;
      color: #808080;
    }
    .actives {
      color: #fe3746;
    }
    .actives1 {
      background: #fe3746;
      font-size: 11px;
      color: #fff;
      padding: 2px 4px;
      border-radius: 250px;
    }
  }
}
.homeTables {
  padding: 0 70px;
  margin-bottom: 5px;
  :deep(.van-tab) {
    font-size: 18px;
    font-weight: 550;
  }
  :deep(.van-tabs__line) {
    bottom: 20px;
    width: 60px;
    height: 4px;
    background: linear-gradient(
        to left,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 1) 100%
      ),
      red no-repeat;
  }
}
.homeSubTables {
  height: 48px;
  position: static;
  .box {
    width: 100%;
    position: absolute;
    left: 0;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    height: 48px;
    border-radius: 20px 20px 0 0;
    :deep(.van-tabs) {
      width: 80%;
      .van-tab__text {
        font-size: 13px;
      }
      .van-tab--active {
        font-weight: 600;
      }
      .van-tabs__line {
        bottom: 20px;
      }
    }
    > h3 {
      text-align: center;
      position: absolute;
      right: 10px;
      background-color: #fff;
      font-size: 13px;
      color: #ff3737;
      width: 15%;
      line-height: 48px;
      height: 48px;
      margin-left: 6px;
    }
  }
}
.item-content {
  width: 100%;
  margin-top: 10px;
  // height: 10000px;
  display: flex;
  justify-content: space-between;
  > div {
    width: 170px;
  }
  .list-shop {
    width: auto;
    flex: 1;
  }
}
:deep(.van-sticky--fixed) {
  top: 155px !important;
}
</style>
