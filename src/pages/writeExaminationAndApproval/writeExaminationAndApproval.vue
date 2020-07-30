<template>
  <div id="writeExaminationAndApproval">
    <div class="main">
      <div class="innerItem" v-for="(item,i) in 3" :key="i">
        <div v-for="(item,i) in 3" :key="i" @click="navigateTo(item)">
          <img src="@/static/img/tubiao.png" alt />
          <p>申请单审批</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    navigateTo() {
      console.log(1)
      uni.navigateTo({
        url: '/childPages/applicationForm/applicationForm'
      })
    }
  }
}
</script>
<style lang="scss">
#writeExaminationAndApproval {
  background-color: #efebeb66;
  .main {
    .innerItem {
      width: 650rpx;
      padding: 53rpx 50rpx;
      display: flex;
      justify-content: space-between;
      background-color: white;
      margin-bottom: 20rpx;
      & > div {
        img {
          width: 110rpx;
          height: 110rpx;
        }
        p {
          font-size: 22rpx;
          color: #333333;
        }
      }
    }
  }
}
</style>