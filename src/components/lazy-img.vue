<template>
  <div :style="{width: '300px', height: '300px'}">
    <img class="lazy-img" v-lazyLoad="lazyOptions" />
  </div>
</template>

<script>
import { throttle, isElementInViewport } from '@/utils'
export default {
  name: 'LazyImg',
  props: {
    src: String
  },
  directives: {
    lazyLoad: {
      bind: function(el) {
        // set default src when load onerror
        el.onerror = () => {
          el.src =
            'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/532f0ad2675942efb12ab7f4efa7885a~tplv-k3u1fbpfcp-zoom-1.image'
        }

        if (!window.lazyMap) {
          // 创建 map 来缓存
          window.lazyMap = new Map()

          // 监听滚动事件，添加方都处理
          window.onscroll = throttle(() => {
            window.lazyMap.forEach((lazyImg, key) => {
              if (isElementInViewport(lazyImg.el)) {
                lazyImg.el.src = lazyImg.value.src
                lazyImg.value.callback(lazyImg.el)
                window.lazyMap.delete(key)
              }
            })
          }, 200)
        }
      },
      inserted: (el, binding) => {
        lazyImgAction(el, binding)
      },
      componentUpdated: (el, binding) => {
        // if the src not change
        if (binding.value.src === binding.oldValue.src) {
          return false
        }

        lazyImgAction(el, binding)
      },
      unbind: (el, binding) => {
        const key = binding.value.src
        if (window.lazyMap && window.lazyMap.has(key)) {
          window.lazyMap.delete(key)
        }
      }
    }
  },
  computed: {
    lazyOptions() {
      return {
        src: this.src,
        callback: this.onCallback
      }
    }
  },
  methods: {
    onCallback(el) {
      el.style.opacity = 1
      el.style.display = 'block'
    }
  }
}

const lazyImgAction = (el, binding) => {
  if (isElementInViewport(el)) {
    el.src = binding.value.src
    binding.value.callback(el)
  } else {
    // use el as key
    window.lazyMap.set(el, {
      el,
      value: binding.value
    })
  }
}
</script>

<style lang="less" scoped>
.lazy-img {
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: opacity 1s;
}
</style>