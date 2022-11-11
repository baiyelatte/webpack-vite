<template>
  <van-nav-bar
    class="common-header"
    v-if="headerAttr.header === 2"
    :border="false"
    :fixed="fixed"
    :placeholder="fixed"
    :style="{ backgroundColor, paddingTop: `${headerAttr.statusbar}px` }"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #left>
      <slot name="left">
        <span class="common-header__left">
          <van-icon name="arrow-left" :color="leftColor" />
          <span
            class="common-header__left-text"
            :style="{ color: leftColor }"
            >{{ leftText }}</span
          >
        </span>
      </slot>
    </template>
    <template #title>
      <span class="common-header__title" :style="{ color: titleColor }">
        {{ title ? title : title1 }}
      </span>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script>
import { NavBar, Icon } from "vant";
import { tabBarConfig } from "@/config";

export default {
  props: {
    backgroundColor: {
      type: String,
      default: "#930200"
    },
    title: {
      type: String,
      default: ""
    },
    titleColor: {
      type: String,
      default: "#fff"
    },
    leftText: {
      type: String,
      default: "返回"
    },
    leftColor: {
      type: String,
      default: "#fff"
    },
    fixed: {
      type: Boolean,
      default: true
    },
    statusBarColor: {
      type: String,
      default: "b"
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  data() {
    return {
      headerAttr: LukeappApi.getattribute(), // eslint-disable-line
      title1: ""
    };
  },
  created() {
    LukeappApi.setHeader("", this.statusBarColor, "", "", "close"); // eslint-disable-line
    this.title1 = this.$route.meta.title;
  },
  methods: {
    onClickLeft() {
      this.$emit("onClickLeft");
      history.back();
      const isClose =
        LukeappApi.IscltApp ||
        tabBarConfig.some(
          ({ path: rootPath }) => rootPath === this.$route.path
        );
      setTimeout(() => {
        if (isClose) LukeappApi.clt_close_browser();
      }, 50);
    },
    onClickRight() {
      this.$emit("onClickRight");
    }
  }
};
</script>

<style lang="scss" scoped>
.common-header {
  box-sizing: border-box;
  .common-header__left {
    display: flex;
    align-items: center;
  }
  :deep(.van-nav-bar) {
    background-color: inherit;
  }
  :deep(.van-nav-bar--fixed) {
    padding-top: inherit;
  }
}
</style>
