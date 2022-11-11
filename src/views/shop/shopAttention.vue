<template>
  <router-layout>
    <div
      class="shopAttention"
      :style="{
        paddingTop:
          headerAttr.header === 1
            ? '1.22667rem'
            : `calc(1.22667rem + ${headerAttr.statusbar}px)`
      }"
    >
      <van-nav-bar
        :title="$route.meta.title"
        left-arrow
        @click-left="$router.back()"
        :style="{
          top: headerAttr.header === 1 ? '0' : headerAttr.statusbar + 'px'
        }"
      />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <div class="content" v-if="data.length">
          <div
            class="item"
            v-for="(item, index) in data"
            :key="index"
            @click="$router.push({ path: `/shopinfo/` + item.shopId })"
          >
            <div class="top">
              <img class="logoImgUrl" :src="item.logoImgUrl" alt="" />
              <div class="text">
                <p class="shopName">{{ item.shopName }}</p>
                <p class="shopExplain">{{ item.shopExplain }}</p>
              </div>
            </div>
            <div class="bottom">
              <img
                v-for="(item1, index1) in item.url
                  .split(',')
                  .filter((url) => !!url)"
                :key="index1"
                :src="item1"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="empty" v-else>
          <img src="@/assets/image/shopAttentionEmpty.png" alt="" />
          <p>暂无关注店铺</p>
        </div>
        <div class="recommend">
          <div class="recommendTop">
            <img
              src="@/assets/image/common/tuijian.png"
              style="vertical-align: middle"
              alt=""
            />
            <p>为您推荐</p>
            <img
              src="@/assets/image/common/tuijian.png"
              style="vertical-align: middle"
              alt=""
            />
          </div>
          <div v-for="(goodsItem, index) in recommendList" :key="index">
            <userCom :goodslist="goodsItem" />
          </div>
        </div>
      </van-list>
    </div>
  </router-layout>
</template>
<script>
import { shopshow, getrecommend } from "api";
import userCom from "@/components/goods/usercom.vue";
export default {
  data() {
    return {
      headerAttr: LukeappApi.getattribute(),
      data: [],
      loading: false,
      finished: false,
      recommendList: [],
      pageNum: 1,
      pageSize: 10
    };
  },
  components: {
    userCom
  },
  created() {
    this.getList();
    this._getrecommend();
  },
  methods: {
    getList() {
      let userinfo = JSON.parse(localStorage.getItem("userinfo"));
      shopshow({ userId: userinfo.unionid }).then((res) => {
        if (res && res.errorCode === 1) {
          this.data = res.data.list;
        }
      });
    },
    _getrecommend() {
      getrecommend({ pageSize: this.pageSize, pageNum: this.pageNum }).then(
        (res) => {
          this.loading = false;
          if (res.errorCode == 1) {
            this.recommendList = this.recommendList.concat(res.data.content);
            if (!res.data.isHasNextPage) {
              this.finished = true;
            }
          }
        }
      );
    },
    onLoad() {
      this.pageNum++;
      this._getrecommend();
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/style/mixin.scss";
.shopAttention {
  background-color: #f2f2f2;
  :deep(.van-nav-bar) {
    background-color: #fff;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 1.22667rem;
  }
  .content {
    .item {
      margin-top: 10px;
      background-color: #ffffff;
      padding: 22px 16px 30px;
      .top {
        display: flex;
        .logoImgUrl {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .text {
          margin-left: 10px;
          .shopName {
            color: #333333;
            font-size: 14px;
            @include no-wrap();
          }
          .shopExplain {
            @include no-wrap-multi(2);
            font-size: 11px;
            margin-top: 5px;
            line-height: 14px;
          }
        }
      }
      .bottom {
        display: flex;
        margin-top: 14px;
        img {
          width: 104px;
          height: 108px;
          border-radius: 8px;
        }

        img + img {
          margin-left: 16px;
        }
      }
    }
  }
  .recommend {
    .recommendTop {
      width: fit-content;
      margin: 20px auto;
      display: flex;
      align-items: center;
      img {
        width: 54px;
        height: 1px;
      }
      p {
        color: #cf0000;
        font-size: 13px;
      }
    }
  }
  .empty {
    img {
      width: 185px;
      height: 136px;
      display: block;
      margin: 20px auto;
    }
    p {
      color: #333333;
      font-size: 15px;
      text-align: center;
    }
  }
}
</style>
