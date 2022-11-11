<template>
  <router-layout :backgroundColor="'#b40c0c'">
    <div class="activity">
      <div @click="backLogin" class="header-btn2 goodsback">
        <i class="van-icon van-icon-arrow-left van-nav-bar__arrow banner" />
        <span class="text_activity">我的中奖记录</span>
      </div>
      <van-pull-refresh
        v-model="refreshLoading"
        :head-height="80"
        @refresh="onRefresh"
      >
        <van-list
          v-if="list.length"
          v-model="listLoading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <div class="luck_top" v-for="(item, index) in list" :key="index">
            <div>
              <div class="luck_name">{{ item.rewardName }}</div>
              <div class="luck_cn">{{ item.levelCn }}</div>
            </div>
            <div>
              <p class="checkedFlag">
                {{ item.checkedFlag ? '已发放' : '待发放' }}
              </p>
              <div class="luck_time">{{ item.rewardTime }}</div>
            </div>
          </div>
        </van-list>
        <div v-else class="empty">
          <p>暂无抽奖记录</p>
        </div>
      </van-pull-refresh>
    </div>
  </router-layout>
</template>
<script>
import { userluck, getactivityZone } from 'api'
// import { mapGetters, mapActions } from "vuex";
import Vue from 'vue'
export default {
  name: 'luck',
  data() {
    return {
      list: [],
      page: 0,
      refreshLoading: false,
      finished: false,
      listLoading: false,
    }
  },
  mounted() {
    this.userList()
  },
  methods: {
    userList() {
      this.listLoading = true
      this.page++
      if (this.page == 1) {
        this.list = []
      }
      userluck({
        pageNum: this.page,
        pageSize: 20,
        activityId: this.$route.query.activityId,
      }).then((res) => {
        if (res.errorCode == 1) {
          const { content } = res.data
          const list = this.page == 1 ? content : this.list.concat(content)
          this.list = list
          this.listLoading = false
          this.refreshLoading = false
          if (res.data.length < 20) {
            this.finished = true
          }
        }
      })
    },
    backLogin() {
      this.$router.go(-1)
    },
    onRefresh() {
      this.page = 0
      this.finished = false
      this.userList()
    },
    onLoad() {
      this.userList()
    },
  },
}
</script>
<style lang="scss" scoped>
.empty {
  padding-top: 30%;
  text-align: center;
  font-size: 16px;
}
.activity {
  min-height: 100vh;
  background: #fff;
}
:deep(.van-pull-refresh) {
  height: calc(100vh - 1.2rem);
  overflow: auto;
}
.luck_cn {
  font-size: 14px;
  margin-top: 5px;
}
.luck_top {
  display: flex;
  justify-content: space-between;
  background-color: #ffff;
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  align-items: center;
  padding: 20px;
  .luck_name {
    color: #b40c0c;
    font-size: 14px;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // padding-bottom: 3px;
  }
  .luck_time {
    color: #a3a3a3;
    font-size: 12px;
    // margin-top: 8px;
    margin-top: 5px;
  }
  .checkedFlag {
    font-size: 15px;
    text-align: right;
  }
}
.route-transition-wrapper {
  background-color: #ececec;
}
.activity {
  .banner {
    color: #ffffff;
    margin-left: 10px;
    line-height: 45px;
  }
}
.activity_middle {
  margin: 140px 1.94667rem 40px 2.94667rem;
}

.text_activity {
  font-size: 19px;
  font-family: Adobe Heiti Std;
  font-weight: bold;
  color: #fff;
  margin-left: 100px;
}

.goodsback {
  background-color: #b40c0c;
  line-height: 45px;
  width: 100%;
  height: 45px;
  display: flex;
}
.van-card__thumb img {
  border-radius: 10px 0 0 10px;
}
</style>
