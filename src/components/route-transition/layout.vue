<!--
 * @Date: 2022-06-27 10:25:56
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-10-10 09:36:48
 * @FilePath: \mallh5\src\components\route-transition\layout.vue
-->
<template>
  <transition name="slide" appear>
    <div class="route-transition-wrapper">
      <div
        :style="headerPadding"
        v-if="headerAttr.header === 2 && headerAttrFlag"
      ></div>
      <slot name="header"></slot>
      <div class="route-transition-content" :id="cId">
        <slot></slot>
      </div>
      <slot name="footer"></slot>
    </div>
  </transition>
</template>
<script>
export default {
  name: "router-layout",
  props: {
    id: String,
    backgroundColor: {
      type: String,
      default: "#fff"
    },
    headerAttrFlag: {
      type: Boolean,
      default: true
    }
  },
  created() {
    LukeappApi.setHeader("", "b", "", "", "close");
  },
  data() {
    return {
      cId: this.id || this.$route.path.replace(/\//g, "_") || "_null_",
      headerAttr: LukeappApi.getattribute()
    };
  },
  computed: {
    headerPadding() {
      if (this.headerAttr.header === 2) {
        return `padding-top:${
          this.headerAttr.statusbar + 1
        }px;background-color:${this.backgroundColor}`;
      } else {
        return `padding-top:0px`;
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss">
body,
html {
  height: 100%;
  height: 100%;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
.route-transition-wrapper {
  background: $color-background;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 5;

  .route-transition-content {
    width: 100%;
    height: 100%;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    position: relative;
  }
}
</style>
