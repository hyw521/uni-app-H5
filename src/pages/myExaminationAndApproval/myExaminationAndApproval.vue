<template>
  <div>
    <div>
      <h-login />
    </div>
    <w-loading click="true" mask="true" ref="loading" text="加载中.."></w-loading>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ''

    }
  },
  created() {
    // this.$nextTick(() => {
    //   this.$refs.loading.open()
    // })
    // setTimeout(() => {
    //   this.$refs.loading.close()
    // }, 3600)
  },
  methods: {
    open() {
      this.$refs.popup.open()
    }
  }
}
</script>

<style lang="scss">
.first {
  padding: 0 30rpx;

  .search {
    display: flex;
    width: 678rpx;
    height: 80rpx;
    line-height: 80rpx;
    background-color: #f1f2f5;
    padding-left: 12rpx;
    border-radius: 6rpx;

    .uni-icons {
      font-size: 36rpx !important;
      color: #bbbbbb !important;
    }

    input {
      height: 80rpx;
      line-height: 80rpx;
      padding-left: 16rpx;
      font-size: 30rpx;
      color: #bbbbbb !important;
    }
  }
}
</style>
