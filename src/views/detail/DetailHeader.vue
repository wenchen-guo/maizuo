<template>
  <div class="header">
    <i class="iconfont icon-houtui" @click="handleBack"></i>
    <slot></slot>
  </div>
</template>
<script>
export default ({
  methods: {
    handleBack () {
      this.$router.back() // 返回上一个页面
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  background: white;
  text-align: center;
  i {
    font-size: 25px;
    position: fixed;
    left: 15px;
    top: 0;
    height: 44px;
    line-height: 44px;
  }
}
</style>
