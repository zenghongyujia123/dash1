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
    ['@unocss/nuxt', {
      ssr: true,
      presets: [
        // 确保包含你使用的预设
      ]
    }],
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
  ],

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'en',
        file: 'en.json'
      },
      {
        code: 'zh',
        file: 'zh.json'
      }
    ],
    lazy: true,
    sync: true,
    skipSettingLocaleOnNavigate: false,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/main.css',
  ],
  imports: {
    dirs: [
      './lib',
    ],
  },

  compatibilityDate: '2024-12-14',
})