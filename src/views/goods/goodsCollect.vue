<template>
  <router-layout>
    <div
      class="goodsCollect"
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
      <div class="content">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
          <div class="goodsCollectContent" v-if="goodsCollectList.length">
            <div
              class="goodsCollectItem"
              v-for="(item, index) in goodsCollectList"
              :key="index"
              @click="getDetails(item.goodsId)"
            >
              <img :src="item.logoImgUrl" alt="" />
              <div class="textBox">
                <p class="title">{{ item.goodsName }}</p>
                <p class="collect">{{ item.collect }}+人收藏</p>
                <p class="price">￥{{ item.showPrice }}</p>
              </div>
            </div>
          </div>
          <div v-else class="collectNull">
            <img src="@/assets/image/collectNull.png" alt="" />
            <p>暂无收藏商品</p>
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
    </div>
  </router-layout>
</template>
<script>
import { getGoodsCollect, getrecommend } from "api";
import userCom from "@/components/goods/usercom.vue";
export default {
  data() {
    return {
      goodsCollectList: [],
      recommendList: [],
      pageSize: 10,
      pageNum: 1,
      loading: false,
      finished: false,
      headerAttr: LukeappApi.getattribute()
    };
  },
  created() {
    this._getGoodsCollect();
    this._getrecommend();
  },
  components: {
    userCom
  },
  methods: {
    _getGoodsCollect() {
      let userinfo = JSON.parse(localStorage.getItem("userinfo"));
      getGoodsCollect({ unionid: userinfo.unionid }).then((res) => {
        if (res.errorCode == 1) {
          this.goodsCollectList = res.data.list;
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
      this.loading = true;
      this._getrecommend();
    },
    getDetails(id) {
      this.$router.push({
        path: `/detail/${id}?agencyUnionid=${
          this.$route.query.agencyUnionid || null
        }&fromPlatform=${this.$route.query.fromPlatform || null}`
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/style/mixin.scss";
.goodsCollect {
  :deep(.van-nav-bar) {
    background-color: #fff;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 1.22667rem;
  }
  .goodsCollectTop {
    color: #323233;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.22667rem;
    background-color: #fff;
    font-size: 18px;
    i {
      position: absolute;
      top: 0px;
      left: 10px;
      line-height: 1.22667rem;
    }
    p {
      text-align: center;
      line-height: 1.22667rem;
    }
  }
  .content {
    .collectNull {
      text-align: center;
      img {
        width: 186px;
        height: 138px;
      }
      p {
        font-size: 16px;
        text-align: center;
        margin: 5px 0;
      }
    }
    .goodsCollectContent {
      .goodsCollectItem {
        background-color: #fff;
        display: flex;
        align-items: center;
        margin: 10px;
        .textBox {
          margin-left: 10px;
          height: fit-content;
          .title {
            color: #333333;
            font-size: 13px;
            @include no-wrap-multi(2);
          }
          .collect {
            color: #999999;
            font-size: 12px;
            margin-top: 10px;
          }
          .price {
            font-size: 16px;
            color: black;
            margin-top: 10px;
          }
        }
        img {
          width: 100px;
          height: 100px;
          border-bottom-left-radius: 8px;
          border-top-left-radius: 8px;
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
  }
}
</style>
