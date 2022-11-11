<!--
 * @Date: 2022-06-27 10:25:56
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-07 11:02:18
 * @FilePath: \mallh5\src\views\securityCenter\center.vue
-->
<template>
  <router-layout>
    <div class="center">
      <van-nav-bar
        :title="$route.meta.title"
        left-arrow
        @click-left="$router.back()"
      />
      <van-cell
        title="设置/修改登录密码"
        @click="$router.push('/user/setting/setpwd')"
        is-link
      />
      <van-cell
        title="注销账户"
        @click="$router.push('/cancellation')"
        is-link
      />
      <van-cell title="建议与反馈" @click="$router.push('/aboutUs')" is-link />
      <router-view></router-view>
    </div>
  </router-layout>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style scoped lang="scss"></style>
