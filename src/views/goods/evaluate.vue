<template>
  <router-layout style="z-index: 99">
    <van-nav-bar
      title="商品评价"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="evaluatebox" v-if="goodslist.length > 0">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="list_onLoad_more"
        >
          <ratelist :ratedata="goodslist" />
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="nodesdata" v-else>
      <van-empty description="暂无数据" />
    </div>
  </router-layout>
</template>

<script>
import { getsGoodsEvaluate } from "api";
import ratelist from "@/components/goods/ratelist";
export default {
  name: "evaluate",
  data() {
    return {
      refreshing: false,
      loading: false, // 加载状态
      finished: false, // 是否加载
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页条数
      goodsId: this.$route.params.id,
      goodslist: []
    };
  },
  components: {
    ratelist
  },
  mounted() {
    this._getEvaluate();
  },
  methods: {
    onRefresh() {
      this.orderrefresh = false;
      this.pageNum = 1;
      this._getEvaluate();
    },
    list_onLoad_more() {
      this.pageNum += 1;
      this._getEvaluate(true);
    },
    _getEvaluate(more) {
      let toast = "";
      if (!more) {
        toast = this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
      }
      let searparams = {
        goodsId: this.goodsId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      getsGoodsEvaluate(searparams).then((res) => {
        if (res && res.errorCode === 1) {
          this.loading = false;
          this.refreshing = false;
          if (more) {
            if (res.data.content.length > 0) {
              this.goodslist = this.goodslist.concat(res.data.content);
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
            this.goodslist = res.data.content;
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

<style lang="scss" scoped>
.evaluatebox {
  height: 93%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
