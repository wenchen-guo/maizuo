import Vue from 'vue' // ES6导入方式
import App from './MyApp2.vue' // 导入根组件A
import router from './router' // 路由
import store from './store'
Vue.config.productionTip = false

// 格式问题解决办法：1.npm run lint   2.下载eslint  3.在vue.config,js里关闭格式错误，最后写完代码后，用npm run lint解决问题
new Vue({
  router, // this.$router === router
  store, // this.$store === store
  render: h => h(App) // vue支持的新写法
}).$mount('#app')
