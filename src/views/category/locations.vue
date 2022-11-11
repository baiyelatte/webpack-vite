<template>
  <div class="local location-home">
    <CommonHeader
      :backgroundColor="'#f7f8fa'"
      :titleColor="'black'"
      :leftColor="'black'"
    />
    <div
      class="top"
      :style="{
        top: `${headerAttr.header == 2 ? headerAttr.statusbar + 46 : 0}px`
      }"
    >
      <div class="top-search">
        <div class="a" @click="selectdizhi">
          <i class="icons">
            <van-icon name="location" />
          </i>
          <i class="word">{{ namedi }}</i>
        </div>
        <van-search
          v-model="value"
          shape="round"
          placeholder="请输入搜索关键词"
          class="search"
          @click="$router.push('/searchDetail')"
        />
      </div>
      <div class="dianpu">
        <van-dropdown-menu style="width: 100%" class="shop">
          <van-dropdown-item
            v-model="value1"
            :options="option1"
            @closed="allChange"
          />
          <van-dropdown-item
            v-model="value2"
            :options="option2"
            @closed="changejuli"
          />
          <van-dropdown-item
            v-model="value3"
            :options="option3"
            @closed="changesort"
          />
        </van-dropdown-menu>
      </div>
    </div>
    <div
      class="middle"
      ref="localmiddle"
      :style="{
        height: heightComputed,
        top: topComputed
      }"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="vantlist"
      >
        <div
          v-for="(item, index) in shoplist"
          :key="index"
          class="details"
          @click="details(item.id)"
        >
          <div class="left">
            <div v-if="item.logo_pic.length <= 0" class="image touxiangimg">
              <i class="iconfont icondianpumorentouxiang_svg"></i>
            </div>
            <img
              v-if="item.logo_pic.length > 0"
              class="image"
              :src="clmBaseURL + item.logo_pic"
            />
          </div>
          <div class="right">
            <div class="right-word">{{ item.name }}</div>
            <div class="word-two">
              <div style="margin-top: 0">
                <van-rate
                  readonly
                  v-model="item.star"
                  :size="15"
                  allow-half
                  void-icon="star"
                  void-color="#eee"
                  class="xing"
                />
              </div>
            </div>

            <div class="word-there">
              <div class="th-left">{{ item.catename }}</div>
              <div class="th-right">近期销量 {{ item.ordercount }}</div>
            </div>
            <div class="word-fours">
              <div class="juli">
                <i class="iconfont icondingwei"></i>
                <div class="juli-word">{{ item.space }}</div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { getLocationLists } from "api";
