<template>
  <router-layout>
    <div class="rule-page">
      <van-nav-bar
        :title="$route.meta.title"
        v-if="!$route.meta.CLAPP"
        left-arrow
        @click-left="$router.back()"
      />
      <div class="container">
        <div class="buy">
          <img src="../../assets/image/activity/rule1.png" alt="" />
          <div class="content">
            1、新老用户皆可参与发起（每位用户每天只能发起1个商品，每个商品只能发起1个）
          </div>
          <div class="content">
            2、发起人在规定时间内完成助力后，即可0元购商品；
          </div>
          <div class="remarkContent">
            (注：需用户支付0.01元，点击【返现红包】填写信息，3个工作日内返还支付宝账户中，客服电话：057187710831）
          </div>
          <div class="content">3、本活动仅限诚聊购新用户可助力成功。</div>
        </div>
        <div class="buy">
          <img src="../../assets/image/activity/rule2.png" alt="" />
          <div class="content">仅限新用户可参与秒杀活动，每个商品限购1件。</div>
        </div>
        <div class="buy">
          <img src="../../assets/image/activity/rule3.png" alt="" />
          <div class="content">
            拥有抵用金用户可参与，可通过使用抵用金购买商品，每个商品限购1件。
          </div>
        </div>
        <div class="buy">
          <img src="../../assets/image/activity/rule4.png" alt="" />
          <div class="content">
            1、付款成功的商品将在3个工作日左右寄出，如因缺货问题，我们将尽快补货发货，请耐心等待；
          </div>
          <div class="content">
            2、用户可登录“诚聊购”APP查看订单，或关注公众号“诚聊购”，点击“我的-我的订单”查看；
          </div>
          <div class="content">
            3、偏远地区及受疫情影响管控区域暂不发货，如有其他疑问可咨询客服。
          </div>
        </div>
        <div class="buy">
          <img src="../../assets/image/activity/rule5.png" alt="" />
          <div class="content">
            1、同一用户多账号互相操作或者利用软件操作，视为违规（同一用户：包括但不限于手机号、联系方式、IP地址、诚聊购账号、身份证、支付账号、设备号等可以显示为同一用户的情形）；
          </div>
          <div class="content">
            2、如发现恶意刷单或者存在违规操作账号，商城有权予以管制，奖励视为无效；
          </div>
          <div class="content">
            3、如遇其他不可抗力因素（包括但不限于重大灾害事件、活动受政府机关指令需要停办或者调整、活动中存在大面积作弊行为其他因素导致活动无法正常进行），我司有权取消、修改或暂停本活。
          </div>
        </div>
      </div>
    </div>
  </router-layout>
</template>
<script>
export default {
  name: "promotionRules",
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.van-nav-bar {
  background: none;
}
.rule-page {
  width: 100vw;
  min-height: 100vh;
  background-image: url("~@/assets/image/activity/rule-bg.png");
  background-size: auto;
  background-repeat: no-repeat;
  padding-bottom: 30px;
  .container {
    margin: 0 10px;
    background-color: #fff;
    border-radius: 15px;
    padding: 10px 10px 35px 10px;
    .buy {
      img {
        width: 100px;
        height: 40px;
      }
      .content {
        font-size: 14px;
        color: #333;
        font-weight: 450;
        line-height: 16px;
        margin-bottom: 8px;
        margin-top: 10px;
      }
      .remarkContent {
        font-size: 12px;
        color: #666;
        line-height: 14px;
        margin-bottom: 3px;
      }
    }
  }
}
</style>
