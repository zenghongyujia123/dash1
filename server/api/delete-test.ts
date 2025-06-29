export default defineEventHandler(async (event) => {
  // 获取请求体数据
  const body = await readBody(event)
  
  // 返回成功响应
  return {
    success: true,
    message: '删除成功',
    data: {
      deletedId: body.id,
      deletedAt: new Date().toISOString()
    }
  }
})