/*
 * @Date: 2022-11-11 14:48:18
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-11 16:37:55
 * @FilePath: \vite_vue2.7\src\imgUrl\index.ts
 */

const getAssetsFile = (url: string) => {
  return new URL(`../assets/image/${url}`, import.meta.url).href;
};

export default {
  getAssetsFile
};