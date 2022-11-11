<template>
  <div
    class="addressSelect"
    ref="arrdss"
    :style="!searchValue.trim() || 'overflow:hidden'"
  >
    <div class="addr-top">
      <div class="info">
        <div class="srech">
          <img src="@/assets/image/home/sesch.png" alt="" />
        </div>
        <div class="right">
          <van-field
            v-model="searchValue"
            autofocus
            style="background-color: #f4f4f4"
            placeholder="输入城市名或拼音查询"
          />
        </div>
      </div>
      <div class="del" @click="searchOrCancleHandle">
        <span v-if="!searchValue.trim()">取消</span>
        <van-icon name="clear" v-else />
      </div>
      <div class="nowAddr">
        <!-- <div class="top">
          <p>
            当前:<span>{{ position.province || "北京" }}</span
            ><span v-if="position.city">,{{ position.city }}</span>
          </p>
          <p @click="openTopList">
            切换区县
            <van-icon :name="topListShow ? 'arrow-up' : 'arrow-down'" />
          </p>
        </div> -->
        <div class="top-list" v-if="topListShow">
          <ul>
            <li
              @click="choiceAdd(item)"
              v-for="item in countryList"
              :key="item.id"
              :class="newSelectId == item.id && 'active'"
            >
              {{ item.type === 2 ? "全城" : item.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="ageAddr" v-if="nowList.length > 0">
        <p>定位/最近访问</p>
        <ul>
          <li
            @click="choiceAdd(item)"
            v-for="(item, index) in nowList"
            :key="item.id"
            :class="newSelectId == item.id && 'active'"
          >
            <img
              src="@/assets/image/home/address1.png"
              alt=""
              v-if="!index && showLocation"
            />
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <div class="hot-city">
        <p>国内热门城市</p>
        <ul>
          <li
            @click="choiceAdd(item)"
            v-for="item in hotCity"
            :key="item.id"
            :class="newSelectId == item.id && 'active'"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="solid"></div> -->
    <!-- <div class="addr-bottom">
      <van-index-bar
        :index-list="indexList"
        highlight-color="#3C5890 "
        @select="clickBar"
        :class="isOriginHei || 'opacty'"
      >
        <div v-for="item in indexList" :key="item">
          <van-index-anchor :index="item" v-show="item !== '顶部'" />
          <van-cell
            :title="items.name"
            v-for="items in addressList[item]"
            :key="items.id"
            @click.stop="choiceAdd(items)"
          ></van-cell>
        </div>
      </van-index-bar>
    </div> -->
    <iptList
      :word="searchValue"
      v-if="searchFlag"
      @close="close"
      @success="changeCity"
    />
  </div>
</template>

<script>
import { IndexBar, IndexAnchor, Cell, List, Field } from "vant";
import address from "@/assets/js/address.json";
import makePy from "@/utils/makePy.js";
import iptList from "./iptList.vue";
import { mapMutations, mapState } from "vuex";
import { cityProper, hotCity, recentSearch } from "api";
import { isIOS } from "@/utils/dom";

export default {
  name: "addressSelect",
  components: {
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Cell.name]: Cell,
    [List.name]: List,
    iptList,
    [Field.name]: Field
  },
  data() {
    return {
      showLocation: false, //是否有定位城市
      searchValue: "",
      newSelectId: "",
      topListShow: false,
      searchFlag: false,
      nowList: [],
      countryList: [],
      isOriginHei: true, // 显示或隐藏底部信息
      originHeight: 0, // 原始高度
      screenHeight: 0, // 实际高度
      // 热门城市
      hotCity: [],
      indexList: [
        "顶部",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      addressList: []
    };
  },
  created() {
    this.listSort(address);
    // this.getCityProper();
    this.getHot();
    this.location();
    this.visit();
  },
  computed: {
    position() {
      return this.$store.getters.position;
    }
  },
  mounted() {
    // 首次进入的原始高度
    this.originalHeight = document.documentElement.clientHeight;
    // 监听屏幕变化并获取到屏幕原始高度
    window.addEventListener("resize", this.watchResize);
  },
  beforeDestroy() {
    // 删除对resize的监听变化
    window.removeEventListener("resize", this.watchResize);
  },
  watch: {
    searchValue(val) {
      if (val) {
        this.searchFlag = true;
      } else {
        this.searchFlag = false;
      }
    },
    screenHeight(newHeight) {
      // 监听屏幕高度变化
      if (isIOS()) {
        this.isOriginHei = true;
      } else {
        this.isOriginHei = this.originalHeight <= newHeight;
      }
    }
    // position: {
    //   handler (newVal, oldVal) {
    //     if ((newVal.position || !localStorage.getItem('searchList')) && newVal.adcode && (!oldVal || newVal.adcode !== oldVal.adcode)) {
    //       this.nowList = JSON.parse(localStorage.getItem('searchList')) || [];
    //       if (!this.nowList.some(item => item.adcode === newVal.adcode)) {
    //         this.nowList.splice(0, 0, {
    //           ...newVal,
    //           name: newVal.city || newVal.province
    //         });
    //       }
    //       localStorage.setItem('searchList', JSON.stringify(this.nowList));
    //     }
    //   },
    //   immediate: true
    // }
  },
  /* eslint-disable */
  methods: {
    // 手机定位
    location() {
      const newVal = JSON.parse(localStorage.getItem("mph5-pos2"));
      // localStorage.removeItem("mph5-pos");
      this.nowList = JSON.parse(localStorage.getItem("searchList")) || [];
      this.showLocation = false;
      if (!newVal) return;
      this.nowList.forEach((items, index) => {
        if (items.adcode == newVal.adcode) {
          this.nowList.splice(index, 1);
        }
      });
      this.nowList.splice(0, 0, {
        ...newVal,
        name: newVal.city || newVal.province
      });
      this.showLocation = true;
      console.log(newVal, "===mph5-pos2===");
    },
    watchResize() {
      // 实时变化的窗口高度
      this.screenHeight = document.documentElement.clientHeight;
    },
    getHot() {
      hotCity().then((res) => {
        this.hotCity = res.data.content;
      });
    },
    getCityProper() {
      cityProper({
        id: this.position.id,
        pid: this.position.pid,
        type: this.position.type,
        adcode: this.position.adcode
      }).then((res) => {
        this.countryList = res.data;
      });
    },
    searchOrCancleHandle() {
      if (this.searchValue) {
        this.searchValue = "";
        return;
      }
      this.$router.back();
    },
    // 选择当前地址信息
    choiceAdd(item) {
      this.newSelectId = item.id;
      if (item.type === 2 || item.type === "2") {
        this.SET_POSITION({
          province: item.name,
          flag: new Date().getDate(),
          adcode: item.areaCode || item.adcode,
          id: item.id,
          pid: item.pid,
          type: item.type,
          code: item.code
        });
      } else if (item.type === 6) {
        this.SET_POSITION({
          province: item.province,
          city: item.city,
          flag: new Date().getDate(),
          adcode: item.areaCode || item.adcode,
          type: item.type
        });
      } else {
        this.SET_POSITION({
          province: item.sup || this.countryList[0].name,
          city: item.name,
          flag: new Date().getDate(),
          adcode: item.areaCode || item.adcode,
          id: item.id,
          pid: item.pid,
          type: item.type,
          code: item.code
        });
      }
      this.$router.back();
    },

    visit() {
      // 查询最近访问
      // let userinfo =
      //   JSON.parse(window.localStorage.getItem("userinfo")) || null;
      recentSearch({
        // userId: userinfo.uid
      }).then((res) => {
        if (res.data) {
          this.nowList = [...this.nowList, ...res.data.content];
        }
      });
    },
    // 关闭搜索弹窗
    close(item) {
      this.searchFlag = false;
    },
    // 搜索选择城市完成
    changeCity(item) {
      this.close();
      this.choiceAdd(item);
    },
    // 显示隐藏top-list
    openTopList() {
      this.topListShow = !this.topListShow;
    },
    // 点击顶部
    clickBar(event) {
      if (event === "顶部") {
        this.$refs.arrdss.scrollIntoView();
      }
    },
    // 判断索引和首字母对应
    listSort(list) {
      list.forEach((item) => {
        let firstWord = "";
        if (item.name) {
          if (
            ["长沙", "漯河", "长春", "朝阳", "长治", "乐山", "重庆"].includes(
              item.name
            )
          ) {
            firstWord = makePy(item.name[0])[1];
          } else {
            firstWord = makePy(item.name[0])[0];
          }
          firstWord = /[a-zA-Z]/.test(firstWord)
            ? firstWord.toUpperCase()
            : "#";
          !this.addressList[firstWord] && (this.addressList[firstWord] = []);
          this.addressList[firstWord].push(item);
        }
      });
    },
    ...mapMutations("home", ["SET_POSITION"])
  }
};
</script>

<style lang="scss" scoped>
:deep(.van-tabs__line) {
  position: absolute;
  bottom: 20px;
  left: 0;
  z-index: 1;
  width: 20px;
  height: 0.03 rem;
  background-color: #ff6711;
  border-radius: 0.03 rem;
}
:deep(.van-index-anchor--sticky) {
  color: #323233 !important;
}
:deep(.van-index-bar__index) {
  font-size: 12px;
  padding: 1px 8px 3px 16px;
}
:deep(.van-index-bar__sidebar) {
  top: 55%;
  right: -5px;
  color: #3c5890;
}

:deep(.opacty) {
  .van-index-bar__sidebar {
    opacity: 0;
  }
}

.addressSelect {
  background: #fff;
  min-height: 100%;
  .addr-top {
    // background: #fff;
    padding: 15px 12px 40px 12px;
    ul {
      display: flex;
      flex-wrap: wrap;
      margin-top: 14px;
      li {
        // @include x-line(1);
        padding: 0 2px;
        box-sizing: border-box;
        width: 77px;
        height: 32px;
        background: rgba(243, 243, 243, 0);
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        margin: 0 4px 4px 0;
        &.active {
          background: rgba(245, 245, 245, 0.85);
          border: 1px solid #dcdcdc;
          border-radius: 5px;
        }
      }
    }
    .info {
      width: 82%;
      height: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0 0 0;
      border: 1px solid #dcdcdc;
      border-radius: 10px;
      padding: 0 11px;
      position: relative;
      z-index: 2;
      background: #f4f4f4;
      .srech {
        padding-right: 10px;
        img {
          width: 18px;
          height: auto;
        }
      }
      .right {
        flex: 1;
        .van-field {
          padding: 2px;
        }
      }
    }
    .del {
      width: 10%;
      position: absolute;
      top: 40px;
      right: 10px;
      font-size: 15px;
      text-align: center;
      color: #666666;
      .iconfont {
        font-size: 18px;
      }
    }
    .nowAddr {
      .top {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        margin-top: 18px;
        > p {
          font-size: 12px;
          color: #666666;
          text-align: center;
          transition: all 0.3s;
          &:nth-child(1) {
            span {
              color: #313131;
              font-weight: 600;
            }
          }
          &:nth-child(2) {
            .iconfont {
              font-size: 16px;
              margin-left: 5px;
              color: #666;
              transform: rotate(180deg);
            }
          }
        }
      }
    }
    .ageAddr,
    .hot-city {
      margin-top: 22px;
    }
    .ageAddr {
      > p {
        font-size: 12px;
        color: #666666;
      }
      > ul {
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 2px;
          box-sizing: border-box;
          &:first-child {
            color: #cf0000;
            border-color: #cf0000;
            font-weight: 550;
          }
          img {
            width: 12px;
            margin-right: 3px;
          }
          //   span {
          //     @include x-line(1);
          //   }
        }
      }
    }
    .hot-city {
      > p {
        font-size: 12px;
        color: #666666;
      }
    }
  }
  .solid {
    width: 100%;
    height: 9px;
    background: #f5f5f5;
  }
  .addr-bottom {
    // padding: 0 12px;
    .van-cell {
      // padding: 14px 0;
    }
  }
}
.iptList {
  position: fixed;
  top: 55px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 100;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
