import { toast } from '@/components/ui/toast/use-toast'
import { $fetch } from 'ofetch'

interface ApiResponse<T = any> {
  data?: T
  success?: boolean
  message?: string
  err_msg?: string
  error?: {
    code?: string
    message?: string
    details?: string
  }
  [key: string]: any
}

interface ApiOptions {
  showError?: boolean  // 是否显示错误提示，默认true
  showSuccess?: boolean  // 是否显示成功提示，默认false
  headers?: Record<string, string>  // 自定义请求头
  customErrorHandler?: (error: any) => void  // 自定义错误处理函数
}

const defaultOptions: ApiOptions = {
  showError: true,
  showSuccess: false
}

class Api {
  private baseURL: string

  constructor(baseURL: string = '') {
    this.baseURL = baseURL
  }

  /**
   * 通用请求方法
   * @param method HTTP方法
   * @param url 请求地址
   * @param data 请求数据或查询参数
   * @param options 请求选项
   * @returns Promise
   */
  private async request<T = any>(
    method: string,
    url: string,
    data?: any,
    options: ApiOptions = defaultOptions
  ): Promise<T> {
    const finalOptions = { ...defaultOptions, ...options }
    let finalUrl = this.baseURL + url
    
    // 如果是GET请求且有数据，将数据转换为查询参数
    if (method === 'GET' && data) {
      const queryString = Object.entries(data)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&')
      
      finalUrl += (finalUrl.includes('?') ? '&' : '?') + queryString
    }

    try {
      // 添加请求日志
      console.log('API请求URL:', finalUrl)
      console.log('API请求方法:', method)
      console.log('API请求数据:', data)
      console.log('API请求选项:', finalOptions)
      
      const response = await $fetch<ApiResponse<T>>(finalUrl, {
        method,
        // 只有非GET请求才设置body
        body: method !== 'GET' ? data : undefined,
        headers: {
          'Content-Type': 'application/json',
          ...finalOptions.headers
        }
      })

      // 检查是否存在明确的错误
      if (response.err_msg || response.error?.message) {
        const errorMessage = response.err_msg || response.error?.message || '操作失败'
        
        if (finalOptions.showError) {
          toast({
            title: '错误',
            description: errorMessage,
            variant: 'destructive'
          })
        }

        if (finalOptions.customErrorHandler) {
          finalOptions.customErrorHandler(response)
        }

        throw new Error(errorMessage)
      }

      // 显示成功通知
      if (finalOptions.showSuccess && response.msg) {
        toast({
          title: '成功',
          description: response.msg,
          variant: 'success'
        })
      }

      // 添加调试日志
      console.log('API响应原始数据:', response)
      
      // 直接返回整个响应对象，不做任何处理
      console.log('API返回结果:', response)
      return response as T
    } catch (error: any) {
      // 处理网络错误或其他错误
      const errorMessage = error.message || '服务器错误'
      
      if (finalOptions.showError) {
        toast({
          title: '错误',
          description: errorMessage,
          variant: 'destructive'
        })
      }

      if (finalOptions.customErrorHandler) {
        finalOptions.customErrorHandler(error)
      }
      
      throw error
    }
  }

  /**
   * 发送GET请求
   * @param url 请求地址
   * @param params 查询参数
   * @param options 请求选项
   * @returns Promise
   */
  async get<T = any>(
    url: string,
    params?: Record<string, any>,
    options: ApiOptions = defaultOptions
  ): Promise<T> {
    return this.request<T>('GET', url, params, options)
  }

  /**
   * 发送POST请求
   * @param url 请求地址
   * @param data 请求数据
   * @param options 请求选项
   * @returns Promise
   */
  async post<T = any>(
    url: string,
    data?: any,
    options: ApiOptions = defaultOptions
  ): Promise<T> {
    return this.request<T>('POST', url, data, options)
  }

  /**
   * 发送PUT请求
   * @param url 请求地址
   * @param data 请求数据
   * @param options 请求选项
   * @returns Promise
   */
  async put<T = any>(
    url: string,
    data?: any,
    options: ApiOptions = defaultOptions
  ): Promise<T> {
    return this.request<T>('PUT', url, data, options)
  }

  /**
   * 发送DELETE请求
   * @param url 请求地址
   * @param data 请求数据
   * @param options 请求选项
   * @returns Promise
   */
  async delete<T = any>(
    url: string,
    data?: any,
    options: ApiOptions = defaultOptions
  ): Promise<T> {
    return this.request<T>('DELETE', url, data, options)
  }

  /**
   * 设置请求基础URL
   * @param url 基础URL
   */
  setBaseURL(url: string) {
    this.baseURL = url
  }
}

// 创建默认实例
const api = new Api()

// 导出实例和类
export { api, Api }

// 使用示例：
/*
import { api } from '@/utils/api'

// 基本使用
try {
  const data = await api.post('/api/users', {
    name: 'John',
    email: 'john@example.com'
  })
  console.log('Success:', data)
} catch (error) {
  // 错误已经被自动处理并显示toast
  console.error('Error:', error)
}

// 不显示错误提示
try {
  const data = await api.post('/api/users', {
    name: 'John',
    email: 'john@example.com'
  }, { showError: false })
  console.log('Success:', data)
} catch (error) {
  // 手动处理错误
  console.error('Error:', error)
}

// 添加自定义请求头
const data = await api.post('/api/users', {
  name: 'John',
  email: 'john@example.com'
}, {
  headers: {
    'Authorization': 'Bearer token'
  }
})
*/
// 设置基础URL
api.setBaseURL('https://art.147gpt.com')