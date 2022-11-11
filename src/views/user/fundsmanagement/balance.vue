<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="nodesdata" v-if="uamoneylogdata && uamoneylogdata.length == 0">
      <van-empty description="暂无数据" />
    </div>
    <div
      v-else
      class="balance"
      :style="{ height: !$route.meta.CLAPP ? '93.1%' : '100%' }"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <div
          v-for="(item, index) in uamoneylogdata"
          :key="index"
          style="padding: 10px 10px 0 10px"
        >
          <van-cell class="balancebox">
            <template #title>
              <span class="custom-title">{{ item.actionReasonText }}</span>
            </template>
            <template #label>
              <span>{{ item.createTime }}</span>
            </template>
            <template #extra>
              <div v-if="item.actionType == -1" class="balancright">
                <span>-{{ item.actionMoney }}</span>
                <div class="des">
                  <span v-if="item.completeMoney"
                    >余额{{ item.completeMoney }}</span
                  >
                </div>
              </div>
              <div v-else class="balancright">
                <span>+{{ item.actionMoney }}</span>
                <div class="des">
                  <span v-if="item.completeMoney"
                    >余额{{ item.completeMoney }}</span
                  >
                </div>
              </div>
            </template>
          </van-cell>
        </div>
      </van-list>
    </div>
  </router-layout>
</template>

<script>
import { getUserAccountMoneyLog } from "api";
export default {
  name: "balance",
  data() {
    return {
      loading: false, // 加载状态
      finished: false, // 是否加载
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页条数
      uamoneylogdata: []
    };
  },
  mounted() {
    this._uamoneylog();
  },
  methods: {
    onRefresh() {
      this.orderrefresh = false;
      this.pageNum = 1;
      this._uamoneylog();
    },
    onLoad() {
      this.pageNum += 1;
      // this.loading = true
      this._uamoneylog(true);
    },
    _uamoneylog(more) {
      let toast = "";
      if (!more) {
        toast = this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
      }
      getUserAccountMoneyLog({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type: "1"
      }).then((res) => {
        if (res && res.errorCode === 1) {
          this.loading = false;
          this.refreshing = false;
          if (more) {
            if (res.data.content.length > 0) {
              this.uamoneylogdata = this.uamoneylogdata.concat(
                res.data.content
              );
              this.loading = !res.data.isHasNextPage;
              this.finished = !res.data.isHasNextPage;
            } else {
              this.loading = !res.data.isHasNextPage;
              this.finished = !res.data.isHasNextPage;
            }
          } else {
            toast.clear();
            this.loading = !res.data.isHasNextPage;
            this.finished = !res.data.isHasNextPage;
            this.uamoneylogdata = res.data.content;
          }
        } else {
          this.finished = true;
          this.finishedText = "- 没有更多了-";
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.balance {
  height: 93.1%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .balancebox {
    border-radius: 10px;
    overflow: hidden;
    // margin: 10px;
    width: auto;
    .balancright {
      flex: 1;
      text-align: right;
      .des {
        margin-top: 0.10667rem;
        color: #969799;
        font-size: 0.32rem;
        line-height: 0.48rem;
      }
    }
  }
}
</style>
