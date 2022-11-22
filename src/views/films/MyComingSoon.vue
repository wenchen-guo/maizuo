<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleChangePage(data.filmId)"
      >
        <img :src="data.poster" alt="" />
        <div class="right">
          <div class="title">{{ data.name }}</div>
          <div class="content">
            <div class="grade">主演: {{ data.actors | actorsFilter }}</div>
            <div class="grade">上映日期： {{ data.premiereAt | dataFilter }}</div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import http from '@/util/http.js'
import Vue from 'vue'
import moment from 'moment'
Vue.filter('dataFilter', (data) => {
  return moment(data * 1000).format('YYYY-MM-DD')
})
Vue.filter('actorsFilter', (data) => {
  if (data === undefined) return '暂无主演'
  return data.map((item) => item.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0 // 后端数据总长度
    }
  },
  computed: {
    ...mapState(['cityId'])
  },
  mounted () {
    // http.httpForlist().then((res) => {
    //   console.log("数据", res.data.data.films);
    //   this.datalist = res.data.data.films;
    // });
    http({
      url: `/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=2&k=1429835`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      console.log('数据', res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },
  methods: {
    onLoad () {
      console.log('到底了')
      // 数据全部加载完成-禁用懒加载   小bug：如果到详情页面出现滚动条再返回页面的话，会直接触发'到底了'和禁用懒加载(datalist初始长度为0，total初始值也为0)--解决：total不等于0
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }
      this.current++
      http({
        url: `/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=2&k=7725097`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        this.datalist = [...this.datalist, ...res.data.data.films]

        // 加载状态结束
        this.loading = false
      })
    },
    handleChangePage (id) {
      console.log(id)
      // 编程式导航
      // location.href = '#/films/detail'

      // 1.通过路径跳转
      // this.$router.push(`/detail/${id}`)

      // 2.通过命名跳转
      this.$router.push({
        name: 'xiaobaoDetail',
        params: {
          myid: id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.van-list {
  .van-cell {
    overflow: hidden;
    padding: 15px;
    img {
      float: left;
      width: 66px;
      height: 94px;
    }
    .right {
      width: 229px;
      height: 94px;
      float: left;
      padding: 0 10px 0 10px;
      .title {
        font-size: 16px;
      }
      .content {
        margin-top: 4px;
        font-size: 13px;
        color: gray;
        .grade {
          padding: 3px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }
      }
    }
  }
}
</style>
