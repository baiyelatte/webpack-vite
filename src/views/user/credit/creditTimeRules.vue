<template>
  <router-layout style="background: white">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="content">
      <div class="box" v-for="(item, index) in content" :key="`box${index}`">
        <h4 :class="`illustrate N${index}`">{{ item.illustrate }}</h4>
        <ul class="textList">
          <li
            class="text"
            v-for="(text, index) of item.textList"
            :key="`text${index}`"
          >
            {{ text }}
          </li>
        </ul>
        <!-- <p class="hint" v-for="(hint, index) of item.hintList" :key="`hint${index}`">{{hint}}</p> -->
      </div>
    </div>
  </router-layout>
</template>

<script>
const contentList = [
  {
    illustrate: "使用规则:",
    textList: [
      "抵用金仅可在诚聊购商城使用，如账户暂停使用或账户违规等行为，则诚聊购将取消该用户账号内抵用金相关使用权益",
      "抵用金可直接用于支付诚聊购商城内支持抵用金兑换的商品，每个商品将根据该商品所需抵用金及商品数量扣除相应的抵用",
      "抵用金查询：”诚聊购-我的-抵用金”中可以查询到您的抵用金详细情况",
      "用户可在【抵用金专区】选购自己喜欢的商品，进行兑换"
    ]
    // hintList:[
    //   '金刚区添加【抵用金专区】日常兑换/活动兑换，（同活动优惠力度不同、品类不同、库存不同，天天活动或者半价专区换为抵用金专区）',
    //   '【可以添加抵用金兑换优惠券，抵用金抽奖等功能用于消耗抵用金】'
    // ]
  },
  {
    illustrate: "有效期说明:",
    textList: [
      "现有的所有抵用金统一在2022/12/31 23:59:59到期失效",
      "使用抵用金支付的商品发生退货时，抵用金会如数退还，但如抵用金退回时已过有效期，则直接进行作废处理，不再返回"
    ]
  }
];
export default {
  name: "creditTimeRules",
  data() {
    return {
      content: contentList
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.content {
  padding: 0.2703rem;
  font-size: 0.5rem;
  background: #f7f8fa;
  margin: 0 0.3rem;
  margin-top: 20px;
  border-radius: 16px;
  .illustrate {
    margin-top: 0.4rem;
  }
  .textList {
    list-style-type: decimal;
    margin-left: 0.5405rem;
    font-size: 0.4324rem;
    .text {
      margin: 0.1351rem 0;
      line-height: 0.5405rem;
    }
  }
  // .hint{
  //   font-size:0.35rem;
  //   line-height:0.4rem;
  //   margin-bottom:0.1rem;
  // }
  .N0 {
    margin-top: 0;
  }
}
</style>
