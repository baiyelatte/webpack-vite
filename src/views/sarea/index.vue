<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div v-if="goodslist && goodslist.length > 0" class="preferential">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="list_onLoad_more"
        >
          <div class="goodsbox">
            <div ref="goodsList1">
              <template v-for="(item, index) in goodsList1">
                <GoodItem :goodItem="item" :key="index" />
              </template>
            </div>
            <div ref="goodsList2">
              <template v-for="(item, index) in goodsList2">
                <GoodItem :goodItem="item" :key="index" />
              </template>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="nodesdata" v-else>
      <van-empty description="暂无数据" />
    </div>
  </router-layout>
</template>
<script>
import { getQuery } from "api";
import GoodItem from "@/components/goods/goodItem";
export default {
  name: "sarea",
  components: {
    GoodItem
  },
  data() {
    return {
      lastIndex: 0, // 默认选中的项
      currentIndex: "",
      One_id: this.$route.query.One_id,
      seatabactive: 0,
      goodslist: [],
      goodsList1: [],
      goodsList2: [],
      goodsCateLeve: "",
      searchinput: true, // 显示历史记录
      orderType: false, // 排序方式
      refreshing: false,
      loading: false, // 加载状态
      finished: false, // 是否加载
      pageNum: 1, // 当前页数
      pageSize: 10 // 每页条数
    };
  },
  methods: {
    onRefresh() {
      this.orderrefresh = false;
      this.pageNum = 1;
      this._getQuery();
    },
    list_onLoad_more() {
      this.pageNum += 1;
      this._getQuery(true);
    },
    _getQuery(more) {
      let toast = "";
      this.loading = true;
      if (!more) {
        toast = this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
      }
      let searparams = {
        goodsTag: this.One_id === undefined ? "" : this.One_id,
        orderByName: this.seatabactive || 1,
        orderType: this.orderType,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        agencyUnionid: this.$route.query.agencyUnionid || null,
        fromPlatform: this.$route.query.fromPlatform || null
      };
      getQuery(searparams).then((res) => {
        if (res && res.errorCode === 1) {
          this.refreshing = false;
          if (more) {
            if (res.data.content.length > 0) {
              this.goodslist = this.goodslist.concat(res.data.content);
              this.$nextTick(() => {
                this.fun(res.data.content);
              });
              this.finished = !res.data.isHasNextPage;
            } else {
              this.finished = !res.data.isHasNextPage;
            }
          } else {
            toast.clear();
            this.finished = !res.data.isHasNextPage;
            this.goodslist = [];
            this.goodslist = this.goodslist.concat(res.data.content);
            this.$nextTick(() => {
              this.fun(res.data.content);
            });
          }
        } else {
          this.finished = true;
          this.finishedText = "- 没有更多了-";
        }
      });
    },
    fun(arr) {
      if (arr.length <= 0) {
        this.loading = false;
        return;
      }
      var leftHeight = this.$refs.goodsList1.offsetHeight;
      var rightHeight = this.$refs.goodsList2.offsetHeight;
      if (leftHeight <= rightHeight) {
        this.goodsList1.push(arr.shift());
      } else {
        this.goodsList2.push(arr.shift());
      }
      this.$nextTick(function () {
        this.fun(arr);
      });
    }
  },
  mounted() {
    this._getQuery();
  }
};
</script>
<style lang="scss" scoped>
:deep(.van-pull-refresh) {
  min-height: 100%;
}
.goodsbox {
  display: flex;
  justify-content: space-between;
  > div {
    width: 49%;
    height: fit-content;
  }
}
.searchls {
  padding: 10px;
  .search_hd {
    display: flex;
    justify-content: space-between;
  }
}
.preferential {
  padding: 0 10px;
  // height: 85.3%;
  height: calc(100% - 1.22667rem);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.seartabs {
  position: relative;
  .item {
    text-align: center;
    color: rgba(0, 0, 0, 0.54);
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
    display: inline-block;
    .icon {
      width: 0;
      height: 0;
      border-style: solid;
      display: inline-block;
      margin-left: 0.2rem;
      vertical-align: middle;
    }
    .icon-down {
      border-width: 0.11rem 0.11rem 0;
      border-color: #bdbdbd transparent transparent;
    }
    .icon-up {
      border-width: 0 0.11rem 0.11rem;
      border-color: transparent transparent #bdbdbd;
    }
    .icoarrbox {
      display: inline-block;
      position: relative;
      margin-left: 0.1rem;
      .icon {
        position: absolute;
        left: 0;
        margin-left: 0;
      }
      .icon-up {
        top: -0.3rem;
      }
      .icon-down {
        top: -0.05rem;
      }
    }
  }
  .active {
    color: #ff6700;
  }
}
</style>
