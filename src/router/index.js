import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/Login";
import smslogin from "@/views/login/smslogin";
import forgotpassword from "@/views/login/forgotpassword";
import plorder from "@/views/goods/plorder";
import setting from "@/views/user/setting";
import shopapply from "@/views/user/shopapply";
import shopSucceed from "@/views/user/shopSucceed";
import shopAudit from "@/views/user/shopAudit";
import Activityzone from "@/views/goods/Activityzone";
import merchants from "@/views/merchants/index";
import shoppe from "@/views/merchants/shoppe";
import orderman from "@/views/merchants/orderman";
import shopdecoration from "@/views/merchants/shopdecoration";
import information from "@/views/merchants/information";
import paysuccess from "@/views/pay/paysuccess";
import shop from "@/views/shop/index";
// import shop from "@/views/shop/indexShop";
import shopinfo from "@/views/shop/shopinfo";
import shopCategory from "@/views/shop/shopCategory/index";
import order from "@/views/order/order";
import orderdetails from "@/views/order/orderdetails";
import huanorder from "@/views/order/huanorder";
import withdraw from "@/views/user/withdraw/withdraw";
import addcardsuccess from "@/views/user/fundsmanagement/addcardsuccess";
import aliPay from "@/views/pay/aliPay";
import specialtyCenter from "@/views/home/specialtyCenter";

import {
  getOpenId,
  removeUrlKey,
  isWeixin,
  isIOS,
  getStorage,
  getUrlKey
} from "@/utils/dom";
import localCache, {
  PAYSUCCESSREDIRECTURL,
  OPENID,
  LOCATIONSEARCH
} from "@/utils/cache";
import downloadclg from "@/views/download/downloadclg";
import downloadclm from "@/views/download/downloadclm";
import store from "@/store";
import * as types from "@/store/modules/mutation-types";
import { getValidatePhoneResult } from "@/api";
// meta: {
//   title: '首页',
//   // redirect: '/dashboard',
//   // keepAlive: true,
//   //requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
// }
// 路由懒加载
const Home = (resolve) => {
  import("@/views/home/home").then((module) => {
    resolve(module);
  });
};
const Address = (resolve) => {
  import("@/views/home/openAddress").then((module) => {
    resolve(module);
  });
};
const City = (resolve) => {
  import("@/views/home/City").then((module) => {
    resolve(module);
  });
};
const Others = (resolve) => {
  import("@/views/home/others").then((module) => {
    resolve(module);
  });
};
const MoreCity = (resolve) => {
  import("@/views/home/moreCity").then((module) => {
    resolve(module);
  });
};

const Details = (resolve) => {
  import("@/views/home/details").then((module) => {
    resolve(module);
  });
};
const Apply = (resolve) => {
  import("@/views/home/Apply").then((module) => {
    resolve(module);
  });
};
const GoodShop = (resolve) => {
  import("@/views/home/goodShop").then((module) => {
    resolve(module);
  });
};
const Joins = (resolve) => {
  import("@/views/home/joins").then((module) => {
    resolve(module);
  });
};
const FocusOn = (resolve) => {
  import("@/views/home/focusOn").then((module) => {
    resolve(module);
  });
};
const Bands = (resolve) => {
  import("@/views/home/bands").then((module) => {
    resolve(module);
  });
};
const Record = (resolve) => {
  import("@/views/home/record").then((module) => {
    resolve(module);
  });
};
const Category = (resolve) => {
  import("@/views/category/category").then((module) => {
    resolve(module);
  });
};
const Locations = (resolve) => {
  import("@/views/category/locations").then((module) => {
    resolve(module);
  });
};
const cityChoose = (resolve) => {
  import("@/views/category/cityChoose").then((module) => {
    resolve(module);
  });
};
const cityList = (resolve) => {
  import("@/views/category/cityList").then((module) => {
    resolve(module);
  });
};
const searchDetail = (resolve) => {
  import("@/views/category/searchDetail").then((module) => {
    resolve(module);
  });
};
const cityShop = (resolve) => {
  import("@/views/shop/cityShop").then((module) => {
    resolve(module);
  });
};
const Cart = (resolve) => {
  import("@/views/cart/cart").then((module) => {
    resolve(module);
  });
};
const User = (resolve) => {
  import("@/views/user/user").then((module) => {
    resolve(module);
  });
};
const Detail = (resolve) => {
  import("@/views/goods/detail").then((module) => {
    resolve(module);
  });
};
const evaluate = (resolve) => {
  import("@/views/goods/evaluate").then((module) => {
    resolve(module);
  });
};
const steps = (resolve) => {
  import("@/views/order/steps").then((module) => {
    resolve(module);
  });
};

