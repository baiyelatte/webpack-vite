<template>
  <van-tabs :ellipsis="false" :value="searActive" class="searTabs">
    <van-tab v-for="(item, index) in tabList" :key="item.id">
      <template #title>
        <div
          class="tab"
          @click="onChangeTab(index)"
          :class="[currentIndex == index ? 'actcolor' : '']"
        >
          {{ item.name }}
          <i
            v-if="item.id != 2"
            class="icon"
            :class="{
              'icon-up': item.isdown,
              'icon-down': !item.isdown
            }"
          />
        </div>
      </template>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import { ref, watch, toRefs, defineEmits } from "vue";
import { Toast } from "vant";
import router from "@/router";
import { getQuery } from "api";
const tabListArry = [
  { id: 1, name: "综合", isdown: false },
  { id: 2, name: "新品", isdown: false },
  { id: 3, name: "价格", isdown: false },
  { id: 4, name: "销量", isdown: false }
];

const props = defineProps({
  orderType: {
    type: Boolean,
    default: false,
    require: true
  },
  searActive: {
    type: Number | String,
    default: 1,
    require: true
  }
});
const { orderType, searActive } = toRefs(props);
const emit = defineEmits(["changeOrderParams"]);
const tabList = ref(tabListArry);
const currentIndex = ref(0); // 当前选中项
const onChangeTab = (tabIndex) => {
  // tabIndex !== 1 为 新品无相关点击
  if (currentIndex.value !== tabIndex) {
    // 首次
    tabList.value[tabIndex].isdown = false;
    emit("changeOrderParams", tabListArry[tabIndex].id, false);
  } else if (currentIndex.value == tabIndex && tabIndex !== 1) {
    // 二次点击以上
    const isdown = !tabList.value[tabIndex].isdown;
    tabList.value[tabIndex].isdown = isdown;
    emit("changeOrderParams", tabListArry[tabIndex].id, isdown);
  }
  currentIndex.value = tabIndex;
};
</script>

<style lang="scss" scoped>
.searTabs {
  margin-bottom: 10px;
  position: relative;
  .tab {
    text-align: center;
    color: rgba(0, 0, 0, 0.54);
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
    display: inline-block;
    .icon {
      width: 0;
      height: 0;
      border-style: solid;
      display: inline-block;
      margin-left: 0.2rem;
      vertical-align: middle;
    }
    .icon-down {
      border-width: 0.11rem 0.11rem 0;
      border-color: #bdbdbd transparent transparent;
    }
    .icon-up {
      border-width: 0 0.11rem 0.11rem;
      border-color: transparent transparent #bdbdbd;
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
</style>
