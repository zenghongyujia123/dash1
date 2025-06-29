/**
 * API工具的Composable函数
 * 提供了一种更方便的方式来使用API功能
 */
export function useApi() {
  const nuxtApp = useNuxtApp()
  
  return nuxtApp.$api
}