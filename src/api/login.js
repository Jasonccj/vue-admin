import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/validate',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'get'
  })
}
