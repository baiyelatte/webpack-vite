<template>
  <!-- <router-layout> -->
  <div class="awardDetails">
    <div class="top">
      <i
        @click="$router.go(-1)"
        class="van-icon van-icon-arrow-left van-nav-bar__arrow"
      />
    </div>
    <div class="content">
      <div class="top">
        <img src="@/assets/image/award/bg12.png" alt="" />
        <p>活动规则</p>
      </div>
      <div class="list">
        <h1>
          为保障用户在诚聊购平台使用幸运抽奖活动的合法权益，维护诚聊购正常运营秩序，特制定本规范。其他未在本规范或者遗漏的，禄可集团官方拥有唯一解释权
        </h1>
        <p>
          1、全民抽奖活动细则:活动时间4.30 00:00：00-5.4
          23:59:59，在商城消费累计满50元、100元、200元、300元和500元均可获抽奖机会各一次(例:消费200可抽奖3次);
        </p>
        <p>2、活动期间，消费累计抽奖的奖品及抽奖权限，不得转让及售卖</p>
        <p>3、抽奖获赠的奖品，规格均为1件，特殊标注规格的产品除外；</p>
        <p>4、活动期间，当日消费积抽奖次数均可累计，次日零点重置；</p>
        <p>5、活动期间中奖的商品，均以账号设置的默认地址派发，不可修改；</p>
        <p>6、活动期间中奖的商品，均统一在商城活动结束后7个工作日内派发;</p>
        <p>7、恶意刷单或存在违规操作的账号，商城有权予以管制；</p>
        <p>8、恶意刷单或存在违规操作的账号，采购的产品均以退货处理；</p>
        <p>9、发货前检查数据，有已抽奖，订单退款情况，奖品视为无效，不发货</p>
        <p>10、商城拥有最终解释权，若有未尽事宜，可咨询客服(微信lookduona)；</p>
      </div>
    </div>
    <img class="luck" src="@/assets/image/award/bg13.png" alt="" />
    <img class="bottom" src="@/assets/image/award/bg10.png" alt="" />
    <img class="head" src="@/assets/image/award/bg11.png" alt="" />
    <img class="bg15" src="@/assets/image/award/bg15.png" alt="" />
  </div>
  <!-- </router-layout> -->
</template>
<script>
export default {}
</script>
<style scoped lang="scss">
.awardDetails {
  width: 100vw;
  min-height: 100vh;
  background-image: url('../../assets/image/award/bg14.png');
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  .top {
    i {
      width: 14px;
      height: 24px;
      color: white;
      margin: 10px 0 0 10px;
      position: relative;
      z-index: 4;
    }
    img {
      width: 375px;
      height: 396px;
    }
  }
  .content {
    width: 320px;
    margin: 0 auto;
    margin-top: 180px;
    .top {
      width: 183px;
      height: 38px;
      margin: 0 auto;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      p {
        color: #ffd800;
        font-size: 19px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .list {
      padding: 10px;
      font-size: 14px;
      line-height: 20px;
      padding-bottom: 100px;
      h1 {
        font-size: 14px;
        margin: 20px 0;
      }
    }
  }
  .bottom {
    position: fixed;
    width: 375px;
    height: 134px;
    bottom: -11px;
    left: 0;
  }
  .luck {
    position: absolute;
    top: 50px;
    left: 50%;
    z-index: 3;
    transform: translateX(-50%);
    width: 295px;
    height: 83px;
  }
  .head {
    position: absolute;
    top: 0;
    left: 0;
    width: 375px;
    height: 255px;
  }
  .bg15 {
    position: absolute;
    top: 0;
    left: 0;
    width: 375px;
    height: 396px;
  }
}
</style>
