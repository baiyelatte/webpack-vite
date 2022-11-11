<template>
  <router-layout class="shopInfo">
    <!-- <van-icon name="arrow-left" /> -->
    <div class="prenbox">
      <download />
      <div class="header">
        <div class="global-bg"></div>
        <div class="shopbgbox" :style="{ top: `${isApp ? 0 : 48}px` }">
          <div class="shopbg"></div>
        </div>
        <topBar @change="searGood" />
        <a href="javascript:" class="media-box">
          <div class="media-box__hd">
            <img class="media-box__thumb" :src="shopdata.logoImgUrl" alt="" />
          </div>
          <div class="media-box__bd">
            <div class="shop_hd">
              <h4 class="media-box__title">{{ shopdata.name }}</h4>
              <div
                class="gz"
                :style="{
                  backgroundColor:
                    shopdata.shopIsAttention == 1 ? '' : '#D60504'
                }"
                @click="onFocus"
              >
                <p v-if="shopdata.shopIsAttention == 1">已关注</p>
                <div v-if="shopdata.shopIsAttention == 0">
                  <img src="@/assets/image/shopAttention.png" alt="" />
                  <p>关注</p>
                </div>
              </div>
            </div>
            <p class="ratebox">
              <span style="float: left">信用等级：</span>
              <van-rate
                size="14px"
                style="font-size: 12px; margin-top: -2px"
                color="#bb0000"
                :value="evGrade"
                allow-half
                void-icon="star"
                void-color="#eee"
              />
            </p>
          </div>
        </a>
        <van-tabs
          v-model="categoryActive"
          background="#ebeaeb"
          class="categoryTabs"
          title-active-color="#D80C0B"
          title-inactive-color="black"
        >
          <van-tab name="1" title="全部商品" />
          <van-tab name="0" title="分类" />
        </van-tabs>
        <goodTabs
          v-show="categoryActive == 1"
          @changeOrderParams="onChangeTab"
          :orderType="orderType"
          :searActive="orderByName"
        />
      </div>
      <goodList
        ref="goodListRef"
        v-show="categoryActive == 1"
        :orderType="orderType"
        :orderByName="orderByName"
        :goodName="goodName"
      />
      <div class="CategoryListBox" v-show="categoryActive == 0">
        <div
          class="CategoryBox"
          v-for="(item, index) in CategoryList"
          :key="index"
        >
          <div
            class="first-class-category"
            @click="goShopCategoryGoodList(item.id)"
          >
            <h4>
              {{ item.categoryName }}&nbsp;&nbsp;{{ item.goodsCount || 0 }}
            </h4>
            <van-icon name="arrow" />
          </div>
          <div class="secondary-category" v-if="item?.childNode?.length">
            <p
              v-for="(sub, subIndex) in item?.childNode"
              @click="goShopCategoryGoodList(sub.id)"
              :key="subIndex"
            >
              {{ sub.categoryName }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </router-layout>
</template>

<script>
import download from "@/components/download";
import {
  getShop,
  getQuery,
  shopAttention,
  shopNoAttention,
  getLoadShopCategory
} from "api";
import topBar from "./component/topBar";
import goodList from "./component/goodList";
import goodTabs from "./component/goodTabs";
export default {
  name: "shopinfo",
  components: {
    download,
    topBar,
    goodList,
    goodTabs
  },
  data() {
    return {
      headerAttr: LukeappApi.getattribute(),
      shopId: this.$route.params.shopId,
      isApp: LukeappApi.IscltApp(),
      shopbgdefau: require("@/assets/image/common/shopbg.png"),
      evGrade: 0,
      shopdata: [],
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      orderType: false, // 排序方式
      orderByName: 1,
      gzFlag: true,
      userinfo: {},
      categoryActive: 1, // 选项卡 1: 全部商品
      CategoryList: [], // 分类列表
      goodName: ""
    };
  },
  methods: {
    searGood(value) {
      this.goodName = value;
    },
    onChangeTab(tabId, idDown) {
      this.orderByName = tabId;
      this.orderType = idDown;
    },
    onFocus() {
      if (this.gzFlag) {
        this.gzFlag = false;
        const request =
          this.shopdata.shopIsAttention == 1 ? shopNoAttention : shopAttention;
        request({
          shopId: this.$route.params.shopId
        }).then((res) => {
          this.gzFlag = true;
          if (res.errorCode === 1 || res.errorCode == 10001) {
            this.shopdata.shopIsAttention = this.shopdata.shopIsAttention ^ 1;
          }
          if (this.shopdata.shopIsAttention == 1) {
            this.$toast("已关注");
          } else {
            this.$toast("取消关注");
          }
        });
      }
    },
    getShopInfo() {
      getShop({
        shopId: this.$route.params.shopId
      }).then((res) => {
        if (res && res.errorCode == 1) {
          this.shopdata = res.data;
          this.evGrade = res.data.evGrade;
        }
      });
    },
    // 获取分类列表
    getLoadShopCategoryList() {
      getLoadShopCategory({
        shopId: this.$route.params.shopId
      }).then((res) => {
        if (res && res.errorCode == 1) {
          this.CategoryList = res.data.content;
        }
      });
    },
    // 跳转各类目商品列表
    goShopCategoryGoodList(categoryId) {
      this.$router.push({
        name: "shopCategory",
        query: {
          categoryId
        },
        params: {
          shopId: this.$route.params.shopId
        }
      });
    }
    // TT() {
    //   console.log(
    //     document.documentElement.scrollTop ||
    //       window.pageYOffset ||
    //       document.body.scrollTop
    //   );
    //   console.log(document.querySelector(".shopInfo").scrollTop);
    // }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "detail") {
      from.meta.keepAlive = true;
      sessionStorage.setItem("shopScrollTop", 0);
    } else {
      // from.meta.keepAlive = false;
      sessionStorage.setItem("shopScrollTop", 0);
    }
    next();
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log(to, from, next);
  //   if (from.name == "detail") {
  //     document.querySelector(`#${from.params.id * 1}`)?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //       inline: "nearest"
  //     });
  //   }
  //   next();
  // },
  created() {
    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    this.getShopInfo();
    this.getLoadShopCategoryList();
  },
  mounted() {
    // this.$nextTick(() => {
    //   document
    //     .querySelector(".prenbox")
    //     .addEventListener("scroll", this.TT, true);
    // });
  },
  activated() {
    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    this.getShopInfo();
    this.getLoadShopCategoryList();
  },
  watch: {
    shopId(newValue, oldValue) {
      // this.getShopInfo();
      this.getLoadShopCategoryList();
    }
  }
};
</script>

<style lang="scss" scoped>
.global-bg {
  position: fixed;
  background-color: #ebeaeb;
  height: 100vh;
  top: 0;
  z-index: -100;
}
.goodsbox {
  display: flex;
  justify-content: space-between;
  > div {
    width: 49%;
    height: fit-content;
  }
}
.shopInfo {
  background-color: #ebeaeb;
  z-index: 999;
}
.shopbanner {
  padding: 0px 10px;
  // background: linear-gradient(to bottom, #17aec9 60%, #f9f9f9 60%);
  :deep(.van-swipe) {
    // background: #f6f6f6;
    width: 100%;
    max-height: 125px;
    border-radius: 10px;
    // box-shadow: 2Px 2Px 10Px 0px rgba(120, 120, 120, 0.3);
    img {
      width: 100%;
      object-fit: contain;
    }
  }
}

.header {
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #ebeaeb;
  .categoryTabs {
    padding: 10px 100px;
    padding-top: 0;
    :deep(.van-tab) {
      font-size: 18px;
      font-weight: 550;
    }
  }
  .shopbgbox {
    // height: 140px;
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    left: 0;
    right: 0;
    background: #e2e1e2;
    .shopbg {
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.3);
    }
  }
  .ratebox {
    margin-top: 4px;
    font-size: 11px;
    color: #666;
  }
}

