<template>
  <!-- <router-layout> -->
  <div
    class="award"
    :style="{ backgroundImage: backgroundPic ? `url(${backgroundPic})` : '' }"
  >
    <div class="top" v-if="!isClApp">
      <i
        @click="$router.go(-1)"
        class="van-icon van-icon-arrow-left van-nav-bar__arrow"
      />
      <p class="details" @click="$router.push('/awardDetails')">活动详情</p>
    </div>
    <div class="content">
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="{ active: index == num }"
        :style="{ top: item.top + 'rem', left: item.left + 'rem' }"
      >
        <img
          class="go"
          v-if="item.levelCn == '开始'"
          src="@/assets/image/award/go.png"
          alt=""
        />
        <img
          class="pic1"
          v-if="item.levelCn != '诚聊购' && item.levelCn != '开始'"
          src="@/assets/image/award/bg18.png"
          alt
        />
        <img
          class="pic2"
          v-if="item.levelCn == '诚聊购'"
          src="@/assets/image/award/bg17.png"
          alt
        />
        <p
          v-if="item.levelCn != '诚聊购' && item.levelCn != '开始'"
          class="name"
        >
          {{ item.levelCn }}
        </p>
      </div>
      <div class="start" @click="turn">
        <p class="p1">立即抽奖</p>
        <p v-if="voucherMoney != '0'" class="p2">剩余{{ chance }}次机会</p>
        <p v-else class="p2">免费抽奖</p>
      </div>
    </div>
    <div class="record">
      <!-- <h3>单次消耗{{voucherMoney}}</h3> -->
      <p @click="goluck" style="width: 100%; text-align: right">我的中奖纪录</p>
    </div>
    <!-- <div class="voucherMoney">
        <p>我的抵用金：{{availableVoucherMoney}}</p>
      </div> -->
    <div class="list">
      <h1>中奖名单</h1>
      <div class="main">
        <div
          class="nr"
          ref="nr"
          @transitionend="end"
          :style="{ marginTop: top + 'rem' }"
          v-if="data.length"
        >
          <div v-for="(item, index) in data" :key="index">
            <p class="number">{{ formatPhone(item.phone) }}</p>
            <p class="levelCn">{{ item.levelCn }}</p>
            <p>{{ item.rewardName }}</p>
          </div>
        </div>
        <div v-else class="empty">
          <p>暂无中奖记录</p>
        </div>
      </div>
    </div>

    <van-popup v-model="swit">
      <div v-if="msg != '诚聊购'" class="matter">
        <div class="popups">
          <p class="p1">恭喜您抽中{{ msg }}</p>
          <p class="p2">{{ jian.rewardName }}</p>
          <p class="p3">(可在中奖纪录查看中奖信息)</p>
          <button @click="affirm">确定</button>
          <img src="@/assets/image/award/bg6.png" alt />
        </div>
      </div>
      <div class="popups popups1" v-else>
        <p class="p1">很遗憾</p>
        <p class="p2">未中奖</p>
        <button @click="affirm">确定</button>
        <img src="@/assets/image/award/bg9.png" alt />
      </div>
    </van-popup>
    <div class="shade" v-show="!flag1"></div>
  </div>
  <!-- </router-layout> -->
