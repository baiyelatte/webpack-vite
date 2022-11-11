import {
  get,
  post,
  pubPost,
  pubGet,
  cltGet,
  clmPost,
  clmGet,
  blgGet
} from "./service";
import { clmApkUrl } from "./config";

const headers = [
  { "Content-Type": "multipart/form-data;charset=utf-8" },
  { "Content-Type": "application/json; charset=UTF-8" },
  { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
];

const goodsRestriction = get("/app/homeActivity/list");

// 秒杀
const selectGood = post("/app/goods/selectGoodInfo");
// 直播
const goodsAssociated = post("/app/goods/goodsAssociated/list");
//官方补贴
const officialSubsidy = get("/app/activity/officialSubsidy/goodsList");
//主播信息
const userGetFlag = post("/app/user/getFlag");

const pwlogin = post("/app/user/pwlogin"); // 用户密码登录
const modifyPwd = post("/app/user/modifyPwd"); // 重置密码
const setPwd = post("/app/user/setPwd"); // 设置密码
const smscode = get("/app/user/smscode"); // 发送验证码
const codelogin = post("/app/user/codelogin"); // 短信码登录/注册
const getcards = get("/unionpay/credit/cards"); // 信用卡列表
const createOrder = post("/unionpay/createOrder"); // 消费下单
const getSetting = get("/unionpay/getSetting"); // 获取用户设置信息
const withdraw = post("/unionpay/setting/withdraw"); // 设置提现方式
const tradefree = post("/unionpay/tradefree"); // 刷卡消费计算手续费

const getsSlideshow = get("/index/getsSlideshow"); // 获取轮播图
const getrecommend = get("/index/recommend"); // 商品推荐
const getqueryShop = get("/index/queryShop"); // 店铺列表查询
const getactivityZone = get("/index/activityZone");
const getluck = get("/app/activity/activityList");
const userluck = get("/app/activity//luckDraw/record");
const getGoodsInfo = get("/app/goods/getGoodsInfo"); // 商品推荐
const getsGoodsSku = get("/app/goods/getsGoodsSku"); // 获取商品规格(sku)
const getsGoodsCateLevel = get("/index/getsGoodsCateLevel"); // 获取 商品分类列表
const getActivityTime = get("/app/goods/getPromotionGoods"); //限时抢购
const updateActivityTime = post("/goods/goodsInfo/updatePromotionGoodsInfo");
const getUserInfo = post("/app/user/getUserInfo"); // 获取当前登录会员信息
const updateBase = post("/app/user/updateBase"); // 更新会员信息
const getsUserAddress = post("/app/user/getsUserAddress"); // 获取 会员收货地址
const addUserAddress = post("/app/user/addUserAddress"); // 新增会员收货地址
const delUserAddress = post("/app/user/delUserAddress"); // 删除会员地址
const updateUserAddress = post("/app/user/updateUserAddress"); // 删除会员地址
const getsOrderSimple = post("/app/order/getsOrderSimple"); // 我的订单列表
const getQuery = post("/index/query"); // 搜索
const getsGoodsTag = post("/index/getsGoodsTag"); // 获取商品标签
const getKingDirectList = get("/app/home/kingDirect/list"); // 金刚区
const submitTrade = post("/app/trade/submitTrade", headers[1], "json"); // 提交订单
const uploadFile = post("/app/system/uploadFile", headers[0], "file"); // 上传文件(图像)
const save = post("/app/shop/save"); // 商家入驻[提交]
const countOrderStatusNum = get("/app/order/countOrderStatusNum"); // 汇总我的订单状态数量
const shoppingCart = post("/app/shoppingCart/buy"); // 商品购买

const createPayV2 = post("/app/trade/v2/createPay"); // 发起支付v2版本
const createPay = post("/app/trade/createPay"); // 支付发起/createCombinedPay
// const createPay = post('/app/trade/createCombinedPay') // 支付发起/createCombinedPay
const getShopStatus = get("/app/shop/getShopStatus"); // 获取店铺状态
const postoperation = post("/app/order/operation"); // 确认收货
const postodelete = post("/app/order/delete"); // 删除订单
const postorderEvaluate = post("/app/order/orderEvaluate", headers[1], "json"); // 订单评价
const postgetOrder = post("/app/order/getOrder"); // 获取订单详情
const applyAftersale = post("/app/aftersale/applyAftersale"); // 申请售后
const editAftersale = post("/app/aftersale/editAftersale"); // 修改售后
const revokeAftersale = post("/app/aftersale/revokeAftersale"); // 撤销售后
const getAftersale = post("/app/aftersale/get"); // 获取售后
const getShop = get("/index/getShop"); // 获取店铺信息
const getappShop = get("/app/shop/getShop"); // 获取店铺信息
const buyList = post("/app/shoppingCart/buyList", headers[1], "json"); // 商品批量购买
const getsSearchKey = get("/index/getsSearchKey"); // 获取查询关键字
const getsGoodsEvaluate = get("/app/goods/getsGoodsEvaluate"); // 获取商品评价
const getExpressDetail = get("/app/trade/getExpressDetail"); // 查看物流详情
const getcheckPay = get("/app/trade/checkPay"); // 校验是否支付成功
const postuserIdentAuthentic = post(
  "/app/system/userIdentAuthentic",
  headers[0],
  "file"
); // 会员身份认证
const getAudit = post("/app/aftersale/auditMerchantRefund"); // 审核申请商家提议的退款
const logout = post("/app/user/logout"); // 会员退出登陆
const getUserAccountMoney = post("/app/user/getUserAccountMoney"); // 查看我的钱包
const getUserAccountMoneyLog = post("/app/user/getUserAccountMoneyLog"); // 获取我的余额明细
const getsBankInfo = post("/index/getsBankInfo"); // 获取银行列表
const addAccount = post("/app/user/addAccount"); // 添加收款账户
const addAccountSendSmscode = post("/app/user/addAccountSendSmscode"); // 添加会员账户发送验证码
const getsAccount = get("/app/user/getsAccount"); // 收款账户列表
const addWithdraw = post("/app/user/addWithdraw"); // 余额提现
const getOpenIdUrl = get("/app/user/getOpenIdUrl"); // 获取openId
const getWithdraw = get("/app/user/getWithdraw"); // 获取提现详情
const getsWithdraw = get("/app/user/getsWithdraw"); // 提现列表
const createPayBySavings = post("/app/trade/createPayBySavings"); // 会员充值钱包(余额)
// const checkUserIdentAuthStatus = get("/app/user/checkUserIdentAuthStatus"); // 校验当前登陆用户是否已实名认证
const checkUserIdentAuthStatus = (token) =>
  post("/app/user/checkUserIdentAuthStatus?token=" + token, headers[1], null);

const getUserIdentAuthentic = get("/app/user/getUserIdentAuthentic"); // 获取当前会员身份证信息
const deleteAccount = get("/app/user/deleteAccount"); // 解绑账户
const getUserIdentAuthenticInfo = post(
  "/app/system/getUserIdentAuthenticInfo",
  headers[0],
  "file"
); // 识别身份证信息
const addPaymentPassWord = post("/app/user/addPaymentPassWord"); // 设置支付密码
const changePaymentPassWord = post("/app/user/changePaymentPassWord"); // 修改支付密码
const getOrder = post("/app/order/getOrder"); // 获取订单信息
const add = post("/app/shoppingCart/add"); // 购物车增加购买项
const returnShipments = post("/app/aftersale/returnShipments"); // 售后退货入口
const logistics = get("/app/logistics/list"); // 获取物流信息列表
const receiveShipments = get("/app/aftersale/receiveShipments"); // 确认收货入口
const activityShop = get("/index/activityShop"); //获取活动店铺
const recordList = get("/app/activity/luckDraw/recordList"); //中奖纪录列表
const luckDraw = get("/app/activity/luckDraw"); //用户抽奖
const userLotteryCount = get("/app/activity/userLotteryCount"); //双十一获取用户抽奖次数
const getRewardList = get("/app/activity/getRewardList"); //获取奖品列表
const activityList = get("/app/activity/activityList"); //获取活动列表
const repeatBuy = get("/app/order/repeatBuy"); //限时秒杀限制个数
const getShopLogo = post("/app/shop/getShopLogo"); // 获取店铺默认头像
const checkUserKill = post("/app/trade/checkUserKill"); // 检验秒杀是否达到上线
const wxSign = pubGet("/pub/wechatsharing"); // 微信签名
const getCouponList = post("/app/goods/getCouponList"); //获取优惠卷列表
const couponReceive = post("/app/goods/coupon/receive"); //领取优惠卷
const couponHold = post("/app/goods/coupon/hold"); //获取优惠券持有列表
const couponHoldList = post("/app/goods/coupon/holdList"); //获取可使用优惠券
const applyLogout = post("/app/user/applyLogout"); //注销账户
const goodsCollect = post("/app/goods/getAttention"); //商品收藏
const getGoodsCollect = post("/app/goods/getUserAttention"); //获取商品收藏列表
const checkPaymentPassWord = post("/app/user/checkPaymentPassWord"); //验证支付密码
const couponCancel = post("/app/goods/coupon/cancel"); //取消优惠券
const addshoppingCart = post("/app/shoppingCart/add"); // 添加购物车
const shoppingCartBuy = post("/app/shoppingCart/shoppingCartBuy"); // 购物车提交购买(提交订单的那个界面)
const getShoppingCart = get("/app/shoppingCart/getShoppingCart"); // 获取购物车
const shoppingremove = post("/app/shoppingCart/remove"); // 购物车 删除商品sku
const shoppchecked = post("/app/shoppingCart/checked"); // 购物车 全选
const shoppupdate = post("/app/shoppingCart/update"); // 购物车 单选或修改
const countMoney = post("/app/trade/countMoney", headers[1], "json"); // 购物车 计算统计
const shopAttention = post("/app/shop/attention"); //店铺关注
const shopNoAttention = post("/app/shop/noAttention"); //店铺取消关注
const shopshow = post("/app/shop/show"); //店铺关注列表
const createInviteCode = get("/app/inviteRegistry/createInviteCode"); // 获取邀请码
const couponActivity = get("/app/activity/couponActivity"); // 获取优惠券活动列表
const activityPageInfo = get("/app/inviteRegistry/activityPageInfo"); // 获取分享活动相关信息
const updateAwardShow = post("/app/inviteRegistry/updateAwardShow"); // 禁用红包弹出
const getProtocolPrivacy = post("/index/getProtocolPrivacy"); //获取隐私协议
const getProtocolServe = post("/index/getProtocolServe"); //获取用户协议
const getLocationLists = (token) =>
  clmPost("/uindex/lists?token=" + token, headers[2]); //本地商家列表
const tabAreaList = cltGet("/NewIndex/index"); //天气接口
const cityProper = cltGet("/address/cityProper"); //天气接口
const newTabAreaList = get("/api/getWeather"); //新首页天气接口
const hotCity = get("/app/newIndex/getHotCity"); // 获取热门城市
const addressSearch = post("/app/newIndex/getCity"); // 搜索接口
const recentSearch = get("/app/newIndex/getRecentCity"); //历史访问
const hotSearch = get("/uindex/hotsearch", process.env.VUE_APP_CLM_NETWORK); // 本地商家热门搜索
const searchLog = get("/uindex/searchlog", process.env.VUE_APP_CLM_NETWORK); // 本地商家历史搜索
const delSearchLog = get(
  "/uindex/delsearchlog",
  process.env.VUE_APP_CLM_NETWORK
); // 本地商家删除搜索
const getAndroidVersion = post("/app/ver/getVerInfo"); // 获取安卓版本号
const getLists = get("/app/activity/newUserBuy/list"); // 模拟新人专享商品列表
const getClmAndroidVersion = get("/merchant/index/getVerInfo", clmApkUrl); // 获取诚聊卖安卓版本号
const careChoose = post("/app/newIndex/careChoose"); // 首页精选 为你推荐
const getFeatureShop = get("/app/newIndex/getFeatureShop"); // 城市 特色店铺
const selectLiveGoods = post("/app/newIndex/anchorRecommend"); // 主播力荐
const getEnjoyUser = get("/app/newIndex/getEnjoyUser"); //获取分享人信息
const friendsRecommend = get("/app/newIndex/friendsRecommend"); //好友推荐 新首页
const applyJoin = get("/app/newIndex/apply"); // 员工申请加入店铺
const getGoodsLevel = get("/app/newIndex/getGoodsLevel"); // 城市 商品分类
const applyRecord = get("/app/newIndex/applyRecord"); // 申请加入店铺列表
const getCityType = get("/app/newIndex/getCityType"); // 首页城市分类
// const slideshow = get("/app/newIndex/getsSlideshow");  // 新版首页获取轮播图
const slideshow = get("/app/newIndex/getLevelSlideInfo"); // 新版首页获取轮播图
const getCityShop = get("/app/newIndex/cityShop"); // 店铺街 城市店铺
const cityRecommendGoods = get("/app/newIndex/cityRecommendGoods"); //城市下的推荐、好吃、好玩
const getGoodsTag = get("/app/newIndex/getGoodsTag"); //城市下的商品标签（推荐、好吃好玩等）
const getCityShopRecommend = get("/app/newIndex/cityShopRecommend"); // 城市店铺为您推荐
const getTabs = get("/app/newIndex/getOneLevel"); // 首页Tabs 一级
const getGoodsTabTwo = get("/app/newIndex/getGoodsType"); ///首页Tabs 二级
const getPromotionGoodsInfo = get("/app/newIndex/activity"); //限时抢购
const getNearShop = get("/app/newIndex/getNearShop"); //附近好店
const citySearch = get("/api/query"); //城市店铺搜索
const getArea = post("/app/newIndex/chooseArea"); //城市店铺地区选择
const cityShopList = get("/app/newIndex/getLevelFourCategory"); // 城市店铺列表
const getBrand = post("/index/queryByBrand"); //品牌查询
const brand = get("/app/home/brandFeatured/recommend"); //商品品牌查询 分页
const shopCate = post("/app/newIndex/getBranchAndGoodsLevel"); //分店商品类别
const shopGoods = post("/app/newIndex/getCityLevelGoods"); //热门城市下不同类别商品
const getAuthToken = pubPost("/auth/token", headers[2]); // 公共接口登录方法
const getOpenIdRequest = pubGet("/pub/wechatopenid"); // 获取openId
const phoneBindRequest = post("/app/phoneBind"); // 新用户绑定手机号码
const getValidatePhoneResult = post("/app/checkToken", headers[1]); // 鉴定用户是否绑定过手机号码
const promotionUrl = blgGet("/app/service-product/goods/getConductedGoods"); //618大促帮领购商品展示
const getFuncSwitch = get("/app/home/func/switch"); // 悬浮框查询
const getVSwitch = get("/app/home/v2/switch"); // 悬浮框查询
const getPayChannelList = post("/app/pay/channel/list"); // 获取支付通道列表
const getNewestOrder = get("/app/newIndex/getNewestOrder"); //获取最新30条订单
const getOpenState = get("/app/newIndex/shop/getOpenState"); //查询用户开店状态
const cityInfo = get("/app/activity/city/get"); //查询88城市节活动信息
const cityGoodsList = get("/app/activity/city/getGoodsList"); //88城市节商品列表
const rankList = post("/app/activity/city/getRankList"); ///88城市节排行榜
const getLoadShopCategory = get("/app/goods/loadShopCategory"); // 商城商家自定义商品类目
const getCategoryList = post("/app/shop/categoryList"); // 商城商家入驻店铺主营类目查询
const getAddressList = post("/app/shop/getAddressList"); // 商城商家入驻店铺地址查询
const getAllAddress = post("/app/shop/getAllAddress"); // 商城商家入驻店铺全部地址查询

//诚聊购新首页
const getCityShopV2 = post("/app/v2/cityShop/openCityList", headers[2]); // 已开通城市查询
const getTabMenuV2 = get("/app/v2/home/tabMenu"); // 首页类目菜单
const getCityRankPreviewV2 = get("/app/v2/home/cityRankPreview"); // 首页城市店铺排行榜
const getHotGoodsV2 = get("/app/v2/goods/query/hotSaleGoods"); // 热销推荐商品
const getRankIndexV2 = get("/app/v2/cityShop/rank/list"); // 城市店铺排行榜前三
const getQueryConditionV2 = post("/app/v2/goods/query/condition", headers[2]); // 店铺商品查询
const getCherryPickBrandV2 = get("/app/v2/home/cherryPickBrand"); // 精选品牌列表
const getQuertHotGoodsV2 = get("/app/v2/goods/query/hotSaleGoods"); // 热卖推荐
const getPreferredShopListV2 = get("/app/v2/speShop/preferredShop"); // 优选店铺
const getUserShopRankV2 = get("/app/v2/cityShop/rank/currentUserShopRank"); // 当前用户店铺的排名
const getNewUserBuyV2 = get("/app/activity/newUserBuy/homeAdvice"); //新人专享
const getKingDirectListV2 = get("/app/v2/home/kingDistrict"); // 金刚区
const getBunnerImgListV2 = get("/app/v2/home/banner"); // 轮播图
const getAllClassifyV2 = post("/app/v2/category/allGoodsCategory", headers[2]); // 全部分类
const getAddFeedback = post("/app/user/addFeedback", headers[2]); // 添加建议与反馈
export {
  getAddFeedback,
  getAllClassifyV2,
  getBunnerImgListV2,
  getKingDirectListV2,
  getAllAddress,
  getAddressList,
  getCategoryList,
  getNewUserBuyV2,
  getUserShopRankV2,
  getPreferredShopListV2,
  getQuertHotGoodsV2,
  getCherryPickBrandV2,
  getQueryConditionV2,
  getRankIndexV2,
  getHotGoodsV2,
  getCityRankPreviewV2,
  getTabMenuV2,
  getCityShopV2,
  getAudit,
  getLoadShopCategory,
  rankList,
  cityGoodsList,
  cityInfo,
  getOpenState,
  getNewestOrder,
  getPayChannelList,
  getFuncSwitch,
  getKingDirectList,
  promotionUrl,
  shopCate,
  shopGoods,
  brand,
  getBrand,
  recentSearch,
  newTabAreaList,
  citySearch,
  getArea,
  getNearShop,
  getPromotionGoodsInfo,
  getTabs,
  getGoodsTabTwo,
  getCityShop,
  cityShopList,
  cityRecommendGoods,
  getGoodsTag,
  getCityShopRecommend,
  getCityType,
  applyRecord,
  getGoodsLevel,
  applyJoin,
  slideshow,
  getEnjoyUser,
  friendsRecommend,
  selectLiveGoods,
  getFeatureShop,
  careChoose,
  getValidatePhoneResult,
  getOpenIdRequest,
  phoneBindRequest,
  getAuthToken,
  tabAreaList,
  cityProper,
  hotCity,
  addressSearch,
  getLists,
  getClmAndroidVersion,
  getAndroidVersion,
  delSearchLog,
  searchLog,
  hotSearch,
  getLocationLists,
  getProtocolPrivacy,
  getProtocolServe,
  updateAwardShow,
  activityPageInfo,
  couponActivity,
  createInviteCode,
  shopshow,
  shopNoAttention,
  shopAttention,
  couponCancel,
  checkPaymentPassWord,
  getGoodsCollect,
  goodsCollect,
  applyLogout,
  couponHoldList,
  selectGood,
  couponHold,
  couponReceive,
  getCouponList,
  userLotteryCount,
  checkUserKill,
  getShopLogo,
  repeatBuy,
  receiveShipments,
  add,
  logistics,
  returnShipments,
  getOrder,
  changePaymentPassWord,
  addPaymentPassWord,
  getUserIdentAuthenticInfo,
  deleteAccount,
  getUserIdentAuthentic,
  checkUserIdentAuthStatus,
  createPayBySavings,
  getsWithdraw,
  getWithdraw,
  getOpenIdUrl,
  addWithdraw,
  getsAccount,
  addAccountSendSmscode,
  addAccount,
  getsBankInfo,
  getUserAccountMoneyLog,
  getUserAccountMoney,
  logout,
  pwlogin,
  modifyPwd,
  setPwd,
  smscode,
  codelogin,
  getcards,
  createOrder,
  getSetting,
  withdraw,
  tradefree,
  getsSlideshow,
  getrecommend,
  getqueryShop,
  getGoodsInfo,
  getsGoodsSku,
  getsGoodsCateLevel,
  getUserInfo,
  updateBase,
  getsUserAddress,
  addUserAddress,
  delUserAddress,
  updateUserAddress,
  getQuery,
  getsOrderSimple,
  getsGoodsTag,
  submitTrade,
  uploadFile,
  save,
  postodelete,
  countOrderStatusNum,
  shoppingCart,
  addshoppingCart,
  shoppingCartBuy,
  getShoppingCart,
  shoppchecked,
  shoppingremove,
  shoppupdate,
  createPayV2,
  createPay,
  getShopStatus,
  postoperation,
  postorderEvaluate,
  postgetOrder,
  applyAftersale,
  editAftersale,
  revokeAftersale,
  getAftersale,
  getShop,
  buyList,
  getappShop,
  getsSearchKey,
  countMoney,
  getsGoodsEvaluate,
  getExpressDetail,
  getcheckPay,
  postuserIdentAuthentic,
  activityShop,
  getActivityTime,
  updateActivityTime,
  getactivityZone,
  getluck,
  userluck,
  recordList,
  luckDraw,
  getRewardList,
  activityList,
  wxSign,
  goodsAssociated,
  officialSubsidy,
  goodsRestriction,
  userGetFlag,
  getVSwitch
};
