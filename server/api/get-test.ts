export default defineEventHandler(async (event) => {
  // 获取查询参数
  const query = getQuery(event)
  
  // 返回成功响应
  return {
    success: true,
    message: 'GET请求成功',
    data: {
      queryParams: query,
      timestamp: new Date().toISOString()
    }
  }
})