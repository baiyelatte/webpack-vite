import * as types from "./mutation-types";

export default {
  state: {
    cartinfo: null
  },
  getters: {
    getcartinfo: (state) => {
      let cartinfo = state.cartinfo;
      if (!cartinfo) {
        cartinfo = JSON.parse(window.localStorage.getItem("cartinfo")) || [];
      }
      return cartinfo;
    }
  },
  actions: {
    setcartinfo({ commit }, params) {
      commit(types.CART, {
        data: params
      });
    }
  },
  mutations: {
    [types.CART]: (state, { data }) => {
      state.cartinfo = data;
      localStorage.setItem("cartinfo", JSON.stringify(data));
    }
  }
};
