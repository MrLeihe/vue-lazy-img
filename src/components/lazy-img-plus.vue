<template>
  <div :style="{width: '300px', height: '300px'}">
    <img class="lazy-img" :data-src="src" v-lazyLoad="src" />
  </div>
</template>

<script>
export default {
  name: 'LazyImgPlus',
  props: {
    src: String
  },
  directives: {
    lazyLoad: {
      bind: function(el) {
        el.onerror = () => {
          el.src = 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/532f0ad2675942efb12ab7f4efa7885a~tplv-k3u1fbpfcp-zoom-1.image'
        }

        if (!window.observer) {
          window.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              let lazyImage = entry.target
              if (entry.isIntersecting) {
                const src = lazyImage.getAttribute('data-src')
                lazyImage.src = src
                lazyImage.style.opacity = 1
                lazyImage.style.display = 'block'
                window.observer.unobserve(lazyImage)
              }
            })
          })
        }
      },
      inserted: el => {
        window.observer.observe(el)
      },
      componentUpdated: (el, binding) => {
        if (binding.value === binding.oldValue) {
          return false
        }

        window.observer.observe(el)
      },
      unbind: el => {
        window.observer.unobserve(el)
      }
    }
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