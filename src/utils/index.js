/**
 * throttle limit
 */
export const throttle = (callback, delay) => {
  let timer = null
  return function wrapper() {
    const _this = this
    const args = arguments
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      callback.apply(_this, args)
      clearTimeout(timer)
      timer = null
    }, delay)
  }
}

/**
 * resize image src link
 */
export const resezeImg = (el, src) => {
  const width = el.getBoundingClientRect().width || 100
  return `${src}?x-oss-process=image/resize,w_${width}`
}

/**
 * 判断元素是否进入可视区域
 */
export const isElementInViewport = el => {
  if (typeof el.getBoundingClientRect !== 'function') {
    return true
  }

  const clientHeight = _getClientHeight()
  const rect = el.getBoundingClientRect()
  return rect.top < clientHeight
}

const _getClientHeight = () => {
  const dClientHeight = document.documentElement.clientHeight
  const bodyClientHeight = document.body.clientHeight
  let clientHeight = 0

  if (bodyClientHeight && dClientHeight) {
    clientHeight = bodyClientHeight < dClientHeight ? bodyClientHeight : dClientHeight
  } else {
    clientHeight = bodyClientHeight > dClientHeight ? bodyClientHeight : dClientHeight
  }

  return clientHeight
}
