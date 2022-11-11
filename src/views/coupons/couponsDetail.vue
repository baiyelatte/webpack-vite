<template>
  <div class="couponsDetail">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="content">
      <div class="top">
        <p class="p1"><span>折扣</span><span>￥</span>6折</p>
        <p class="p2">无门槛，买即享6元优惠</p>
        <p class="p3">有效期2021.10.29-2021.11.11</p>
        <img
          class="pic"
          v-if="1 > 2"
          src="@/assets/image/coupons/5.png"
          alt=""
        />
        <img class="pic" v-else src="@/assets/image/coupons/4.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
.couponsDetail {
  background-color: #ca1c24;
  min-height: 100vh;
  .content {
    width: 343px;
    height: 536px;
    background-image: url("~@/assets/image/coupons/3.png");
    background-size: 100% 100%;
    margin: 16px auto;
    position: relative;
    overflow: hidden;
    .top {
      font-size: 13px;
      color: #cf020b;
      text-align: center;
      .p1 {
        font-size: 20px;
        padding-top: 31px;
      }
      .p2 {
        font-size: 18px;
        margin-top: 12px;
      }
      .p3 {
        color: #999999;
        margin-top: 12px;
      }
      .pic {
        position: absolute;
        top: -5px;
        right: -10px;
        width: 91px;
        height: 87px;
      }
    }
  }
  :deep(.van-nav-bar) {
    background-color: #ca1c24;
  }
  :deep(.van-nav-bar__title) {
    color: #ffffff;
    font-size: 18px;
  }
  :deep(.van-icon-arrow-left) {
    color: #ffffff;
    font-size: 18px;
  }
  :deep([class*="van-hairline"]::after) {
    border: none;
  }
}
</style>
