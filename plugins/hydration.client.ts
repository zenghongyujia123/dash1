export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const originalConsoleError = console.error
    console.error = (...args) => {
      // 忽略特定的 hydration 不匹配错误
      if (args.some(arg => typeof arg === 'string' && arg.includes('Hydration'))) {
        return
      }
      originalConsoleError.apply(console, args)
    }
  })
})