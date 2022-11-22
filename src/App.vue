<template>
  <div id="app">
    11111--{{ myname }}
    <input type="text" v-model="mytext" />
    <button @click="handleAdd">add</button>
    <ul>
      <li v-for="data in datalist" :key="data">{{ data }}</li>
    </ul>

    <navbar myname="home" :myright="false" @event="handleEvent">
      <div>111111</div>
    </navbar>
    <sidebar v-show="isShow"></sidebar>

    <div v-hello>1111111111</div>
    <img :src="imgUrl | imgFilter" alt="" />
  </div>
</template>

<script>
import navbar from './mycomponents/MyNavbar.vue'
import sidebar from './mycomponents/MySidebar.vue'
import Vue from '../node_modules/vue' // 全局注册
import axios from 'axios'
// Vue.component('navbar',navbar)
Vue.directive('hello', {
  inserted (el, binding) {
    console.log(el)
    el.style.border = '1px solid red'
  }
})
Vue.filter('imgFilter', (url) => {
  return url + '?imageView2/1/w/128/h/180'
})
export default {
  data () {
    return {
      myname: 'xiaobao',
      mytext: '',
      datalist: ['aaa', 'bbb', 'ccc'],
      isShow: true,
      imgUrl:
        'https://pic.maizuo.com/usr/movie/f31367bb1a275f032ea3793a0571d9e0.jpg'
    }
  },
  components: {
    // 局部注册
    navbar,
    sidebar
  },
  methods: {
    handleAdd () {
      console.log(this.mytext)
      this.datalist.push(this.mytext)
    },
    handleEvent () {
      this.isShow = !this.isShow
    }
  },
  mounted () {
    // 配置反向代理，解决跨域问题
    axios
      .get(
        '/xiaochen/api/mmdb/movie/v3/list/hot.json?ct=%E5%8C%97%E4%BA%AC&ci=1&channelId=4'
      )
      .then((res) => {
        console.log(res.data.data)
      })
  }
}
</script>

<style lang="scss">
$width: 300px;
ul {
  li {
    background: yellow; // 父组件的样式会影响子组件的样式--解决办法:scoped
    list-style: none;
    width: $width;
  }
}
</style>
