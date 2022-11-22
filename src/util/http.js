// 对于数据请求的封装-1
// import axios from "axios";
// function httpForlist() {
//     return axios({
//         url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=974758",
//         headers: {
//             "X-Client-Info":
//                 ' {"a":"3000","ch":"1002","v":"5.2.1",  "e":"16655409423747092677787649","bc":"110100"}',
//             "X-Host": "mall.film-ticket.film.list",
//         },
//     })
// }
// function httpForDetail(params) {
//     return axios({
//         url: `https://m.maizuo.com/gateway?filmId=${params}&k=7765783`,
//         headers: {
//             "X-Client-Info":
//                 ' {"a":"3000","ch":"1002","v":"5.2.1","e":"16655409423747092677787649"}',
//             "X-Host": "mall.film-ticket.film.info",
//         },
//     })
// }
// export default {
//     httpForlist,
//     httpForDetail
// }

// 对于数据请求的封装-2
import axios from 'axios'
import { Toast } from 'vant' // 引入加载提示
const http = axios.create({
  baseURL: 'https://m.maizuo.com/',
  timeout: 10000,
  headers: {
    'X-Client-Info':
      ' {"a":"3000","ch":"1002","v":"5.2.1",  "e":"16655409423747092677787649"}'
  }
})

// axios拦截器
// 在发请求之前拦截--showLoading
http.interceptors.request.use(function (config) {
  Toast.loading({ // 添加加载提示
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  return Promise.reject(error)
})

// 在成功后拦截--hideLoading
http.interceptors.response.use(function (response) {
  Toast.clear() // 删除加载提示
  return response
}, function (error) {
  Toast.clear()
  return Promise.reject(error)
})
export default http
