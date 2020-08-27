<template>
  <div id="filterContainer">
    <div class="filter-container">
      <div v-for="(item,i) in filterList" :key="i" class="filter-item">
        <el-input
          v-if="item.type==='input'"
          v-model="item.query"
          :placeholder="item.placeholder"
          :style="{'width': item.width+'px'}"
          clearable
          @keyup.13.native="handleFilter"
        />
        <el-select
          v-if="item.type==='select'"
          v-model="item.query"
          :filterable="item.filterable"
          :style="{'width': item.width+'px'}"
          :placeholder="item.placeholder"
          clearable
          @change="handleFilter()"
        >
          <el-option
            v-for="(n,index) in item.options"
            :key="index"
            :label="n.label"
            :value="n.value"
          />
        </el-select>
        <el-date-picker
          v-if="item.type==='date'"
          v-model="item.query"
          :value-format="item.format"
          :type="item.dateType"
          :placeholder="item.placeholder"
          :style="{'width': item.width+'px'}"
        />
        <el-button
          v-waves
          v-if="item.type==='button'"
          :type="item.buttonType"
          :icon="item.icon"
          @click="handleFilter()"
        >{{ item.content }}</el-button>
        <el-button
          v-waves
          v-if="item.type==='addButton'"
          :type="item.buttonType"
          :icon="item.icon"
          @click="add()"
        >{{ item.content }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
export default {
  directives: { waves },
  props: {
    filterList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // filterList: [
      //   { type: 'input', placeholder: '请输入医院名称', query: mode.hospitalName, width: '160' },
      //   { type: 'input', placeholder: '请输入订单号', query: mode.order, width: '160' },
      //   { type: 'select', placeholder: '请选择状态', query: mode.status, options: [{ value: 0, label: '否' }, { value: 1, label: '是' }], width: '160', filterable: true },
      //   { type: 'date', placeholder: '总量', query: mode.date, dateType: 'date', format: 'yyyy-MM-dd', width: '160' },
      //   { type: 'button', content: '查询', buttonType: 'primary', icon: 'el-icon-search' }
      // ]
    }
  },
  created() {
  },
  methods: {
    handleFilter() {
      this.$emit('handleFilter', { type: 'click' })
    },
    add() {
      this.$emit('add', { type: 'click' })
    }
  }
}
</script>

<style lang="scss">
#filterContainer {
  .filter-container {
    .filter-item {
      margin-right: 8px;
    }
  }
}
</style>
