<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="schedule">
      <van-steps :active="scheduleact">
        <van-step>发起提现申请</van-step>
        <van-step>系统处理中</van-step>
        <van-step>{{ scheduletit }}</van-step>
      </van-steps>
    </div>
    <div class="schedulecon">
      <van-cell title="提现金额" :value="`￥${scheduledata.actionMoney}`" />
      <van-cell title="发起提现时间" :value="`${scheduledata.createTime}`" />
      <van-cell
        title="到账银行卡"
        :value="`${scheduledata.bankName} ${scheduledata.accountNum}`"
      />
      <van-cell
        title="提现服务费"
        :value="`￥${scheduledata.serviceChargeMoney}`"
      />
    </div>
    <div class="btnbox">
      <van-button type="danger" block @click="_carryout">完成</van-button>
    </div>
  </router-layout>
</template>

<script>
import { getWithdraw } from "api";
export default {
  name: "wdetails ",
  data() {
    return {
      scheduledata: [],
      scheduleact: 1,
      scheduletit: "提现完成"
    };
  },
  created() {
    this._getWithdraw();
  },
  methods: {
    _carryout() {
      // this.$router.back()
      this.$router.push({
        name: "wallet",
        params: { password: this.value }
      });
    },
    _getWithdraw() {
      let that = this;
      getWithdraw({ id: that.$route.params.id }).then((res) => {
        if (res && res.errorCode == 1) {
          that.scheduledata = res.data;
          switch (res.data.status) {
            case 1: // 成功
              that.scheduletit = "提现成功";
              that.scheduleact = 2;
              break;
            case 2: // 失败
              that.scheduletit = "提现失败";
              that.scheduleact = 2;
              break;
            case 3:
              that.scheduleact = 1;
              break;
          }
        }
      });
    }
  }
};
</script>

<style></style>
