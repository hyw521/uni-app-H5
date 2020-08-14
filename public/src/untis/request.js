import { windowConfig } from '@/static/js/config.js'
const config = Symbol('config')
const isCompleteURL = Symbol('isCompleteURL')
const requestBefore = Symbol('requestBefore')
const requestAfter = Symbol('requestAfter')

class UniAppRequest {
  [config] = {
    baseURL: windowConfig.BASE_API,
    header: {
      'content-type': 'application/json'
    },
    method: 'GET',
    dataType: 'json',
    // responseType: 'text'
  }

  interceptors = {
    request: (func) => {
      if (func) {
        UniAppRequest[requestBefore] = func
      } else {
        UniAppRequest[requestBefore] = (request) => request
      }

    },
    response: (func) => {
      if (func) {
        UniAppRequest[requestAfter] = func
      } else {
        UniAppRequest[requestAfter] = (response) => response
      }
    }
  }

  static [requestBefore](config) {
    return config
  }

  static [requestAfter](response) {
    return response
  }

  static [isCompleteURL](url) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }

  setConfig(func) {
    this[config] = func(this[config])
  }

  request(options = {}) {
    options.baseURL = options.baseURL || this[config].baseURL
    options.dataType = options.dataType || this[config].dataType
    options.url = UniAppRequest[isCompleteURL](options.url) ? options.url : (options.baseURL + options.url)
    options.data = options.data
    options.header = { ...options.header, ...this[config].header }
    options.method = options.method || this[config].method

    options = { ...options, ...UniAppRequest[requestBefore](options) }

    return new Promise((resolve, reject) => {
      options.success = function (res) {
        if (res.statusCode === 200) {
          resolve(UniAppRequest[requestAfter](res))
        } else {
          reject(UniAppRequest[requestAfter](res))
        }
      }
      options.fail = function (err) {
        reject(UniAppRequest[requestAfter](err))
      }
      uni.request(options)
    })
  }

  get(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'GET'
    return this.request(options)
  }

  post(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'POST'
    return this.request(options)
  }
}

UniAppRequest.install = function (Vue) {
  Vue.mixin({
    beforeCreate: function () {
      if (this.$options.UniAppRequest) {
        console.log(this.$options.UniAppRequest)
        Vue._UniAppRequest = this.$options.UniAppRequest
      }
    }
  })
  Object.defineProperty(Vue.prototype, '$minApi', {
    get: function () {
      return Vue._UniAppRequest.apis
    }
  })
}

export default UniAppRequest