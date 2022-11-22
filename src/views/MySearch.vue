<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
    <div id="box">
      <ul v-if="value">
        <li v-for="data in computedList" :key="data.cinemaId">
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
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState(['cinemaList', 'cityId']),
    computedList () {
      return this.cinemaList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  },
  methods: {
    ...mapActions(['getCinemaData']),
    onSearch () {

    },
    onCancel () {
      this.$router.back()
    }
  },
  mounted () {
    if (this.cinemaList.length === 0) {
      this.getCinemaData(this.cityId)
    } else {
      console.log('缓存')
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
