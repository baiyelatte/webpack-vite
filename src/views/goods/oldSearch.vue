<template>
  <router-layout :backgroundColor="'rgb(242, 242, 242)'">
    <div class="van-tabs-fixed">
      <van-search
        v-model="searchvalue"
        @click="searchinput = true"
        @search="onSearch"
        @cancel="onSearch"
        show-action
        shape="round"
        id="search"
        background="#F2F2F2"
        placeholder="请输入商品名字"
      >
        <template #left>
          <van-icon
            name="arrow-left"
            size="20"
            style="margin-right: 5px"
            @click="handleBack"
          />
        </template>
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <!-- <span class="icoarrbox"><i class="icon icon-up"></i><i class="icon icon-down active"></i></span> // 上 下 -->
      <van-tabs
        v-if="!searchinput"
        :ellipsis="false"
        v-model="seatabactive"
        class="seartabs"
      >
        <van-tab v-for="(item, index) in list" :key="index">
          <template #title>
            <div
              class="item"
              @click="isChangetab(index)"
              :class="[currentIndex == index ? 'actcolor' : '']"
            >
              {{ item.name }}
              <i
                v-if="item.id != 2"
                class="icon"
                :class="{ 'icon-up': item.isdown, 'icon-down': !item.isdown }"
              />
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div v-if="searchinput">
      <div style="padding: 10px">
        <h4 style="color: #cf0000; font-size: 14px">热门搜索</h4>
        <div style="padding-top: 10px">
          <van-button
            size="small"
            v-for="(item, index) in searchdata"
            :key="index"
            @click="
              searchvalue = item.dictLabel;
              onSearch();
            "
            round
            style="min-width: 90px; margin: 10px"
            >{{ item.dictLabel }}</van-button
          >
        </div>
      </div>
      <div class="searchls">
        <div class="search_hd">
          <h4 style="color: #cdcdcd; font-size: 14px">搜索历史</h4>
          <van-icon @click="_deletehistory()" name="delete" size=".5rem" />
        </div>
        <div style="padding-top: 10px">
          <span v-for="(value, index) in sealists" :key="index">
            <van-button
              class="history_item"
              size="small"
              @click="
                searchvalue = value;
                onSearch();
              "
              round
              style="min-width: 90px; margin: 10px"
              >{{ value }}</van-button
            >
          </span>
        </div>
      </div>
    </div>
    <div v-else-if="!searchinput && goodslist.length > 0" class="preferential">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="list_onLoad_more"
        >
          <div class="goodsbox">
            <div ref="goodsList1" @click="saveSearchData">
              <template v-for="(item, index) in goodsList1">
                <Gooditem :goodItem="item" :key="index" :isShowShop="false" />
              </template>
            </div>
            <div ref="goodsList2" @click="saveSearchData">
              <template v-for="(item, index) in goodsList2">
                <Gooditem :goodItem="item" :key="index" :isShowShop="false" />
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
import { getQuery, getsSearchKey } from "api";
import Gooditem from "@/components/goods/goodItem";
export default {
  name: "search",
  components: {
    Gooditem
  },
  data() {
    return {
      lastIndex: 0, // 默认选中的项
      currentIndex: "",
      list: [
        { id: 1, name: "综合", isdown: false },
        { id: 2, name: "新品", isdown: false },
        { id: 3, name: "价格", isdown: false },
        { id: 4, name: "销量", isdown: false }
      ],
      cat_id: this.$route.query.cat_id,
      One_id: this.$route.query.One_id,
      two_id: this.$route.query.two_id,
      seatabactive: 0,
      searchvalue: "",
      goodslist: [],
      goodsList1: [],
      goodsList2: [],
      goodsCateLeve: "",
      searchinput: true, // 显示历史记录
      sealists: JSON.parse(localStorage.getItem("sealists")),
      searchdata: [],
      orderType: true, // 排序方式
      refreshing: false,
      loading: false, // 加载状态
      finished: false, // 是否加载
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页条数
      orderByName: 1,
      isWithoutSearch: true
    };
  },

  methods: {
    handleBack() {
      this.$router.back();
      this.$router.currentRoute.meta.keepAlive = true;
    },
    _deletehistory() {
      localStorage.removeItem("sealists");
      this.sealists = "";
    },
    _getsSearchKey() {
      getsSearchKey().then((res) => {
        if (res && res.errorCode == 1 && res.data != null) {
          this.searchdata = res.data.content;
        }
      });
    },
    onRefresh() {
      this.orderrefresh = false;
      this.pageNum = 1;
      this._getQuery();
    },
    list_onLoad_more() {
      this.pageNum += 1;
      this._getQuery(true);
    },
    saveSearchData() {
      localStorage.setItem("searchvalueBack", this.searchvalue);
      localStorage.setItem(
        "scrollTopNumber",
        document.getElementsByClassName("preferential")[0].scrollTop || 0
      );
    },
    // 历史
    onSearch() {
      if (this.searchvalue == "") {
        this.$toast("请输入搜索关键字");
        return;
      }
      this.searchinput = false;
      if (!this.sealists) {
        self.sealists = [];
      }
      let arr = JSON.parse(localStorage.getItem("sealists")) || [];
      arr.push(this.searchvalue);
      this.sealists = Array.from(new Set(arr));
      localStorage.setItem("sealists", JSON.stringify(this.sealists));

      this.isWithoutSearch = false;
      this._getQuery();
    },
    isChangetab(index) {
      this.pageNum = 1;
      // index !== 1 为 新品无相关点击
      this.currentIndex = index;
      if (this.lastIndex !== index) {
        // 首次
        this.list[index].isdown = false;
        this.orderType = false; // 降
        this.lastIndex = index;
        // this.orderByName = this.list[index].id;
        // this._getQuery();
      } else if (this.lastIndex == index && index !== 1) {
        // 二次点击以上
        this.lastIndex = index;
        this.orderByName = this.list[index].id;
        this.handleClike(index);
      }
    },
    handleClike(index) {
      this.list[index].isdown = !this.list[index].isdown;
      this.orderType = this.list[index].isdown;
      if (document.getElementsByClassName("preferential")[0]) {
        document.getElementsByClassName("preferential")[0].scrollTop = 0;
      }
      this._getQuery();
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
      let searparams;
      if (this.$router.currentRoute.query.isGoodsCateLevelTwo == "false") {
        searparams = {
          orderByName: this.orderByName,
          content: this.searchvalue,
          orderType: this.orderType,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
      } else {
        searparams = {
          goodsCateLevelOne: this.One_id,
          goodsCateLevelTwo: this.two_id, //二级
          goodsCateLevelThree: this.cat_id, //三级
          orderByName: this.orderByName,
          content: this.searchvalue,
          orderType: this.orderType,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
      }

      !this.isWithoutSearch && delete searparams.goodsCateLevelOne;
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
            this.goodsList = [];
            this.goodslist = this.goodslist.concat(res.data.content);
            this.goodsList1 = [];
            this.goodsList2 = [];
            this.$nextTick(() => {
              this.fun(res.data.content);
            });
          }
        } else {
          this.finished = true;
          this.finishedText = "- 没有更多了 -";
        }
      });
    },
    fun(arr) {
      if (arr.length <= 0) {
        this.loading = false;
        return;
      }
      var leftHeight = this.$refs.goodsList1?.offsetHeight;
      var rightHeight = this.$refs.goodsList2?.offsetHeight;
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
  deactivated() {
    this.pageNum = 1;
  },
  mounted() {
    // 缓存给下一次进入
    // console.log(this.$router.currentRoute.meta.keepAlive);
    // this.$router.currentRoute.meta.keepAlive = true;

    if (this.cat_id || this.One_id || this.two_id) {
      this.searchinput = false;
      this._getQuery();
    } else {
      this._getsSearchKey();
    }
  },
  activated() {
    if (sessionStorage.getItem("reloadSearchPage")) {
      this.searchinput = false;
      this._getQuery();
      sessionStorage.removeItem("reloadSearchPage");
    }
  },
  watch: {
    seatabactive(val) {
      this.orderByName = this.list[val].id;
      if (document.getElementsByClassName("preferential")[0]) {
        document.getElementsByClassName("preferential")[0].scrollTop = 0;
      }
      this._getQuery();
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(
        vm,
        vm.$route.query,
        "11111111",
        vm.cat_id,
        vm.One_id,
        vm.two_id
      );
      // if (from.path == "/index" || (from.name == 'detail' && vm.$route.query.pageType == 'jump')) {
      vm.One_id = vm.$route.query.One_id;
      if (from.path == "/index") {
        vm.orderByName = 1;
        vm.seatabactive = 0;
        vm.searchinput = true;
        vm.searchvalue = "";
        vm.goodslist = [];
        return;
      }
      if (from.name == "detail") {
        vm.searchvalue = localStorage.getItem("searchvalueBack") || "";
        if (vm.searchvalue) {
          localStorage.setItem("searchvalueBack", "");
          vm.$nextTick(() => {
            if (document.getElementsByClassName("preferential")[0]) {
              document.getElementsByClassName("preferential")[0].scrollTop =
                localStorage.getItem("scrollTopNumber");
              localStorage.removeItem("scrollTopNumber");
            }
          });
        }
      }
    });
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
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
  .history_item {
    .van-button__text {
      @include no-wrap-multi(2);
    }
  }
}
.preferential {
  padding: 0 10px;
  height: 85.3%;
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
