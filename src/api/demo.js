import UniAppRequest from '../untis/request'
import { getAccessToken } from '@/untis/auth';

const uniAppRequest = new UniAppRequest()

// 请求拦截器
uniAppRequest.interceptors.request((request) => {
  request.header['Authorization'] = `Bearer ${getAccessToken()}`
  console.log(11111)
  return request
})

// 响应拦截器
uniAppRequest.interceptors.response((response) => {
  console.log(22222)
  return response
})


export function loginIn() {
  return uniAppRequest.get('LoginIn?code=fanzhangjun&pwd=123456&tenant=1')
}

export function getSelector() {
  return uniAppRequest.get('GSPQTCustomer/CustomerCategoryList')
}