import { request } from './utils'
import jp_cn from './parser/jp-cn'

let OPTIONS = {
  cos_proxy: ''
}

let VOID_CALLBACK = function () {}

export default {
  version: '0.0.1',
  set(options) {
    OPTIONS = Object.assign(OPTIONS, options)
  },
  set_cos_proxy(proxy) {
    this.set({ cos_proxy: proxy })
  },
  jp2cn(query, callback) {
    this.query({
      parser: jp_cn.parser,
      url: jp_cn.url,
      query,
      callback
    })
  },
  query(option) {
    option = Object.assign({}, OPTIONS, option)

    let url = option.url(option.query)
    url = encodeURI(url)
    if (option.cos_proxy) {
      if (typeof option.cos_proxy === 'function')
        url = option.cos_proxy(url)
      else
        url = option.cos_proxy + url
    }

    var html = request(url, (data, e) => {
      let returns = {
        query: option.query
      }

      if (e) {
        returns.error = e.message
      } else {
        returns.candidates = option.parser(data)
      }

      (option.callback || VOID_CALLBACK)(returns)
    })
  }
}
