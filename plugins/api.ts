import { defineNuxtPlugin } from '#app'
import { api } from '@/utils/api'

export default defineNuxtPlugin((nuxtApp) => {
  // 将api实例注入到Nuxt应用中
  nuxtApp.provide('api', api)
})

// 为TypeScript声明类型
declare module '#app' {
  interface NuxtApp {
    $api: typeof api
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: typeof api
  }
}