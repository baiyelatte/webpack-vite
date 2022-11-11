<template>
  <router-layout :backgroundColor="'rgb(242, 242, 242)'">
    <van-nav-bar
      v-if="!$route.meta.CLAPP"
      :title="$route.meta.title"
      left-arrow
      @click-left="handleShow"
    />
    <div class="van-tabs-fixed">
      <van-search
        v-model="searchvalue"
        @click="searchinput = true"
        @search="onSearch"
        @cancel="onSearch"
        show-action
        shape="round"
        id="search"
        background="#fff"
        placeholder="请输入商品名字"
      >
        <template #action>
          <div @click="onSearch" style="color: red; font-weight: 700">搜索</div>
        </template>
      </van-search>
      <!-- <span class="icoarrbox"><i class="icon icon-up"></i><i class="icon icon-down active"></i></span> // 上 下 -->
      <!-- <van-tabs
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
                :class="{ 'icon-up': item.isdown, 'icon-down': !item.isdown }"
              />
            </div>
          </template>
        </van-tab>
      </van-tabs> -->
    </div>
    <div>
      <van-tabs v-model="tabName" @change="handleQuery" animated ref="tabsRef">
        <van-tab
          name="商品"
          title="商品"
          :disabled="isHome == 'true' ? false : singleSearch != 2"
        >
          <van-tabs
            :ellipsis="false"
            v-model="seatabactive"
            class="seartabs"
            @change="handleActive"
          >
            <van-tab v-for="item in list" :key="item.id" :name="item.id">
              <template #title>
                <div class="item">
                  {{ item.name }}
                  <div class="conversion" @click="handleIcon(item)">
                    <div class="iconDiv">
                      <van-icon
                        size="0.01rem"
                        class="iconUp"
                        v-if="item.id != 2"
                        name="arrow-up"
                        :color="item.isdown ? '#FF0000' : '#323233'"
                      />
                      <van-icon
                        size="0.01rem"
                        class="iconDown"
                        v-if="item.id != 2"
                        name="arrow-down"
                        :color="!item.isdown ? '#FF0000' : '#323233'"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </van-tab>
          </van-tabs>
        </van-tab>
        <van-tab
          name="店铺"
          title="店铺"
          :disabled="isHome == 'true' ? false : singleSearch != 3"
        >
          <van-tabs
            :ellipsis="false"
            v-model="seatabactive"
            class="seartabs"
            @change="handleActive"
          >
            <van-tab v-for="item in shopList" :key="item.id" :name="item.id">
              <template #title>
                <div class="item">
                  {{ item.name }}
                  <div class="conversion" @click="handleIcon(item)">
                    <div class="iconDiv">
                      <van-icon
                        size="0.01rem"
                        class="iconUp"
                        v-if="item.id != 2"
                        name="arrow-up"
                        :color="item.isdown ? '#FF0000' : '#323233'"
                      />
                      <van-icon
                        size="0.01rem"
                        class="iconDown"
                        v-if="item.id != 2"
                        name="arrow-down"
                        :color="!item.isdown ? '#FF0000' : '#323233'"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </van-tab>
          </van-tabs>
        </van-tab>
      </van-tabs>
      <!-- <div style="padding: 10px">
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
      </div> -->
    </div>

    <div
      class="nodesdata"
      v-if="
        (tabName == '店铺' && cityPavilionShopList.length == 0) ||
        (tabName == '商品' && goodsList1.length == 0)
      "
    >
      <van-empty description="暂无数据">
        <van-button
          type="danger"
          class="bottom-button nodesdataBgi"
          @click="$router.push('/comeToEnjoy')"
          >{{ tabName == "商品" ? "有品要上" : "我要开店"
          }}<van-icon name="arrow"
        /></van-button>
      </van-empty>
    </div>

    <div v-else class="preferentialSearch">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          offset="300"
          :finished="finished"
          finished-text="没有更多了"
          @load="list_onLoad_more"
        >
          <div class="goodsbox" v-if="tabName === '商品'" ref="goodsItemRef">
            <div ref="goodsList1" @click="saveSearchData">
              <template v-for="(item, index) in goodsList1">
                <GoodItem :goodItem="item" :key="index" />
              </template>
            </div>
            <div ref="goodsList2" @click="saveSearchData">
              <template v-for="(item, index) in goodsList2">
                <GoodItem :goodItem="item" :key="index" />
              </template>
            </div>
          </div>
          <div
            class="shopsbox"
            style="width: 100%"
            v-else-if="tabName === '店铺'"
            ref="shopItemRef"
          >
            <ShopItem
              v-for="(item, index) in cityPavilionShopList"
              :shopItem="item"
              :key="index"
              :index="index"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <router-view></router-view>
  </router-layout>
