<template>
  <footer>
    <ul>
      <!-- 声明式导航(a链接写法不建议) -->
      <!-- <li>
            <a href="/#/films">电影</a>
        </li> -->

      <!-- vue-router 声明式导航  (有确切的li数量时使用router-link  有多个li时建议用事件绑定写成编程式导航的写法this.$router.push)
            active-class可以更改路由默认的router-link-active的class名字
            tag会在vue4中被遗弃，换成另一种写法。 custom自定义  isActive-是否被选中
        -->

      <!--
      <li>
        <router-link to="/films" active-class="xiaobao">
          <i class="iconfont icon-shouye"></i>电影
        </router-link>
      </li>
      -->
      <router-link to="/films" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'xiaobao' : ''">
          <i class="iconfont icon-shouye"></i>电影
        </li>
      </router-link>

      <router-link to="/cinemas" active-class="xiaobao" tag="li">
        <i class="iconfont icon-xiaoxi"></i>影院
      </router-link>

      <router-link to="/center" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'xiaobao' : ''">
          <i class="iconfont icon-shoucang"></i>我的--{{ isActive }}
        </li>
      </router-link>
    </ul>
  </footer>
</template>
<script>
import '@/assets/iconfont/iconfont.css' // 第一种引入方式是写在index文件中用link引入
export default {}
</script>
<style lang="scss" scoped>
footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 49px;
  background: white;
  z-index: 100;
  ul {
    display: flex;
    li {
      flex: 1;
      line-height: 24.5px;
      text-align: center;
      display: flex;
      flex-direction: column;
      i {
        font-size: 20px;
      }
      span {
        font-size: 16px;
      }
    }
  }
}
.xiaobao {
  color: red;
}
</style>
