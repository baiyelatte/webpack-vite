<template>
  <div class="special">
    <div class="specialbox">
      <div
        class="specialitem"
        v-for="item in speicaldata"
        :key="item.id"
        @click="handleLinkClick(item)"
      >
        <div class="grid__icon">
          <img :src="speicaldata.length > 0 && item.imageUrl" alt="" />
        </div>
        <p class="grid__label">{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "special",
  props: {
    speicaldata: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    handleLinkClick({ title, kingType, kingValue: One_id, forwardUrl }) {
      let nowUserInfo = JSON.parse(localStorage.getItem("userinfo")) || [];
      if (kingType === 6) {
        window.location.href = forwardUrl + "?token=" + nowUserInfo.token;
        return;
      }

      const routes = [
        {
          name: "sarea",
          query: { One_id, title }
        },
        {
          name: "oldSearch",
          query: { One_id, title }
        },
        {
          path: `/shopinfo/${One_id}`
        },
        {
          name: "shop"
        },
        null
      ];
      sessionStorage.setItem("reloadSearchPage", 1);
      this.$router.push(routes[kingType - 1]);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";

.special {
  position: relative;
  .specialbox {
    display: flex;
    flex-wrap: wrap;
    .specialitem {
      float: left;
      width: 20%;
      padding: 10px 0;
      margin-top: 10px;
      box-sizing: border-box;
      .grid__icon {
        width: 44px;
        height: 44px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .grid__label {
        padding-top: 8px;
        text-align: center;
        color: rgba(0, 0, 0, 0.9);
        font-size: 13px;
        @include no-wrap();
      }
    }
  }
}
</style>
