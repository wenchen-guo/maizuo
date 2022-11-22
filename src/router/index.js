import Vue from 'vue'
import VueRouter from 'vue-router'
import MyFilms from '@/views/MyFilms' // 自己想要导入的组件
import MyNowplaying from '@/views/films/MyNowplaying'
import MyComingSoon from '@/views/films/MyComingSoon'

import MyCinemas from '@/views/MyCinemas'
import MyCity from '@/views/MyCity'
import MySearch from '@/views/MySearch'
// import MyCenter from '@/views/MyCenter'
import MyDetail from '@/views/MyDetail'
// import MyOrder from '@/views/MyOrder'
import MyLogin from '@/views/MyLogin'

Vue.use(VueRouter) // 注册路由插件,两个全局 router-view router-link

// 配置表
const routes = [
  {
    path: '*',
    redirect: '/films' // 重定向
  },
  {
    path: '/films',
    component: MyFilms,
    // 嵌套路由
    children: [
      {
        path: '/films/nowPlaying',
        component: MyNowplaying
      },
      {
        path: '/films/comingSoon',
        component: MyComingSoon
      },
      {
        path: '/films',
        redirect: '/films/nowPlaying'
      }
    ]
  },
  {
    path: '/detail/:myid', // 动态二级路由
    name: 'xiaobaoDetail', // 命名路由
    component: MyDetail
  },
  {
    path: '/cinemas',
    component: MyCinemas
  },
  {
    path: '/city',
    component: MyCity
  },
  {
    path: '/cinemas/search',
    component: MySearch
  },

  {
    path: '/center',
    component: () => import('@/views/MyCenter'), // 路由懒加载--到center页面时才会导入
    meta: {
      isMyRequired: true
    }
  },
  {
    path: '/order',
    component: () => import('@/views/MyOrder'), // 路由懒加载
    meta: {
      isMyRequired: true // 路由元信息
    }
  },
  {
    path: '/login',
    component: MyLogin
  }
]

const router = new VueRouter({
  mode: 'hash', // hash 路径上有#，  history没有
  routes
})

// 全局拦截(导航守卫)--(跳转的，从哪来的，下一步处理)
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.isMyRequired) { // 判断是否需要授权
    // 判断是否授权登录-
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
