<template>
  <div>
    <div class="gsk_bannter"></div>
    <div class="gsk_ptit">
      <div class="h16 yel w30"></div>
      <div class="h16 bak" style="margin-top: 5px; width: 20%"></div>
      <div class="h16 bak w80" style="margin-top: 5px"></div>
      <div class="h16 bak w50" style="margin-top: 5px"></div>
      <div
        class="flex"
        style="
          background: #fff;
          justify-content: space-evenly;
          padding: 10px 10px 0 10px;
        "
      >
        <div class="w20 h16 bak"></div>
        <div class="w20 h16 bak"></div>
        <div class="w20 h16 bak"></div>
      </div>
    </div>
    <div style="height: 10px"></div>
    <div class="gsk_ptit flex">
      <div class="w10 h16 bak"></div>
      <div class="w60 h16 bak" style="margin-left: 10px"></div>
    </div>
    <div class="gsk_ptit flex">
      <div class="w10 h16 bak"></div>
      <div class="w60 h16 bak" style="margin-left: 10px"></div>
    </div>
    <div style="height: 10px"></div>
    <div class="gsk_ptit flex">
      <div class="w10 h16 bak"></div>
      <div class="w60 h16 bak" style="margin-left: 10px"></div>
    </div>
    <div class="gsk_ptit flex">
      <div class="w10 h16 bak"></div>
      <div class="w60 h16 bak" style="margin-left: 10px"></div>
    </div>
    <div class="gsk_btn">
      <div class="action-icon">
        <div class="w60 h16 bak"></div>
        <div class="w60 h16 bak" style="height: 10px; margin-top: 5px"></div>
      </div>
      <div class="action-icon">
        <div class="w60 h16 bak"></div>
        <div class="w60 h16 bak" style="height: 10px; margin-top: 5px"></div>
      </div>
      <div class="action-btn left_button_first"></div>
      <div class="action-btn right_button_first"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailskeleton"
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
.w10 {
  width: 10%;
}
.w20 {
  width: 20%;
}
.w30 {
  width: 30%;
}
.w40 {
  width: 40%;
}
.w50 {
  width: 50%;
}
.w60 {
  width: 60%;
}
.w80 {
  width: 80%;
}
.bak {
  background: #efefef;
}
.yel {
  background: #fee7d5;
}
.h16 {
  height: 16px;
  border-radius: 5px;
}
.gsk_bannter {
  height: 350px;
  background: #f8f3f7;
}
.gsk_ptit {
  padding: 10px;
  background: #fff;
}
.gsk_btn {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  box-sizing: content-box;
  height: 1.33333rem;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
  .action-icon {
    min-width: 1.28rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .action-btn {
    width: 100%;
  }
  .left_button_first {
    background: -webkit-linear-gradient(left, #ffd01e, #ff8917);
    background: linear-gradient(to right, #ffd01e, #ff8917);
    margin-left: 0.13333rem;
    border-top-left-radius: 26.64rem;
    border-bottom-left-radius: 26.64rem;
    height: 1.06667rem;
  }
  .right_button_first {
    background: -webkit-linear-gradient(left, #ff6034, #ee0a24);
    background: linear-gradient(to right, #ff6034, #ee0a24);
    margin-right: 0.13333rem;
    border-top-right-radius: 26.64rem;
    border-bottom-right-radius: 26.64rem;
    height: 1.06667rem;
  }
}
.van-skeleton--animate {
  -webkit-animation: van-skeleton-blink 1.2s ease-in-out infinite;
  animation: van-skeleton-blink 1.2s ease-in-out infinite;
}
.van-skeleton--round .van-skeleton__row,
.van-skeleton--round .van-skeleton__title {
  border-radius: 26.64rem;
}
@-webkit-keyframes van-skeleton-blink {
  50% {
    opacity: 0.6;
  }
}
@keyframes van-skeleton-blink {
  50% {
    opacity: 0.6;
  }
}
</style>
