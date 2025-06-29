<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">全局API演示</h1>
    
    <div class="space-y-4">
      <div class="flex space-x-2">
        <Button @click="testGlobalApi">测试全局API</Button>
        <Button @click="testComposable">测试Composable中使用</Button>
      </div>
      
      <div v-if="result" class="mt-4">
        <h2 class="text-xl font-semibold mb-2">结果：</h2>
        <pre class="bg-gray-100 p-4 rounded">{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'

const result = ref<any>(null)

// 使用注入的全局API
function testGlobalApi() {
  const nuxtApp = useNuxtApp()
  
  nuxtApp.$api.post('/api/success', {
    test: 'global api test'
  }, {
    showSuccess: true
  }).then(data => {
    result.value = data
    console.log('全局API调用成功:', data)
  }).catch(error => {
    console.error('全局API调用失败:', error)
  })
}

// 使用我们创建的useApi composable
async function testComposable() {
  try {
    // 使用useApi composable
    const api = useApi()
    const data = await api.get('/api/success')
    result.value = data
    console.log('使用useApi composable调用成功:', data)
  } catch (error) {
    console.error('测试失败:', error)
  }
}
</script>