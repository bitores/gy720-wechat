/**
 * qiniu图片链接指令
 * @author chenliangshan
 * @version 2017/09/14
 */

import { Url } from '@/utils'
import DefaultImg from '@/assets/default.jpg'

const getSrc = (el, binding) => {
  const src = binding.value
  const query = el.dataset ? el.dataset.query : el.getAttribute('data-query')
  const defaultSrc = el.dataset ? el.dataset.src : el.getAttribute('data-src')
  let srcUrl = src

  if (src) {
    srcUrl = `${Url.static(src)}${query || ''}`
  } else if (defaultSrc) {
    srcUrl = defaultSrc
  } else {
    srcUrl = DefaultImg
  }

  return Url.static(srcUrl)
}

export default {
  name: 'qiniu-src',

  bind(el, binding) {
    const srcDom = el
    srcDom.src = getSrc(el, binding)
  },

  inserted() {

  },

  update(el, binding) {
    const srcDom = el
    srcDom.src = getSrc(el, binding)
  },
}
