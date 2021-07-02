import axios from 'axios'
import { Notify } from 'vant'

const baseUrlList = {
  // 本地开发环境

  dev: 'test',
  // 测试环境
  test: 'http://stzbxinghe.com/wqx/php/public/',
  // 生产环境
  prod: '',
}

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? baseUrlList['dev']
    : baseUrlList['test']

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 6000,
})

function getToken() {
  let cookie = document.cookie
  let token = ''
  if (cookie.indexOf('=token') > -1) {
    token = cookie.split('token=')[1].split('=token')[0]
  }
  return token
}

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    config.headers = {
      token: getToken(),
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截
// 根据不同状态码进行处理
instance.interceptors.response.use(
  function (res) {
    if (res.data.code !== 200) {
      Notify({ type: 'danger', message: res.data.msg })
    } else {
      return res.data.data
    }
  },

  (err) => {
    let { response } = err
    if (response) {
      // 服务器返回结果
      switch (response.status) {
        case 401: //需要验证的用户 ，一般是未登录  之后跳转登录页面
          break
        case 403: //一般是token过期
          break
        case 404: //一般是未找到
          break
      }
    } else {
      if (!window.navigator.onLine) {
        // 断网处理 ，可以跳转断网页面
        return
      }
    }
    return Promise.reject(err)
  }
)

export function get(url: any, params?: any) {
  return (params: any) => {
    return instance.get(url, {
      params,
    })
  }
}

export function post(url: string) {
  return (data?: any) => {
    return instance.post(url, data)
  }
}

export function put(url: any, data?: any) {
  return (data: any) => {
    return instance.put(url, data)
  }
}
