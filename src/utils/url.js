/*
 * @Author: chenliangshan
 * @Date: 2018-01-05 09:59:54
 * @Last Modified by: chenliangshan
 * @Last Modified time: 2018-01-26 16:31:32
 */

import { Regex } from '@/utils'

let configHost = {}
const linkList = {
  // 开发环境
  dev: {
    origin: 'https://l.gy720.com/',
    cdn: 'http://l-statics.gy720.com/',
  },
  // 测试环境
  test: {
    origin: 'https://l-test.gy720.com/',
    cdn: 'http://www-statics.gy720.com/',
  },
  // 正式生产环境
  production: {
    origin: 'https://www.gy720.com/',
    cdn: 'http://www-statics.gy720.com/',
  },
}
const currentOrigin = `${window.location.origin}/`

/**
 * 当前环境判断
 */
switch (currentOrigin) {
  case linkList.dev.origin:
    configHost = { ...linkList.dev }
    break

  case linkList.test.origin:
    configHost = { ...linkList.test }
    break

  case linkList.production.origin:
    configHost = { ...linkList.production }
    break

  default :
    configHost = { ...linkList.dev }
}

export default class Url {
  static install(Vue) {
    // eslint-disable-next-line
    Vue.prototype.$url = {
      static: this.static,
      host: this.host,
      staticHotSpots: this.staticHotSpots,
    }
  }

  static static(pathname = '') {
    if (Regex.url(pathname) || Regex.base64(pathname)) {
      return pathname
    } else if (pathname.includes('/assets/')) {
      return `${window.location.origin}${pathname}`
    }
    return `${pathname && `${configHost.cdn}${pathname}`}`
  }

  static host(pathname = '') {
    return `${pathname && `${configHost.origin}${pathname}`}`
  }

  static staticHotSpots(pathname = '') {
    return `${pathname && `${configHost.origin}assets/${process.env.ASSETS_VERSION}/lib/krpano/hoticon/${pathname}`}`
  }

  static getQuery(url = window.location.href) {
    // eslint-disable-next-line
    let query = {}
    const num = url.indexOf('?')
    if (num !== -1 && url.indexOf('=') > 1) {
      let str = url.substr(1)
      str = str.substr(num)
      const strs = str.split('&')
      for (let i = 0; i < strs.length; i += 1) {
        query[strs[i].split('=')[0]] = (strs[i].split('=')[1])
      }
    }
    return query
  }

  static configHost = configHost
}
