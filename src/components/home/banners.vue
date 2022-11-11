<template>
  <div class="banner" v-if="tabId">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      ref="swipe"
    >
      <van-swipe-item
        v-for="(item, index) in banner"
        :key="index"
        @click="handleSwipe(item)"
      >
        <img v-lazy="item.imgUrl" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBunnerImgListV2 } from "api";
export default {
  name: "banners",
  props: ["tabId"],
  data() {
    return {
      banner: []
    };
  },
  components: {},
  computed: {},
  created() {
    this.getsSlideshow();
  },
  mounted() {},
  watch: {
    tabId() {
      this.getsSlideshow();
    }
  },
  methods: {
    handleSwipe(item) {
      if (item.jumpType == 1) {
        this.$router.push({
          path: `/detail/${item.jumpId}?agencyUnionid=${
            this.$route.query.agencyUnionid || null
          }&fromPlatform=${this.$route.query.fromPlatform || null}`
        });
      } else if (item.jumpType == 2) {
        this.$router.push({
          name: "shopinfo",
          params: { shopId: item.jumpId }
        });
      } else if (item.jumpType == 3) {
        let seft = this;
        const userinfo =
          JSON.parse(window.localStorage.getItem("userinfo")) || [];
        // window.location.href = item.hyperlink;
        if (item.hyperlink.indexOf("?") != "-1") {
          console.log(item.hyperlink + "&token=" + userinfo.token);
          window.location.href = item.hyperlink + "&token=" + userinfo.token;
        } else {
          console.log(item.hyperlink + "?token=" + userinfo.token);
          window.location.href = item.hyperlink + "?token=" + userinfo.token;
        }
      } else if (item.jumpType === 4) {
        this.$router.push({
          name: "newExclusive",
          query: { One_id: item.jumpId, title: item.title }
        });
      }
    },
    getsSlideshow() {
      if (!this.tabId) return;
      const userinfo =
        JSON.parse(window.localStorage.getItem("userinfo")) || [];
      // console.log("getsSlideshow", 22222);
      getBunnerImgListV2({
        cityId: 8
        // token: userinfo.token
      }).then((res) => {
        if (res && res.errorCode == 1) {
          this.banner = res.data;
          if (this.$refs.swipe) {
            this.$refs.swipe.resize();
          }
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.banner {
  :deep(.van-swipe) {
    // background: #f6f6f6;
    width: 100%;
    max-height: 125px;
    border-radius: 10px;
    // box-shadow: 2Px 2Px 10Px 0px rgba(120, 120, 120, 0.3);
    img {
      width: 100%;
      object-fit: contain;
    }
  }
}
</style>
