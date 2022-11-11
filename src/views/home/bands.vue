<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div
      v-if="bandsGoodsList && bandsGoodsList.length > 0"
      class="preferential"
    >
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="list_onLoad_more"
        >
          <div class="goodsbox">
            <!-- <div ref="bandsGoodsList1">
              <template v-for="(item, index) in bandsGoodsList1">
                <GoodItem :goodItem="item" :key="index" />
              </template>
            </div> -->
            <!-- <div ref="bandsGoodsList2">
              <template v-for="(item, index) in bandsGoodsList2">
                <GoodItem :goodItem="item" :key="index" />
              </template>
            </div> -->
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
import GoodItem from "@/components/goods/goodItem";
import { getBrand } from "api";
export default {
  name: "bands",
  components: {
    GoodItem
  },
  data() {
    return {
      bandsGoodsList: [],
      refreshing: false,
      loading: false, // 加载状态
      finished: false, // 是否加载
      pageNum: 1, // 当前页数
      pageSize: 10 // 每页条数
    };
  },
  created() {
    this.getBrands();
  },
  methods: {
    onRefresh() {
      //   this.orderrefresh = false;
      this.pageNum = 1;
      //   this._getQuery();
    },
    list_onLoad_more() {
      this.pageNum += 1;
      //   this._getQuery(true);
    },
    getBrands() {
      let userinfo = JSON.parse(localStorage.getItem("userinfo")) || [];
      getBrand({
        token: userinfo.token,
        brandId: this.$route.query.brandId,
        cateOneId: this.$route.query.cateOneId
      }).then((res) => {
        this.bandsGoodsList = res.data.list;
      });
    }
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
