<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <info ref="info"></info>
    <van-cell
      title="收货地址"
      @click="address.showPicker = true"
      is-link
      style="margin-top: 10px"
    />
    <!-- <van-cell title="设置密码" @click="$router.push({name:'setpwd'})" is-link /> -->
    <!-- <van-cell title="关于我们" @click="address.showPicker=true" is-link style="margin-top:10px;"/> -->
    <van-popup
      v-model="address.showPicker"
      position="bottom"
      :style="
        'height:' +
        winheight +
        'px;padding-top:' +
        headerAttr.statusbar +
        'px;box-sizing:border-box'
      "
    >
      <van-nav-bar
        title="选择地址"
        left-arrow
        @click-left="address.showPicker = false"
      />
      <addresss :switchable="false" />
    </van-popup>
    <div style="padding: 20px">
      <van-button
        type="danger"
        block
        size="normal"
        style="margin-top: 20px"
        @click="outlogin()"
        >退出登录</van-button
      >
    </div>
    <router-view></router-view>
  </router-layout>
</template>
<script>
import addresss from "@/components/address/address";
import info from "@/components/user/info";
import { logout } from "api";
import { dropout, localCache } from "@/utils";
export default {
  name: "setting",
  components: {
    addresss,
    info
  },
  props: {
    winwidth: {
      default: document.documentElement.clientWidth
    },
    winheight: {
      default: document.documentElement.clientHeight
    }
  },
  data() {
    return {
      address: {
        showPicker: false
      },
      headerAttr: LukeappApi.getattribute()
    };
  },
  methods: {
    outlogin() {
      this.$confirm({
        message: "是否退出登录"
      })
        .then(() => {
          logout().then((res) => {
            if (res && res.errorCode == 1) {
              dropout();

              const missingWeChatExpiresValue = localCache.getCache(
                "missingWeChatExpires"
              );

              if (missingWeChatExpiresValue < new Date()) {
                localCache.setCache(
                  "missingWeChatExpires",
                  +new Date() + 10000
                );
              }

              this.$router.replace("/");
            }
          });
        })
        .catch(() => {});
    }
  },
  watch: {
    $route(_, { name }) {
      if (name === "changeName") {
        this.$refs?.info._getUserInfo();
      }
    }
  }
};
</script>
