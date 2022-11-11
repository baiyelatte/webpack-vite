<template>
  <router-layout class="shopCategory">
    <div class="header">
      <topBar @change="searGood" />
      <goodTabs
        @changeOrderParams="onChangeTab"
        :orderType="orderType"
        :searActive="orderByName"
      />
    </div>
    <goodList
      :orderType="orderType"
      :orderByName="orderByName"
      :goodName="goodName"
    />
  </router-layout>
</template>

<script setup>
import topBar from "../component/topBar";
import goodList from "../component/goodList";
import goodTabs from "../component/goodTabs";
import { ref } from "vue";
const goodName = ref("");
const orderByName = ref(1);
const orderType = ref(false);

const searGood = (value) => {
  goodName.value = value;
};
const onChangeTab = (tabId, idDown) => {
  orderByName.value = tabId;
  orderType.value = idDown;
};
</script>

<style lang="scss" scoped>
.shopCategory {
  background-color: #ebeaeb;
  z-index: 1000;
  .header {
    position: sticky;
    top: 0;
    z-index: 1;
  }
}
</style>
