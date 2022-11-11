<!--
 * @Date: 2022-10-14 15:52:50
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-10-14 16:09:45
 * @FilePath: \mallh5\src\views\rule\tabularStatement.vue
-->
<template>
  <router-layout>
    <div class="tabularStatement">
      <van-nav-bar
        :title="$route.meta.title"
        v-if="!$route.meta.CLAPP"
        left-arrow
        @click-left="$router.back()"
      />
      <div class="content">
        <div>
          <p>排行榜介绍</p>
          <p>
            数据榜是基于商品大数据和用户消费推出的商家榜单，算法模型计算商家排名，确保榜单真实、公正和权威，皆在为用户提供有知道意义的消费指南，有效帮助购买决策
          </p>
        </div>
        <div>
          <p>数据说明</p>
          <p>排序规则：排行榜依据商家在诚聊购中的销量和销售额数据综合排序</p>
        </div>
        <div>
          <p>
            商品名称：因页面空间有限，店铺中的商品不展示详细名称，具体商品详情请点击商品或店铺进入查看
          </p>
        </div>
        <div>
          <p>店铺销售数据：</p>
          <p>
            1、店铺页面上展示的“N人买过”中，N为该店铺自上架商品以来购买并评价的用户数量；
          </p>
          <p>
            2、店铺销售数据的更新周期为T+1，不排除大促、活动或其他异常情况导致后台计算资源受限而延迟更新
          </p>
        </div>
        <div>
          <p>
            商品价格：榜单内的展示价格可能因为系统故障延迟等客观原因出现商品价格异常，具体情况以商品详情页为准，或向客服咨询和反馈
          </p>
        </div>
        <div>
          <p>商城客服</p>
          <p>联系方式：0571-87710831</p>
        </div>
        <div>
          <p>客服微信：lookduona</p>
        </div>
        <div>
          <p>企业微信：诚聊购</p>
        </div>
      </div>
    </div>
  </router-layout>
</template>

<script setup></script>

<style lang="scss" scoped>
.tabularStatement {
  width: 100%;
  background: linear-gradient(#e42723, #f9b47b) no-repeat;
  background-size: 100%;
  color: #fff;
  font-size: 16px;

  .content {
    height: 800px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  p {
    line-height: 20px;
  }
}
</style>
