<template>
  <div class="main-home category-home">
    <CommonHeader />
    <!-- <Header /> -->
    <van-nav-bar class="header" :border="false" v-if="!$route.meta.CLAPP">
      <template #left>
        <van-icon name="arrow-left" size="24" @click="$router.back()" />
      </template>
      <template #title>
        <div class="search-box" @click="handleTitle">
          <van-icon name="search" size="24" color="#333" />
          <span class="search-tit">请输入商品名称</span>
        </div>
      </template>
    </van-nav-bar>
    <div
      class="category-bodys"
      :style="{
        top:
          headerAttr.header === 1
            ? '1.33333rem'
            : `calc(2.56rem + ${headerAttr.statusbar}px)`
      }"
    >
      <!-- 左侧tab栏 -->
      <div class="tab-side">
        <van-sidebar
          class="sidebar_title"
          v-model="activeKey"
          @change="onChange"
        >
          <van-sidebar-item
            v-for="(item, index) in categdata"
            :key="index"
            :title="item.name"
          />
        </van-sidebar>
      </div>
      <!-- 右侧商品区 -->
      <div class="goods" ref="category_right">
        <van-empty
          style="height: 100%"
          description="暂无数据"
          v-if="itemList && itemList.length == 0"
        />
        <div v-else v-for="(item, index) in itemList" :key="index">
          <div name="m1" class="category_title">
            <span>{{ item.name }}</span>
          </div>
          <div class="category_group box-flex">
            <div class="box">
              <div
                class="product"
                v-for="(items, index) in itemList[index].itemList"
                :key="index"
                @click="_goods(items)"
              >
                <div class="img">
                  <img class="big" v-lazy="items.imgUrl" alt="" />
                </div>
                <div class="name">{{ items.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getsGoodsCateLevel } from "api";
import Header from "@/components/Header";
import CommonHeader from "@/components/CommonHeader.vue";
export default {
  name: "category",
  components: {
    Header,
    CommonHeader
  },
  data() {
    return {
      headerAttr: LukeappApi.getattribute(),
      activeKey: 0,
      categdata: null,
      itemList: null,
      scroll: 0 // 子页面回来的父页面位置
    };
  },
  computed: {},
  methods: {
    handleTitle() {},
    onChange(index) {
      this.itemList = this.categdata[index].itemList;
      this.$refs.category_right.scrollTop = 0;
    },
    _getsGoodsCateLevel() {
      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      getsGoodsCateLevel().then((res) => {
        toast.clear();
        if (res && res.errorCode === 1) {
          this.categdata = res.data.content;
          this.itemList = this.categdata[0].itemList;
        }
      });
    },
    _goods(data) {
      this.scroll = this.$refs.category_right.scrollTop;
      this.$router.push({ name: "search", query: { cat_id: data.id } });
    },
    handleTitle() {
      this.$router.push({
        path: "/search",
        query: {
          title: "搜索"
        }
      });
    }
  },
  created() {
    this._getsGoodsCateLevel();
  },
  activated() {
    this.$refs.category_right.scrollTop = this.scroll;
  }
};
</script>

<style scoped lang="scss">
.sidebar_title {
  background: #f7f8fa;
}
.box-flex {
  display: -webkit-box;
  display: flex;
}
.header {
  background: #f2f2f6;
  padding: 2px 0;
  // height: 50px;
}
.search-box {
  padding: 4px 10px;
  height: 100%;
  border-radius: 7px;
  color: #333;
  background-color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: left;
  -ms-flex-pack: left;
  justify-content: left;
  font-size: 12px;
  margin-right: 10px;
}
.search-tit {
  margin-left: 5px;
}

.category-home {
  .category_title {
    background: #fff;
    font-size: 14px;
    text-align: center;
    font-weight: 400;
    margin-top: 12px;
    height: 1.28rem;
    line-height: 1.28rem;
    overflow: hidden;
    span {
      position: relative;
    }
    span:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 0.4rem;
      border-top: 1px solid #e0e0e0;
      transform: translate3d(-150%, -50%, 0);
      -webkit-transform: translate3d(-150%, -50%, 0);
    }
    span:after {
      content: "";
      position: absolute;
      top: 50%;
      left: auto;
      right: 0;
      width: 0.4rem;
      border-top: 1px solid #e0e0e0;
      transform: translate3d(150%, -50%, 0);
      -webkit-transform: translate3d(150%, -50%, 0);
    }
  }
  .category_group {
    background: #fff;
    margin: -0.06rem 0 0;
    .box {
      width: 100%;
      overflow: hidden;
    }
    .product {
      float: left;
      width: 33.333333333333336%;
      text-align: center;
      margin-top: 0.2rem;
      margin-bottom: 0.3rem;
      overflow: hidden;
      .img {
        width: 50px;
        height: 50px;
        margin: 0 auto;
        background: #fff;
        overflow: hidden;
        position: relative;
        .big {
          display: block;
          width: 100%;
          height: auto;
        }
      }
    }
    .name {
      margin-top: 14px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.54);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .category-bodys {
    position: absolute;
    top: 45px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    display: flex;
    .tab-side {
      // position: fixed;
      // top: 46px;
      //
      // padding-bottom: 50px;
      width: 80px;
      height: 100%;
      background-color: #eee;
    }
    .goods {
      width: 100%;
      height: 100%;
      background-color: #fff;
      // padding:0 14px 0 94px;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      flex: 1;
    }
  }
  .van-sidebar {
    height: 100%;
    .van-sidebar-item {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
