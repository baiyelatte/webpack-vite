<!--
 * @Date: 2022-10-13 16:47:47
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-01 16:57:58
 * @FilePath: \mallh5\src\views\home\classify\index.vue
-->
<template>
  <router-layout>
    <div class="classify">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        immediate-check
        offset="300"
      >
        <van-sticky>
          <van-nav-bar
            v-if="!$route.meta.CLAPP"
            :title="router.currentRoute.query.title"
            left-arrow
            @click-left="$router.back()"
          />

          <van-tabs
            v-model="active"
            animated
            class="seartabs"
            @click.self="handleSort"
            @change="handleActive"
          >
            <van-tab
              v-for="index in list"
              :title="index.name"
              :key="index.id"
              :name="index.id"
            >
              <template #title>
                <div class="item">
                  {{ index.name }}
                  <div class="conversion" @click="handleIcon(index)">
                    <div class="iconDiv">
                      <van-icon
                        size="0.01rem"
                        class="iconUp"
                        v-if="index.id != 2"
                        name="arrow-up"
                        :color="index.isdown ? '#FF0000' : '#323233'"
                      />
                      <van-icon
                        size="0.01rem"
                        class="iconDown"
                        v-if="index.id != 2"
                        name="arrow-down"
                        :color="!index.isdown ? '#FF0000' : '#323233'"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </van-tab>
          </van-tabs>
        </van-sticky>
        <div class="item-content">
          <div class="list-left">
            <GoodItem
              v-for="(item, index) in leftItemList"
              :goodItem="item"
              :key="index"
            />
          </div>
          <div class="list-right">
            <GoodItem
              v-for="(item, index) in rightItemList"
              :goodItem="item"
              :key="index"
            />
          </div>
        </div>
      </van-list>
    </div>
  </router-layout>
</template>

<script setup>
import router from "@/router";
import GoodItem from "@/components/goods/goodItem";
import { getQueryConditionV2 } from "@/api";
import { nextTick, onActivated, onMounted, ref, onUnmounted } from "vue";
import vue from "@/main";
import { animation } from "@/utils/animation";
const active = ref();
const list = ref([
  {
    id: 1,
    name: "综合",
    isdown: false
  },
  { id: 2, name: "销量", isdown: false },
  { id: 3, name: "时间", isdown: false },
  { id: 4, name: "价格", isdown: false }
]);
const { cityId } =
  JSON.parse(localStorage.getItem("addressHome")) ?? vue.__proto__.defaultCity;

const goodsList = ref([]);
const leftItemList = ref([]);
const rightItemList = ref([]);
const pageNum = ref(1); // 页码
const finished = ref(false); // 是否请求完成
const loading = ref(false); //是否加载完成

const onLoad = () => {
  pageNum.value = pageNum.value + 1;
  requestGoodsList(true);
};
const handleArr = (arr) => {
  const left = [];
  const right = [];
  arr.forEach((element, index) => {
    if (index % 2 == 0) {
      left.push(element);
    }
    if (index % 2 == 1) {
      right.push(element);
    }
  });
  return [left, right];
};
const requestGoodsList = (more = false, orderPolicy = [1]) => {
  finished.value = false;
  loading.value = true;
  getQueryConditionV2({
    pageSize: 10,
    pageNum: more ? pageNum.value : 1,
    cityId: cityId,
    keyWord: "",
    categoryId: router.currentRoute.query.categoryId * 1,
    orderPolicy: orderPolicy,
    resultType: 2
  }).then((res) => {
    if (res.data.list.length >= 0) {
      const [left, right] = handleArr(res.data.list);
      leftItemList.value = more ? leftItemList.value.concat(left) : left;
      rightItemList.value = more ? rightItemList.value.concat(right) : right;
    }
    loading.value = false;
    if (res.data.hasNextPage === false) {
      finished.value = true;
    }
  });
};
const handleSort = (name, title) => {
  // list.value.forEach((item) => {
  //   if (item.id === name) {
  //     item.isdown = false;
  //   }
  // });
};
// false 为正
const handleActive = (name, title) => {
  animateUtils(0);
  pageNum.value = 1;
  list.value.forEach((item) => {
    if (item.id === name) {
      item.isdown = false;
      requestGoodsList(false, [name]);
    }
  });
};
const handleIcon = ({ id }) => {
  animateUtils(0);
  list.value.forEach((item) => {
    if (active.value === item.id) {
      if (item.id === id) {
        item.isdown = !item.isdown;
        if (item.isdown) {
          requestGoodsList(false, [-1 * item.id]);
        } else {
          requestGoodsList(false, [item.id]);
        }
      }
    }
  });
};
// 记录滚动值
const historyScrollTop = () => {
  console.log(document.querySelector(".classify").scrollTop);
  localStorage.setItem(
    `${router.currentRoute.query.title}classifyScrollTop`,
    document.querySelector(".classify")?.scrollTop
  );
};
onActivated(() => {
  router.afterEach((to, from) => {
    if (
      (from.meta.title === "特产中心" && to.meta.title === "分类") ||
      (from.meta.title === "全部分类" && to.meta.title === "分类")
    ) {
      nextTick(() => {
        document.querySelector(".classify").scrollTop = 0;
        animateUtils(
          localStorage.getItem(
            `${router.currentRoute.query.title}classifyScrollTop`
          )
        );
      });
    }
  });
  pageNum.value = 1;
  requestGoodsList();
});
onMounted(() => {
  document
    .querySelector(".classify")
    ?.addEventListener("scroll", historyScrollTop, true);
});
const animateUtils = (distance) => {
  nextTick(() => {
    animation(document.querySelector(".classify"), distance);
  });
};
</script>

<style lang="scss" scoped>
.classify {
  height: 100%;
  // position: fixed;
  overflow-y: auto;
  .seartabs {
    position: relative;
    .item {
      text-align: center;
      color: rgba(0, 0, 0, 0.54);
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      .conversion {
        display: inline-block;
        margin-left: 2px;
        .iconDiv {
          width: 12px;
          display: flex;
          flex-direction: column;
          position: relative;
          .iconUp {
            position: absolute;
            top: -9px;
            transform: scale(1);
          }
          .iconDown {
            top: -4px;
            position: absolute;
            transform: scale(1);
          }
        }
      }

      .icoarrbox {
        display: inline-block;
        position: relative;
        margin-left: 0.1rem;
        .icon {
          position: absolute;
          left: 0;
          margin-left: 0;
        }
        .icon-up {
          top: -0.3rem;
        }
        .icon-down {
          top: -0.05rem;
        }
      }
    }
    .active {
      color: #ff6700;
    }
  }
}
.van-tabs {
  height: 100%;
}
.item-content {
  width: 100%;
  margin-top: 10px;
  padding: 12px;
  padding-top: 0px;
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
</style>
