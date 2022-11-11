<template>
  <router-layout>
    <div class="container">
      <div class="rink">
        <div class="backB">
          <img src="../../assets/image/activity/rinkbg.png" alt="" />
          <!-- <img :src="rankImg" alt=""> -->
        </div>
        <div class="header">
          <i
            @click="$router.back()"
            class="van-icon van-icon-arrow-left van-nav-bar__arrow banner"
          />
          <div class="text_activity">
            <img src="../../assets/image/activity/88tit3.png" alt="" />
          </div>
          <div class="activity_rule" @click="$router.push('/rinkRule')">
            <img src="../../assets/image/activity/88rules2.png" alt="" />
          </div>
        </div>
        <div class="gift">
          <div class="activity-img">
            <img src="../../assets/image/logo1.png" alt="" />
          </div>
          <div class="gift-tit">
            <div class="tit tit1">
              88城市奋斗者 动力排名备份
              <img src="../../assets/image/activity/handing.png" alt="" />
            </div>
            <div class="tit">消费满188，最高可获得价值599元礼品</div>
            <div class="tit">PK活动时间：2022.08.06 0点～2022.08.08 24点</div>
          </div>
        </div>
        <div class="activity_content">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div class="wrapper">
              <div class="pk-tit">
                <img src="../../assets/image/activity/pk.png" alt="" />
                <div class="tit">PK排行榜</div>
                <div class="mc">显示排名前五</div>
              </div>
              <div class="line"></div>
              <div class="pk-list" v-if="rankLists && rankLists.length > 0">
                <div
                  class="item"
                  v-for="(item, index) in rankLists"
                  :key="index"
                >
                  <div
                    class="sort sort2"
                    v-if="index != 0 && item.rankIndex == 1"
                  >
                    <img src="../../assets/image/activity/sort1.png" alt="" />
                  </div>
                  <div
                    class="sort sort2"
                    v-if="index != 0 && item.rankIndex == 2"
                  >
                    <img src="../../assets/image/activity/sort2.png" alt="" />
                  </div>
                  <div
                    class="sort sort2"
                    v-if="index != 0 && item.rankIndex == 3"
                  >
                    <img src="../../assets/image/activity/sort3.png" alt="" />
                  </div>
                  <div
                    class="sort sort2"
                    v-if="index != 0 && item.rankIndex == 4"
                  >
                    <img src="../../assets/image/activity/sort4.png" alt="" />
                  </div>
                  <div
                    class="sort sort2"
                    v-if="index != 0 && item.rankIndex == 5"
                  >
                    <img src="../../assets/image/activity/sort5.png" alt="" />
                  </div>
                  <div class="sort" v-if="index == 0 && !!item.rankIndex">
                    {{ item.rankIndex }}
                  </div>
                  <div class="notList" v-if="index == 0 && !item.rankIndex">
                    未上榜
                  </div>
                  <div class="avatar">
                    <!-- <img src="../../assets/image/lian.png" alt="" /> -->
                    <img :src="item.userHead" alt="" />
                  </div>
                  <div class="tel">{{ item.userPhone }}</div>
                  <div class="sf">
                    <img
                      v-if="index == 0"
                      src="../../assets/image/activity/br.png"
                      alt=""
                    />
                    <img
                      v-if="index != 0"
                      src="../../assets/image/activity/br.png"
                      style="opacity: 0"
                      alt=""
                    />
                  </div>
                  <div class="dlz">
                    <p v-if="item.powerValue">
                      {{ (item.powerValue / 100).toFixed(2) }}
                    </p>
                    <p v-if="item.powerValue">动力值</p>
                  </div>
                </div>

                <!-- <div class="item">
                  <div class="sort sort2">
                    <img src="../../assets/image/activity/sort1.png" alt="">
                  </div>
                  <div class="avatar">
                    <img src="../../assets/image/lian.png" alt="" />
                  </div>
                  <div class="tel">151****254</div>
                  <div class="sf">
                    <img src="../../assets/image/activity/br.png" style="opacity:0" alt="" />
                  </div>
                  <div class="dlz">
                    <p style="color:#333;">523.36</p>
                    <p>动力值</p>
                  </div>
                </div> -->
              </div>
            </div>
          </van-pull-refresh>
          <div class="remark">统计数据稍有延迟，如有疑问请刷新</div>
        </div>
      </div>
    </div>
  </router-layout>
