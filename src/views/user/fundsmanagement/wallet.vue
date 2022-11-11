<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="wallte_hd">
      <div class="hd_tit">可用余额</div>
      <h2 class="hd_des" v-if="getwalletinfo">
        ￥{{ getwalletinfo.availableMoney }}
      </h2>
    </div>
    <!-- <van-cell title="充值" @click="$router.push({name: 'recharge'})" is-link style="margin-top:10px;"/> -->
    <!-- <van-cell title="充值"  is-link style="margin-top:10px;"/> -->
    <van-cell
      title="提现"
      @click="$router.push({ name: 'withdraw', password: '' })"
      is-link
      style="margin-top: 10px"
    />
    <van-cell
      title="申请记录"
      @click="$router.push({ name: 'wlist' })"
      is-link
      style="margin-top: 10px"
    />
    <van-cell
      title="收款账户"
      @click="$router.push({ name: 'receivablelist' })"
      is-link
      style="margin-top: 10px"
    />
    <van-cell
      title="余额明细"
      @click="$router.push({ name: 'balance' })"
      is-link
      style="margin-top: 10px"
    />
    <van-cell
      title="中奖记录"
      @click="$router.push({ name: 'luck' })"
      is-link
      style="margin-top: 10px"
    />
    <!-- <van-cell title="设置支付密码" v-if="$route.query.pay =='1'" @click="$router.push({name: 'alternate'})" is-link style="margin-top:10px;"/> -->
    <!-- <van-cell title="设置支付密码" v-if="pay ==isSetPayPwd" @click="$router.push({name: 'alternate'})" is-link style="margin-top:10px;"/> -->
    <!-- <van-cell title="修改支付密码" v-else-if="pay!=isSetPayPwd" @click="$router.push({name: 'Changepassword'})" is-link style="margin-top:10px;"/> -->
    <van-cell
      :title="pay == isSetPayPwd ? '设置支付密码' : '重置支付密码'"
      @click="
        $router.push({
          name: 'Changepassword',
          query: { isSetPassword: pay == isSetPayPwd }
        })
      "
      is-link
      style="margin-top: 10px"
    />
    <router-view></router-view>
  </router-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "wallet",
  data() {
    return {
      AccountMoney: null,
      pay: 0,
      isSetPayPwd: 0
    };
  },
  computed: {
    ...mapGetters({
      mapgetuserinfo: "getuserinfo",
      getwalletinfo: "getwalletinfo"
    })
    // isSetPayPwd:function(){
    //   return window.localStorage.getItem('isSetPayPwd')
    // },
  },

  methods: {
    ...mapActions(["putwalletinfo"]),
    _AccountMoney() {
      let that = this;
      // if(that.mapgetuserinfo.identAuthStatus == 2 || that.mapgetuserinfo.identAuthStatus == 3 ){
      //   that.$confirm({
      //     message: '为了让您的交易更安全，请您在进行提现之前，首先进行实名认证',
      //     confirmButtonText: '去实名认证'
      //   }).then(() => {
      //     that.$router.push({name: 'authentication'})
      //   }).catch(() => {})
      // }
      that.putwalletinfo();
    }
  },
  created() {
    this._AccountMoney();
  },
  updated() {
    this.isSetPayPwd = window.localStorage.getItem("isSetPayPwd") || 0;
  }
};
</script>

<style scoped lang="scss">
.wallte_hd {
  background: rgb(147, 2, 0);
  width: 100%;
  height: 180px;
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  .hd_tit {
    font-size: 14px;
    padding: 10px 0px;
  }
  .hd_des {
    font-size: 24px;
  }
}
</style>
