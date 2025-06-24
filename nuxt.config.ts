// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 3002
  },
  app: {
    // 硬编码的基础URL
    baseURL: '/dash1/',
    // 确保资源路径正确
    buildAssetsDir: '/dash1/_nuxt/',
    // 设置应用的头部配置
    head: {
      title: 'Dash1',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  modules: [
    '@unocss/nuxt',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],

  css: [
    '@unocss/reset/tailwind.css',
  ],
  imports: {
    dirs: [
      './lib',
    ],
  },

  compatibilityDate: '2024-12-14',
})