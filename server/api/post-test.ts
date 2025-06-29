export default defineEventHandler(async (event) => {
  // 获取请求体数据
  const body = await readBody(event)
  
  // 返回成功响应
  return {
    success: true,
    message: 'POST请求成功',
    data: {
      createdResource: body,
      timestamp: new Date().toISOString()
    }
  }
})