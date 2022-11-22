<template>
  <div v-if="filmInfo">
    <detail-header v-scroll="50">
      {{ filmInfo.name }}
    </detail-header>
    <!-- <img :src="filmInfo.poster" alt="" /> -->
    <div
      :style="{
        backgroundImage: 'url(' + filmInfo.poster + ')',
      }"
      class="poster"
    ></div>
    <div class="content">
      <div>{{ filmInfo.name }}</div>
      <div class="content-bottom">
        <div class="content-bottom-1">{{ filmInfo.category }}</div>
        <div class="content-bottom-2">
          {{ filmInfo.premiereAt | dataFilter }}上映
        </div>
        <div class="content-bottom-3">
          {{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟
        </div>
        <div class="content-bottom-4" :class="isHidden ? 'hidden' : ''">
          {{ filmInfo.synopsis }}
        </div>
        <div class="content-bottom-5" @click="isHidden = !isHidden">
          <i
            :class="
              isHidden ? 'iconfont icon-xiangxia' : 'iconfont  icon-xiangshang'
            "
          ></i>
        </div>
      </div>
    </div>
    <!-- 演职人员和剧照需要用同一个轮播-会造成轮播冲突  解决-:perview-->
    <div class="persons">
      <div class="persons-title">演职人员</div>
      <detail-swiper :perview="4" name="actors">
        <detail-swiper-item
          v-for="(data, index) in filmInfo.actors"
          :key="index"
        >
          <div
            :style="{
              backgroundImage: 'url(' + data.avatarAddress + ')',
            }"
            class="avatar"
          ></div>
          <div class="actors-name">{{ data.name }}</div>
          <div class="actors-role">{{ data.role }}</div>
        </detail-swiper-item>
      </detail-swiper>
    </div>

    <div class="persons">
      <div class="persons-title">剧照</div>
      <detail-swiper :perview="2" name="photos">
        <detail-swiper-item
          v-for="(data, index) in filmInfo.photos"
          :key="index"
        >
          <div
            :style="{
              backgroundImage: 'url(' + data + ')',
            }"
            class="persons-photos"
            @click="handlePerview(index)"
          ></div>
        </detail-swiper-item>
      </detail-swiper>
    </div>
  </div>
</template>
<script>
import obj from '@/util/mixinObj'
import http from '@/util/http.js'
import moment from 'moment'
import Vue from 'vue'
import detailSwiper from '@/views/detail/DetailSwiper'
import detailSwiperItem from '@/views/detail/DetailSwiperItem'
import detailHeader from '@/views/detail/DetailHeader'
import { ImagePreview } from 'vant' // 引入图片预览函数
Vue.filter('dataFilter', (data) => {
  return moment(data * 1000).format('YYYY-MM-DD')
})
Vue.directive('scroll', {
  inserted (el, binding) {
    el.style.display = 'none'
    window.onscroll = () => {
      console.log('scroll')
      if (document.documentElement.scrollTop > binding.value) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  // 销毁执行
  unbind () {
    window.onscroll = null
  }
})

export default {
  mixins: [obj],
  data () {
    return {
      filmInfo: null,
      isHidden: true
    }
  },
  components: {
    detailSwiper,
    detailSwiperItem,
    detailHeader
  },
  methods: {
    handlePerview (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }
  },
  mounted () {
    // 获取路径上的id   当前匹配的路由this.$route--注意不是router
    // console.log("created", this.$route.params.myid);

    // axios 利用id 发请求到详情接口，获取详细数据，布局页面
    // http.httpForDetail(this.$route.params.myid).then((res) => {
    // console.log(res.data.data.film);
    // });
    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=7765783`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then((res) => {
      console.log(res.data.data.film)
      this.filmInfo = res.data.data.film
    })
  }
  // mounted() {
  //   window.onscroll = () => {
  //     if (document.documentElement.scrollTop > 50) {
  //       console.log("显示");
  //     } else {
  //       console.log("隐藏");
  //     }
  //   };
  // },
  // destroyed() {
  //   window.onscroll = null;
  // },
}
</script>

<style lang="scss" scoped>
.poster {
  width: 100%;
  height: 210px;
  background-position: center;
  background-size: cover;
}
.content {
  padding: 15px;
  .content-bottom {
    color: gray;
    font-size: 13px;
    .content-bottom-1,
    .content-bottom-2,
    .content-bottom-3 {
      margin-top: 4px;
    }
    .content-bottom-1 {
      letter-spacing: 2px;
    }
    .content-bottom-4 {
      margin-top: 12px;
      line-height: 13px;
    }
    .content-bottom-5 {
      text-align: center;
    }
  }
}
.hidden {
  overflow: hidden;
  height: 26px;
}
.persons {
  padding-top: 15px;
  padding-left: 15px;
  .persons-title {
    font-size: 16px;
    padding-bottom: 15px;
  }
}
.avatar {
  width: 67.5px;
  height: 85px;
  background-size: cover;
}
.actors-name {
  padding-top: 10px;
  text-align: center;
  font-size: 12px;
}
.actors-role {
  font-size: 10px;
  text-align: center;
  color: #797d82;
}
.persons-photos {
  height: 84.38px;
  background-size: cover;
}
</style>
