/*
 * @Date: 2022-11-10 15:13:45
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-11 17:26:14
 * @FilePath: \vite_vue2.7\vite.config.ts
 */
import { splitVendorChunkPlugin, UserConfigExport, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue2';
import legacy from '@vitejs/plugin-legacy';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock';
import postCssPxToRem from 'postcss-pxtorem'
import autoprefixer from 'autoprefixer'

import path from 'path';

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    base: './',
    server: {
      strictPort: false,
      port: 8080,
      host: '0.0.0.0',
      proxy: {
        '/clm': {
          target: 'https://marketing.lkkjjt.com/v1/',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/clm/, '')
        },
        '/clt': {
          target: 'https://sincere.lkkjjt.com/cltv3/',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/clt/, '')
        },
        '/clg': {
          target: 'http://192.168.3.49:8877',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/clg/, '')
        },
        '/pub': {
          target: 'https://api.lkkjjt.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/pub/, '')
        },
        '/blg': {
          target: 'https://blg.xiansuoapp.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/blg/, '')
        }
      }
    },
    css: {
      postcss: { // ⚠️关键代码
        plugins: [
          postCssPxToRem({ // 自适应，px>rem转换
            rootValue: 37.5, // 1rem的大小
            propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          }),
          autoprefixer({
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8"
              //'last 2 versions', // 所有主流浏览器最近2个版本
            ],
            grid: true
          })
        ]
      },
      preprocessorOptions: {
        scss: {
          // 两种方式都可以
          additionalData: '@import "@/assets/style/const.scss";'
          // additionalData: '@use "@/assets/scss/global.scss" as *;'
        }
      }
    },
    define: {
      'process.env': process.env
    },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: false,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `
      }),
      splitVendorChunkPlugin(),
      legacy({
        targets: ['defaults', 'not ie < 9']
      }),
      Components({
        resolvers: [VantResolver()]
      })
    ],
    build: {
      target: 'es2015',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            'element-ui': ['element-ui']
          }
        }
      }
    },
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: ''
        },
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        },
        {
          find: 'api',
          replacement: path.resolve(__dirname, 'src/api')
        }
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    }
  };
};
