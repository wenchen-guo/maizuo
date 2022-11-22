<template>
  <div>
    <van-nav-bar
      title="标题"
      @click-left="handeleLeft"
      @click-right="handeleRight"
    >
      <template #left>
        {{ cityName }}<van-icon name="arrow-down" size="18" color="black" />
      </template>
      <template #right>
        <van-icon name="search" size="20" color="black" />
      </template>
    </van-nav-bar>

    <div id="box">
      <ul>
        <li v-for="data in $store.state.cinemaList" :key="data.cinemaId">
          <div class="left">
            <div class="cinema_name">{{ data.name }}</div>
            <div class="cinema_text">{{ data.address }}</div>
          </div>
          <div class="right cinema_name">
            <div style="color: orange">￥{{ data.lowPrice / 100 }}起</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BetterScroll from 'better-scroll' // 页面数据过多，优化页面滚动
import { mapState, mapActions, mapMutations } from 'vuex' // mapState放在计算属性computed中，mapActions,mapMutations放在methods中
export default {
  computed: {
    ...mapState(['cinemaList', 'cityId', 'cityName']) // this.$store.state.cinemaList可以简写
  },
  mounted () {
    // 来到cinemas页面中立即分发数据，然后在store中的actions取回数据。并且提交到changeCinemaData中，然后把值存到cinemaList中

    if (this.cinemaList.length === 0) {
      // 离开组件再回来就不会重复请求刷新了 --但是更换城市，数据也不会更新，解决：handeleLeft

      // this.$store
      //   .dispatch("getCinemaData", this.cityId)
      this.getCinemaData(this.cityId)
        .then((res) => {
          this.$nextTick(() => {
            // 数据更改之后执行
            console.log(document.getElementsByTagName('li').length)
            new BetterScroll('#box', {
              scrollbar: {
                // 出现滚动条
                fade: true
              }
            })
          })
        })
    } else {
      console.log('缓存')
    }

    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=1871659`,
    //   headers: {
    //     "X-Host": "mall.film-ticket.cinema.list",
    //   },
    // }).then((res) => {
    //   this.cinemaList = res.data.data.cinemas;

    //   //   console.log(document.getElementsByTagName('li').length)
    //   //   new BetterScroll("#box")       // 此时li数据还没有上树成功，初始化过早

    // this.$nextTick(() => {
    //   //数据更改之后执行
    //   console.log(document.getElementsByTagName("li").length);
    //   new BetterScroll("#box", {
    //     scrollbar: {
    //       // 出现滚动条
    //       fade: true,
    //     },
    //   });
    // });
    // });
  },
  methods: {
    ...mapActions(['getCinemaData']),
    ...mapMutations(['clearCinema']),
    handeleLeft () {
      this.$router.push('/city')

      // 清空cinemaList
      // this.$store.commit('clearCinema')
      this.clearCinema()
    },
    handeleRight () {
      this.$router.push('/cinemas/search')
    }
  }
}
</script>
<style lang="scss" scoped>
#box {
  height: 572px;
  overflow: hidden;
  position: relative; // 加定位--修正滚动条位置
}
li {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  .left {
    width: 212px;
  }
  .cinema_name {
    font-size: 15px;
  }
  .cinema_text {
    color: gray;
    font-size: 12px;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
