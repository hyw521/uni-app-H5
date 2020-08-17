<template>
  <view id="h-login">
    <view class="title">欢迎登录！</view>
    <view class="log-box flex-row-between phone">
      <span>+86</span>
      <div>
        <input type="number" placeholder="请输入手机号" @input="onPhoneInput" />
        <button
          type="default"
          size="default"
          class="btn-code"
          @tap="bindCode"
          v-bind:disabled="disabled"
        >{{btnCodeTxt}}</button>
      </div>
    </view>
    <view class="log-box input-code">
      <image src="@/static/img/code.png" class="ic-sm" />
      <input type="number" placeholder="请输入验证码" @input="onCodeInput" />
    </view>
    <view class="button-div">
      <button type="primary" @tap="bindSubmit">绑定</button>
    </view>
    <view class="gray">点击”获取验证码”按钮，即同意《用户注册》协议！</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      code: '',
      btnCodeTxt: '发送验证码',
      disabled: false,
      result: 0,
      token: "",
      userID: "",
      headUrl: "",
    }
  },
  onLoad(e) {
    // if (e.code && e.code.length > 0) {
    //   window.location.href = "http://mobile.haoanhealth.com:8091/user/wxlogin/callback?code=" + e.code + "&state=" + e.state;
    //   return;
    // }

    // this.mainId = e.mainId;
    // if (e.r == 1) {
    //   uni.setStorageSync("token", e.token)
    //   uni.redirectTo({
    //     url: '../index/index'
    //   });
    //   return;
    // } else {
    //   this.userID = e.userID;
    //   this.headUrl = e.headUrl;
    // }
    // var wx = require('weixin-js-sdk');
    // var url = escape(location.href.split('#')[0]);
    // this.$service.Post({
    //   url: this.$config.HTTP_POST_WXConfig_URL + "?url=" + url,
    //   success: (res) => {
    //     let data = res.data;
    //     console.log(data);
    //     wx.config({
    //       beta: true,
    //       debug: false,
    //       appId: data.appid,
    //       timestamp: data.timestamp,
    //       nonceStr: data.noncestr,
    //       signature: data.signature,
    //       jsApiList: [
    //         'chooseImage',
    //       ]
    //     });
    //     wx.ready(function () {
    //       //禁用右上角菜单按钮
    //       wx.hideOptionMenu();
    //     });
    //   }
    // });
  },
  methods: {
    onPhoneInput(e) {
      this.phone = e.target.value
    },
    onCodeInput(e) {
      this.code = e.target.value
    },
    bindCode() {
      const phone = this.phone;
      if (phone == '') {
        this.$util.Alert('请输入手机号');
        return;
      }
      if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
        this.$util.Alert('请输入正确的手机号');
        return;
      }
      var sec = 60;
      this.$service.Post({
        url: this.$config.HTTP_POST_SendCode_URL,
        data: { phone: phone },
        success: (res) => {
          this.disabled = true;
          let interval = setInterval(() => {
            if (sec == 0) {
              this.btnCodeTxt = '重新获取';
              this.disabled = false;
              clearInterval(interval);
              return;
            }
            this.btnCodeTxt = sec + 's'
            sec--;
          }, 1000);
        }, fail: (res) => {
          this.$util.Alert(res.msg);
        }
      })
    },
    bindSubmit(e) {
      uni.redirectTo({
        url: '../index/index'
      });
      if (this.phone == '') {
        this.$util.Alert('请输入手机号');
        return;
      }
      if (this.code == '') {
        this.$util.Alert('请输入验证码');
        return;
      }
      this.$service.Post({
        url: this.$config.HTTP_POST_BindPhone_URL,
        data: {
          phone: this.phone,
          code: this.code,
          userID: this.userID,
          headUrl: this.headUrl
        }, success: (res) => {
          uni.setStorageSync("token", res.data)
          uni.redirectTo({
            url: '../index/index'
          });
        }, fail: (res) => {
          this.$util.Alert(res.msg);
        }
      });
    }
  }
}
</script>

<style lang="scss">
@import "@/style/h-login.scss";
</style>