const authentication = (resolve) => {
  import("@/views/user/authentication").then((module) => {
    resolve(module);
  });
};
const balance = (resolve) => {
  import("@/views/user/fundsmanagement/balance").then((module) => {
    resolve(module);
  });
};
const receivablelist = (resolve) => {
  import("@/views/user/fundsmanagement/receivablelist").then((module) => {
    resolve(module);
  });
};
const addcard = (resolve) => {
  import("@/views/user/fundsmanagement/addcard").then((module) => {
    resolve(module);
  });
};
const cardsmscode = (resolve) => {
  import("@/views/user/fundsmanagement/cardsmscode").then((module) => {
    resolve(module);
  });
};
const alternate = (resolve) => {
  import("@/views/user/fundsmanagement/alternate").then((module) => {
    resolve(module);
  });
};
const alternatepassword = (resolve) => {
  import("@/views/user/fundsmanagement/alternatepassword").then((module) => {
    resolve(module);
  });
};
const widthdrawpassword = (resolve) => {
  import("@/views/user/fundsmanagement/widthdrawpassword").then((module) => {
    resolve(module);
  });
};

const Changepassword = (resolve) => {
  import("@/views/user/fundsmanagement/Changepassword").then((module) => {
    resolve(module);
  });
};

const verification = (resolve) => {
  import("@/views/user/fundsmanagement/verification").then((module) => {
    resolve(module);
  });
};
const offcialSubsidy = (resolve) => {
  import("@/views/goods/offcialSubsidy.vue").then((module) => {
    resolve(module);
  });
};
const activityshop = (resolve) => {
  import("@/views/goods/activityshop.vue").then((module) => {
    resolve(module);
  });
};
const purchase = (resolve) => {
  import("@/views/goods/purchase.vue").then((module) => {
    resolve(module);
  });
};
const purchase1 = (resolve) => {
  import("@/views/goods/purchase1.vue").then((module) => {
    resolve(module);
  });
};
const purchase2 = (resolve) => {
  import("@/views/goods/purchase2.vue").then((module) => {
    resolve(module);
  });
};
const award = (resolve) => {
  import("@/views/award/award.vue").then((module) => {
    resolve(module);
  });
};
const luck = (resolve) => {
  import("@/views/award/luck.vue").then((module) => {
    resolve(module);
  });
};

