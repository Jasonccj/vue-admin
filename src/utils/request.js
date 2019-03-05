import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
import store from '../store'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非0是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== '0') {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === '1') {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }

      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject('error')
  }
)

export default service
