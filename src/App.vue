<template>
  <div id="app">
    <lazy-img :src="item.src" v-for="(item, index) in imageList" :key="index" />
  </div>
</template>

<script>
import LazyImg from '@/components/lazy-img.vue'

export default {
  name: 'App',
  components: {
    LazyImg
  },
  data() {
    return {
      imageList: [
        {
          src:
            'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/535387fcea0441b1bffbb4813ac0de7c~tplv-k3u1fbpfcp-zoom-1.image'
        },
        {
          src:
            'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac86754d6b674d1cbe6cc4944f84589a~tplv-k3u1fbpfcp-zoom-1.image'
        },
        {
          src:
            'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b5d95ad5a834dc8af4f8d2c4f2e760f~tplv-k3u1fbpfcp-zoom-1.image'
        },
        {
          src:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a51937e1bad44c39d1203199c80465a~tplv-k3u1fbpfcp-zoom-1.image'
        },
        {
          src:
            'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e10df92d08f433e9ffadaa16a919c58~tplv-k3u1fbpfcp-zoom-1.image'
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
}
</style>
