/*
 * @Date: 2022-11-11 17:31:56
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-11 17:40:49
 * @FilePath: \vite_vue2.7\postcss.config.cjs
 */
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 10 versions', // 所有主流浏览器最近10版本用
      ],
      grid: true,
    },
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，这里设置为['*']全部，假设需要仅对边框进行设置
    },
  },
}