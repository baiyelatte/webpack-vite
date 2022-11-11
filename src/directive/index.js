/*
 * @Author: Admin
 * @Date: 2022-03-16 09:07:40
 * @LastEditors: Crush
 * @LastEditTime: 2022-03-21 10:13:37
 * @FilePath: \mallh5\src\directive\index.js
 * @Description:
 *
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved.
 */
import registerLongPress from "./longpress";

export default {
  install(Vue) {
    registerLongPress(Vue, {
      time: 200
    });
  }
};
