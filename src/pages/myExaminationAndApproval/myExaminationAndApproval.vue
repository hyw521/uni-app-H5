<template>
  <div>
    <div class="first">
      <div class="search">
        <uni-icons type="search" />
        <input type="text" v-model="value" placeholder="搜索" placeholder-style="color:#bbbbbb" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ''

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
