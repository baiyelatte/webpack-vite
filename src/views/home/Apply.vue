<template>
  <div class="apply">
    <van-empty
      class="custom-image"
      v-if="applys == 2"
      :image="require('../../assets/image/home/jj.png')"
      description="商家拒绝了您的申请"
    />
    <van-empty
      class="custom_tg"
      v-else-if="applys == 1"
      :image="require('../../assets/image/home/tg.png')"
      description="商家同意了您的申请"
    />
    <van-empty
      class="custom_dd"
      v-else-if="applys == 0"
      :image="require('../../assets/image/home/dd.png')"
      description="待商家通过"
    />
    <!-- <p class="shop">申请商家【震山塘 • 手工劲面（达道店）</p> -->
    <p class="shop">{{ shopName }}</p>

    <p class="flood" v-if="applys == 2">可提醒管理员进行处理</p>
    <div class="bottom">
      <van-button type="danger">申请店铺入驻</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // applys: 1
      applys: this.$route.query.isAgree,
      shopName: this.$route.query.shopName
    };
  },
  created() {
    console.log(this.$route.query.isAgree);
  }
};
</script>

<style scoped lang="scss">
.apply {
  height: 100vh;
  width: 100%;
  background: #fff;
  padding: 0 12px;
  :deep(.van-empty__image) {
    width: 325px;
    height: 262px;
  }
  .shop {
    font-size: 15px;
    color: #333;
    margin: 44px 0 12px 0;
    text-align: center;
  }
  .flood {
    font-size: 13px;
    color: #999;
    text-align: center;
  }
}
:deep(.custom-image .van-empty__description) {
  color: #f20003;
  margin-top: 25px;
}
:deep(.custom_tg .van-empty__description) {
  color: #333;
  margin-top: 25px;
}
:deep(.custom_dd .van-empty__description) {
  color: #fab428;
  margin-top: 25px;
}
.bottom {
  display: flex;
  justify-content: center;
  :deep(.van-button) {
    width: 90%;
    border-radius: 6px;
    background: #bb0000;
    position: absolute;
    bottom: 40px;
  }
}
</style>
