<template>
  <div>
    <film-swiper :key="datalist.length" :loop="true">
      <film-swiper-item v-for="data in datalist" :key="data.filmId" class="filmswiperitem">
        <img :src="data.poster" alt="">
      </film-swiper-item>
    </film-swiper>
    <film-header class="sticky"></film-header>
    <router-view></router-view>
  </div>
</template>

<script>
import filmSwiper from '@/views/films/FilmSwiper'
import filmSwiperItem from '@/views/films/FilmSwiperItem'
import filmHeader from '@/views/films/FilmHeader'
import axios from 'axios'
export default {
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    axios.get('/test.json').then(res => {
      console.log(res.data.data.films)
      this.datalist = res.data.data.films
    })
  },
  components: {
    filmSwiper,
    filmSwiperItem,
    filmHeader
  }
}
</script>
<style lang="scss" scoped>
.filmswiperitem img {
    width: 100%;
}
.sticky {
  position: sticky;
  top: 0px;
  z-index: 100;
  background: white;
}
</style>