import bus from "@/utils/bus";
import CommonHeader from "@/components/CommonHeader.vue";
import { DropdownMenu, DropdownItem, List } from "vant";
import { mapGetters } from "vuex";
import $ from "@/utils/jquery";
export default {
  name: "Locations",
  components: {
    CommonHeader,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List
  },
  data() {
    return {
      headerAttr: LukeappApi.getattribute(),
      clmBaseURL:
        process.env.NODE_ENV === "development"
          ? "http://testfile.expection.cn/"
          : "https://file.expection.cn/", //店铺头像图片域名
      clmPageURL:
        process.env.NODE_ENV === "development"
          ? "https://pageclm.expection.cn/"
          : "https://m.lkkjjt.com/",
      isLoading: false,
      xingxing: 2.5,
      allShop: false,
      value: "",
      value1: 0,
      value2: "1000",
      value3: "a",
      option1: [{ text: "全部店铺", value: 0 }],
      option2: [
        { text: "附近店铺", value: "1000" },
        { text: "500m", value: "0.5" },
        { text: "1km", value: "1" },
        { text: "3km", value: "3" },
        { text: "5km", value: "5" }
        // { text: '10km', value: '10' },
      ],
      option3: [
        { text: "推荐排序", value: "a" },
        { text: "距离优先（直线距离）", value: "b" },
        { text: "低价优先", value: "c" },
        { text: "高价优先", value: "d" }
      ],
      length: 10,
      loading: false,
      finished: false,
      shopData: {},
      shoplist: [],
      images1: [],
      pagenow: 0,
      a: {
        star: 3,
        ordercount: 2
      },
      namedi: "北京市",
      dilongitude: "116.397128", //经度 默认
      dilatitude: "39.916527", //维度 默认
      showaddress: false,
      ditushow: 1,
      juli: "", //距离
      changetable: 1,
      scrollTop: 0,
      pages: 1,
      show: false,
      useradd: "",
      sort: 1,
      screenHeight: 0
      // b:1
    };
  },
  computed: {
    ...mapGetters(["getuserinfo"]),
    heightComputed() {
      return (
        (window.innerHeight -
          ((this.headerAttr.header == 2 ? this.headerAttr.statusbar + 36 : 0) +
            157)) /
          36 +
        "rem"
      );
    },
    topComputed() {
      return (
        ((this.headerAttr.header == 2 ? this.headerAttr.statusbar + 36 : 0) +
          110) /
          36 +
        "rem"
      );
    }
  },
  created() {
    this.loading = true;
    var self = this;
    if (self.$route.query.lng) {
      self.dilongitude = self.$route.query.lng;
      self.dilatitude = self.$route.query.lat;
      self.getCity(self.dilongitude, self.dilatitude);
    } else {
      console.log("获取经纬度");
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          var crd = pos.coords;
          self.dilongitude = crd.longitude;
          self.dilatitude = crd.latitude;
          console.log(self.dilongitude, self.dilatitude, "经纬度");
          self.getCity(self.dilongitude, self.dilatitude);
        },
        function (err) {
          console.warn("ERROR(" + err.code + "): " + err.message);
          self.loading = false;
        }
      );
    }
  },
  methods: {
    getCity(lng, lat) {
      console.log(lng, lat, "lng,lat");
      var self = this;
      $.ajax({
        type: "get",
        url:
          "https://apis.map.qq.com/ws/geocoder/v1/?location=" + lat + "," + lng,
        data: {
          key: "45IBZ-MFHWF-OZ3JM-NOH4V-H5S67-GPBUL", //腾讯key
          output: "jsonp"
        },
        dataType: "jsonp",
        success: function (obj) {
          var info = obj.result.address_component;
          console.log(info);
          if (info.district != "") {
            self.namedi = info.district;
          } else {
            self.namedi = info.city;
          }
          self.loading = false;
        },
        error: function (err) {
          console.log("err == ", err);
          self.loading = false;
        }
      });
    },
    homeLOding() {
      this.loading = true;
      this.option1 = [{ text: "全部店铺", value: 0 }];
      this.value = this.$route.query.searchname;
      const cate_id = this.value1;
      const name = this.$route.query.searchname;
      // const name = window.localStorage.getItem('searchName')
      const pagenow = this.pagenow;
      const point = this.value2;
      const longitude = this.dilongitude;
      const latitude = this.dilatitude;
      const sort = this.sort;
      const userinfo =
        JSON.parse(window.localStorage.getItem("userinfo")) || [];
      getLocationLists(userinfo.token)({
        cate_id,
        name,
        pagenow,
        point,
        longitude,
        latitude,
        sort
      })
        .then((res) => {
          // console.log(userinfo.token);
          console.log(res, "1111");
          if (res.code == 0) {
            if (this.pagenow == 1) {
              this.option1 = [{ text: "全部店铺", value: 0 }];
              this.shoplist = [];
            }
            this.shopData = res.data;
            for (let i = 0; i < res.data.shoplist.length; i++) {
              this.shoplist.push(res.data.shoplist[i]);
            }
            console.log(this.shoplist);
            this.option1 = [{ text: "全部店铺", value: 0 }];
            for (let i = 0; i < res.data.shopcategory.length; i++) {
              this.option1.push({
                text: res.data.shopcategory[i].cate_name,
                value: res.data.shopcategory[i].cate_id
              });
            }
            this.loading = false;
            if (res.data.shoplist.length != 10) {
              this.finished = true;
            }
          } else {
            Toast.fail("加载失败");
            this.loading = false;
            this.finished = true;
          }
        })
        .catch((error) => {});
    },
    onLoad() {
      this.pagenow += 1;
      setTimeout(() => {
        this.homeLOding();
      }, 100);
    },
    selectdizhi() {
      window.sessionStorage.setItem("selectcity", 1);
      this.$router.push({ path: "/cityChoose" });
    },
    //点击切换搜索店铺

    allChange() {
      this.sort = 1;
      console.log(this.value1);
      if (this.value1 == 0) {
        this.changetable = 1;
      } else {
        this.changetable = 2;
      }
      this.loading = true;
      this.finished = false;
      this.pagenow = 1;
      this.shoplist = [];
      this.option1 = [{ text: "全部店铺", value: 0 }];

      // this.$store.commit("changeseachname", "");
      // this.$store.commit("changefenleiid", this.value1);
      this.homeLOding();
    },
    // 切换距离
    changejuli() {
      this.sort = 4;
      if (this.value2 == 1000) {
        this.changetable = 1;
      } else {
        this.changetable = 2;
      }
      this.pagenow = 1;
      this.loading = true;
      this.finished = false;
      this.shoplist = [];
      this.option1 = [{ text: "全部店铺", value: 0 }];
      // this.$store.commit("changeseachname", "");
      this.homeLOding();
    },
    // 切换排序顺序
    changesort() {
      if (this.value3 == "a") {
        this.sort = 1;
      } else if (this.value3 == "b") {
        this.sort = 4;
      } else if (this.value3 == "c") {
        this.sort = 2;
      } else if (this.value3 == "d") {
        this.sort = 3;
      }
      this.loading = true;
      this.finished = false;
      this.pagenow = 1;
      this.shoplist = [];
      this.option1 = [{ text: "全部店铺", value: 0 }];
      // this.$store.commit("changeseachname", "");
      // this.$store.commit("changefenleiid", this.value1);
      this.homeLOding();
    },
    //  跳转到店铺详情页
    details(id) {
      // this.b = 2
      console.log(this.pagenow);
      window.sessionStorage.setItem("page", this.pagenow);
      this.ditushow = 2;
      this.scrollTop = $(".middle").scrollTop();
      window.sessionStorage.setItem("localscrolltop", this.scrollTop);
      console.log(this.scrollTop);
      window.sessionStorage.setItem("detailed", 1);
      window.location.href =
        this.clmPageURL +
        `detailed/detailed?add=2&shop_ip=${id}&token=${this.getuserinfo?.token}`;
    }
  },
  //离开页面的方法(清空列表，重置loading)
  deactivated() {
    this.shoplist = [];
    this.loading = true;
    this.finished = false;
  },
  activated() {
    // 页面展示就重置选择条件重新调用接口获取数据（返回也会走）
    this.value = "";
    this.value1 = 0;
    this.value2 = "1000";
    this.sort = "1";
    this.pagenow = 0;
    this.loading = false;
    this.finished = false;
    // 分割线
    console.log(44444);
    console.log(window.sessionStorage.getItem("localscrolltop"));
    if (window.sessionStorage.getItem("searchstatus") == 1) {
      window.sessionStorage.setItem("searchstatus", 2);
      if (this.$route.query.searchname) {
        if (window.sessionStorage.getItem("localscrolltop") != 0) {
          this.$refs.localmiddle.scrollTop =
            window.sessionStorage.getItem("localscrolltop");
          window.sessionStorage.setItem("localscrolltop", 0);
        }
        this.value = this.$route.query.searchname;
        this.pagenow = 1;
        this.shoplist = [];
        this.option1 = [{ text: "全部店铺", value: 0 }];
        this.loading = false;
        this.finished = false;
        this.sort = 1;
        this.homeLOding();
      } else {
        this.value = "";
        this.pagenow = 1;
        this.shoplist = [];
        this.option1 = [{ text: "全部店铺", value: 0 }];
        this.loading = false;
        this.finished = false;
        this.sort = 1;
        this.homeLOding();
      }
    }
    if (window.sessionStorage.getItem("localscrolltop")) {
      this.$nextTick(() => {
        this.$refs.localmiddle.scrollTop =
          window.sessionStorage.getItem("localscrolltop");
      });
    }

    bus.$on("newaddress", (value) => {
      console.log(value);
      this.namedi = value.name;
      this.dilongitude = value.longitude;
      this.dilatitude = value.latitude;
      this.changetable = 2;
      this.pagenow = 1;
      this.shoplist = [];
      this.value1 = 0;
      this.value2 = "1000";
      this.value3 = "a";
      this.searchname = "";
      this.sort = 1;
      this.option1 = [{ text: "全部店铺", value: 0 }];
      this.loading = false;
      this.finished = false;
      this.homeLOding();
    });
  }
};
</script>
<style scoped>
.location-home {
  min-height: 100vh;
  background-color: #f2f2f2;
  color: #333;
}
.top {
  position: fixed;
  width: 100%;
  background: white;
  background-size: 100%;
  z-index: 1;
  flex-direction: column;
  display: flex;
  padding-top: 10px;
}
.top-search {
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 20px;
}
.icons {
  flex: 1;
  justify-content: center;
  align-items: center;
  color: red;
  margin-left: 10px;
  margin-right: 10px;
  font-size: initial;
}
.word {
  /* flex: 2; */
  display: inline-block;
  font-size: 14px;
  color: #cf0000;
  text-align: center;
  max-width: 50px;
  overflow: hidden; /*内容超出后隐藏*/
  text-overflow: ellipsis; /* 超出内容显示为省略号*/
  white-space: nowrap; /*文本不进行换行*/
  font-style: normal;
  font-weight: bold;
}
.search {
  flex: 7;
  display: inline-block;
  width: 100%;
  height: 30px;
  height: 34px;
  border-radius: 50%;
  margin-bottom: 8px;
}
.dianpu {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  line-height: 34px;
}
.middle {
  overflow-y: scroll;
  width: 100%;
  background-color: #f2f2f2;
  position: absolute;
}
.details {
  display: flex;
  background-color: #ffffff;
  margin-right: 12px;
  margin-left: 12px;
  border-radius: 5px;
  margin-bottom: 6px;
}
.left {
  width: 70px;
  flex: 1;
}
.right {
  margin-left: 15px;
  flex: 9;
}
.touxiangimg {
  text-align: center;
  line-height: 70px;
  background-color: #feede3;
  border-radius: 5px;
}
.image {
  width: 70px;
  height: 70px;
  margin: 14px 18px 14px 14px;
  border-radius: 5px;
}
.right-word {
  margin-top: 15px;
  text-align: left;
  margin-left: 14px;
  width: 240px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
.word-two {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  padding-left: 14px;
}
.word-there {
  height: 16px;
  position: relative;
  display: flex;
  font-size: 10px;
  padding: 0 8px;
  margin-top: 2px;
}
.word-four {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  margin-bottom: 8px;
}
.word-fours {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
}
.juli {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.juli-word {
  font-size: 10px;
  margin-left: 2px;
  color: #666666;
}
.icondingwei {
  font-size: 10px;
}
.th-left {
  flex: 6;
  display: flex;
  justify-content: flex-start;
  margin-left: 7px;
}
.th-right {
  flex: 4;
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
}
</style>
