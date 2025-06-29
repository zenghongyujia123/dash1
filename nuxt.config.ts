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
      title: 'Dash1 - Your Modern Dashboard',
      titleTemplate: '%s | Dash1',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Dash1 is a modern dashboard application with powerful features for data management and visualization' },
        { name: 'keywords', content: 'dashboard, analytics, data visualization, management, modern UI' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Dash1 - Your Modern Dashboard' },
        { property: 'og:description', content: 'Dash1 is a modern dashboard application with powerful features for data management and visualization' },
        { property: 'og:image', content: '/dash1/social-card.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Dash1 - Your Modern Dashboard' },
        { name: 'twitter:description', content: 'Dash1 is a modern dashboard application with powerful features for data management and visualization' },
        { name: 'twitter:image', content: '/dash1/social-card.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/dash1/favicon.ico' }
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