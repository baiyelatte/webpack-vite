/*
 * @Author: Admin
 * @Date: 2022-02-10 14:39:55
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-10-25 09:25:14
 * @FilePath: \mallh5\src\store\index.js
 * @Description:
 *
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved.
 */
import Vue from "vue";
import Vuex from "vuex";

import home from "./modules/home";
import user from "./modules/user";
import cart from "./modules/cart";
import wallet from "./modules/wallet";
import details from "./modules/details";
import sell from "./modules/sell";
import activity from "./modules/activity";
import order from "./modules/order";
// import back from './modules/back'
import shop from "./modules/shop";
import classify from "./modules/classify";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    setScrollY: 0,
    showType: false,
    turnRoute: {}
  },
  getters: {
    getScrollY: (state) => state.setScrollY,
    // console.log(state.setScrollY,'000000000');
    turnRoute: (state) => state.turnRoute
  },
  actions: {
    setScrollYAction({ commit }, data) {
      commit("setScrollYCommit", data);
    }
  },
  mutations: {
    setScrollYCommit(state, data) {
      state.setScrollY = data;
    },
    setShowType(state, data) {
      state.showType = data;
    },
    setTurnRoute(state, data) {
      state.turnRoute = data;
    }
  },
  modules: {
    home,
    user,
    cart,
    wallet,
    details,
    sell,
    activity,
    order,
    // back,
    shop,
    classify
  },
  strict: process.env.NODE_ENV !== "production" //开户debug
});

export default store;
