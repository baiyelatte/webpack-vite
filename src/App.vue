<!--
 * @Date: 2022-06-27 10:25:56
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-03 17:36:15
 * @LastEditTime: 2022-11-02 09:34:32
 * @FilePath: \mallh5\src\App.vue
-->
<template>
  <div class="main" v-if="isShow">
    <keep-alive>
      <router-view
        v-if="$route.meta.keepAlive"
        :key="$route.fullPath"
      ></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Tabbar v-if="$route.meta.tabbar"></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'
import { getCityShopV2 } from '@/api'
import vue from '@/main'
export default {
  name: 'Main',
  components: {
    Tabbar,
  },
  data() {
    return {
      flag: false,
      isShow: false,
    }
  },
  //
  methods: {
    buriedpoint() {
      if (sessionStorage.getItem('buriedpoint')) {
        console.log('页面被刷新')
        sessionStorage.setItem('locationHome', 0)
      } else {
        console.log('首次被加载')
        sessionStorage.setItem('buriedpoint', true)
      }
    },
  },
  mounted() {
    // 统计
    this.buriedpoint()
    LukeappApi.debug = true //开启禄可集团app 交互 调试模式

    const { clt_set_referer } = LukeappApi

    clt_set_referer(window.location.href)
  },
  watch: {
    // $route(to, from) {
    //   if (!this.flag) {
    //     this.$store.commit("setTurnRoute", {
    //       path: from.path,
    //       query: {...from.query}
    //     });
    //     this.flag = true;
    //   }
    // },
  },
  async created() {
    await getCityShopV2({ pageSize: 10, pageNum: 1, keyword: '' }).then(
      (res) => {
        if (res && res.errorCode === 1) {
          vue.__proto__.defaultCity = res.data.list[0]
          localStorage.setItem('addressHome', JSON.stringify(res.data.list[0]))
          this.isShow = true
        }
      }
    )
    if (sessionStorage.getItem('dellFlag')) {
      // console.log(sessionStorage.getItem("dellFlag"));
      this.$store.commit('setDellFlag', sessionStorage.getItem('dellFlag'))
    }
    window.addEventListener('beforeunload', () => {
      if (this.$store.state.sell.dellFlag && this.$route.name == 'login') {
        sessionStorage.setItem('dellFlag', this.$store.state.sell.dellFlag)
      }
    })
  },
}
</script>
<style lang="scss">
.main {
  height: 100%;
  width: 100%;
}
</style>
