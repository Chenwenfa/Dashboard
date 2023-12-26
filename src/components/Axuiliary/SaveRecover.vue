<script setup lang='ts'>
import { ref,reactive } from 'vue'
import { useStore } from '@/store'
import { ElNotification } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useStore()
let showPage = ref(false)
let loading = ref(false)

let recoverObj = reactive({
  config1:null,
  config2:null,
  config3:null,
})

const handleExportJson = async (index:string) => {
  loading.value = true
  try {
    const {
      list,
      affix,
      global,
      showBackgroundEffect,
      showRefreshBtn,
      tabList,
      showTabSwitchBtn,
      enableKeydownSwitchTab,
      backgroundEffectActive
    } = store
    const dataToString = JSON.stringify(
      {
        list,
        affix,
        global,
        showBackgroundEffect,
        showRefreshBtn,
        tabList,
        showTabSwitchBtn,
        enableKeydownSwitchTab,
        backgroundEffectActive
      },
      null,
      2
    )
    recoverObj[index] = dataToString
    saveJson()
  } catch (e) {
    loading.value = false
    ElNotification({
      title: '异常',
      type: 'error',
      message: (e as Error).toString()
    })
  }
}

const saveJson=async ()=>{
    const res = await fetch('/api/dashboard/editDashboard', {
    method: 'POST',
    body: JSON.stringify(recoverObj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await res.json()
  if(json.code === "0") {
    ElNotification({
      title: "提示",
      type: 'success',
      message: "保存成功"
    })
  } else {
    ElNotification({
      title: '提示',
      type: 'error',
      message: "保存失败"
    })
  }
  loading.value = false
}

const recoverConfig = (index:string)=>{
  if(recoverObj[index]) {
    try {
          const json = recoverObj[index]
          if (confirm("设别成功，配置会覆盖本地浏览器历史数据，是否继续？")) {
            loading.value = true
            updateConfig(json)
          }
        } catch {
          ElNotification({
            title: '提示',
            type: 'error',
            message: "出现异常"
          })
        }
  } else {
    ElNotification({
      title: '提示',
      type: 'error',
      message: "不存在已经保存的模板"
    })
  }

}

const saveConfig = (index:string)=>{
  if(recoverObj[index]) {
    if (confirm(`模板${index}存在数据是否覆盖？`)) {
      handleExportJson(index)
    }
  } else {
    handleExportJson(index)
  }
}

const  init= async ()=>{
  const res = await fetch('/api/dashboard/getDashboard')
  if(res.status===200) {
    const dashboardRes = await res.json()
    if(dashboardRes.code === "0") {
      showPage.value = true
      if(dashboardRes.data) {
        const data = dashboardRes.data
        recoverObj.config1 = JSON.parse(data.config1)
        recoverObj.config2 = JSON.parse(data.config2)
        recoverObj.config3 = JSON.parse(data.config3)
      }
    } else {
      showPage.value = false
    }
  }
}

const updateConfig = (data: any) => {
  const {
    list,
    affix,
    global,
    showBackgroundEffect,
    showRefreshBtn,
    tabList,
    showTabSwitchBtn,
    enableKeydownSwitchTab,
    backgroundEffectActive
  } = data
  store.updateStates([
    { key: 'tabList', value: tabList },
    { key: 'list', value: list },
    { key: 'affix', value: affix },
    { key: 'showBackgroundEffect', value: showBackgroundEffect },
    { key: 'showRefreshBtn', value: showRefreshBtn },
    { key: 'showTabSwitchBtn', value: showTabSwitchBtn },
    { key: 'enableKeydownSwitchTab', value: enableKeydownSwitchTab },
    { key: 'backgroundEffectActive', value: backgroundEffectActive }
  ])
  store.updateGlobal(global)
  ElNotification({
    title: t('提示'),
    type: 'success',
    message: t('配置成功')
  })
  loading.value = false
}
init()
</script>

<template>
    <div class="wrapper">
      <template v-if="showPage">
        <div class="export">
          <div class="title">保存</div>
          <div>
            <button
                type="button"
                class="btn btn-primary"
                style="margin: 0 4px 4px"
                @click="saveConfig('config1')"
                :loading="loading"
              >
              保存模板1
            </button>
            <button
                type="button"
                class="btn btn-primary"
                style="margin: 0 4px 4px"
                @click="saveConfig('config2')"
                :loading="loading"
              >
              保存模板2
            </button>
            <button
                type="button"
                class="btn btn-primary"
                style="margin: 0 4px 4px"
                @click="saveConfig('config3')"
                :loading="loading"
              >
              保存模板3
            </button>
          </div>
        </div>
        <hr class="hr" />
        <div class="import">
          <div class="title">恢复</div>
          <div>
            <button
                type="button"
                class="btn btn-primary"
                style="margin: 0 4px 4px"
                @click="recoverConfig('config1')"
                :loading="loading"
              >
              恢复模板1
            </button>
            <button
                type="button"
                class="btn btn-primary"
                style="margin: 0 4px 4px"
                @click="recoverConfig('config2')"
                :loading="loading"
              >
              恢复模板2
            </button>
            <button
                type="button"
                class="btn btn-primary"
                style="margin: 0 4px 4px"
                @click="recoverConfig('config3')"
                :loading="loading"
              >
              恢复模板3
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        使用该功能请先前往登录页进行登录: <a target="_blank" href="http://www.fair2.top/Blog/#/login">http://www.fair2.top/Blog/#/login</a>
      </template>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 10px;
  .export,
  .import {
    .title {
      color: $color-grey1;
      margin-bottom: 8px;
      position: relative;
      font-weight: bold;
      display: inline-block;
      &:after {
        position: absolute;
        content: '';
        left: 0;
        width: 100%;
        bottom: 0;
        height: 8px;
        background: rgba(233, 174, 49, 0.2);
      }
    }
  }
}
</style>
