<template>
  <div id="applicationForm">
    <div class="formInner">
      <evan-form
        ref="form"
        :hide-required-asterisk="hideRequiredAsterisk"
        :model="formList"
        :rules="rules"
      >
        <evan-form-item label="标题" prop="name">
          <input
            class="form-input"
            placeholder-class="form-input-placeholder"
            v-model="formList.name"
            placeholder="请输入标题"
          />
        </evan-form-item>
        <div style="background-color:#efebeb66;height:20rpx"></div>
        <evan-form-item label="申请人" prop="email">
          <input
            class="form-input"
            placeholder-class="form-input-placeholder"
            v-model="formList.email"
            placeholder="请输入申请人"
          />
        </evan-form-item>
        <evan-form-item label="所属部门" prop="phone">
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
        <evan-form-item label="申请类型" prop="place">
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
        <evan-form-item label="申请原因" prop="email">
          <input
            class="form-input"
            placeholder-class="form-input-placeholder"
            v-model="formList.email"
            placeholder="请输入申请原因"
          />
        </evan-form-item>
        <evan-form-item label="申请金额" prop="email">
          <input
            class="form-input"
            placeholder-class="form-input-placeholder"
            v-model="formList.email"
            placeholder="请输入申请金额"
          />
        </evan-form-item>
        <evan-form-item label="要求完成时间：" prop="place">
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
      </evan-form>
    </div>
    <div class="describe">
      <div>
        <div></div>
        <div>申请描述</div>
      </div>
      <div class="describeInner">
        <textarea
          :value="formList.value"
          cols="30"
          rows="10"
          placeholder="请输入"
          placeholder-class="placeholder-class"
        ></textarea>
      </div>
    </div>
    <div class="approval-process">
      <div>
        <div></div>
        <div>审批流程</div>
      </div>
      <div class="steps">
        <div class="steps-main" v-for="(item,i) in 15" :key="i">
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
    </div>
    <div class="bg-div"></div>
    <div class="bottom-div">
      <button>提交申请</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formList: {
        name: '',
        email: '',
        phone: '',
        sex: '',
        place: '请选择地区',
        value: '',
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

  }
}
</script>

<style lang="scss">
@import "@/style/applicationForm.scss";
</style>