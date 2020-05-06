import MinRequest from './MinRequest'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
  return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
  return response.data
})

// 设置默认配置
minRequest.setConfig((config) => {
  config.baseURL = 'http://api.taskarea.com/api/v1'
  let token=false;
  uni.getStorage({key:'token',success:(res)=>{token=res.data}})

  return config
})

export default {
  // 这里统一管理api请求
  apis: {
    login (data) {
      return minRequest.post('/login', data)
    },
    register (data) {
      return minRequest.post('/register', data)
    },
    get_user () {
      return minRequest.get('/get_user')
    },
  }
}

