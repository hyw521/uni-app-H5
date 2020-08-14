<template>
  <view id="orderDetails">
    <div>11111</div>
    <!-- 当设置tab-width,指定每个tab宽度时,则不使用flex布局,改用水平滑动 -->
    <me-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" @change="tabChange"></me-tabs>
    <swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
      <swiper-item v-for="(tab,i) in tabs" :key="i">
        <mescroll-item :i="i" :index="tabIndex" :tabs="tabs"></mescroll-item>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import MescrollItem from "./mescroll-swiper-item.vue";

export default {
  components: {
    MescrollItem
  },
  data() {
    return {
      height: "400rpx", // 需要固定swiper的高度
      tabs: [{ name: '全部' }, { name: '奶粉' }, { name: '面膜' }, { name: '图书' }, { name: '果汁' }, { name: '奶瓶' }],
      tabIndex: 0 // 当前tab的下标
    }
  },
  methods: {
    // 轮播菜单
    swiperChange(e) {
      this.tabIndex = e.detail.current
    },
    tabChange() {
    }
  },
  onLoad() {
    // 需要固定swiper的高度
    this.height = uni.getSystemInfoSync().windowHeight + 'px'
  }
}
</script>

<style lang="scss">
@import "@/style/orderDetails.scss";
</style>
