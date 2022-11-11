<template>
  <router-layout :backgroundColor="'#8f2ef1'">
    <div class="activityshop">
      <div class="top">
        <i
          @click="$router.go(-1)"
          class="van-icon van-icon-arrow-left van-nav-bar__arrow"
        />
        <p>活动店铺</p>
      </div>
      <div class="list" ref="list" :style="{ height: h }">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
            <div
              class="item"
              v-for="(item, index) in list"
              :key="index"
              @click="$router.push({ path: `/shopinfo/` + item.id })"
            >
              <img class="pic" :src="item.logoImgUrl" alt="" />
              <div class="text">
                <p class="name">{{ item.name }}</p>
                <p class="attention">
                  <img src="@/assets/image/activity/xin.png" alt="" />
                  <span>{{ item.collectNumber }}人关注</span>
                </p>
              </div>
              <button>查看店铺</button>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </router-layout>
</template>
<script>
import { activityShop } from "api";
export default {
  data() {
    return {
      list: [],
      h: 0,
      page: 0,
      isLoading: false,
      loading: false,
      finished: true
    };
  },
  mounted() {
    this.getHeight();
    window.onresize = () => this.getHeight();
    this._activityShop();
  },
  methods: {
    getHeight() {
      let offsetTop = this.$refs.list.offsetTop;
      let H = window.innerHeight;
      this.h = H - offsetTop + "px";
    },
    _activityShop(a) {
      this.page++;
      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      if (a == 1) {
        this.isLoading = true;
      }
      activityShop({ pageNum: this.page, pageSize: 10 }).then((res) => {
        if (res && res.errorCode == 1) {
          if (this.page == 1) {
            this.list = [];
          }
          for (let i = 0; i < res.data.content.length; i++) {
            this.list.push(res.data.content[i]);
          }
          this.isLoading = false;
          this.loading = false;
          if (!res.data.isHasNextPage) {
            this.finished = true;
          } else {
            this.finished = false;
          }
          toast.clear();
        }
      });
    },
    onRefresh() {
      this.finished = true;
      this.page = 0;
      this._activityShop(1);
    },
    onLoad() {
      this._activityShop();
    }
  }
};
</script>
<style scoped lang="scss">
.activityshop {
  width: 100vw;
  height: 100vh;
  // min-height: 100vh;
  background: url("../../assets/image/activity/activityshop.png") no-repeat;
  background-size: 100%;
  .top {
    color: #fcfbfb;
    position: relative;
    text-align: center;
    i {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    p {
      font-size: 17px;
      padding-top: 50px;
    }
  }
  .list {
    margin-top: 20px;
    overflow: auto;
    .item {
      width: 355px;
      height: 100px;
      background: #fdfdfd;
      border-radius: 10px;
      margin: 5px auto;
      display: flex;
      align-items: center;
      .pic {
        width: 77px;
        height: 82px;
        margin: 0 9px;
      }
      .text {
        height: 82px;
        position: relative;
        p {
          width: 150px;
          margin-right: 10px;
        }
        .name {
          font-size: 16px;
          margin-top: 5px;
          line-height: 20px;
          font-weight: 500;
          color: #333333;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .attention {
          margin-top: 16px;
          font-weight: 400;
          color: #333333;
          font-size: 12px;
          height: 12px;
          position: absolute;
          bottom: 20px;
          img {
            width: 11.5px;
            height: 9.5px;
            margin-right: 5px;
          }
        }
      }
      button {
        width: 75px;
        height: 34px;
        margin-left: 10px;
        background-color: red;
        font-size: 12px;
        color: #fefefe;
        border-radius: 20px;
      }
    }
  }
}
</style>
