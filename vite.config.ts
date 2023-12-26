import { defineConfig } from 'vite'
import { resolve } from 'path'
import Vue from '@vitejs/plugin-vue'
import VueJSX from '@vitejs/plugin-vue-jsx'
import VueMarkdown from 'vite-plugin-md'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
// import { visualizer } from 'rollup-plugin-visualizer'

let base = '/'
if (process.env.VITE_APP_BUILD_MODE === 'crx') base = './'
if (process.env.VITE_APP_BUILD_MODE === 'cdn') base = 'https://cdn.kongfandong.cn/howdz/dist/'

/** 跨域代理重写 */
const regExps = (value: string, reg: string): string => {
  return value.replace(new RegExp(`^${reg}`, "g"), "");
};


// https://vitejs.dev/config/
export default defineConfig({
  base,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
    }
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-i18n',
      'pinia',
      'pinia-plugin-persistedstate',
      'vue-grid-layout',
      'element-plus',
      'vuedraggable',
      '@howdyjs/to-control',
      '@howdyjs/mouse-menu',
      'dayjs'
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@use "@/assets/element-variables" as *;'
        // additionalData: "@import '@/assets/variables.scss';"
      }
    }
  },
  plugins: [
    Vue({ include: [/\.vue$/, /\.md$/] }),
    VueJSX(),
    VueMarkdown(),
    VueI18n({ include: resolve(__dirname, 'src/lang/locales/**') })
    // visualizer()
  ],
  build: {
    outDir: process.env.VITE_APP_BUILD_MODE === 'crx' ? 'crx' : 'dist'
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8002",
        // target: "http://139.199.175.149/",
        // ws: true,
        rewrite: (path: string) => regExps(path, "/api"),
        changeOrigin: true
      },
      '/baidu-api': {
        target: 'https://suggestion.baidu.com/',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/baidu-api/, '')
      },
      // '/api': {
      //   target: 'https://kongfandong.cn',
      //   changeOrigin: true,
      //   rewrite: (path: string) => path.replace(/^\/api/, '')
      // }
    }
  }
})
