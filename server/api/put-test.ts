export default defineEventHandler(async (event) => {
  // 获取请求体数据
  const body = await readBody(event)
  
  // 返回成功响应
  return {
    success: true,
    message: 'PUT请求成功',
    data: {
      updatedResource: body,
      timestamp: new Date().toISOString()
    }
  }
})