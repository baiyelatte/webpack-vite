export default {
  state: {
    afterSaleInfo1: {}
  },
  getters: {
    getAfterSaleInfo1: (state) => {
      return state.afterSaleInfo1;
    }
  },
  mutations: {
    setAfterSaleInfo: (state, data) => {
      state.afterSaleInfo1 = data;
    }
  }
};
