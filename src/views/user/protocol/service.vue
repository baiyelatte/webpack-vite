<template>
  <div style="width: 100vw; min-height: 100vh; background-color: #f0f0f0">
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="service" v-html="content">
      <!-- {{content}} -->
    </div>
  </div>
</template>
<script>
import { getProtocolServe, getProtocolPrivacy } from "api";
export default {
  name: "service",
  data() {
    return {
      content: ""
    };
  },
  created() {
    this._getProtocolPrivacy();
  },
  methods: {
    // /* 获取隐私协议 */
    _getProtocolPrivacy() {
      getProtocolPrivacy().then((res) => {
        console.log(res, "11111");
        this.content = res.data;
      });
    }
  }
};
</script>
<style lang="scss" scope>
.service {
  display: inline-block;
  font-size: 15px;
  padding: 5px;
}
</style>
