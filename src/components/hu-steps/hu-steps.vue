<template>
  <div class="steps">
    <div class="steps-main" v-for="(item,i) in 5" :key="i">
      <div class="line" :class="`line${i%5+1}`">
        <div></div>
        <div></div>
      </div>
      <div class="inner">
        <strong>主管审批人</strong>
        <img src="@/static/img/person.png" alt />
        <span>王晓敏</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
.steps {
  width: 720rpx;
  padding: 38rpx 0 38rpx 30rpx;
  background-color: white;
  .steps-main {
    display: flex;
    .line {
      width: 16rpx;
      padding-top: 15rpx;
      position: relative;
      height: 296rpx;
      & > div:nth-child(1) {
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
      }
      & > div:nth-child(2) {
        width: 2rpx;
        height: 296rpx;
        position: absolute;
        background-color: #c4dfff;
        margin-left: 7rpx;
      }
    }
    .inner {
      display: flex;
      flex-direction: column;
      margin-left: 39rpx;
      strong {
        font-size: 28rpx;
        color: #333333;
        font-weight: 400;
      }
      img {
        width: 58rpx;
        height: 58rpx;
        border-radius: 4rpx;
        margin: 7rpx 0 4rpx;
      }
      span {
        font-size: 24rpx;
        color: #333333;
      }
    }
    .line1 {
      & > div:nth-child(1) {
        background-color: #31a6ff;
      }
    }
    .line2 {
      & > div:nth-child(1) {
        background-color: #1ec7c6;
      }
    }
    .line3 {
      & > div:nth-child(1) {
        background-color: #fc4747;
      }
    }
    .line4 {
      & > div:nth-child(1) {
        background-color: #1bbf52;
      }
    }
    .line5 {
      & > div:nth-child(1) {
        background-color: #b9de13;
      }
    }
  }
}
</style>