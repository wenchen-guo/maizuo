<template>
    <div>
        Login
        <button @click="handleLogin">登录</button>
    </div>
</template>

<script>
export default {
  methods: {
    handleLogin () {
      localStorage.setItem('token', '后端返回的token字段')
      // this.$router.back() // 返回

      // 1.获取 query字段
      console.log(this.$route.query.redirect)
      // 2.跳转到当前想要跳的页面去
      this.$router.push(this.$route.query.redirect)
    }
  }
}
</script>
