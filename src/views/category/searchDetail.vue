<template>
  <div class="search-page">
    <CommonHeader
      :backgroundColor="'#f7f8fa'"
      :titleColor="'black'"
      :leftColor="'black'"
    />
    <div class="top">
      <van-icon class="back left" name="arrow-left" @click="goBack" />
      <van-search
        v-model.trim="value"
        shape="round"
        placeholder="请输入搜索关键词"
        background="#f2f2f2"
        class="right"
      >
      </van-search>
      <div class="last" @click="onSearch">搜索</div>
    </div>
    <div v-if="show == true" class="history">
      <div class="hist-title">
        <div class="zuo">
          <span class="zuo-icon">|</span>
          <span class="word">搜索历史</span>
        </div>
        <div class="you" @click="clear">
          <span class="clr">清除</span>
          <van-icon :size="16" class="clr-icon" name="delete-o" />
        </div>
      </div>
      <div v-if="show == true" class="hist-word">
        <span
          v-for="(item, index) in historyContent"
          :key="index"
          class="written"
          @click="searchWord(item.desc)"
          >{{ item.desc }}</span
        >
      </div>
    </div>
    <div class="hot">
      <div class="hist-title">
        <div class="zuo">
          <span class="zuo-icon">|</span>
          <span class="word">热门搜索</span>
        </div>
      </div>
      <div class="hist-word">
        <span
          v-for="item in hotcontent"
          :key="item.id"
          class="written"
          @click="searchWord(item.desc)"
          >{{ item.desc }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import CommonHeader from "@/components/CommonHeader.vue";
import { hotSearch, searchLog, delSearchLog } from "api";
export default {
  name: "searchDetail",
  components: {
    CommonHeader
  },
  data() {
    return {
      value: "",
      show: "",
      hotcontent: [],
      historyContent: [],
      name: ""
    };
  },
  activated() {
    this._hotSearch();
    this._historySearch();
  },
  // created(){
  //     this._hotSearch();
  //     this._historySearch();
  // },
  methods: {
    goBack() {
      this.$router.push({ path: "/locations" });
    },
    // 搜索
    onSearch() {
      console.log(this.value);
      this.historyContent.push({
        desc: this.value
      });
      if (this.value.length <= 0 && this.name.length <= 0) {
        window.sessionStorage.setItem("searchstatus", 1);
        this.$router.push({ path: "/locations" });
      } else {
        window.sessionStorage.setItem("searchstatus", 1);
        this.$router.push({ path: "/locations?searchname=" + this.value });
      }
      this.value = "";
    },
    // 删除搜索
    clear() {
      this.show = false;
      const userInfo =
        JSON.parse(window.localStorage.getItem("userinfo")) || [];
      let token = userInfo.token;
      if (this.token == "") {
        return;
      }
      delSearchLog({ token })
        .then((res) => {
          console.log(res, "删除");
          if (res.code == 0) {
            this.show = false;
            this.historyContent = [];
          } else {
            Toast.fail("加载失败");
          }
        })
        .catch((error) => {});
    },
    // 热门搜索
    _hotSearch() {
      const userInfo =
        JSON.parse(window.localStorage.getItem("userinfo")) || [];
      let token = userInfo.token;
      if (this.token == "") {
        return;
      }
      hotSearch({ token })
        .then((res) => {
          console.log(res, "111111111");
          if (res.code == 0) {
            this.hotcontent = res.data;
          } else {
            Toast.fail("加载失败");
          }
        })
        .catch((error) => {});
    },
    // 历史搜索
    _historySearch() {
      const userInfo =
        JSON.parse(window.localStorage.getItem("userinfo")) || [];
      let token = userInfo.token;
      console.log(token, "token");
      if (this.token == "") {
        return;
      }
      searchLog({ token })
        .then((res) => {
          console.log(res, "历史");
          if (res.code == 0) {
            this.historyContent = res.data;
            if (res.data.length > 0) {
              this.show = true;
            } else {
              this.show = false;
            }
          } else {
            Toast.fail("加载失败");
          }
        })
        .catch((error) => {});
    },
    // 点击历史或者热门搜索
    searchWord(name) {
      this.name = name;
      // this.$store.commit("changeseachname",name);
      // this.$store.commit("changefenleiid",'');
      window.sessionStorage.setItem("searchstatus", 1);
      this.$router.push({ path: "/locations?searchname=" + name });
    }
  }
};
</script>
<style scoped>
.search-page {
  background-color: #fff;
  min-height: 100vh;
}
.top {
  display: flex;
  line-height: 30px;
  background-color: #f2f2f2;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
}
.left {
  flex: 1;
}
.right {
  flex: 18;
}
.last {
  flex: 2;
  color: red;
  font-size: 14px;
}
.back {
  font-size: 28px;
  margin-left: 5px;
}
.hist-title {
  display: flex;
  justify-content: space-between;
}
.zuo-icon {
  margin-left: 14px;
  margin-right: 14px;
  color: #cf0000;
  font-size: 15px;
}
.word {
  color: #cf0000;
  font-size: 14px;
}
.you {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}
.clr {
  font-size: 14px;
  color: #000;
  margin-right: 5px;
}
.hist-word {
  margin: 20px 10px;
}
.written {
  display: inline-block;
  font-size: 16px;
  color: #000;
  background: #f2f2f2;
  border-radius: 14px;
  padding: 6px 10px;
  margin-right: 10px;
  margin-bottom: 15px;
  word-wrap: break-word;
  word-break: break-all;
  font-family: SourceHanSansCN-Regular;
}
</style>
