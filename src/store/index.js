import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http.js'
import createPersistedState from 'vuex-persistedstate' // 刷新页面后，页面还会在保存
Vue.use(Vuex)

// vuex 管理保存公共状态，（分散在各个组件内的状态，统一管理）默认是管理在内存，一刷新公共状态数据就丢了
/*
  注意：
    1. 应用层级的状态应该集中到单个store对象中
    2. 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的
    3. 异步逻辑都应该封装到 action 里面
*/
/*
  vuex 项目应用
    1. 非父子的通信
    2. 后端数据的缓存快照，减少重复数据请求，减轻服务器压力，提高用户体验
*/
export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: (state) => { // 默认全部存储，设置reducer可以只存储state里指定的内容
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],

  // state公共状态
  state: {
    cityId: '110100',
    cityName: '北京',
    cinemaList: [],
    isTabbarShow: true
  },
  getters: {
  },

  // 统一管理  被devtools记录状态的修改   只支持同步，不支持异步
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    changeCinemaData (state, data) {
      state.cinemaList = data
    },
    clearCinema (state) {
      state.cinemaList = []
    },
    show (state) {
      state.isTabbarShow = true
    },
    hide (state) {
      state.isTabbarShow = false
    }
  },

  // 支持异步和同步
  actions: {
    getCinemaData (store, cityId) {
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=1871659`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then((res) => {
        store.commit('changeCinemaData', res.data.data.cinemas)
      })
    }
  },
  modules: {
  }
})
