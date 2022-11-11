<template>
  <div class="iptList" @click="closeSearch">
    <ul v-if="list">
      <li
        v-for="item in list"
        :key="item.id"
        class="liOne"
        @click.stop="toHome(item)"
      >
        <span>{{
          item.type === 3 ? item.sup + "," + item.name : item.name
        }}</span>
      </li>
    </ul>
    <van-empty description="暂无数据" v-else />
  </div>
</template>

<script>
import { addressSearch } from "@/api/index";
import { Empty } from "vant";
export default {
  components: {
    [Empty.name]: Empty
  },
  props: {
    word: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      list: []
    };
  },
  watch: {
    word: {
      handler(newVal, oldVal) {
        this.getList(newVal);
      },
      immediate: true
    }
  },
  created() {},
  methods: {
    getList() {
      const userinfo =
        JSON.parse(window.localStorage.getItem("userinfo")) || [];
      addressSearch({
        cityName: this.word
        // userId: userinfo.uid
      }).then((res) => {
        console.log(res.data, "arae");
        this.list = res.data.content;
        // this.$set(this.list,res.data)
      });
    },
    toHome(item) {
      this.$emit("success", item);
    },
    closeSearch() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.iptList {
  background: rgba(0, 0, 0, 0.3);
  height: 100%;
  margin-top: 10px;
  ul {
    background: #fff;
    padding: 10px;
    height: auto;
    > .liOne {
      border-bottom: 1px solid #e6e6e6;
      line-height: 40px;
      > span {
        font-size: 15px;
        color: #161616;
      }
    }
  }
  .van-empty {
    background: #fff;
  }
}
</style>