</template>
<script>
import { rankList } from "api";
export default {
  name: "cityRink",
  data() {
    return {
      headerAttr: LukeappApi.getattribute(),
      refreshing: false,
      pageNum: 1,
      pageSize: 10,
      rankLists: [],
      rankImg: ""
    };
  },
  created() {
    this.getRankList();
  },
  methods: {
    onRefresh() {
      this.refreshing = false;
    },
    getRankList() {
      rankList({
        activityId: this.$route.query.activityId
      }).then((res) => {
        if (res && res.errorCode == 1) {
          var rankList = res.data.rankList;
          if (rankList && rankList.length > 5) {
            this.rankLists = rankList.slice(0, 6);
          } else {
            this.rankLists = rankList;
          }
          this.rankImg = res.data.activityConfig.rankImg;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  .backB img {
    width: 100%;
    height: 218px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rink {
    // background-image: url("../../assets/image/activity/rinkbg.png");
    // background-size: cover;
    // padding-top: 20px;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      padding-top: 20px;
      .banner {
        color: #ffffff;
        margin-left: 10px;
        font-size: 19px;
        line-height: 19px;
      }
      .text_activity img {
        width: 126px;
        height: 27px;
      }
      .activity_rule img {
        width: 60px;
        height: 20px;
      }
    }
    .gift {
      display: flex;
      margin-left: 8px;
      margin-top: 53px;
      padding-bottom: 37px;
      position: relative;
      .activity-img img {
        width: 96px;
        height: 96px;
        padding: 3px;
        margin-right: 5px;
      }
      .gift-tit {
        color: #fff;
        .tit1 {
          display: flex;
          align-items: center;
          img {
            width: 50px;
            height: 22px;
            margin-left: 5px;
          }
        }
        .tit {
          &:nth-child(1) {
            font-size: 15px;
            font-weight: 550;
            line-height: 17px;
          }
          &:nth-child(2) {
            font-size: 13px;
            margin: 12px 0px;
          }
          &:nth-child(3) {
            font-size: 10px;
          }
        }
      }
    }
    .activity_content {
      padding: 20px 0px;
      position: absolute;
      background: #fff;
      width: 100%;
      margin-top: -35px;
      border-top-right-radius: 15px;
      border-top-left-radius: 15px;
      .wrapper {
        min-height: calc(100vh - 248px);
        .pk-tit {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 48px;
            height: 50px;
          }
          .tit {
            font-size: 24px;
            font-weight: 550;
            color: #000;
            margin-left: 15px;
            margin-right: 85px;
          }
          .mc {
            font-size: 13px;
            color: #b39162;
            line-height: 18px;
          }
        }
        .line {
          width: 100%;
          height: 4px;
          background: #f4f4f4;
          margin-top: 16px;
        }
        .pk-list {
          .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #ededed;
            padding-bottom: 10px;
            margin: 0px 27px;
            padding-top: 10px;

            .notList {
              color: #fe6b4d;
              line-height: 32px;
              font-weight: 550;
              text-align: center;
              width: 40px;
              flex-shrink: 0;
              font-size: 16px;
              width: auto;
            }
            .sort {
              color: #fe6b4d;
              font-size: 24px;
              line-height: 32px;
              font-weight: 550;
              text-align: center;
              width: 40px;
              flex-shrink: 0;
            }
            .sort2 img {
              width: 36px;
              height: 40px;
            }
            .avatar img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              // border: 2.5px solid #fe6b4d;
              margin: 0px 15px;
            }
            .tel {
              color: #333;
              font-size: 16px;
              line-height: 22px;
              font-weight: bold;
            }
            .sf img {
              width: 40px;
              height: 21px;
              margin-left: 5px;
            }
            .dlz {
              width: 130px;
              text-align: center;
              flex-shrink: 0;
              p {
                &:nth-child(1) {
                  font-size: 16px;
                  color: #fe6b4d;
                  font-weight: bolder;
                }
                &:nth-child(2) {
                  font-size: 13px;
                  color: #999;
                }
              }
            }
          }
        }
      }
    }
    .remark {
      color: #b39162;
      font-size: 14px;
      line-height: 18px;
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
