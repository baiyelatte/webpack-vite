<template>
  <div
    class="citysearch citychoose-home"
    :style="`min-height:${winheight}px;font-size:14px;margin-top:${
      headerAttr.header == 2 ? headerAttr.statusbar : 0
    }px`"
  >
    <div class="address-search">
      <div class="addressdizhi" @click="gocity">{{ cityname }}</div>
      <van-icon name="arrow-down" color="red" style="margin-top: 2px" />
      <van-search
        class="vansearch"
        v-model="values"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancels"
      />
    </div>
    <van-popup
      v-model="shows"
      position="right"
      :style="{ height: '100%', width: '100%' }"
      style="background: '#4a4a4b'"
    >
      <div class="address-search">
        <div class="addressdizhi">{{ cityname }}</div>
        <van-search
          class="vansearch"
          v-model="values"
          show-action
          placeholder="请输入搜索关键词"
          @cancel="onCancel"
        />
      </div>
      <div
        class="namestyle"
        @click="detailsearch(item)"
        v-for="(item, index) in detailslist"
        :key="index"
      >
        {{ item.name }}
      </div>
    </van-popup>
  </div>
</template>
<script>
import bus from "@/utils/bus";
import $ from "@/utils/jquery";
import citys from "@/utils/city";
export default {
  name: "cityChoose",
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
  activated() {
    bus.$off("city");
    bus.$on("city", (value) => {
      console.log(value);
      this.cityname = value.city;
      this.code = value.code;
    });
    console.log(window.sessionStorage.getItem("selectcity"));
    if (window.sessionStorage.getItem("selectcity") == 1) {
      window.sessionStorage.setItem("selectcity", 2);
      this.indexList = [];
      this.lists = [];
      this.values = "";
      this.shows = false;
      this.cityname = "";
      this.value = "";
      this.code = "";
      this.lat = "";
      this.lon = "";
      this.detailslist = [];
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
      return;
    }
  },
  methods: {
    gocity() {
      console.log(888888888);
      this.$router.push({ path: "/cityList" });
    },
    onSearch(val) {
      console.log(val);
    },
    onCancel() {
      this.shows = false;
      this.detailslist = [];
      this.values = "";
      console.log("111111");
    },
    onCancels() {
      this.$router.go(-1);
      this.shows = false;
      this.detailslist = [];
      this.values = "";
      console.log("2222");
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
        success: function (res) {
          self.detailslist = res.tips;
        }
      });
    },
    detailsearch(item) {
      console.log(item);
      console.log(item.location, "111111111");
      var newStr = item.location.toString();
      var longitude = newStr.split(",")[0];
      var latitude = newStr.split(",")[1];
      console.log(longitude);
      console.log(latitude);

      bus.$emit("newaddress", {
        code: item.adcode,
        address: item.address,
        district: item.district,
        name: item.name,
        longitude: longitude,
        latitude: latitude
      });
      this.$router.go(-1);
    }
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

        // this.detailslist = []
      }
      this.detailslist = [];
    }
  }
};
</script>
<style scoped>
.citysearch {
  position: relative;
  min-height: 100vh;
  width: 100%;
  font-size: 24px;
  background-color: #fff;
}
.address-search {
  display: flex;
  align-items: center;
}
.addressdizhi {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  margin-left: 10px;
  color: red;
  flex: 2;
  text-align: center;
}
.vansearch {
  flex: 8;
}
.search-content {
  position: absolute;
  z-index: 9999;
  top: 50px;
  width: 100%;
  background: antiquewhite;
  opacity: 0.5;
}
.namestyle {
  padding: 10px 20px;
  font-size: 14px;
  color: #212121;
  border-bottom: 1px solid #f5f5f5;
}
</style>
