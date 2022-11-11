/*
 * @Author: Admin
 * @Date: 2022-02-10 14:39:55
 * @LastEditors: Crush
 * @LastEditTime: 2022-08-23 16:05:15
 * @FilePath: \project\mallh5\src\store\modules\home.js
 * @Description:
 *
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved.
 */

export default {
  namespaced: true,
  state: {
    id: ""
  },
  mutations: {
    SET_SHOP_ID(state, value) {
      state.id = value;
    }
  },
  actions: {}
};
