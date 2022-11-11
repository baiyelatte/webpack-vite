<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP || !$route.query.token"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="van-tabs-fixed">
      <van-tabs v-model="activeName" @click="status" :ellipsis="false">
        <van-tab title="全部" name="0"></van-tab>
        <van-tab title="处理中" name="3"></van-tab>
        <van-tab title="提现成功" name="1"></van-tab>
        <van-tab title="提现失败" name="2"></van-tab>
      </van-tabs>
    </div>
    <div class="nodesdata" v-if="withdata && withdata.length == 0">
      <van-empty description="暂无数据" />
    </div>
    <div
      v-else
      class="orderreshbox"
      :style="{ height: !$route.meta.CLAPP ? '86.55%' : '93.4%' }"
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
          @load="onLoad"
        >
          <div class="wlbox" v-for="(item, index) in withdata" :key="index">
            <div class="tisp">{{ item.createTime }}</div>
            <van-cell
              :title="`提现金额：￥${item.actionMoney}`"
              :value="item.status | DLineartit"
              class="goodspu"
              is-link
            ></van-cell>
            <div class="tisp">
              提现至：{{ item.bankName }} 尾号{{ item.accountNum }}
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </router-layout>
</template>

<script>
import { getsWithdraw } from "api";
export default {
  name: "wlist",
  data() {
    return {
      withdata: [],
      activeName: 0,
      loading: false, // 加载状态
      finished: false, // 是否加载
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页条数
      refreshing: false,
      orderrefresh: false
    };
  },
  filters: {
    DLineartit(id) {
      let data = "";
      switch (id) {
        case 1:
          data = "提现成功";
          break;
        case 2:
          data = "提现失败";
          break;
        case 3:
          data = "处理中";
          break;
      }
      return data;
    }
  },
  created() {
    this._getWithdraw();
  },
  methods: {
    _getWithdraw(more) {
      let seft = this;
      let toast = "";
      if (!more) {
        toast = seft.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
      }
      seft.activeName =
        seft.activeName === "0" || seft.activeName === 0
          ? null
          : seft.activeName;
      getsWithdraw({
        status: seft.activeName,
        pageNum: seft.pageNum,
        pageSize: seft.pageSize
      }).then((res) => {
        if (res && res.errorCode === 1) {
          seft.loading = false;
          seft.refreshing = false;
          if (more) {
            if (res.data.content.length > 0) {
              seft.withdata = seft.withdata.concat(res.data.content);
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
            seft.withdata = res.data.content;
          }
        } else {
          seft.finished = true;
          seft.finishedText = "- 没有更多了-";
        }
      });
    },
    onRefresh() {
      this.orderrefresh = false;
      this.pageNum = 1;
      this._getWithdraw();
    },
    onLoad() {
      this.pageNum += 1;
      // this.loading = true
      this._getWithdraw(true);
    },
    status(index) {
      this.activeName = index;
      this.pageNum = 1;
      this._getWithdraw();
    }
  }
};
</script>

<style lang="scss" scoped>
.wlbox {
  background: #fff;
  margin-top: 15px;
  padding: 15px 15px;
  .tisp {
    font-size: 12px;
    color: #969799;
  }
  .van-cell {
    line-height: 25px;
    padding: 5px 0;
  }
  .van-cell__title {
    font-size: 14px;
  }
  .van-cell::after {
    content: inherit;
  }
}
.orderreshbox {
  height: 86.55%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #f7f8fa;
}
</style>
