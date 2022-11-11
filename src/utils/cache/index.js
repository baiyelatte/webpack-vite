/*
 * @Author: Admin
 * @Date: 2022-03-17 10:47:09
 * @LastEditors: Crush
 * @LastEditTime: 2022-04-29 19:07:15
 * @FilePath: \mallh5\src\utils\cache\index.js
 * @Description:
 *
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved.
 */
import { getStorage } from "../dom"; //

class StorageCache {
  constructor(storageKey) {
    this.storageKey = storageKey ?? "localStorage";
  }

  setCache(key, value, expires = 86400000) {
    let itemValue = value;
    // const itemValue = JSON.stringify({ expires: expires + +new Date(), value });
    if (typeof value === "object" || typeof value === "undefined") {
      itemValue = JSON.stringify(value);
    }
    window[this.storageKey].setItem(key, itemValue);
  }

  getCache(key) {
    const storage = getStorage(key, this.storageKey);
    // if(typeof storage !== 'object' || storage === null || !storage.expires || storage.expires <= +new Date()) {
    //   return null;
    // }
    return storage;
  }

  deleteCache(key) {
    window[this.storageKey].removeItem(key);
  }

  clearCache(whiteOrders) {
    const orderMap = whiteOrders.reduce(
      (prev, cur) => ({ ...prev, [cur]: this.getCache(cur) || 0 }),
      {}
    );

    window[this.storageKey].clear();

    Object.entries(orderMap).forEach(([key, value]) =>
      this.setCache(key, value)
    );
  }
}

const localCache = new StorageCache();
const sessionCache = new StorageCache("sessionStorage");

export default localCache;

export * from "./config";

export { StorageCache, localCache, sessionCache };
