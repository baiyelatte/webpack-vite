import { uploadFile, getOpenIdRequest } from "api";
import { localCache, OPENID, LOCATIONSEARCH } from "./cache";
import router from "@/router";
import { cltUrl } from "@/api/config";
import { pubGet } from "@/api/service";

export const wxAppid = "wxe1c4e5c3d03368c3";

//删除地址带token
export function removetoken() {
  let hurl = "";
  let newhref = decodeURIComponent(window.location.href);
  if (newhref.indexOf("token=") > -1) {
    let howurl = newhref.replace(/(^|&|\?{0})token=([^&|#]*)/g, "");
    howurl.indexOf("?#") > -1
      ? (hurl = howurl.replace(/\?#/, "#"))
      : (hurl = howurl);

    let arr = newhref.split("?")[1].split("&");
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      let a = arr[i].split("=");
      obj[a[0]] = a[1];
    }
    if (history.replaceState) {
      history.replaceState(null, "", hurl);
    } else {
      window.location.replace(hurl);
    }
  }
}

export function removeUrlKey(key) {
  let hurl = "";
  let newhref = decodeURIComponent(window.location.href);
  if (newhref.indexOf(`${key}=`) > -1) {
    const reg = new RegExp(`\(\^|\&\|\\\?{0})${key}=\(\[\^\&|#]\*)`, "g");
    let howurl = newhref.replace(reg, "");
    howurl.indexOf("?#") > -1
      ? (hurl = howurl.replace(/\?#/, "#"))
      : (hurl = howurl);

    let arr = newhref.split("?")[1].split("&");
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      let a = arr[i].split("=");
      obj[a[0]] = a[1];
    }
    if (history.replaceState) {
      history.replaceState(null, "", hurl);
    } else {
      window.location.replace(hurl);
    }
  }
}

// 取微信openid
export async function getOpenId() {
  const userinfo = localCache.getCache("userinfo") || {};
  if (!userinfo?.unionid) return;
  const openId = localCache.getCache(OPENID + userinfo.unionid);
  const hasToken = getUrlKey("token"); //用来判断是否是诚聊通返回的openId
  const wechat_openid = getUrlKey("wechat_openid");
  const locationSearch = location.search;
  !localCache.getCache(LOCATIONSEARCH) &&
    localCache.setCache(LOCATIONSEARCH, locationSearch);

  if ((wechat_openid && hasToken) || openId) return;

  if (wechat_openid) {
    localCache.setCache(OPENID + userinfo.unionid, wechat_openid);
    return;
  }

  const { unionid } = userinfo;
  const originUrl = window.location.href;

  if (isWeixin()) {
    // 重定向返回会清除参数
    // so: 存一下吧
    window.location.href = `https://api.lkkjjt.com/pub/getwechatopenid/appid/${wxAppid}/unionid/${unionid}?return_url=${originUrl}`;
  }
}

export function regphone(data) {
  let myreg = /^1(3|4|5|6|7|8|9)\d{9}$/;
  return myreg.test(data);
}
// 上传
export function _uploadFiler(file, type) {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("uploadFile", file.file, file.file.name);
    formData.append("type", type);
    uploadFile(formData)
      .then((res) => {
        if (res && res.errorCode == 1) {
          resolve(res.data);
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });
}

export function md5par() {
  return "8CCAw%2B";
}

export function iscard(card) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(card);
}

// 判断是否是微信浏览器
export function isWeixin() {
  const ua = navigator.userAgent.toLowerCase();
  return !!ua.match(/MicroMessenger/i);
}

// 判断是否是qq浏览器
export function isQQ() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.match(/QQ/i) == "qq";
}

// 判断在safari
export function isSafari() {
  // return /Apple/.test(navigator.vendor);
  const userAgent = navigator.userAgent;
  return !!~userAgent.indexOf("Safari");
}
// 判断安卓还是IOS
export function isIOS() {
  const u = navigator.userAgent;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  return isIOS;
}

// 判断安卓
export function isAndroid() {
  var u = navigator.userAgent;
  if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    if (window.ShowFitness !== undefined) return true;
  }
  return false;
}

export const isAlipay =
  window.navigator.userAgent.toLowerCase().match(/Alipay/i) == "alipay";

export function isAndroid1() {
  return (
    navigator.userAgent.indexOf("Android") > -1 ||
    navigator.userAgent.indexOf("Adr") > -1
  );
}

export function isXiaomi() {
  return isAndroid1() && navigator.userAgent.indexOf("XiaoMi/MiuiBrowser") > -1;
}

// 获取url参数
export function getUrlKey(name) {
  let after = window.location.search;
  let hash = window.location.hash.split("?")[1];
  if (after.indexOf("?") === -1) return null; // 如果url中没有传参直接返回空

  // key存在先通过search取值如果取不到就通过hash来取
  after = decodeURIComponent(after.substring(1) || hash);

  if (after.substring(1) && hash) {
    after = `${after}&${hash}`;
  }
  if (after) {
    let reg = `(^|\\?|&)${name}=([^&]*)(&|$)`;
    let r = after.match(reg);
    if (r != null) {
      return r[2];
    } else {
      return null;
    }
  }
}

export function generatorUrlKey(params) {
  let paramStr = "";
  Object.keys(params).forEach((item) => {
    if (paramStr === "") {
      paramStr = `${item}=${params[item]}`;
    } else {
      paramStr = `${paramStr}&${item}=${params[item]}`;
    }
  });
  return paramStr;
}

export function getStorage(name, storageKey = "localStorage") {
  let result;
  const value = window[storageKey].getItem(name);
  const reg = /^[{\[].*[}\]]$/;
  const regNumberStr = /^[0-9]+$/;
  try {
    result =
      reg.test(value) || regNumberStr.test(value) ? JSON.parse(value) : value;
  } catch (err) {
    console.log(err);
  }
  return result;
}

//写localStorage数据
export function SetStorage(name, value) {
  return localStorage.setItem(name, value);
}
// 退出时清楚
export function dropout() {
  localCache.clearCache(["missingWeChatExpires"]);
}

// 设置cookie
export function setCookie(name, value, time) {
  let exp = new Date();
  exp.setTime(exp.getTime() + time);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
// 获取cookie
export function getCookie(name) {
  let arr;
  let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  arr = document.cookie.match(reg);
  if (arr) {
    return unescape(arr[2]);
  }
  return null;
}
// 删除cookie
export function delCookie(name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = this.getCookie(name);
  if (cval) {
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
}

// 防抖  购物车商品数量加减
export function _debounce(fn, delay = 150) {
  var timeout = null; // 创建一个标记用来存放定时器的返回值
  return function () {
    // 每当用户输入的时候把前一个 setTimeout clear 掉
    clearTimeout(timeout);
    // 然后又创建一个新的 setTimeout, 这样就能保证interval 间隔内如果时间持续触发，就不会执行 fn 函数
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
// 商品销量

export function salesFun(val) {
  let value = val.toString();
  if (val < 100) {
    return val;
  } else if (val < 1000) {
    return value[0] + "00" + "+";
  } else if (val < 10000) {
    return value[0] + "000" + "+";
  } else {
    let num = val / 10000;
    return parseInt(num) + "w" + "+";
  }
}
export function priceFun(val) {
  if (val >= 10000) {
    let num = val / 10000;
    return parseInt(num * 100) / 100 + "w";
  } else {
    return val;
  }
}
// 浮点型除法
export function divide(arg1, arg2, digit) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  //获取小数点后的计算值
  var result = ((r1 / r2) * Math.pow(10, t2 - t1)).toString();
  var result2 = result.split(".")[1];
  result2 = result2.substring(
    0,
    digit > result2.length ? result2.length : digit
  );

  return Number(result.split(".")[0] + "." + result2);
}
export function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}
//浮点型乘法
export function accMul(arg1, arg2) {
  var m = 0,
    s1 = (arg1 || 0).toString(),
    s2 = (arg2 || 0).toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}

export const imgPreloader = (url) => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = url;
    image.onload = () => {
      resolve();
    };
    image.onerror = (err) => {
      reject(err);
    };
  });
};

export const imgsPreloader = (imgs) => {
  let promiseArr = [];
  imgs.forEach((element) => {
    promiseArr.push(imgPreloader(element));
  });
  return Promise.all(promiseArr);
};

export const topDomain = location.hostname.split(".").slice(-2).join(".");

export function downImg(url) {
  let a = document.createElement("a");

  let clickEvent = document.createEvent("MouseEvents");

  a.setAttribute("href", url);

  a.setAttribute("download", "codeImg");

  a.setAttribute("target", "_blank");

  clickEvent.initEvent("click", true, true);

  a.dispatchEvent(clickEvent);
}

export function convertCanvasToImg(canvas) {
  const myBlob = dataURLtoBlob(canvas.toDataURL("img/png", 0.92));

  return URL.createObjectURL(myBlob);
}

export function dataURLtoBlob(dataUrl) {
  let arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}

export function getDateRange(startTime, endTime) {
  function dateParse(data) {
    return data?.split(" ")?.[0]?.replace(/-/g, ".");
  }
  const beginDate = dateParse(startTime);
  const endDate = dateParse(endTime);
  return beginDate + "至" + endDate;
}

export function handleLogin() {
  const missingWeChatExpires = localCache.getCache("missingWeChatExpires") || 0;
  const isOverdue = +new Date() > missingWeChatExpires;

  if (isWeixin() && isOverdue) {
    location.href = `https://api.lkkjjt.com/pub/login?return_url=${window.location.href}`;
  } else if (isAlipay) {
    location.href = `https://api.lkkjjt.com/alipay/login?return_url=${window.location.href}`;
  } else {
    if (router.history.current.path != "/smslogin") {
      const fullPath = router.history.current.fullPath.replace(
        /token=.*?(&|$)/,
        ""
      );
      router
        .replace({ path: "/smslogin", query: { redirect: fullPath } })
        .catch(() => {});
    }
  }
}