</template>
<script>
import { getQuery, getsSearchKey, getQueryConditionV2 } from "api";
import GoodItem from "@/components/goods/goodItem";
import ShopItem from "@/components/goods/shopItem";
import vue from "@/main";
export default {
  name: "search",
  components: {
    GoodItem,
    ShopItem
  },
  data() {
    return {
      shopScrollTop: "",
      goodsScrollTop: "",
      singleSearch: this.$router.currentRoute.query.singleSearch ?? 1,
      isHome: this.$router.currentRoute.query.isHome ?? "false",
      cityInfo:
        JSON.parse(localStorage.getItem("addressHome")) ??
        vue.__proto__.defaultCity,
      tabName: "商品",
      lastIndex: 0, // 默认选中的项
      currentIndex: "",
      list: [
        {
          id: 1,
          name: "综合",
          isdown: false
        },
        { id: 2, name: "销量", isdown: false },
        { id: 3, name: "价格", isdown: false },
        { id: 4, name: "时间", isdown: false }
      ],
      shopList: [
        {
          id: 1,
          name: "综合",
          isdown: false
        },
        { id: 2, name: "销量", isdown: false },
        { id: 4, name: "时间", isdown: false }
      ],
      cat_id: this.$route.query.cat_id,
      One_id: this.$route.query.One_id,
      two_id: this.$route.query.two_id,
      seatabactive: 0,
      goodsOrderPolicy: [1],
      shopOrderPolicy: [2],
      searchvalue: "",
      goodslist: [],
      goodsList1: [],
      goodsList2: [],
      cityPavilionShopList: [], // 店铺
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
      // shopSort: [3, 4]
    };
  },

  methods: {
    handleIcon({ id }) {
      console.log(this.tabName);
      this.animation(document.querySelector(".preferentialSearch"), 0);
      if (this.tabName === "店铺") {
        this.shopList.forEach((item) => {
          if (this.seatabactive === item.id) {
            if (item.id === id) {
              item.isdown = !item.isdown;
              if (item.isdown) {
                this.shopOrderPolicy = [-1 * item.id];
                this._getQuery();
              } else {
                this.shopOrderPolicy = [item.id];
                this._getQuery();
              }
            }
          }
        });
      } else if (this.tabName === "商品") {
        this.list.forEach((item) => {
          if (this.seatabactive === item.id) {
            if (item.id === id) {
              item.isdown = !item.isdown;
              if (item.isdown) {
                this.goodsOrderPolicy = [-1 * item.id];
                this._getQuery();
              } else {
                this.goodsOrderPolicy = [item.id];
                this._getQuery();
              }
            }
          }
        });
      }
    },
    handleActive(name, title) {
      this.animation(document.querySelector(".preferentialSearch"), 0);
      this.pageNum = 1;
      if (this.tabName === "店铺") {
        this.shopList.forEach((item) => {
          if (item.id === name) {
            item.isdown = false;
            this.shopOrderPolicy = [item.id];
            this._getQuery();
          }
        });
      } else if (this.tabName === "商品") {
        this.list.forEach((item) => {
          if (item.id === name) {
            item.isdown = false;
            this.goodsOrderPolicy = [item.id];
            this._getQuery();
          }
        });
      }
    },
    handleQuery() {},
    // handleComprehensive(item, index) {
    //   this.list[0].children[index].isdown = !item.isdown;
    //   switch (item.id) {
    //     case 3:
    //       this.shopSort[0] = -1 * this.shopSort[0];
    //       break;
    //     case 4:
    //       this.shopSort[1] = -1 * this.shopSort[1];
    //       break;
    //   }
    //   console.log(this.shopSort);
    // },
    handleShow() {
      this.$router.back();
    },
    handleBack() {
      this.$router.back();
      // this.$router.currentRoute.meta.keepAlive = true;
    },
    _deletehistory() {
      localStorage.removeItem("sealists");
      this.sealists = "";
    },
    // _getsSearchKey() {
    //   getsSearchKey().then((res) => {
    //     if (res && res.errorCode == 1 && res.data != null) {
    //       console.log(res);
    //       this.searchdata = res.data.content;
    //     }
    //   });
    // },
    onRefresh() {
      this.finished = true;
      this.pageNum = 1;
      this._getQuery(false, true);
    },
    list_onLoad_more() {
      this.pageNum += 1;
      this._getQuery(true);
    },
    saveSearchData() {
      localStorage.setItem("searchvalueBack", this.searchvalue);
      localStorage.setItem(
        "scrollTopNumber",
        document.getElementsByClassName("preferentialSearch")[0].scrollTop || 0
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
      this._getQuery(false, true);
    },
    isChangetab(index, obj) {
      this.pageNum = 1;
      // index !== 1 为 新品无相关点击
      this.currentIndex = index;
      if (this.lastIndex !== index) {
        // 首次
        this[obj][index].isdown = false;
        this.orderType = false; // 降
        this.lastIndex = index;
        // this.orderByName = this.list[index].id;
        // this._getQuery();
      } else if (this.lastIndex == index && index !== 1) {
        // 二次点击以上
        this.lastIndex = index;
        this.orderByName = this[obj][index].id;
        this.handleClike(index, obj);
      }
    },
    handleClike(index, obj) {
      this[obj][index].isdown = !this[obj][index].isdown;
      this.orderType = this[obj][index].isdown;
      if (document.getElementsByClassName("preferentialSearch")[0]) {
        document.getElementsByClassName("preferentialSearch")[0].scrollTop = 0;
      }

      this._getQuery();
    },
    _getQuery(more = false, isShowList = false) {
      if (!isShowList) return;
      let toast = "";
      this.loading = true;
      if (!more) {
        this.pageNum = 1;
      }
      let searparams;
      if (this.tabName === "商品") {
        searparams = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          // cityId: this.cityInfo.cityId,
          keyWord: this.searchvalue,
          categoryId: "",
          orderPolicy: this.goodsOrderPolicy,
          resultType: 2
        };
      } else {
        searparams = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          // cityId: this.cityInfo.cityId,
          keyWord: this.searchvalue,
          categoryId: "",
          orderPolicy: this.shopOrderPolicy,
          resultType: 3
        };
      }

      !this.isWithoutSearch && delete searparams.goodsCateLevelOne;
      getQueryConditionV2(searparams).then((res) => {
        if (res && res.errorCode === 1) {
          this.refreshing = false;
          if (more) {
            if (res.data.list.length > 0) {
              if (this.tabName === "商品") {
                this.goodslist = this.goodslist.concat(res.data.list);
                this.$nextTick(() => {
                  this.fun(res.data.list);
                });
              } else {
                this.cityPavilionShopList = this.cityPavilionShopList.concat(
                  res.data.list
                );
              }
              this.finished = !res.data.hasNextPage;
            } else {
              this.finished = !res.data.hasNextPage;
            }
          } else {
            this.finished = !res.data.hasNextPage;
            if (this.tabName === "商品") {
              this.goodsList = [];
              this.goodsList1 = [];
              this.goodsList2 = [];
              this.goodslist = this.goodslist.concat(res.data.list);
              this.$nextTick(() => {
                this.fun(res.data.list);
              });
            } else {
              this.cityPavilionShopList = res.data.list;
            }
          }
        } else {
          this.finished = true;
          this.finishedText = "- 没有更多了 -";
        }
        this.loading = false;
      });
    },
    fun(arr) {
      // if (arr.length <= 0) {
      //   this.loading = false;
      //   return;
      // }
      // var leftHeight = this.$refs.goodsList1?.offsetHeight;
      // var rightHeight = this.$refs.goodsList2?.offsetHeight;
      // if (leftHeight <= rightHeight) {
      //   this.goodsList1.push(arr.shift());
      // } else {
      //   this.goodsList2.push(arr.shift());
      // }
      // this.$nextTick(function () {
      //   this.fun(arr);
      // });
      arr.forEach((element, index) => {
        if (index % 2 == 0) {
          this.goodsList1.push(arr[index]);
        }
        if (index % 2 == 1) {
          this.goodsList2.push(arr[index]);
        }
      });
    },
    handleScroll() {
      // console.log(document.querySelector(".preferentialSearch")?.scrollTop);
      if (this.tabName === "商品") {
        this.goodsScrollTop = document.querySelector(
          ".preferentialSearch"
        )?.scrollTop;
      } else if (this.tabName === "店铺") {
        this.shopScrollTop = document.querySelector(
          ".preferentialSearch"
        )?.scrollTop;
      }
      // console.log("滚动高度", window.screenTop);
      // console.log(document.querySelector(".preferentialSearch").scrollTop);
    },
    // 缓动动画
    animation(obj, target) {
      if (obj) {
        clearInterval(obj.timer);
        obj.timer = setInterval(() => {
          var step = (target - obj.scrollTop) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          if (obj.scrollTop >= target) {
            clearInterval(obj.timer);
          }
          obj.scrollTop = obj.scrollTop + step;
        }, 5);
      }
    }
  },
  deactivated() {
    this.pageNum = 1;
    this.searchvalue = "";
    this.isHome = "false";
    // this.goodsList = [];
    // this.goodsList1 = [];
    // this.goodsList2 = [];
    // this.cityPavilionShopList = [];
  },
  mounted() {
    document
      .querySelector("#_search")
      ?.addEventListener("scroll", this.handleScroll, true);
    // 缓存给下一次进入
    // console.log(this.$router.currentRoute.meta.keepAlive);
    // this.$router.currentRoute.meta.keepAlive = true;
    if (this.cityPavilionShopList.length == 0 && this.tabName === "店铺") {
      this._getQuery();
    } else if (this.goodsList1.length == 0 && this.tabName === "商品") {
      this._getQuery();
    }
    // if (this.cat_id || this.One_id || this.two_id) {
    //   this.searchinput = false;
    //   this._getQuery();
    // } else {
    //   this._getsSearchKey();
    // }
  },
  activated() {
    console.log(this.tabName);
    this.cityInfo =
      JSON.parse(localStorage.getItem("addressHome")) ??
      vue.__proto__.defaultCity;
    this._getQuery();

    if (this.$router.currentRoute.query.singleSearch) {
      this.singleSearch = this.$router.currentRoute.query.singleSearch;
      if (this.singleSearch == 2) {
        this.$nextTick(() => {
          this.tabName = "商品";
          this.animation(
            document.querySelector(".preferentialSearch"),
            localStorage.getItem("goodsHistoryScroolTop")
          );
        });
      } else if (this.singleSearch == 3) {
        this.$nextTick(() => {
          this.tabName = "店铺";
          this.animation(
            document.querySelector(".preferentialSearch"),
            localStorage.getItem("shopHistoryScroolTop")
          );
        });
      }
    } else {
      this.$refs.tabsRef.resize();
      this.isHome = this.$router.currentRoute.query.isHome;
      if (this.tabName === "商品") {
        this.animation(
          document.querySelector(".preferentialSearch"),
          localStorage.getItem("goodsHistoryScroolTop")
        );
      } else {
        this.animation(
          document.querySelector(".preferentialSearch"),
          localStorage.getItem("shopHistoryScroolTop")
        );
      }

      // console.log(this.isHome);
      // if (this.isHome == "true") {
      //   this.goodsList = [];
      //   this.goodsList1 = [];
      //   this.goodsList2 = [];
      //   this.cityPavilionShopList = [];
      // }
    }

    if (sessionStorage.getItem("reloadSearchPage")) {
      this.searchinput = false;
      this._getQuery();
      sessionStorage.removeItem("reloadSearchPage");
    }
  },

  watch: {
    seatabactive(val) {
      // this.orderByName = this.list[val].id;
      // if (document.getElementsByClassName("preferentialSearch")[0]) {
      //   document.getElementsByClassName("preferentialSearch")[0].scrollTop = 0;
      // }
      // this._getQuery();
    },
    tabName(val, oldVal) {
      if (this.cityPavilionShopList.length == 0 && val == "店铺") {
        this._getQuery();
      } else if (this.goodsList1.length == 0 && val == "商品") {
        this._getQuery();
      }
      this.$nextTick(() => {
        if (document.querySelector(".preferentialSearch")) {
          document.querySelector(".preferentialSearch").scrollTop = 0;
        }
        if (val == "店铺") {
          this.animation(
            document.querySelector(".preferentialSearch"),
            this.shopScrollTop
          );
        } else if (val == "商品") {
          this.animation(
            document.querySelector(".preferentialSearch"),
            this.goodsScrollTop
          );
        }
      });

      // this._getQuery();

      // setTimeout(() => {
      // document.querySelector(".preferentialSearch").offsetTop
      // this.animation(document.querySelector(".preferentialSearch"), 500);
      // }, 2000);
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    next((vm) => {
      if (from.meta.title != "商品详情页" && from.meta.title != "门店主页") {
        if (to.meta.title == "搜索") {
          vm.goodsList = [];
          vm.goodsList1 = [];
          vm.goodsList2 = [];
          vm.cityPavilionShopList = [];
        }
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    if (to.meta.title == "特产中心" || to.meta.title == "商品详情页") {
      localStorage.setItem(
        "goodsHistoryScroolTop",
        document.querySelector(".preferentialSearch")?.scrollTop
      );
    }
    if (to.meta.title == "城市馆" || to.meta.title == "门店主页") {
      localStorage.setItem(
        "shopHistoryScroolTop",
        document.querySelector(".preferentialSearch")?.scrollTop
      );
    }
    next();
    // next((vm) => {
    //   // if (from.path == "/index" || (from.name == 'detail' && vm.$route.query.pageType == 'jump')) {
    //   vm.One_id = vm.$route.query.One_id;
    //   if (from.path == "/index") {
    //     vm.orderByName = 1;
    //     vm.seatabactive = 0;
    //     vm.searchinput = true;
    //     vm.searchvalue = "";
    //     vm.goodslist = [];
    //     return;
    //   }
    //   if (from.name == "detail") {
    //     vm.searchvalue = localStorage.getItem("searchvalueBack") || "";
    //     if (vm.searchvalue) {
    //       localStorage.setItem("searchvalueBack", "");
    //       vm.$nextTick(() => {
    //         if (document.getElementsByClassName("preferentialSearch")[0]) {
    //           document.getElementsByClassName(
    //             "preferentialSearch"
    //           )[0].scrollTop = localStorage.getItem("scrollTopNumber");
    //           localStorage.removeItem("scrollTopNumber");
    //         }
    //       });
    //     }
    //   }
    // });
  }
};
</script>
<style lang="scss" scoped>
.nodesdataBgi {
  width: 206px;
  height: 55px;
  border-radius: 8px;
  overflow: hidden;
}
.van-tabs-fixed {
  background-color: #fff;
}
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
.shopsbox {
  overflow-y: auto;
  width: 100%;
  margin-top: 10px;
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
.preferentialSearch {
  position: relative;
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
    display: flex;
    align-items: center;
    .conversion {
      display: inline-block;
      margin-left: 2px;
      .iconDiv {
        display: flex;
        flex-direction: column;
        position: relative;
        .iconUp {
          position: absolute;
          top: -9px;
          transform: scale(1);
        }
        .iconDown {
          top: -4px;
          position: absolute;
          transform: scale(1);
        }
      }
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