.CategoryListBox {
  .CategoryBox {
    border-radius: 5px;
    background: white;
    margin: 0 12px;
    padding: 10px 12px;
    padding-bottom: 0;
    margin-bottom: 10px;
    .first-class-category {
      font-size: 16px;
      align-items: center;
      justify-content: space-between;
      display: flex;
      padding-bottom: 10px;
    }
    .secondary-category {
      font-size: 15px;
      display: flex;
      flex-wrap: wrap;
      > p {
        width: 100px;
        border-radius: 5px;
        background: #f3f3f3;
        height: 32px;
        margin-right: 13px;
        text-align: center;
        line-height: 32px;
        margin-bottom: 10px;
      }
      > p:nth-of-type(3n) {
        margin-right: 0;
      }
    }
  }
}

.gz {
  // margin-top: -10px;
  width: 59px;
  height: 25px;
  border-radius: 13px;
  // border: 1px solid #999999;
  border: 1px solid #de1b1a;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 13px;
      height: 11px;
      margin: 0 5px;
    }
    p {
      color: #f4f7fc;
    }
  }
  > p {
    text-align: center;
  }
  p {
    font-size: 13px;
    // color: #999999;
    color: #d80c0b;
    line-height: 25px;
  }
}
.media-box {
  padding: 0 16px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebeaeb;
  .media-box__hd {
    margin-right: 16px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .media-box__thumb {
      width: 60px;
      height: 60px;
      vertical-align: top;
      border-radius: 50%;
    }
  }
  .shop_hd {
    display: flex;
  }
  .media-box__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 0;
    .media-box__title {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      font-weight: 550;
      font-size: 16px;
      line-height: 1.4;
      color: #333;
      width: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      word-wrap: break-word;
      -webkit-hyphens: auto;
      hyphens: auto;
    }
    .media-box__desc {
      color: #fff;
      font-size: 14px;
      line-height: 1.4;
      padding-top: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-wrap: break-word;
      -webkit-hyphens: auto;
      hyphens: auto;
    }
  }
}
:deep(.van-tabs__line) {
  bottom: 21px;
}
</style>
