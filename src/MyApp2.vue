<template>
  <div id="app">
    <tabbar v-show="$store.state.isTabbarShow"></tabbar>
    <!--
    路由容器
        路由原理：
        hash路由 ==> location.hash 切换  window.onhashchange 监听路径的切换
        history路由 ==> history.pushState 切换  window.onpopstate 监听路径的切换
    -->
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import tabbar from '@/views/films/MyTabbar'
Vue.use(Vant) // Vue.component(全局引入)
export default {
  data () {
    return {}
  },
  components: {
    tabbar
  }
}
</script>

<style lang="scss">
// vue路由会在切换组件时自动给组件增加一个class
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
ul {
  list-style: none;
}
section {
  padding-bottom: 49px;
}
</style>
