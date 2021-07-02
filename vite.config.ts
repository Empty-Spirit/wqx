import { ConfigEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
const resolve = require("path")

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    server: {
      // 是否开启 https
      https: false,
      // 默认localhost
      host: "0.0.0.0",
      /**
       * 端口号
       * @default 3000
       */
      port: 8080,
      // 浏览器自动打开
      open: true,
      // 本地跨域代理
      proxy: {
        "/test": {
          target: 'http://localhost:80/wqx/public/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/test/, '')
        }
      },
    },
    plugins: [vue()],
    resolve: {
      alias: [
        { find: "@", replacement: resolve.resolve(__dirname, 'src') }
      ]
    }
  }
}


// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path';

// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, "src") //设置别名
//     }
//   },
//   base: './',
//   server: {
//     host: 'localhost',
//     port: 8080,
//     open: true,
//     proxy: {
//       "/test": {
//         target: 'http://stzbxinghe.com/wqx/php/public/',
//         changeOrigin: true,
//         rewrite: path => path.replace(/^\/test/, '')
//       }
//     },
//   },
// })