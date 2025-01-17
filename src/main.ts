import { createApp } from 'vue'
import VueGridLayout from 'vue-grid-layout'
import { i18n } from '@/lang'
import App from './App.vue'
import store from './store'
import '@/assets/element-modules.scss'
import '@/assets/global.scss'
import {
  ElRadioGroup,
  ElRadio,
  ElInput,
  ElOption,
  ElSelect,
  ElForm,
  ElFormItem,
  ElInputNumber,
  ElIcon,
  ElColorPicker,
  ElSwitch,
  ElTooltip,
  ElAlert,
  ElCheckbox,
  ElImage,
  ElTabs,
  ElTabPane,
  ElDatePicker
} from 'element-plus'
import EasyDialog from '@/components/Global/EasyDialog.vue'
import Icon from '@/components/Tools/Icon.vue'

if (import.meta.env.PROD) {
  // 强制重定向到https
  if (window?.location?.protocol === 'http:') {
    window.location.href = window.location.href.replace('http', 'https')
  }
  // 开启ServiceWorker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
    });
  }
  // 判断当前是否为Edge扩展, 更换Favicon
  const isEdgeExtension = window.location.href.includes('chrome-extension') && window.navigator.userAgent.includes('Edg/')
  if (isEdgeExtension) {
    const iconRel = document.querySelector('link[rel="icon"]')
    iconRel?.setAttribute('href', 'favicon-edge.png')
  }
}

const app = createApp(App)
app.use(store)
app.use(i18n)

const components = [
  ElRadioGroup,
  ElRadio,
  ElInput,
  ElOption,
  ElSelect,
  ElForm,
  ElFormItem,
  ElInputNumber,
  ElIcon,
  ElColorPicker,
  ElSwitch,
  ElTooltip,
  ElAlert,
  ElCheckbox,
  ElImage,
  ElTabs,
  ElTabPane,
  ElDatePicker,
]
components.map(component => {
  app.use(component)
})
app.use(VueGridLayout)
app.component('EasyDialog', EasyDialog)
app.component('Icon', Icon)

const globalLoading = document.querySelector('#globalLoading')
if (globalLoading) {
  globalLoading.parentNode?.removeChild(globalLoading)
}

app.mount('#app')
