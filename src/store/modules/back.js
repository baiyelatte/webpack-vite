import * as types from "./mutation-types";

export default {
  state: {
    setScrollY: 0
  },
  getters: {
    getScrolly: (state) => {
      state.setScrollY;
    }
  },
  actions: {
    setScrollYAction({ commit }, data) {
      commit(types.BACk, data);
    }
  },
  mutations: {
    [types.BACk](state, data) {
      state.setScrollY = data;
    }
  }
};
