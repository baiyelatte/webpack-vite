<template>
  <router-layout :backgroundColor="'rgb(242, 242, 242)'">
    <!-- <van-nav-bar title v-if="!$route.meta.CLAPP" left-arrow @click-left="$router.back()" /> -->
    <van-search
      v-model="keyword"
      @search="onSearch"
      @cancel="onSearch"
      show-action
      shape="round"
      id="search"
      background="#F2F2F2"
      placeholder="请输入店铺名字"
    >
      <template #left>
        <van-icon
          name="arrow-left"
          size="20"
          style="margin-right: 5px"
          @click="$router.back()"
        />
      </template>
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-tabs v-model="active" @click="status" class="van-tabs-fixed">
      <span v-for="(item, index) in classdata" :key="index">
        <van-tab
          v-if="item.name != '活动店铺'"
          :title="item.name"
          :name="item.id"
        ></van-tab>
      </span>
    </van-tabs>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="text"
        @load="onLoad"
        :immediate-check="false"
      >
        <div
          class="nodesdata"
          v-if="
            (categorydata && categorydata.length == 0) || categorydata == null
          "
        >
          <van-empty description="暂无数据" />
        </div>
        <div class="panel__bd">
          <a
            href="javascript:"
            class="media-box"
            v-for="item in categorydata"
            :key="item.id"
          >
            <div class="media-box__hd" @click="opendrouter(item.id)">
              <img class="media-box__thumb" :src="item.logoImgUrl" alt />
            </div>
            <div class="media-box__bd" @click="opendrouter(item.id)">
              <h4 class="media-box__title">{{ item.name }}</h4>
              <p class="media-box__desc">
                已有{{ item.collectNumber ? item.collectNumber : 0 }}人关注
              </p>
            </div>
            <div>
              <van-button
                v-if="item.shopIsAttention == 0"
                round
                color="#ee0a24"
                icon="like"
                size="mini"
                style="width: 60px"
                @click="_gz(item, 1)"
                >关注</van-button
              >
              <van-button
                v-else
                round
                size="mini"
                style="width: 60px"
                @click="_gz(item, 0)"
                >已关注</van-button
              >
            </div>
          </a>
          <div></div>
        </div>
      </van-list>
    </van-pull-refresh>

    <router-view></router-view>
  </router-layout>
</template>
<script>
import {
  getsGoodsCateLevel,
  getqueryShop,
  shopNoAttention,
  shopAttention,
  getCityShop
} from "api";
import { mapGetters } from "vuex";
export default {
  name: "shopindex",
  data() {
    return {
      active: 0,
      classdata: [],
      categoryId: 0,
      categorydata: [],
      pages: 0,
      isLoading: false, //下拉刷新
      loading: false, //触底
      finished: false,
      text: "没有更多了",
      cityId: 0,
      keyword: "",
      gzFlag: true
    };
  },
  created() {
    this._getsGoodsCateLevel();

    this.cityId = this.$route.params.cityId || 0;
  },
  // activated() {
  //   this._getsGoodsCateLevel(true);
  //   this.cityId = this.$route.params.cityId || 0;
  // },
  computed: {
    ...mapGetters(["getuserinfo"])
  },
  methods: {
    onSearch() {
      if (this.searchvalue == "") {
        this.$toast("请输入搜索关键字");
        return;
      }
      this._getqueryShop(1);
    },
    // 关注
    _gz(item, key) {
      if (this.gzFlag) {
        this.gzFlag = false;
        if (item.shopIsAttention == 1) {
          shopNoAttention({
            // userId: this.getuserinfo.unionid,
            shopId: item.id
          }).then((res) => {
            this.gzFlag = true;
            if (res.errorCode === 1) {
              item.shopIsAttention = key;
            }
          });
        } else {
          shopAttention({
            // userId: this.getuserinfo.unionid,
            shopId: item.id
          }).then((res) => {
            this.gzFlag = true;
            if (res.errorCode === 1) {
              item.shopIsAttention = key;
            }
          });
        }
      }
    },
    // 下拉刷新
    onRefresh() {
      this.pages = 1;
      this.finished = false;
      this._getqueryShop(1);
    },

    // 触底
    onLoad() {
      this.pages++;
      this._getqueryShop();
    },
    opendrouter(id) {
      this.$router.push({ path: `/shopinfo/${id}` });
    },
    _getsGoodsCateLevel(init) {
      getsGoodsCateLevel().then((res) => {
        if (res && res.errorCode == 1) {
          this.classdata = res.data.content;
          // this.categoryId = res.data.content[0].id;
          this.pages = 1;
          this.isLoading = false;
          this.loading = false;
          this._getqueryShop(init ? 1 : 0);
          this.classdata.unshift({
            name: "城市店铺",
            id: 0
          });
        }
      });
    },
    _getqueryShop(a) {
      this.loading = true;
      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      if (this.pages != 1) {
        toast.clear();
      }
      let obj = {
        pageNum: this.pages,
        pageSize: "10",
        categoryId: this.categoryId
      };
      parseInt(this.cityId);
      if ((this.cityId || this.cityId == 0) && !this.categoryId) {
        obj.cityId = this.cityId;
      }
      if (this.keyword != "") {
        obj.keyword = this.keyword;
      }
      getqueryShop(obj).then((res) => {
        toast.clear();
        if (res && res.errorCode == 1) {
          // this.categorydata = res.data.content;
          // this.isLoading=false;
          if (a == 1) {
            this.categorydata = [];
          }
          for (var i = 0; i < res.data.content.length; i++) {
            this.categorydata.push(res.data.content[i]);
          }
          if (res.data.content.length < 10) {
            this.finished = true;
          }
          if (!this.categorydata.length) {
            this.text = "";
          }
          this.isLoading = false;
          this.loading = false;
        }
      });
    },

    status(cat_id) {
      this.pages = 1;
      this.finished = false;
      this.text = "没有更多了";
      this.categorydata = [];
      this.categoryId = cat_id;
      this._getqueryShop();
    }
  }
};
</script>
<style lang="scss" scoped>
:deep(.van-pull-refresh) {
  min-height: 100%;
}
.media-box {
  padding: 16px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin: 10px;
  border-radius: 10px;
  .media-box__hd {
    margin-right: 16px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    .media-box__thumb {
      width: 100%;
      max-height: 100%;
      vertical-align: top;
    }
  }
  .media-box__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 0;
    .media-box__title {
      font-weight: 400;
      font-size: 17px;
      line-height: 1.4;
      color: rgba(0, 0, 0, 0.9);
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
      color: rgba(0, 0, 0, 0.3);
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
</style>
