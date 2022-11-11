<template>
  <div
    class="citylists"
    :style="`min-height:${winheight}px;font-size:14px;margin-top:${
      headerAttr.header == 2 ? headerAttr.statusbar : 0
    }px`"
  >
    <van-index-bar :index-list="indexList">
      <div v-for="(item, index) in indexList" :key="index">
        <van-index-anchor class="a" :index="item" />
        <div v-for="(itema, indexa) in lists" :key="indexa">
          <van-cell
            @click="citycode(itema)"
            class="ab"
            v-if="itema.initial == item"
            :title="itema.city"
          />
        </div>
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import bus from "@/utils/bus";
import $ from "@/utils/jquery";
import citys from "@/utils/city";
import { IndexBar, IndexAnchor, Toast } from "vant";
export default {
  name: "cityList",
  components: {
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Toast.name]: Toast
  },
  props: {
    winheight: {
      default: document.documentElement.clientHeight
    }
  },
  data() {
    return {
      headerAttr: LukeappApi.getattribute(),
      indexList: [],
      lists: [],
      values: "",
      shows: false,
      cityname: "",
      value: "",
      code: "",
      lat: "",
      lon: "",
      detailslist: []
    };
  },
  created() {
    var self = this;
    $.ajax({
      type: "get",
      url: "https://apis.map.qq.com/ws/location/v1/ip",
      data: {
        key: "45IBZ-MFHWF-OZ3JM-NOH4V-H5S67-GPBUL", //腾讯key
        output: "jsonp"
      },
      dataType: "jsonp",
      success: function (res) {
        var info = res.result.ad_info;
        var locations = res.result.location;
        self.lat = locations;
        self.cityname = info.city;
        self.code = info.adcode;
        console.log(info);
        console.log(self.cityname);
        console.log(self.code);
        console.log(locations);
      }
    });
    this.indexList = citys.searchLetter;
    this.lists = citys.cityObjs;
    console.log(this.indexList);
    console.log(citys);
  },
  watch: {
    values(value) {
      console.log(value);
      if (value.length > 0) {
        this.shows = true;
        this.search();
      } else {
        this.shows = false;
        this.detailslist = [];
      }
    }
  },
  methods: {
    citycode(item) {
      console.log(item);
      bus.$emit("city", item);
      Toast("切换成功");
      this.$router.go(-1);
    },

    search() {
      var self = this;
      $.ajax({
        type: "get",
        url:
          "https://restapi.amap.com/v3/assistant/inputtips?key=3c43d6ad5c91669afbb68f3648973c48&keywords=" +
          self.values +
          "&output=json&city=" +
          self.code +
          "&datatype=all&citylimit=true",
        //    params:{
        //     key: "3c43d6ad5c91669afbb68f3648973c48", //腾讯key
        //     keywords:self.values,
        //     output:'json',
        //     city:self.code,
        //     datatype:'all'
        //   },
        //   dataType: "jsonp",
        success: function (res) {
          self.detailslist = res.tips;
        }
      });
    }
  }
};
</script>
<style scoped>
.citylists {
  position: relative;
  min-height: 100vh;
  width: 100%;
}
.a {
  display: flex;
  justify-content: flex-start;
  background: #f5f5f5;
}
.ab {
  text-align: start;
  border-bottom: 1px solid #f5f5f5;
}
.van-index-anchor--sticky {
  background: #f5f5f5 !important;
  z-index: 1;
  color: #323233;
  font-size: 14px;
  line-height: 32px;
}
</style>
