<template>
  <router-layout>
    <div class="city-rule">
      <van-nav-bar
        :title="$route.meta.title"
        v-if="!iscltApp()"
        left-arrow
        @click-left="$router.back()"
      />
      <div class="container">
        <div class="buy">
          <p>一、活动规则</p>
          <div class="content">
            1、活动期间新老用户都可参与，购买活动商品可享买一送一优惠；
          </div>
          <div class="content">2、本活动不与其他优惠共享；</div>
          <div class="content">
            3、付款成功的商品将在3个工作日左右寄出，如因缺货问题，我们将尽快补货发货，请耐心等待；
          </div>
          <div class="content">
            4、用户可登录“诚聊购”app查看订单，或关注公众号“诚聊购”点击菜单栏“我的-我的订单”查看；
          </div>
          <div class="content">
            5、偏远地区及受疫情影响管控区域暂不发货，如有其他疑问可咨询客服；
          </div>
          <div class="content">
            6、订单及产品有任何疑问，请联系诚聊购官方客服【客服微信：lookduona；客服电话：0571-87710831】。
          </div>
        </div>
        <div class="buy">
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
  name: "cityRules",
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
.van-nav-bar {
  background: none;
}
.city-rule {
  width: 100vw;
  min-height: 100vh;
  background-image: linear-gradient(to bottom, #fcedce, #ff613d);
  background-size: auto;
  background-repeat: no-repeat;
  padding-bottom: 30px;
  padding-top: 10px;
  .container {
    background-image: url("../../assets/image/activity/city-rule.png");
    background-size: 100% 100%;
    padding: 40px 13px 30px 13px;
    margin: 0 10px;
    .buy {
      p {
        color: #333;
        font-size: 17px;
        font-weight: bold;
        margin: 15px 0px;
      }
      .content {
        font-size: 14px;
        color: #333;
        font-weight: 450;
        line-height: 20px;
        margin-bottom: 8px;
        margin-top: 10px;
      }
    }
  }
}
</style>
