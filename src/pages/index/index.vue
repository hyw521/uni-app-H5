<template>
  <div id="index">
    <div class="buttonDiv">
      <button @click="request()">请求</button>
    </div>
    <div class="buttonDiv">
      <button @click="getSelector()">获取下拉框</button>
    </div>
    <div>
      <uni-tag text="标签" type="success" circle></uni-tag>
    </div>
    <div>
      <button @click="open()">打开弹窗</button>
    </div>
    <evan-form
      ref="form"
      :hide-required-asterisk="hideRequiredAsterisk"
      :model="formList"
      :rules="rules"
    >
      <evan-form-item label="姓名：" prop="name">
        <input
          class="form-input"
          placeholder-class="form-input-placeholder"
          v-model="formList.name"
          placeholder="请输入姓名"
        />
      </evan-form-item>
      <evan-form-item label="邮箱：" prop="email">
        <input
          class="form-input"
          placeholder-class="form-input-placeholder"
          v-model="formList.email"
          placeholder="请输入邮箱"
        />
      </evan-form-item>
      <evan-form-item label="正则手机号：" prop="phone">
        <input
          class="form-input"
          placeholder-class="form-input-placeholder"
          v-model="formList.phone"
          placeholder="请输入手机号"
        />
      </evan-form-item>
      <evan-form-item label="数字：" prop="place">
        <picker
          mode="selector"
          :range="selectorList"
          range-key="label"
          value="1"
          @change="changeNumber"
        >
          <view class="uni-input" v-text="formList.place"></view>
        </picker>
      </evan-form-item>
      <evan-form-item prop="sex">
        <template slot="formItem">
          <view class="customize-form-item">
            <view class="customize-form-item__label">性别：</view>
            <radio-group @change="sexChange">
              <label class="customize-form-item__radio" v-for="item in sexes" :key="item.value">
                <view>
                  <radio :value="item.value" :checked="item.value === formList.sex" />
                </view>
                <view class="customize-form-item__radio__text">{{item.name}}</view>
              </label>
            </radio-group>
          </view>
        </template>
      </evan-form-item>
    </evan-form>
    <div @click="submit()">
      <button>表单提交</button>
    </div>
    <m-upload @getFlieInfo="getFlieInfo"></m-upload>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog
        type="input"
        message="成功消息"
        :duration="2000"
        :before-close="true"
        @close="close"
        @confirm="confirm"
      ></uni-popup-dialog>
    </uni-popup>
  </div>
</template>

<script>
import { loginIn, getSelector } from '@/api/demo';
import { setAccessToken } from '@/untis/auth';
export default {
  data() {
    return {
      formList: {
        name: '',
        email: '',
        phone: '',
        sex: '',
        place: '请选择地区'
      },
      sexes: [{
        name: '男',
        value: 'man'
      },
      {
        name: '女',
        value: 'woman'
      }],
      selectorList: [{ label: '上海', value: 1 }, { label: '杭州', value: 2 }],
      rules: {
        name: {
          required: true,
          message: '请输入姓名'
        },
        email: [{
          required: true,
          message: '请输入邮箱'
        }, {
          type: 'email',
          message: '邮箱格式不正确'
        }],
        place: {
          required: true,
          message: '请选择地区'
        },
        phone: [{
          required: true,
          message: '请输入手机号'
        },
        {
          pattern: '^1\\d{10}$', // 注意这里由于小程序的缘故正则表达式需要通过string的方式传递并且去除两边的斜杠，中间的斜杠变成两个斜杠
          message: '手机号格式不正确'
        }],
        sex: [{
          required: true,
          message: '请选择性别'
        }]
      },
      hideRequiredAsterisk: false,

    }
  },
  methods: {
    async request() {
      try {
        const res = await loginIn();
        const token = res.data.accessToken;
        setAccessToken(token);
      } catch (error) {
      }
    },
    async getSelector() {
      try {
        await getSelector();
      } catch (error) { }
    },
    open() {
      this.$refs.popup.open();
    },
    close(done) {
      console.log('关闭');
      done();
    },
    confirm(done, value) {
      console.log(value);
      done();
    },
    submit() {
      this.$refs.form.validate((res) => {
        if (res) {
          uni.showToast({
            title: '验证通过'
          })
        }
      })
    },
    sexChange(e) {
      this.formList.sex = e.detail.value
    },
    changeNumber(e) {
      this.formList.place = this.selectorList[e.detail.value].label
      console.log(e)
    },
    getFlieInfo(val) {
      console.log(val)
    }
  },


};
</script>

<style lang="scss">
@import "@/style/index.scss";
</style>
