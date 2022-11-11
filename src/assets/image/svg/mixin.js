/*
 * @Author: Admin
 * @Date: 2022-03-15 09:24:48
 * @LastEditors: Crush
 * @LastEditTime: 2022-03-15 09:24:49
 * @FilePath: \mallh5\src\assets\image\svg\mixin.js
 * @Description:
 *
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved.
 */

export default {
  props: {
    size: {
      type: Number,
      default: 15
    }
  },
  computed: {
    computedStyle() {
      return {
        width: this.size / 36 + "rem",
        height: this.size / 36 + "rem"
      };
    }
  }
};
