<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">API 演示</h1>
    
    <div class="space-y-4">
      <div class="p-4 border rounded">
        <h2 class="text-lg font-semibold mb-2">基础请求测试</h2>
        <div class="flex flex-wrap gap-2">
          <button 
            @click="testSuccessRequest"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            POST请求
          </button>
          <button 
            @click="testSuccessWithToast"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            POST请求(带通知)
          </button>
          <button 
            @click="testGetRequest"
            class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            GET请求
          </button>
        </div>
      </div>

      <div class="p-4 border rounded">
        <h2 class="text-lg font-semibold mb-2">其他HTTP方法测试</h2>
        <div class="flex flex-wrap gap-2">
          <button 
            @click="testPutRequest"
            class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            PUT请求
          </button>
          <button 
            @click="testDeleteRequest"
            class="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            DELETE请求
          </button>
        </div>
      </div>

      <div class="p-4 border rounded">
        <h2 class="text-lg font-semibold mb-2">错误处理测试</h2>
        <div class="flex flex-wrap gap-2">
          <button 
            @click="testServerError"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            服务器错误
          </button>
          <button 
            @click="testSuccessWithErrorMessage"
            class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            业务逻辑错误
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/utils/api'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()

const testSuccessRequest = async () => {
  try {
    const data = await api.post('/api/success', {
      test: 'data'
    })
    console.log('成功响应:', data)
    // 直接使用返回的数据，不再期望message字段
    toast({
      title: '请求成功',
      description: '操作已完成',
      variant: 'success'
    })
  } catch (error) {
    console.error('不应该出现的错误:', error)
    toast({
      title: '意外错误',
      description: error.message,
      variant: 'destructive'
    })
  }
}

const testServerError = async () => {
  try {
    await api.post('/api/error', {
      test: 'data'
    })
    // 如果没有抛出错误，这是不应该执行的
    console.log('不应该看到这个成功响应')
  } catch (error) {
    console.error('捕获的错误:', error)
    toast({
      title: '服务器错误',
      description: error.message || '发生了一个服务器错误',
      variant: 'destructive'
    })
  }
}

const testSuccessWithToast = async () => {
  try {
    // 使用showSuccess选项自动显示成功通知
    const data = await api.post('/api/success', {
      test: 'data'
    }, {
      showSuccess: true // 自动显示成功通知
    })
    console.log('成功响应(带通知):', data)
  } catch (error) {
    console.error('不应该出现的错误:', error)
  }
}

const testGetRequest = async () => {
  try {
    // 测试GET请求，带查询参数
    const data = await api.get('/api/get-test', {
      param1: 'value1',
      param2: 'value2'
    }, {
      showSuccess: true
    })
    console.log('GET请求成功:', data)
  } catch (error) {
    console.error('GET请求错误:', error)
  }
}

const testPutRequest = async () => {
  try {
    // 测试PUT请求
    const data = await api.put('/api/put-test', {
      id: 1,
      name: '更新的资源',
      updatedAt: new Date().toISOString()
    }, {
      showSuccess: true
    })
    console.log('PUT请求成功:', data)
  } catch (error) {
    console.error('PUT请求错误:', error)
  }
}

const testDeleteRequest = async () => {
  try {
    // 测试DELETE请求
    const data = await api.delete('/api/delete-test', {
      id: 1
    }, {
      showSuccess: true
    })
    console.log('DELETE请求成功:', data)
  } catch (error) {
    console.error('DELETE请求错误:', error)
  }
}

const testSuccessWithErrorMessage = async () => {
  try {
    const data = await api.post('/api/success-with-error', {
      test: 'data'
    })
    console.log('成功响应但包含错误:', data)
    
    // 由于我们现在直接返回data，需要检查data中是否包含错误信息
    if (data.error) {
      toast({
        title: '业务错误',
        description: data.error.message || '操作失败',
        variant: 'warning'
      })
    }
  } catch (error) {
    console.error('捕获的错误:', error)
    toast({
      title: '请求错误',
      description: error.message,
      variant: 'destructive'
    })
  }
}
</script>