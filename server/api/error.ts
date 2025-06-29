export default defineEventHandler(async (event) => {
  // 获取请求体
  const body = await readBody(event)
  
  // 抛出一个服务器错误
  throw createError({
    statusCode: 500,
    statusMessage: '服务器错误',
    message: '这是一个模拟的服务器错误'
  })
})