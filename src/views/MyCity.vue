<template>
  <div>
    <div>
      <div class="hot_title">热门城市</div>
      <ul class="hot_header">
        <li v-for="data in hotList"  :key="data.cityId">
          {{data.name}}
        </li>
      </ul>

    </div>
    <van-index-bar :index-list="compotedList" @change="handlechange">
      <div v-for="data in cityList" :key="data.type">
        <van-index-anchor :index="data.type" />
        <van-cell :title="item.name" v-for="item in data.list" :key="item.cityId"  @click="handleClick(item)"/>
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import http from '@/util/http'
import { Toast } from 'vant'
import obj from '@/util/mixinObj' // 引入混入mixin
export default {
  mixins: [obj], // vue混入方式--可以把多个组件都需要用的公共代码放在一起，混入进来
  data () {
    return {
      cityList: [],
      hotList: []
    }
  },
  computed: {
    compotedList () {
      return this.cityList.map(item => item.type) // 自定义展示的索引字符列表
    }
  },
  // destroyed () {
  //   this.$store.commit('show') // 离开显示tabbar部分
  // },
  mounted () {
    // this.$store.commit('hide') // 隐藏tabbar部分-缺点:多地方使用重复代码-解决：mixins
    http({
      url: '/gateway?k=2844971',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then((res) => {
      // this.renderCity(res.data.data.cities);
      this.cityList = this.renderCity(res.data.data.cities)
      this.hotList = res.data.data.cities.filter(
        (item) => item.isHot === 1
      )
      // 1. 316条数据 ==> A,B进行分组
      // 2. 利用转换后的数组，结合组件库进行渲染页面
    })
  },
  methods: {
    handleClick (item) {
      console.log(item.name, item.cityId)

      // vuex-状态管理模式
      console.log('vuex', this.$store.state)
      // 一点击就通过commit到mutation中修改状态，然后传到组件中
      this.$store.commit('changeCityName', item.name)
      this.$store.commit('changeCityId', item.cityId)
      this.$router.back()
    },
    handlechange (data) {
      console.log('change', data)
      Toast(data) // 轻提示组件
    },
    renderCity (list) {
      console.log(list)
      const cityList = []
      const letterList = []
      for (let i = 65; i < 91; i++) {
        // console.log(String.fromCharCode(i))  // 遍历26个字母
        letterList.push(String.fromCharCode(i))
      }
      console.log(letterList)

      letterList.forEach((letter) => {
        // 对26个字母进行遍历
        const newlist = list.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
        ) // 过滤出来数据的拼音的首字母的大写=26个字母
        // console.log(newlist);
        newlist.length > 0 &&
          cityList.push({
            type: letter,
            list: newlist
          })
      })

      console.log(cityList)
      return cityList
    }
  }
}
</script>
<style lang="scss" scoped>
.hot_header {
  display: flex;
  height: 90px;
  padding: 16px;
  flex-wrap: wrap;
  text-align: center;
  li {
    font-size: 14px;
    margin: 10px;
    height: 25px;
    line-height: 25px;
    width: 94px;
    align-content:space-between;
    background: #f4f4f4;

  }
}
.hot_title {
  font-size: 13px;
  margin: 10px;
  color: #797d82;
}

</style>
<style lang="scss">
//轻提示的dom节点是组件之外临时创建出来的，属于三不管状态，所以加scoped就不管用
.van-toast--html, .van-toast--text {
  min-width: 13px;
}
</style>
