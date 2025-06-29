export default defineEventHandler(async (event) => {
  // 获取请求体
  const body = await readBody(event)
  
  // 返回成功响应
  return {
    success: true,
    message: '请求成功',
    data: {
      requestData: body,
      timestamp: new Date().toISOString()
    }
  }
})