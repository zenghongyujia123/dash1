# API 使用指南

本项目提供了多种方式来使用API功能，您可以根据自己的喜好和需求选择最适合的方式。

## 方式一：直接导入API实例

这是最基本的使用方式，您需要在每个需要使用API的组件中导入`api`实例。

```typescript
import { api } from '@/utils/api'

// 在组件中使用
async function fetchData() {
  try {
    const data = await api.get('/api/endpoint')
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

## 方式二：使用全局注入的API

通过Nuxt插件系统，我们已经将`api`实例注入到了全局上下文中，您可以在任何组件中通过`useNuxtApp().$api`来访问它。

```typescript
// 在组件中使用
function fetchData() {
  const nuxtApp = useNuxtApp()
  
  nuxtApp.$api.get('/api/endpoint')
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
}
```

## 方式三：使用useApi Composable（推荐）

我们提供了一个`useApi` composable函数，它是对全局API的封装，使用起来更加方便。

```typescript
// 在组件中使用
async function fetchData() {
  try {
    const api = useApi()
    const data = await api.get('/api/endpoint')
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

## API方法

无论您选择哪种方式使用API，都可以使用以下方法：

### GET请求

```typescript
api.get<ResponseType>(url, options?)
```

### POST请求

```typescript
api.post<ResponseType>(url, data?, options?)
```

### PUT请求

```typescript
api.put<ResponseType>(url, data?, options?)
```

### DELETE请求

```typescript
api.delete<ResponseType>(url, options?)
```

## 选项

所有API方法都接受一个可选的`options`对象，可以包含以下属性：

- `headers`: 请求头
- `params`: URL参数
- `timeout`: 超时时间（毫秒）
- `showSuccess`: 是否显示成功通知（默认为`false`）
- `showError`: 是否显示错误通知（默认为`true`）
- `errorTitle`: 错误通知的标题（默认为"错误"）

## 示例

### 基本使用

```typescript
const api = useApi()

// GET请求
const userData = await api.get('/api/user/1')

// POST请求
const newUser = await api.post('/api/user', {
  name: '张三',
  email: 'zhangsan@example.com'
})

// PUT请求
const updatedUser = await api.put('/api/user/1', {
  name: '张三（已更新）'
})

// DELETE请求
await api.delete('/api/user/1')
```

### 带选项的请求

```typescript
const api = useApi()

// 显示成功通知
const result = await api.post('/api/action', data, {
  showSuccess: true
})

// 自定义请求头
const data = await api.get('/api/protected', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

// URL参数
const searchResults = await api.get('/api/search', {
  params: {
    q: '关键词',
    page: 1
  }
})
```

### 错误处理

```typescript
const api = useApi()

try {
  const data = await api.get('/api/might-fail')
  // 处理成功响应
} catch (error) {
  // 处理错误
  console.error('请求失败:', error.message)
}
```