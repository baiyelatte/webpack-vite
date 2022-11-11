/*
 * @Date: 2022-11-10 15:13:45
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-11 17:35:24
 * @FilePath: \vite_vue2.7\src\main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import RouteTransition from '@/components'; // 路由过场动画
import { Toast } from 'vant';
import { Dialog } from 'vant';
import '@/vant/index';
import '@/assets/style/index.scss';
import 'amfe-flexible/index';
import md5 from 'js-md5';
import dayjs from 'dayjs';
import mixins from './utils/mixins';
import directive from './directive';
import * as utils from './utils';
import { Lazyload } from 'vant';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper.scss';
Vue.prototype.defaultCity = {
  // cityId: 8,
  // adcode: 330100,
  // cityName: "杭州市",
  // cityLogo: "http://mallres.lkkjjt.com/test_1666340409677"
};
Vue.use(Lazyload);
Vue.use(VueAwesomeSwiper);
Vue.prototype.$md5 = md5;
Vue.prototype.$forceUpdate;
Vue.prototype.$toast = Toast;
Vue.prototype.$dialog = Dialog;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$utils = utils;
Vue.config.productionTip = false;
Vue.use(RouteTransition);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(mixins);
Vue.use(directive);
console.log(import.meta.env);
const debugKey = '92d0061e-15e5-4c74-9563-c3af7d65e0dd';
const isOpenDebug =
  utils.localCache.getCache(debugKey) || utils.getUrlKey('debug') === debugKey;

window.onload = () => {
  const IscltApp = LukeappApi.IscltApp;
  // 开启debug模式
  if (isOpenDebug) {
    utils.localCache.setCache(debugKey, 1);
    window.eruda.init();
  }

  LukeappApi.IscltApp = function () {
    return (
      IscltApp() ||
      window.navigator.userAgent.match(/SincereMall/) == 'SincereMall'
    );
  };
};

// 年月日时间
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + '').padStart(2, '0');
  const d = (dt.getDate() + '').padStart(2, '0');
  const hh = (dt.getHours() + '').padStart(2, '0');
  const mm = (dt.getMinutes() + '').padStart(2, '0');
  const ss = (dt.getSeconds() + '').padStart(2, '0');

  return `${y}/${m}/${d}/${hh}:${mm}:${ss}`;
});

const vue = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
export default vue;
