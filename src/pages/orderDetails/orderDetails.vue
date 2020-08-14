<template>
  <view id="orderDetails">
    <div class="top_nav">
      <div class="search_h">
        <zy-search
          :is-focus="false"
          :theme="themeClass"
          :show-want="true"
          :speechEngine="speechEngine"
          :placeholder="placeholder"
          @getSearchText="getSearchText"
        ></zy-search>
      </div>
      <!-- 当设置tab-width,指定每个tab宽度时,则不使用flex布局,改用水平滑动 -->
      <me-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" @change="tabChange"></me-tabs>
    </div>

    <swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
      <swiper-item v-for="(tab,i) in tabs" :key="i">
        <mescroll-item ref="child" :i="i" :index="tabIndex" :tabs="tabs" :searchValue="searchValue"></mescroll-item>
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
      placeholder: '请输入订单号',
      themeClass: 'block',
      speechEngine: 'baidu', //语音识别引擎
      hotList: [],	//初始化推荐列表
      searchValue: '',


      height: "400rpx", // 需要固定swiper的高度
      tabs: [{ name: '全部' }, { name: '奶粉' }, { name: '面膜' }, { name: '图书' }, { name: '果汁' }, { name: '奶瓶' }],
      tabIndex: 0 // 当前tab的下标
    }
  },
  methods: {
    //获取搜索输入值
    getSearchText(value) {
      this.searchValue = value
      this.$nextTick(() => {
        this.$refs.child[0].search()
      })
      uni.showToast({
        title: '回调的搜索信息: ' + value,
        icon: "none"
      })
    },
    // 轮播菜单
    swiperChange(e) {
      this.tabIndex = e.detail.current
    },
    tabChange() {
      this.$refs.child[0].mainRefresh()
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
