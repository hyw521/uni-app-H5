<template>
  <div id="tabs">
    <el-tabs v-model="activeName" style="margin-left:25px" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,index) in SystemList"
        :key="index"
        :label="item.Name"
        :name="item.Id+''"
      >
        <div slot="label" :class="`system${item.Id}`">
          <i :class="item.Icon" class="itemIcon" />
          <span class="itemName">{{ item.Name }}</span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { userPermission } from '@/api/user'
export default {
  data() {
    return {
      activeName: '0',
      SystemList: []
    }
  },
  created() {
    this.activeName = this.$store.getters.userPermission.Choose.Id + ''
    this.SystemList = this.$store.getters.userPermission.SystemList
    console.log(this.activeName)
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name
      this.getUserPermission(this.activeName)
    },
    async getUserPermission() {
      await userPermission(this.activeName).then(res => {
        if (res.status === 200) {
          this.activeName = res.data.Choose.Id + ''
          this.SystemList = res.data.SystemList
          this.$router.go(0)
        }
      })
    }
  }
}
</script>

<style lang="scss">
#tabs {
  .el-tabs__nav-prev {
    margin-top: 13px;
    font-size: 25px;
  }
  .el-tabs__nav-next {
    margin-top: 13px;
    font-size: 25px;
  }
  .el-icon-arrow-left:before {
    content: "\E792";
  }
  .el-icon-arrow-right:before {
    content: "\E791";
  }
  .el-tabs__nav-scroll {
    height: 60px;
    .el-tabs__nav.is-top {
      .el-tabs__item {
        padding: 5px 20px 0px;
        line-height: 30px;
        height: 60px;
        color: #fff;
        span {
          display: block;
          //top: -20px;
          height: 25px;
          position: relative;
          font-size: 12px;
          font-weight: lighter;
        }
      }
    }
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item {
    border: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none !important;
  }
  .el-tabs--card > .el-tabs__header {
    border-bottom: none;
  }

  .el-tabs__header {
    margin: 0;
  }

  .el-tabs__item:hover {
    color: #fff;
  }

  .el-tabs__item.is-active {
    color: #fff;

    // background-image: linear-gradient(162deg, #00079d 0%, #04123e 98%) ragb;
    background-image: -webkit-linear-gradient(
      162deg,
      rgba(#00079d, 0.2),
      rgba(#04123e, 0.2)
    );
  }

  .itemIcon {
    display: block;
    font-size: 22px;
    height: 22px;
    text-align: center;
  }
  .el-tabs__item {
    .icon-gongzuotai-mianxing {
      font-size: 27px !important;
      position: relative;
      top: 2px;
    }
  }
  .itemName {
    font-size: 12px;
    font-weight: lighter;
    color: #ffffff;
    opacity: 0.7;
    letter-spacing: 0;
    text-align: center;
    position: relative;
    top: 5px;
  }
  // .tabs-active:active {
  //   color: #fff;
  //   opacity: 0.2;
  //   background-image: linear-gradient(162deg, #00079d 0%, #04123e 98%);
  // }
}
</style>
