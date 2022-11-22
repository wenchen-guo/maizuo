<template>
  <ul>
    <router-link to="/films/nowplaying" custom v-slot="{ navigate, isActive }">
      <li @click="navigate">
        <span :class="isActive ? 'xiaobao' : ''">正在热映</span>
      </li>
    </router-link>

    <router-link to="/films/comingSoon" custom v-slot="{ navigate, isActive }">
      <li @click="navigate" >
        <span :class="isActive ? 'xiaobao' : ''">即将上映</span>
      </li>
    </router-link>
  </ul>
</template>
<style lang="scss" scoped>
ul {
    display: flex;
    width: 100%;
    height: 49px;
    li {
        flex: 1;
        line-height: 49px;
        text-align: center;
    }
}
.xiaobao {
    color: red;
    padding-bottom: 10px;
    border-bottom: 2px solid red;
}
</style>
