/*
 * @Date: 2022-10-25 15:04:23
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-03 10:05:33
 * @FilePath: \mallh5\src\utils\animation.js
 */
export function animation(obj, target) {
  if (obj) {
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
      var step = (target - obj.scrollTop) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if (obj.scrollTop >= target) {
        clearInterval(obj.timer);
      } else {
        setTimeout(() => {
          clearInterval(obj.timer);
        }, 1000);
      }
      obj.scrollTop = obj.scrollTop + step;
    }, 5);
  }
}