</template>
<script>
import {
  recordList,
  luckDraw,
  getRewardList,
  getUserAccountMoney,
  activityList,
  userLotteryCount,
} from 'api'
export default {
  data() {
    return {
      isClApp: LukeappApi.IscltApp(),
      top: 0,
      id: 0,
      swit: false,
      title: '恭喜您抽中',
      msg: '',
      list: [],
      data: [],
      num: 0,
      time: 90,
      flag1: true,
      flag: true,
      count: 0,
      award: 2,
      levelNo: 0,
      jian: [],
      availableVoucherMoney: 0,
      voucherMoney: 0,
      chance: 0,
      pageNum: 0,
      likai: true,
      backgroundPic: '',
    }
  },
  created() {
    this.id = parseInt(this.$route.query.id)
    this.voucherMoney = this.$route.query.voucherMoney
    this.getData()
    this.backgroundPic = this.$route.query.backgroundPic
    this._userLotteryCount()
  },
  methods: {
    _userLotteryCount() {
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      userLotteryCount({ activityId: this.id }).then((res) => {
        toast.clear()
        if (res?.errorCode == 1) {
          this.chance = res.data.lotteryCount
        }
      })
    },
    affirm() {
      this.swit = false
    },
    gd() {
      this.top = -24 * (2.13333 / 80)
    },
    end() {
      if (this.data.length > 5) {
        this.data.push(this.data[0])
        this.data.shift()
        if (this.$refs.nr) {
          this.$refs.nr.style.transition = 'none'
          this.top = 0
          setTimeout(() => {
            if (this.$refs.nr) {
              this.$refs.nr.style.transition = 'all 1s linear'
              this.gd()
            }
          }, 500)
        }
      }
    },
    init() {
      for (let i = 0; i < this.list.length; i++) {
        var top = 0
        var left = 0
        if (i < 4) {
          top = 25
          left = i * 70 + 30
        } else if (i >= 4 && i < 6) {
          top = i == 4 ? 90 : 160
          left = 240
        } else if (i >= 6 && i < 8) {
          top = 230
          left = i == 6 ? 240 : 170
        } else if (i >= 8 && i < 10) {
          top = 230
          left = i == 8 ? 100 : 30
        } else {
          left = 30
          top = i == 10 ? 160 : 90
        }
        this.list[i].top = top * (2.13333 / 80)
        this.list[i].left = left * (2.13333 / 80)
      }
    },
    async turn() {
      if (!this.chance) {
        this.$toast('没有抽奖机会了')
        return
      }
      if (this.flag1 && this.chance) {
        this.flag1 = false
        let res = await luckDraw({ id: this.id })
        if (res.errorCode == 1) {
          this.jian = res.data
          this.fun()
          this.chance -= 1
          this.availableVoucherMoney = this.Subtr(
            this.availableVoucherMoney,
            this.voucherMoney
          )
        } else {
          this.flag1 = true
        }
      }
    },
    goluck() {
      this.$router.push({ path: '/luck', query: { activityId: this.id } })
    },
    fun() {
      setTimeout(() => {
        this.count++
        this.num = this.num + 1
        if (this.num == this.list.length) {
          this.num = 0
        }
        if (this.count > 36 && this.list[this.num].id == this.jian.rewardId) {
          this.swit = true
          this.flag1 = true
          this.count = 0
          this.msg = this.jian.levelCn
          if (this.jian.rewardId == 0) {
            this.msg = '诚聊购'
          }
        } else {
          if (this.flag) {
            this.fun()
          }
        }
      }, this.time)
    },
    Subtr(arg1, arg2) {
      var r1, r2, m, n
      try {
        r1 = arg1.toString().split('.')[1].length
      } catch (e) {
        r1 = 0
      }
      try {
        r2 = arg2.toString().split('.')[1].length
      } catch (e) {
        r2 = 0
      }
      m = Math.pow(10, Math.max(r1, r2))
      n = r1 >= r2 ? r1 : r2
      return ((arg1 * m - arg2 * m) / m).toFixed(n)
    },
    getData() {
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      // let p1 = recordList();
      let p2 = getRewardList({ id: this.id })
      let p3 = getUserAccountMoney()
      Promise.all([p2, p3]).then((res) => {
        // this.data = res[0].data;
        this.list = res[0].data.content
        this.availableVoucherMoney = res[1]?.data?.availableVoucherMoney
        this._recordList()
        // this.chance = Math.floor(
        //   this.availableVoucherMoney / this.voucherMoney
        // );
        let num = 11 - this.list.length
        for (let i = 0; i < num; i++) {
          this.list.push({
            id: 0,
            levelCn: '诚聊购',
          })
        }
        function randArr(arr) {
          for (var i = 0; i < arr.length; i++) {
            var iRand = parseInt(arr.length * Math.random())
            var temp = arr[i]
            arr[i] = arr[iRand]
            arr[iRand] = temp
          }
          return arr
        }
        randArr(this.list)
        this.list.unshift({
          levelCn: '开始',
        })
        this.init()
        if (this.data.length > 5) {
          this.gd()
        }
        toast.clear()
      })
    },
    formatPhone(phone) {
      try {
        if (typeof phone == 'number') {
          phone = phone.toString()
        }
        return phone.substr(0, 3) + '****' + phone.substr(7, 11)
      } catch (e) {
        console.log(e)
      }
    },
    _recordList() {
      this.pageNum++
      recordList({ pageNum: this.pageNum, activityId: this.id }).then((res) => {
        if (res?.errorCode == 1) {
          const { content } = res.data
          const list = content ? content : res.data
          this.data = this.pageNum == 1 ? list : this.data.concat(list)
          if (res.data.length && this.likai) {
            setTimeout(() => {
              this._recordList()
            }, 5000)
          }
        }
      })
    },
  },
  beforeDestroy() {
    this.likai = false
  },
}
</script>
<style scoped lang="scss">
.award {
  width: 100vw;
  min-height: 100vh;
  background: url('../../assets/image/award/bg.png') center top;
  background-size: 100%;
  overflow: hidden;
  .shade {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  .top {
    padding: 10px 20px;
    position: relative;
    i {
      color: white;
    }
    p {
      font-size: 20px;
      text-align: center;
    }
    .details {
      width: 74px;
      height: 25px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      font-size: 11px;
      line-height: 25px;
      border-right: none;
      margin: 5px 0 5px 280px;
      background-image: url('../../assets/image/award/tuo.png');
      background-size: 100%;
      color: #ffffff;
    }
  }
  .content {
    height: 320px;
    width: 328px;
    background-image: url('../../assets/image/award/bg2.png');
    background-size: 100% 100%;
    margin: 0 auto;
    margin-top: 75px;
    position: relative;
    .start {
      width: 150px;
      height: 150px;
      color: white;
      border-radius: 50%;
      position: absolute;
      text-align: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      background-image: url('../../assets/image/award/bg4.png');
      background-size: 100% 100%;
      color: #ffc356;
      .p1 {
        margin-top: 40px;
        font-size: 22px;
      }
      .p2 {
        margin-top: 20px;
        font-size: 14px;
      }
    }
    .pic1 {
      width: 35px;
      height: 31px;
    }
    .pic2 {
      width: 85%;
      height: 80%;
    }
    .go {
      width: 85%;
      height: 80%;
    }
  }
  .content {
    .active {
      background-image: url('../../assets/image/award/bg5.png');
      .name {
        color: white;
      }
    }
  }
  .content > div {
    width: 57px;
    height: 60px;
    font-size: 12px;
    text-align: center;
    position: absolute;
    background-color: blanchedalmond;
    border: 1px solid transparent;
    background: url('../../assets/image/award/bg3.png');
    background-size: 100% 100%;
    img {
      width: 22px;
      height: 25px;
      margin-top: 5px;
    }
    .name {
      margin-top: 2px;
      color: #ce4e4e;
      font-size: 10px;
    }
  }
  .record {
    color: #ffffff;
    display: flex;
    padding: 10px 28px;
    justify-content: space-between;
    h3 {
      font-size: 14px;
    }
    p {
      height: 12px;
      font-size: 11px;
      font-family: Adobe Heiti Std;
      font-weight: bold;
      text-decoration: underline;
    }
  }
  .voucherMoney {
    p {
      font-size: 14px;
      color: white;
      padding-left: 28px;
      font-weight: bold;
    }
  }
  .list {
    width: 322px;
    height: 195px;
    background: url('../../assets/image/award/bg16.png');
    background-size: 100% 100%;
    margin: 20px auto;
    color: #ffffff;
    h1 {
      font-size: 19px;
      text-align: center;
      padding: 14px 0;
    }
    .main {
      height: 135px;
      overflow: hidden;
      .nr {
        transition: all 1s linear;
        margin-top: 0;
        div {
          display: flex;
          font-size: 14px;
          margin-top: 10px;
          .number {
            padding: 0 28px;
          }
          .levelCn {
            width: 70px;
          }
        }
      }
      .empty {
        font-size: 16px;
        text-align: center;
        padding-top: 20px;
      }
    }
  }
  .matter {
    width: 287px;
    height: 260px;
    background-color: transparent !important;
  }
  .van-popup {
    background-color: transparent;
  }
  .popups {
    width: 287px;
    height: 200px;
    margin-top: 60px;
    background: url('../../assets/image/award/bg7.png');
    background-size: 100% 100%;
    color: #ffd800;
    text-align: center;
    position: relative;
    .p1 {
      font-size: 22px;
      padding-top: 30px;
    }
    .p2 {
      font-size: 26px;
      padding-top: 20px;
    }
    .p3 {
      color: #b40c0c;
      font-size: 11px;
      margin-top: 50px;
      width: 160px;
      position: absolute;
      left: 50%;
      bottom: 45px;
      transform: translateX(-50%);
    }
    button {
      position: absolute;
      bottom: 10px;
      left: 50%;
      width: 80px;
      height: 30px;
      background: url('../../assets/image/award/bg8.png');
      background-size: 100% 100%;
      transform: translateX(-50%);
      font-size: 17px;
    }
    img {
      position: absolute;
      width: 259px;
      height: 187px;
      top: -60px;
      left: 10px;
    }
  }
  .popups1 img {
    width: 100px;
    height: 60px;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