const awardDetails = (resolve) => {
  import("@/views/award/awardDetails.vue").then((module) => {
    resolve(module);
  });
};
const couponsList = (resolve) => {
  import("@/views/coupons/couponsList.vue").then((module) => {
    resolve(module);
  });
};
const couponsDetail = (resolve) => {
  import("@/views/coupons/couponsDetail.vue").then((module) => {
    resolve(module);
  });
};
const center = (resolve) => {
  import("@/views/securityCenter/center.vue").then((module) => {
    resolve(module);
  });
};
const cancellation = (resolve) => {
  import("@/views/securityCenter/cancellation.vue").then((module) => {
    resolve(module);
  });
};
const abnormal = (resolve) => {
  import("@/views/user/abnormal.vue").then((module) => {
    resolve(module);
  });
};
const goodsCollect = (resolve) => {
  import("@/views/goods/goodsCollect.vue").then((module) => {
    resolve(module);
  });
};
const shopAttention = (resolve) => {
  import("@/views/shop/shopAttention.vue").then((module) => {
    resolve(module);
  });
};
const share = (resolve) => {
  import("@/views/share").then((module) => {
    resolve(module);
  });
};
const promotion = (resolve) => {
  import("@/views/promotion/618Promotion.vue").then((module) => {
    resolve(module);
  });
};
const promotionRules = (resolve) => {
  import("@/views/promotion/promotionRules.vue").then((module) => {
    resolve(module);
  });
};
const cityFestival = (resolve) => {
  import("@/views/promotion/88cityFestival.vue").then((module) => {
    resolve(module);
  });
};
const cityRink = (resolve) => {
  import("@/views/promotion/cityRink.vue").then((module) => {
    resolve(module);
  });
};
const rinkRule = (resolve) => {
  import("@/views/rule/rinkRule.vue").then((module) => {
    resolve(module);
  });
};
const cityRules = (resolve) => {
  import("@/views/rule/cityRules.vue").then((module) => {
    resolve(module);
  });
};
Vue.use(VueRouter);
//NavigationDuplicated: Avoided redundant 点详情报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: "/",
    redirect: "/index",
    meta: {
      title: "诚聊购"
    }
  },
  {
    // 首页
    path: "/index",
    name: "home",
    component: () => import("@/views/home/home"),
    // component: (resolve) => require(["@/views/home/home"], resolve),
    meta: {
      title: "诚聊购",
      keepAlive: true,
      tabbar: true,
      firstShow: true
    },
    children: [
      {
        // 分类
        path: "classify",
        name: "classify",
        component: () => import("@/views/home/classify/index.vue"),
        meta: {
          title: "分类",
          keepAlive: false
          // tabbar: true
        }
      },
      // {
      //   path: "/shopinfo/:shopId",
      //   name: "shopinfo",
      //   component: shopinfo,
      //   meta: {
      //     title: "门店主页",
      //     keepAlive: true
      //   },
      //   children: [
      //     {
      //       path: "/shopinfo/shopCategory/:shopId",
      //       name: "shopCategory",
      //       component: shopCategory
      //     }
      //   ]
      // },
      {
        path: "/downloadclg",
        name: "downloadclg",
        component: (resolve) => {
          import("@/views/download/downloadclg").then((module) => {
            resolve(module);
          })
        },
        meta: {
          title: "下载",
          keepAlive: true
        }
      },
      // {
      //   path: "/comeToEnjoy",
      //   name: "comeToEnjoy",
      //   component: (resolve) => require(["@/views/rule/comeToEnjoy"], resolve),
      //   meta: {
      //     title: "入驻可享",
      //     keepAlive: true
      //   },
      //   children: [
      //     {
      //       path: "downloadclg",
      //       name: "downloadclg",
      //       component: (resolve) =>
      //         require(["@/views/download/downloadclg"], resolve),
      //       meta: {
      //         title: "下载",
      //         keepAlive: true
      //       }
      //     }
      //   ]
      // },
      {
        path: "/searchSpecialty",
        name: "searchSpecialty",
        component: (resolve) => {
          import("@/views/goods/search").then((module) => {
            resolve(module);
          })
        },
        meta: {
          title: "搜索",
          // keepAlive: false
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/rankingList",
    name: "rankingList",
    component: (resolve) => {
      import("@/views/home/cityHall/children/rankingList.vue").then((module) => {
        resolve(module);
      })
    },
    meta: {
      title: "排行榜",
      keepAlive: false
    },
    children: [
      {
        path: "/tabularStatement",
        name: "tabularStatement",
        component: (resolve) => {
          import("@/views/rule/tabularStatement.vue").then((module) => {
            resolve(module);
          })
        },
        meta: {
          title: "排榜单说明",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/cityHall",
    name: "cityHall",
    component: (resolve) => {
      import("@/views/home/cityHall/index.vue").then((module) => {
        resolve(module);
      })
    },
    meta: {
      title: "城市馆",
      // keepAlive: false
      keepAlive: true
    },
    children: [
      {
        path: "/searchCity",
        name: "searchCity",
        component: (resolve) => {
          import("@/views/goods/search").then((module) => {
            resolve(module);
          })
        },
        meta: {
          title: "搜索",
          // keepAlive: false
          keepAlive: true
        }
      },
      // {
      //   path: "/comeEnjoy",
      //   name: "comeEnjoy",
      //   component: (resolve) => require(["@/views/rule/comeToEnjoy"], resolve),
      //   meta: {
      //     title: "入驻可享",
      //     keepAlive: true
      //   },
      //   children: [
      //     {
      //       path: "downloadclg",
      //       name: "downloadclg",
      //       component: (resolve) =>
      //         require(["@/views/download/downloadclg"], resolve),
      //       meta: {
      //         title: "下载",
      //         keepAlive: true
      //       }
      //     }
      //   ]
      // }
    ]
  },
  {
    path: "/specialtyCenter",
    name: "specialtyCenter",
    component: specialtyCenter,
    meta: {
      title: "特产中心",
      // keepAlive: false
      keepAlive: true
    },
    children: [
      {
        path: "/allCategories",
        name: "allCategories",
        component: (resolve) => {
          import("@/views/home/specialtyCenter/children/allCategories.vue").then((module) => {
            resolve(module);
          })
        },
        meta: {
          title: "全部分类",
          keepAlive: true
        }
      }
    ]
  },
  {
    // 分类
    path: "/enjoyRule",
    name: "enjoyRule",
    component: (resolve) => {
      import("@/views/rule/enjoyRule.vue").then((module) => {
        resolve(module);
      })
    },
    meta: {
      title: "规则",
      keepAlive: true
      // tabbar: true
    }
  },

  {
    path: "/comeToEnjoy",
    name: "comeToEnjoy",
    component: (resolve) => {
      import("@/views/rule/comeToEnjoy").then((module) => {
        resolve(module);
      })
    },
    meta: {
      title: "入驻可享",
      keepAlive: true
    }
  },
  {
    // 分类
    path: "/enjoyRule",
    name: "enjoyRule",
    component: (resolve) => {
      import("@/views/rule/enjoyRule.vue").then((module) => {
        resolve(module);
      })
    },
    meta: {
      title: "分类",
      keepAlive: true
      // tabbar: true
    }
  },
  // {
  //   // 分类
  //   path: "/classify",
  //   name: "classify",
  //   component: (resolve) => require(["@/views/home/classify/index.vue"], resolve),
  //   meta: {
  //     title: "分类",
  //     keepAlive: true,
  //     // tabbar: true
  //   }
  // },
  {
    path: "/search",
    name: "search",
    component: (resolve) => {
      import("@/views/goods/search").then((module) => {
        resolve(module);
      })
    },
    meta: {
      title: "搜索",
      // keepAlive: false
      keepAlive: true
    },
    children: [
      {
        // 分类
        path: "/classify",
        name: "classify",
        component: (resolve) => {
          import("@/views/home/classify/index.vue").then((module) => {
            resolve(module);
          })
        },
        meta: {
          title: "分类",
          keepAlive: true
          // tabbar: true
        }
      }
    ]
  },
  {
    path: "/oldSearch",
    name: "oldSearch",
    component: (resolve) => {
      import("@/views/goods/oldSearch.vue").then((module) => {
        resolve(module);
      })
    },
    meta: {
      title: "搜索",
      // keepAlive: false
      keepAlive: true
    }
  },
  {
    // 首页地址
    path: "/address",
    name: "address",
    component: Address,
    meta: {
      title: "定位",
      keepAlive: true
      // tabbar: true
    }
  },
  {
    // 首页地址
    path: "/Apply",
    name: "Apply",
    component: Apply,
    meta: {
      title: "加入店铺"
      // keepAlive: true,
      // tabbar: true
    }
  },
  {
    // 首页地址O
    path: "/focusOn",
    name: "focusOn",
    component: FocusOn,
    meta: {
      title: "关注"
      // keepAlive: true,
      // tabbar: true
    }
  },
  {
    // 首页地址O
    path: "/bands",
    name: "bands",
    component: Bands,
    meta: {
      title: "品牌商品"
      // keepAlive: true,
      // tabbar: true
    }
  },
  {
    // 首页地址O
    path: "/record",
    name: "record",
    component: Record,
    meta: {
      title: "申请记录"
      // keepAlive: true,
      // tabbar: true
    }
  },
  {
    // 首页城市
    path: "/City",
    name: "City",
    component: City,
    meta: {
      title: "地址"
    }
  },
  {
    // 首页城市
    path: "/joins",
    name: "joins",
    component: Joins,
    meta: {
      title: "地址",
      requireAuth: true
    }
  },
  {
    // 首页城市
    path: "/details",
    name: "details",
    component: Details,
    meta: {
      title: "热门城市"
    }
  },
  {
    // 首页城市
    path: "/others",
    name: "others",
    component: Others,
    meta: {
      title: "地址"
    }
  },
  {
    // 首页城市
    path: "/goodShop",
    name: "goodShop",
    component: GoodShop,
    meta: {
      title: "好店"
    }
  },
  {
    // 首页城市
    path: "/moreCity",
    name: "moreCity",
    component: MoreCity,
    meta: {
      title: "热门城市"
    }
  },
  {
    path: "/share",
    name: "share",
    component: share,
    meta: {
      title: "分享得好礼"
      // requireAuth: true
    }
  },
  {
    path: "/couponsList",
    name: "couponsList",
    component: couponsList,
    meta: {
      title: "优惠券"
    }
  },
  {
    path: "/shopAttention",
    name: "shopAttention",
    component: shopAttention,
    meta: {
      title: "我的关注"
    }
  },
  {
    path: "/goodsCollect",
    name: "goodsCollect",
    component: goodsCollect,
    meta: {
      title: "商品收藏"
    }
  },
  {
    path: "/couponsDetail",
    name: "couponsDetail",
    component: couponsDetail,
    meta: {
      title: "优惠券详情",
      keepAlive: true
    }
  },
  {
    path: "/center",
    name: "center",
    component: center,
    meta: {
      title: "安全中心",
      keepAlive: true
    },
    children: [
      {
        path: "/aboutUs",
        name: "aboutUs",
        component: (resolve) => {
          import("@/views/securityCenter/suggestions.vue").then((module) => {
            resolve(module);
          });
        },
        meta: {
          title: "建议与反馈"
        }
      },
    ]
  },
  {
    path: "/cancellation",
    name: "cancellation",
    component: cancellation,
    meta: {
      title: "注销账户",
      keepAlive: true
    }
  },
  {
    path: "/abnormal",
    name: "abnormal",
    component: abnormal,
    meta: {
      title: "账号异常",
      keepAlive: true
    }
  },
  {
    path: "/category",
    name: "category",
    component: Category,
    meta: {
      title: "分类",
      keepAlive: true,
      tabbar: false
    }
  },
  {
    path: "/locations",
    name: "locations",
    component: Locations,
    meta: {
      title: "本地",
      keepAlive: true,
      tabbar: true
    }
  },
  {
    path: "/cityChoose",
    name: "cityChoose",
    component: cityChoose,
    meta: {
      title: "地址搜索",
      keepAlive: true,
      tabbar: true
    }
  },
  {
    path: "/cityList",
    name: "cityList",
    component: cityList,
    meta: {
      title: "城市",
      keepAlive: true,
      tabbar: true
    }
  },

  {
    path: "/cityShop",
    name: "cityShop",
    component: cityShop,
    meta: {
      title: "城市店铺",
      // keepAlive: true,
      tabbar: false
    }
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
    meta: {
      requireAuth: true,
      title: "购物车",
      keepAlive: true,
      tabbar: true
    }
  },
  {
    path: "/user",
    name: "user",
    component: User,
    meta: {
      requireAuth: true,
      keepAlive: false,
      title: "个人中心",
      tabbar: true
    },
    children: [
      {
        path: "credit",
        name: "credit",
        component: (resolve) => {
          import("@/views/user/credit/index").then((module) => {
            resolve(module);
          });
        },
        meta: {
          title: "我的抵用金"
        },
        children: [
          {
            path: "creditTimeRules",
            name: "creditTimeRules",
            component: (resolve) => {
              import("@/views/user/credit/creditTimeRules").then((module) => {
                resolve(module);
              });
            },
            meta: {
              title: "抵用金使用规则"
            }
          }
        ]
      },
      {
        path: "aboutUs",
        name: "aboutUs",
        component: (resolve) => {
          import("@/views/user/aboutUs/index").then((module) => {
            resolve(module);
          });
        },
        meta: {
          title: "关于我们"
        }
      },
      {
        path: "protocol",
        name: "protocol",
        component: (resolve) => {
          import("@/views/user/protocol/index").then((module) => {
            resolve(module);
          });
        },
        meta: {
          title: "用户协议"
        }
      },
      {
        path: "protocol",
        name: "service",
        component: (resolve) => {
          import("@/views/user/protocol/service").then((module) => {
            resolve(module);
          });
        },
        meta: {
          title: "隐私协议"
        }
      },
      {
        path: "wallet",
        name: "wallet",
        component: (resolve) => {
          import("@/views/user/fundsmanagement/wallet").then((module) => {
            resolve(module);
          });
        },
        meta: {
          title: "资金管理"
        },
        children: [
          {
            path: "recharge",
            name: "recharge",
            component: (resolve) => {
              import("@/views/user/fundsmanagement/recharge").then((module) => {
                resolve(module);
              });
            },
            meta: {
              title: "余额充值"
            }
          },
          {
            path: "wlist",
            name: "wlist",
            component: (resolve) => {
              import("@/views/user/withdraw/wlist").then((module) => {
                resolve(module);
              });
            },
            meta: {
              title: "申请记录"
            }
          },
          {
            path: "balance",
            name: "balance",
            component: balance,
            meta: {
              title: "余额明细"
            }
          },
          {
            path: "withdraw",
            name: "withdraw",
            component: withdraw,
            meta: {
              title: "余额提现"
            },

            children: [
              {
                path: "wdetails/:id",
                name: "wdetails",
                component: (resolve) => {
                  import("@/views/user/withdraw/wdetails").then((module) => {
                    resolve(module);
                  });
                },
                meta: {
                  title: "提现详情"
                }
              }
            ]
          },

          {
            path: "alternate",
            name: "alternate",
            component: alternate,
            meta: {
              title: "设置支付密码"
            }
          },
          {
            path: "alternatepassword",
            name: "alternatepassword",
            component: alternatepassword,
            meta: {
              title: "设置支付密码"
            }
          },

          {
            path: "Changepassword",
            name: "Changepassword",
            component: Changepassword,
            meta: {
              title: "修改支付密码"
            }
          },
          {
            path: "widthdrawpassword",
            name: "widthdrawpassword",
            component: widthdrawpassword,
            meta: {
              title: "输入支付密码"
            }
          },

          {
            path: "verification",
            name: "verification",
            component: verification,
            meta: {
              title: "修改支付密码"
            }
          },

          {
            path: "receivablelist",
            name: "receivablelist",
            component: receivablelist,
            meta: {
              title: "收款账户",
              keepAlive: true
            },
            children: [
              {
                path: "receivadetail",
                name: "receivadetail",
                component: (resolve) => {
                  import("@/views/user/fundsmanagement/detail").then(
                    (module) => {
                      resolve(module);
                    }
                  );
                },
                meta: {
                  title: "账户详情"
                }
              },
              {
                path: "addcard",
                name: "addcard",
                component: addcard,
                meta: {
                  title: "添加收款账户"
                },
                children: [
                  {
                    path: "cardsmscode",
                    name: "cardsmscode",
                    component: cardsmscode,
                    meta: {
                      title: "短信验证码"
                    },
                    children: [
                      {
                        path: "addcardsuccess",
                        name: "addcardsuccess",
                        component: addcardsuccess,
                        meta: {
                          title: "添加成功"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: "authentication",
        name: "authentication",
        component: authentication,
        meta: {
          title: "实名认证"
        }
      },
      {
        path: "setting",
        name: "setting",
        component: setting,
        meta: {
          title: "设置"
        },
        children: [
          {
            path: "setpwd",
            name: "setpwd",
            component: forgotpassword,
            meta: {
              title: "设置密码"
            }
          },
          {
            path: "changeName",
            name: "changeName",
            component: (resolve) => {
              import("@/views/user/setting/ChangeName").then((module) => {
                resolve(module);
              })
            },
            meta: {
              title: "昵称"
            }
          }
        ]
      },
      {
        path: "order",
        name: "order",
        component: order,
        children: [
          {
            path: ":id/:snType",
            name: "orderdetails",
            component: orderdetails,
            children: [
              {
                path: "steps",
                name: "steps",
                component: steps,
                meta: {
                  title: "查看物流",
                  keepAlive: false
                }
              }
            ],
            meta: {
              title: "订单详情"
            }
          }
        ],
        meta: {
          title: "我的订单",
          keepAlive: false
        }
      },
      {
        path: "huanorder",
        name: "huanorder",
        component: huanorder,
        children: [
          {
            path: ":id",
            name: "huanorder",
            component: huanorder,
            children: [
              {
                path: "steps",
                name: "steps",
                component: steps,
                meta: {
                  title: "查看物流",
                  keepAlive: false
                }
              }
            ],
            meta: {
              title: "订单详情"
            }
          }
        ],
        meta: {
          title: "我的订单",
          keepAlive: false
        }
      }
    ]
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: Detail,
    meta: {
      title: "商品详情页",
      keepAlive: false
    }
  },
  {
    path: "/evaluate/:id",
    name: "evaluate",
    component: evaluate,
    meta: {
      title: "商品评价",
      keepAlive: false
    }
  },
  {
    path: "/plorder",
    name: "plorder",
    component: plorder,
    meta: {
      title: "确认订单",
      keepAlive: true
    }
  },
  {
    path: "/Activityzone",
    name: "Activityzone",
    component: Activityzone,
    meta: {
      title: "活动专区"
    }
  },

  {
    path: "/downloadclm",
    name: "downloadclm",
    component: downloadclm,
    meta: {
      title: "下载"
    }
  },
  {
    path: "/shopapply",
    name: "shopapply",
    component: shopapply,
    meta: {
      title: "申请店铺",
      keepAlive: false
    }
  },
  {
    path: "/shopSucceed",
    name: "shopSucceed",
    component: shopSucceed,
    meta: {
      title: "开店成功",
      keepAlive: false
    }
  },
  {
    path: "/shopAudit",
    name: "shopAudit",
    component: shopAudit,
    meta: {
      title: "审核中",
      keepAlive: false
    }
  },
  {
    path: "/searchDetail",
    name: "searchDetail",
    component: searchDetail,
    meta: {
      title: "搜索详情页",
      keepAlive: true,
      tabbar: false
    }
  },

  {
    path: "/sarea",
    name: "sarea",
    component: (resolve) => {
      import("@/views/sarea/index").then((module) => {
        resolve(module);
      })
    },
    meta: {
      title: "抵用金专区",
      keepAlive: false
    }
  },
  {
    path: "/newExclusive",
    name: "newExclusive",
    component: (resolve) => {
      import("@/views/sarea/newExclusive").then((module) => {
        resolve(module);
      })
    },
    meta: {
      title: "新人专享",
      keepAlive: false
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "诚聊购"
    }
  },
  {
    path: "/smslogin",
    name: "smslogin",
    component: smslogin,
    meta: {
      title: "诚聊购"
    }
  },

  {
    path: "/paysuccess",
    name: "paysuccess",
    component: paysuccess,
    meta: {
      title: "诚聊购"
    }
  },

  {
    path: "/aliPay",
    name: "aliPay",
    component: aliPay,
    meta: {
      title: "诚聊购"
    }
  },

  {
    path: "/shop/:cityId?",
    name: "shop",
    component: shop,
    meta: {
      title: "店铺街"
      // keepAlive: true
    }
  },
  {
    path: "/shopinfo/:shopId",
    name: "shopinfo",
    component: shopinfo,
    meta: {
      title: "门店主页",
      keepAlive: true
    },
    children: [
      {
        path: "/shopinfo/shopCategory/:shopId",
        name: "shopCategory",
        component: shopCategory
      }
    ]
  },
  {
    path: "/forgotpassword",
    name: "forgotpassword",
    component: forgotpassword,
    meta: {
      title: "设置密码"
    }
  },
  {
    path: "/merchants",
    name: "merchants",
    component: merchants,
    children: [
      {
        path: "/merchants/shoppe",
        name: "shoppe",
        component: shoppe
      },
      {
        path: "/merchants/orderman",
        name: "orderman",
        component: orderman
      },
      {
        path: "/merchants/shopdecoration",
        name: "shopdecoration",
        component: shopdecoration
      },
      {
        path: "/merchants/information",
        name: "information",
        component: information
      }
    ],
    meta: {
      title: "商家管理",
      keepAlive: false
    }
  },
  {
    path: "/offcialSubsidy",
    name: "offcialSubsidy",
    component: offcialSubsidy,
    meta: {
      title: "官方补贴"
    }
  },
  {
    path: "/activityshop",
    name: "activityshop",
    component: activityshop,
    meta: {
      title: "活动店铺"
    }
  },
  {
    path: "/purchase",
    name: "purchase",
    component: purchase,
    meta: {
      title: "限时抢购"
    }
  },
  {
    path: "/purchase1",
    name: "purchase1",
    component: purchase1,
    meta: {
      title: "秒杀专区"
    }
  },
  {
    path: "/promotion",
    name: "promotion",
    component: promotion,
    meta: {
      title: "618大促"
    }
  },
  {
    path: "/promotionRules",
    name: "promotionRules",
    component: promotionRules,
    meta: {
      title: "活动规则"
    }
  },
  //88城市节
  {
    path: "/cityFestival",
    name: "cityFestival",
    component: cityFestival,
    meta: {
      title: "88羽石节"
    }
  },
  {
    path: "/cityRink",
    name: "cityRink",
    component: cityRink,
    meta: {
      title: "88羽石节专场"
    }
  },
  {
    path: "/rinkRule",
    name: "rinkRule",
    component: rinkRule,
    meta: {
      title: "排行奖励规则"
    }
  },
  {
    path: "/cityRules",
    name: "cityRules",
    component: cityRules,
    meta: {
      title: "活动规则"
    }
  },
  //新首页
  {
    path: "/purchase2",
    name: "purchase2",
    component: purchase2,
    meta: {
      title: "限时抢购"
    }
  },
  {
    path: "/award",
    name: "award",
    component: award,
    meta: {
      title: "幸运大抽奖"
    }
  },
  {
    path: "/luck",
    name: "luck",
    component: luck,
    meta: {
      title: "中奖记录"
    }
  },
  {
    path: "/awardDetails",
    name: "awardDetails",
    component: awardDetails,
    meta: {
      title: "活动规则"
    }
  },
  {
    path: "/scanner",
    name: "scanner",
    component: () => import("@/views/qrcode/scanner.vue")
  },
  {
    path: "/qrcode",
    name: "qrcode",
    component: () => import("@/views/qrcode/qrcode.vue"),
    meta: {
      title: "添加店员",
      requireAuth: true
    }
  },
  {
    path: "/bindPhone",
    name: "bindPhone",
    component: () => import("@/views/bindPhone/index.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/notFound/index.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  routes
});

let firstUrl = ""; // ios分享需要第一次进入页面的链接

// 注册一个全局守卫，作用是在路由跳转前，对路由进行判断，防止未登录的用户跳转到其他需要登录的页面去
router.beforeEach(async (to, from, next) => {
  if (isWeixin() && isIOS() && !firstUrl) {
    firstUrl = window.location.href;
    sessionStorage.setItem("firstUrl", firstUrl);
  }
  if (to.name == "sarea") {
    to.meta.title = to.query.title;
  }
  if (to.name == "search") {
    to.meta.title = to.query.title;
  }
  /*用token来判断是否在APP内，入口页面在detail.vue _gettokens()方法中 */
  // if (JSON.parse(localStorage.getItem('CLAPP'))) {
  //   to.meta['CLAPP'] = true
  // }

  /*路由发生改变修改页面的title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  const token = getUrlKey("token");
  const unionid = getUrlKey("unionid");
  const wechat_openid = getUrlKey("wechat_openid");
  // const isClApp = LukeappApi.IscltApp();
  const fullPath = to.fullPath;

  // 微信登录流程 -> 从诚聊那边获取用户信息 -> 使用unionId从诚聊购获取openId，导致页面会刷新两次
  // 判断是否刷新两次之后获取到的openId, 诚聊购返回的openId不会携带用户信息
  if (wechat_openid && !token && !unionid) {
    const locationSearch = localCache
      .getCache(LOCATIONSEARCH)
      ?.replace(/^\??&?/, "");
    const url = decodeURIComponent(window.location.href);
    // localCache.deleteCache(LOCATIONSEARCH);
    const newUrl =
      url + (url.includes("?") ? `&${locationSearch}` : `?${locationSearch}`);
    if (history.replaceState) {
      localCache.setCache("test", newUrl);
      history.replaceState(null, "", newUrl);
    } else {
      window.location.replace(newUrl);
    }
  }

  if (token) {
    localCache.setCache("wechat_openid", wechat_openid);
    removeUrlKey("wechat_openid");
    localCache.deleteCache(OPENID + unionid);

    const { errorCode, data } = await getValidatePhoneResult({ token });
    if (errorCode === 1 && !data) {
      localCache.setCache("token", token);
      removeUrlKey("token");
      store.commit(types.CHANGEVALIDATETOKEN, token);
      router.replace({ path: "/bindPhone", query: { redirect: fullPath } });
      return;
    }

    await store.dispatch("getUserInfoAction", { token, unionid });
    next();
    return;
  }

  const paySuccessRedirectUrl = getUrlKey("paySuccessRedirectUrl");
  paySuccessRedirectUrl &&
    localCache.setCache(PAYSUCCESSREDIRECTURL, paySuccessRedirectUrl);

  if (to.meta.requireAuth && !isWeixin()) {
    // 判断该路由是否需要登录权限
    let userinfo = getStorage("userinfo") || {};
    if (userinfo.token || token) {
      // 判断当前的token是否存在
      next();
    } else {
      // next({
      //   path: '/login'
      // })
      // router.replace('/login').catch(() => {})
      // router.push('/login').catch(() => {})
      router
        .replace({ path: "/smslogin", query: { redirect: fullPath } })
        .catch(() => { });
    }
  } else {
    next();

    getOpenId();

    // if (
    //   from.path != "/login" ||
    //   to.path == "/plorder" ||
    //   to.path == "/detail" ||
    //   to.path == "/index"
    // ) {
    //   getOpenId();
    // }
  }
});

router.afterEach(() => removeUrlKey("token"));

export default router;
