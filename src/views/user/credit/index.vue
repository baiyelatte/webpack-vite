<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      right-text="规则"
      left-arrow
      @click-left="$router.back()"
      @click-right="$router.push({ name: 'creditTimeRules' })"
    />
    <div class="credit_hd">
      <div class="credit_item">
        <h2 class="hd_tit">￥{{ Moneydata.availableVoucherMoney }}</h2>
        <!-- <div class="hd_des">当前抵用金</div> -->
        <div
          class="hd_des warning"
          @click="$router.push({ name: 'creditTimeRules' })"
        >
          有效期截至到2022年12月31日
        </div>
      </div>

      <div class="credit_item">
        <h2 class="hd_tit">￥{{ Moneydata.freezeVoucherMoney }}</h2>
        <div class="hd_des">已冻结</div>
      </div>

      <!-- <div class="credit_item">
        <h2 class="hd_tit">￥{{Moneydata.useVoucherMoney}}</h2>
        <div class="hd_des">已使用</div>
      </div> -->
    </div>
    <div class="nodesdata" v-if="accountdata && accountdata.length == 0">
      <van-empty description="暂无数据" />
    </div>
    <div
      v-else
      class="orderreshbox"
      :style="{ height: !$route.meta.CLAPP ? '78.8%' : '85.8%' }"
    >
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        :disabled="orderrefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
          <div
            class="accounpanel"
            v-for="(item, index) in accountdata"
            :key="index"
          >
            <div class="accounbox van-hairline--bottom" v-if="item.type == 2">
              <div class="ifonimg"><img :src="item.logoUrl" /></div>
              <div class="van-cell__title">
                <span class="van-cell_name">{{ item.actionReasonText }}</span>
                <div class="van-cell__label">{{ item.createTime }}</div>
              </div>
              <div class="amount">
                <span v-if="item.actionType == 1" class="red"
                  >+{{ item.actionMoney }}</span
                >
                <span v-if="item.actionType == -1" class="green"
                  >-{{ item.actionMoney }}</span
                >
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <router-view></router-view>
  </router-layout>
</template>

<script>
import { getUserAccountMoney, getUserAccountMoneyLog } from "api";
export default {
  name: "credit",
  data() {
    return {
      accountdata: [],
      Moneydata: [],
      loading: false, // 加载状态
      finished: false, // 是否加载
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页条数
      refreshing: false,
      orderrefresh: false
    };
  },
  created() {
    this._getUserAccountMoneyLog();
    this._getUserAccountMoney();
  },
  methods: {
    onRefresh() {
      this.orderrefresh = false;
      this.pageNum = 1;
      this._getUserAccountMoneyLog();
      this._getUserAccountMoney();
    },
    onLoad() {
      this.pageNum += 1;
      // this.loading = true
      this._getUserAccountMoneyLog(true);
    },
    status(index) {
      this.activeName = index;
      this.pageNum = 1;
      this._getUserAccountMoneyLog();
    },
    _getUserAccountMoney() {
      getUserAccountMoney().then((res) => {
        if (res && res.errorCode == 1) {
          this.Moneydata = res.data;
        }
      });
    },
    _getUserAccountMoneyLog(more) {
      let seft = this;
      let toast = "";
      if (!more) {
        toast = seft.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
      }
      getUserAccountMoneyLog({
        pageNum: seft.pageNum,
        pageSize: seft.pageSize,
        type: 2
      }).then((res) => {
        if (res && res.errorCode === 1) {
          seft.loading = false;
          seft.refreshing = false;
          if (more) {
            if (res.data.content.length > 0) {
              seft.accountdata = seft.accountdata.concat(res.data.content);
              seft.loading = !res.data.isHasNextPage;
              seft.finished = !res.data.isHasNextPage;
            } else {
              seft.loading = !res.data.isHasNextPage;
              seft.finished = !res.data.isHasNextPage;
            }
          } else {
            toast.clear();
            seft.loading = !res.data.isHasNextPage;
            seft.finished = !res.data.isHasNextPage;
            seft.accountdata = res.data.content;
          }
        } else {
          seft.finished = true;
          seft.finishedText = "- 没有更多了-";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.van-pull-refresh {
  min-height: 100%;
}
.orderreshbox {
  height: 78.8%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #f7f8fa;
}
.credit_hd {
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
  text-align: center;
  .credit_item {
    .hd_tit {
      font-size: 16px;
      padding-bottom: 6px;
    }
    .hd_des {
      font-size: 13px;
    }
  }
}
.accounpanel {
  .alipay {
    margin-top: 10px;
  }
  .accounbox {
    position: relative;
    display: flex;
    padding: 10px 15px;
    background: #fff;
    .amount {
      display: flex;
      align-items: center;
      font-size: 16px;
      .red {
        color: #f60303;
      }
      .green {
        color: #26c000;
      }
    }
    .ifonimg {
      width: 45px;
      height: 45px;
      overflow: hidden;
      margin-right: 15px;
      img {
        width: 100%;
        vertical-align: middle;
        object-fit: cover;
      }
    }
    .van-cell__title {
      margin-top: 0px;
      .van-cell_name {
        font-size: 15px;
      }
    }
  }
}
.warning {
  color: red;
}
.warning:hover {
  text-decoration: underline;
}
</style>
