/*
 * @Author: Admin
 * @Date: 2022-02-17 14:50:52
 * @LastEditors: Crush
 * @LastEditTime: 2022-03-14 14:07:30
 * @FilePath: \mallh5\src\utils\mixins.js
 * @Description:
 *
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved.
 */
const toScroll = (ref, parentRef) => {
  let dom = ref;
  let parentDom = parentRef;
  //id选择器
  if (typeof ref === "string") {
    dom = document.getElementById(ref);
  }
  if (typeof parentDom === "string") {
    parentDom = document.getElementById(ref);
  }
  //vue组件
  if (ref.$el) {
    dom = ref.$el;
  }
  if (parentDom && parentDom.$el) {
    parentDom = parentDom.$el;
  }
  let mainDom = parentDom || document.getElementById("main");
  const sTop = document.documentElement.scrollTop || mainDom.scrollTop;
  scrollTop(mainDom, sTop, dom.offsetTop, 1000);
};

export default (Vue) => {
  Vue.prototype.$toScroll = toScroll;
};
