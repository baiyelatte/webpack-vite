/*
 * @Author: Admin
 * @Date: 2022-03-15 15:42:58
 * @LastEditors: Crush
 * @LastEditTime: 2022-06-25 10:27:07
 * @FilePath: \mallh5\src\store\modules\order.js
 * @Description:
 *
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved.
 */
export default {
  namespaced: true,
  state: {
    redirectUrl: "",
    channelId: ""
  },
  getters: {},
  actions: {},
  mutations: {
    changeRedirectUrl(state, payload) {
      state.redirectUrl = payload;
    },
    changeChannelId(state, payload) {
      state.channelId = payload;
    }
  }
};
