const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // 暂时关闭代码格式检测
  lintOnSave: true,

  // 配置反向代理--注意配置完重新启动服务器
  devServer: {
    proxy: {
      // '/api': {
      //   target:'https://i.maoyan.com',
      //   changeOrigin: true
      // }

      // 如果有多个/api需要向不同的接口发送地址，可以在之前加上自定义的名字，然后路径重写把自定义名字替换为空字符串
      '/xiaochen': {
        target: 'https://i.maoyan.com',
        changeOrigin: true,
        pathRewrite: {
          '^/xiaochen': ''
        }
      }
    }
  }
})
