<template>
  <view id="orderDetails" v-if="isShow">
    <div class="top_nav">
      <div class="search_h">
        <zy-search
          :is-focus="false"
          :placeholder="placeholder"
          :show-want="true"
          :speechEngine="speechEngine"
          :theme="themeClass"
          @getSearchText="getSearchText"
        ></zy-search>
      </div>
      <!-- 当设置tab-width,指定每个tab宽度时,则不使用flex布局,改用水平滑动 -->
      <me-tabs :fixed="true" :tabs="tabs" @change="tabChange" v-model="tabIndex"></me-tabs>
    </div>

    <swiper :current="tabIndex" :style="{height: height}" @change="swiperChange">
      <swiper-item :key="i" v-for="(tab,i) in tabs">
        <mescroll-item :i="i" :index="tabIndex" :searchValue="searchValue" :tabs="tabs" ref="child"></mescroll-item>
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
  data () {
    return {
      isShow: false,
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
  onShow () {
    this.isShow = true
    console.log(11111)
  },
  onTabItemTap () {
    console.log('onTabItemTap')
  },
  onUnload () {
    console.log('onUnload')
  },
  onHide () {
    this.isShow = false
  },
  methods: {
    //获取搜索输入值
    getSearchText (value) {
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
    swiperChange (e) {
      this.tabIndex = e.detail.current
    },
    tabChange () {
      this.$refs.child[0].mainRefresh()
    }
  },
  onLoad () {
    // 需要固定swiper的高度
    this.height = uni.getSystemInfoSync().windowHeight + 'px'
  }
}
</script>

<style lang="scss">
@import '@/style/orderDetails.scss';
</style>
