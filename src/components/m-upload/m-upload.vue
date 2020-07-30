<template>
  <div id="uploadFile">
    <view ref="input" class="input"></view>
    <div class="buttonDiv">
      <button>上传文件</button>
      <span v-text="flieName"></span>
    </div>
  </div>
</template>

<script>
import { getAccessToken } from '@/untis/auth';
import { windowConfig } from '@/static/js/config.js';
export default {
  data() {
    return {
      file: "",
      flieName: '',
      uploadFileInfo: "",
      hyw: ''
    }
  },
  methods: {
    uploadFile() {
      let fData = new FormData();
      fData.append(this.flieName, this.file);
      let xhr = new XMLHttpRequest();
      xhr.open("POST", windowConfig.BASE_API + 'DataFile/Post', true);
      xhr.setRequestHeader('Authorization', `Bearer ${getAccessToken()}`)
      let _this = this;
      xhr.onload = function (e) {
        const data = JSON.parse(xhr.responseText)
        _this.uploadFileInfo = data
        _this.$emit('getFlieInfo', _this.uploadFileInfo)
      }
      xhr.send(fData)
    }
  },
  mounted() {
    var input = document.createElement('input');
    input.type = 'file'
    input.className = 'upload'
    input.onchange = event => {
      if (event.target.files.length > 0) {
        this.file = event.target.files[0]
        this.flieName = event.target.files[0].name
        this.uploadFile()
      }
    };
    this.$refs.input.$el.appendChild(input);
  }
}
</script>

<style lang="scss">
#uploadFile {
  .input {
    width: 200rpx;
    position: relative;
    top: 60rpx;
    z-index: 999;
    opacity: 0;
    /deep/.upload {
      width: 200rpx !important;
      display: inline-block;
      height: 60rpx;
    }
  }
  .buttonDiv {
    display: flex;
    width: 450rpx;
    button {
      background-color: #bae1fd;
      border-color: #bae1fd;
      width: 200rpx;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 26rpx;
      border-radius: 10rpx;
      color: white;
      margin: 0 !important;
    }
    span {
      display: inline-block;
      margin-left: 16rpx;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 28rpx;
      color: #565555;
    }
  }
}
</style>