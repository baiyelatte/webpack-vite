<template>
  <div class="abnormal-page">
    <van-nav-bar :title="$route.meta.title" v-if="!$route.meta.CLAPP" />
    <div class="warn-image">
      <img src="../../assets/image/abnormal.png" alt="" />
    </div>
    <div class="ward-word">该账号存在异常，请稍后再试</div>
    <div class="contect" @click="service">
      <img src="../../assets/image/more/kefu2.png" alt="" />
      <span>联系客服</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "abnormal",
  data() {
    return {};
  },
  methods: {
    service() {
      window.location.href = `https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b97817351957717cdbb1fb3b53708374ba573672f4fb385cf664728f448ddbba361c3cf4aa02bfe2f013d383c44d38a81ff`;
    }
  }
};
</script>
<style lang="scss" scoped>
.abnormal-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.van-nav-bar {
  width: 100vw;
  background: none;
  border-bottom: none;
}
.van-hairline--bottom::after {
  border-bottom: none;
}
.warn-image {
  width: 250px;
  height: 210px;
  margin-top: 70px;
  //   margin: 70px auto 0 auto;
  img {
    width: 100%;
  }
}
.ward-word {
  color: #999999;
  font-size: 14px;
  text-align: center;
}
.contect {
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 70px;
  img {
    width: 16px;
    height: 16px;
  }
  span {
    font-size: 14px;
    font-weight: 550;
    color: #444;
    line-height: 16px;
    margin-left: 3px;
  }
}
</style>
