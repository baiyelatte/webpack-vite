<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="accounpanel" v-for="(item, index) in accountdata" :key="index">
      <div class="accounbox van-hairline--bottom" @click="_detail(item)">
        <div class="ifonimg"><img :src="item.bankIcon" alt="" /></div>
        <div class="van-cell__title">
          <span class="van-cell_name">{{ item.bankName }}</span>
          <div class="van-cell__label">{{ item.accountNum }}</div>
        </div>
      </div>
    </div>
    <div class="accounpanel">
      <!-- 支付宝 -->
      <div
        v-for="(items, indexss) in alipaydata"
        :key="indexss"
        class="accounbox van-hairline--bottom alipay"
        @click="_detail(items)"
      >
        <div class="ifonimg"><img :src="items.bankIcon" alt="" /></div>
        <div class="van-cell__title">
          <span class="van-cell_name">{{ items.bankName }}</span>
          <div class="van-cell__label">{{ items.accountNum }}</div>
        </div>
      </div>
    </div>
    <div class="btnbox">
      <van-button type="danger" block @click="_addcard"
        >添加收款账户</van-button
      >
    </div>
    <router-view></router-view>
  </router-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { getsAccount } from "api";
import { Dialog } from "vant";
export default {
  name: "receivablelist",
  data() {
    return {
      accountdata: [],
      alipaydata: []
    };
  },
  created() {
    this._getAccountlist();
  },
  computed: {
    ...mapGetters({
      getwalletinfo: "getwalletinfo"
    })
  },
  methods: {
    _detail(item) {
      this.$router.push({
        name: "receivadetail",
        query: {
          id: item.id,
          bankName: item.bankName,
          accountNum: item.accountNum
        }
      });
    },
    _addcard() {
      let { $router, alipaydata, getwalletinfo, $confirm } = this;
      if (
        getwalletinfo.identAuthStatus == 2 ||
        getwalletinfo.identAuthStatus == 3
      ) {
        $confirm({
          message: "为了让您的交易更安全，请您在进行提现之前，首先进行实名认证",
          confirmButtonText: "去实名认证"
        })
          .then(() => {
            $router.replace({ name: "authentication" });
          })
          .catch(() => {
            $router.back();
          });
      } else {
        $router.push({
          name: "addcard",
          query: { noalipay: alipaydata.length > 0 ? true : false }
        });
      }
    },
    _getAccountlist() {
      getsAccount().then((res) => {
        if (res && res.errorCode == 1) {
          // if (res.data.content.length < 1) {
          //   Dialog.alert({
          //     message: "请先添加收款账户",
          //     confirmButtonText:'去添加'
          //   }).then(() => {
          //     this._addcard()
          //   });
          // }
          this.accountdata = res.data.content.filter(
            (res) => res.accountType == 4
          );
          this.alipaydata = res.data.content.filter(
            (res) => res.accountType == 1
          );
        }
      });
    }
  },
  activated() {
    this._getAccountlist();
  }
};
</script>

<style lang="scss" scoped>
.accounpanel {
  .alipay {
    margin-top: 10px;
  }
  .accounbox {
    position: relative;
    display: flex;
    padding: 10px 15px;
    background: #fff;
    .ifonimg {
      width: 45px;
      height: 45px;
      margin-right: 15px;
      img {
        width: 100%;
        vertical-align: middle;
      }
    }
    .van-cell__title {
      margin-top: 0px;
      .van-cell_name {
        font-size: 17px;
      }
    }
  }
}
</style>
