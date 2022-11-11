<template>
  <router-layout>
    <div class="rink-rule">
      <van-nav-bar
        :title="$route.meta.title"
        v-if="!iscltApp()"
        left-arrow
        @click-left="$router.back()"
      />
      <div class="container">
        <div class="rules">
          <p>一、活动规则</p>
          <div class="content">
            1、活动期间消费金额计入排名，不限订单量。注：申请退货退款的消费金额将扣除计入金额排名；
          </div>
          <div class="content">
            2、通过此活动消费排名前3名，可获得排名奖励，最低消费需达188元以上即可参与排名，最终排名以活动结束时为准；
          </div>
          <div class="remarkContent">
            <p>排名奖励</p>
            <div class="content">第一名：荣事达烤串机1台（价值599元）</div>
            <div class="content">第二名：富勒烯护肤品1套（价值498元）</div>
            <div class="content">第三名：乳胶凉席三件套1份（价值188元）</div>
          </div>
          <div class="content">
            3、礼品将在活动结束后由客服联系获奖人提供收货地址，7个工作日左右寄出，如因缺货问题，我们将尽快补货发货，请耐心等待；
          </div>
          <div class="content">
            4、偏远地区及受疫情影响管控区域暂不发货，如有其他疑问可咨询客服【客服微信：lookduona；客服电话：0571-87710831】；
          </div>
        </div>
        <div class="rules">
          <p>二、活动声明</p>
          <div class="content">
            1、同一用户多账号互相操作或者利用软件操作，视为违规（同一用户：包括但不限于手机号、联系方式、IP地址、诚聊购账号、身份证、支付账号、设备号等可以显示为同一用户的情形）；
          </div>
          <div class="content">
            2、如发现恶意刷单或者存在违规操作账号，商城有权予以管制，奖励视为无效；
          </div>
          <div class="content">
            3、如遇其他不可抗力因素（包括但不限于重大灾害事件、活动受政府机关指令需要停办或者调整、活动中存在大面积作弊行为其他因素导致活动无法正常进行），我司有权取消、修改或暂停本活动。
          </div>
        </div>
      </div>
    </div>
  </router-layout>
</template>
<script>
export default {
  name: "rinkRule",
  data() {
    return {};
  },
  methods: {
    iscltApp() {
      const IscltApp = LukeappApi.IscltApp;
      return (
        IscltApp() ||
        window.navigator.userAgent.match(/SincereMall/) == "SincereMall"
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.van-hairline--bottom::after {
  border-bottom-width: 0px !important;
}
.van-nav-bar {
  background: none;
}
:deep(.van-nav-bar__title) {
  color: #fff !important;
}
:deep(.van-nav-bar .van-icon, .van-nav-bar__text) {
  color: #fff !important;
  font-size: 19px;
}
.rink-rule {
  width: 100vw;
  min-height: 100vh;
  background-image: linear-gradient(to bottom, #ff9961, #fe605a);
  background-size: auto;
  padding: 10px 0px 44px 0px;
  .container {
    background: #fff;
    border-image: linear-gradient(
        225deg,
        rgba(254, 95, 90, 1),
        rgba(255, 237, 96, 1)
      )
      6 6;
    margin: 10px 15px 0px 15px;
    border-radius: 15px;
    border-radius: 5px solid;
    padding: 15px 12px 31px 12px;
    .rules {
      color: #333;
      p {
        font-size: 17px;
        font-weight: bold;
        line-height: 24px;
        margin: 10px 0px;
      }
      .content {
        font-size: 14px;
        line-height: 22px;
        font-weight: 400;
      }
      .remarkContent {
        margin-bottom: 15px;
        p {
          font-size: 16px;
          margin-top: 15px;
          margin-bottom: 5px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
