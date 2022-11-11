<template>
  <div style="width: 100vw; min-height: 100vh; background-color: #f0f0f0">
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div v-html="content" class="protocol" id="protocol">
      <!-- {{content}} -->
    </div>
  </div>
</template>
<script>
import { getProtocolPrivacy, getProtocolServe } from "api";
export default {
  name: "protocol",
  data() {
    return {
      content: ""
    };
  },
  created() {
    this._getProtocolServe();
  },
  methods: {
    // /* 获取用户协议 *
    _getProtocolServe() {
      getProtocolServe().then((res) => {
        console.log(res, "11111");
        this.content = res.data;
      });
    }
  }
};
</script>
<style lang="scss" scope>
.protocol {
  display: inline-block;
  font-size: 15px;
  padding: 5px;
}
</style>
