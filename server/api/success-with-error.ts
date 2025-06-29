export default defineEventHandler(async (event) => {
  // 获取请求体
  const body = await readBody(event)
  
  // 返回带有错误消息的成功响应
  return {
    success: false,
    message: '操作失败',
    error: {
      code: 'BUSINESS_ERROR',
      message: '这是一个业务逻辑错误',
      details: '虽然HTTP状态码是200，但操作实际上失败了'
    },
    data: null
  }
})