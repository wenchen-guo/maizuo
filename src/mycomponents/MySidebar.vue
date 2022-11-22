<template>
  <div>
    <ul>
      <li v-for="data in datalist" :key="data.filmId">
        {{data.name}}
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    // fetch("/test.json")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res.data.films);
    //     this.datalist = res.data.films
    //   });
    axios.get('/test.json').then(res => {
      console.log(res.data.data.films)
      this.datalist = res.data.data.films
    })
  }
}
</script>

<style lang="scss" scoped>
// scoped局部的，作用域的。会给组件加上唯一的不重复的属性
$width: 200px;
ul {
  li {
    background: palegreen;
    list-style: none;
    width: $width;
  }
}
</style>
