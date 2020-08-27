<template>
  <div id="table">
    <el-table
      :ref="tableInfo.ref"
      :data="formatData"
      border
      stripe
      style="width: 100%"
      @select="onTableSelect"
      @selection-change="handleSelectionChange"
      @header-dragend="colChange"
    >
      >
      <!-- 表头 、表体-->
      <template v-for="column in tableInfo.columns">
        <el-table-column
          v-if="column.type"
          :fixed="column.fixed"
          :key="column.desc+new Date()"
          :label="column.name"
          :sortable="column.sortable?'custom':false"
          :type="column.type"
          :width="column.width==undefined?'auto':column.width"
          align="center"
        />
        <el-table-column
          v-if="!column.type"
          :fixed="column.fixed"
          :key="column.desc+new Date()"
          :label="column.name"
          :prop="column.desc"
          :show-overflow-tooltip="column.tooltip?true:false"
          :sortable="column.sortable?'custom':false"
          :width="column.width==undefined?'auto':column.width"
          align="center"
        >
          <template slot-scope="scope">
            <div
              v-if="!column.ShowState&&!column.showAndColor&&!column.show1&&!column.innerType&&!column.editInColumn&&!column.editBtns"
              :class="`${[1].includes(scope.row['stateIndex'])?'stateColorOne':([2].includes(scope.row['stateIndex'])?'stateColorTwo':'')}`"
              @click="onTableClick(column,scope.row,column.desc)"
            >{{ scope.row[column.desc] }}</div>

            <div
              v-if="column.editInColumn"
              :class="`${[1].includes(scope.row['stateIndex'])?'stateColorOne':([2].includes(scope.row['stateIndex'])?'stateColorTwo':'')}`"
            >
              <span v-if="scope.row['changeEdit']" v-text="scope.row[column.desc]"/>
              <el-select
                v-if="column.editInColumn==='select'&&!scope.row['changeEdit']"
                v-model="scope.row[column.desc]"
                :placeholder="column.placeholder"
                filterable
                clearable
              >
                <el-option
                  v-for="(item,i) in column.Options"
                  :key="i"
                  :label="item.label"
                  :value="item"
                  :value-key="true"
                />
              </el-select>
              <el-input
                v-if="column.editInColumn==='input'&&!scope.row['changeEdit']"
                v-model="scope.row[column.desc]"
                :placeholder="column.placeholder"
                clearable
              />
              <el-date-picker
                v-if="column.editInColumn==='date'&&!scope.row['changeEdit']"
                v-model="scope.row[column.desc]"
                :placeholder="column.placeholder"
                value-format="yyyy-MM-dd"
                type="date"
              />
            </div>

            <div v-if="column.innerType">
              <el-select
                v-if="column.innerType==='select'"
                :class="{'select-border':column.verify&&scope.row.verify[column.desc]}"
                v-model="scope.row[column.desc]"
                :placeholder="column.placeholder"
                filterable
                clearable
                @change="changeValue(scope.row,column.desc,scope.row[column.desc])"
                @blur="changeValue(scope.row,column.desc,scope.row[column.desc])"
              >
                <el-option
                  v-for="(item,i) in column.Options"
                  :key="i"
                  :label="item.label"
                  :value="item"
                  :value-key="true"
                />
              </el-select>
              <el-input
                v-if="column.innerType==='input'"
                :class="{'input-border':column.verify&&scope.row.verify[column.desc]}"
                v-model="scope.row[column.desc]"
                :placeholder="column.placeholder"
                clearable
                @input="changeValue(scope.row,column.desc,scope.row[column.desc])"
                @blur="changeValue(scope.row,column.desc,scope.row[column.desc])"
              />
              <el-date-picker
                v-if="column.innerType==='date'"
                :class="{'date-border':column.verify&&scope.row.verify[column.desc]}"
                v-model="scope.row[column.desc]"
                :placeholder="column.placeholder"
                value-format="yyyy-MM-dd"
                type="date"
                @blur="changeValue(scope.row,column.desc,scope.row[column.desc])"
              />
            </div>

            <div
              v-if="column.show1"
              :style="{'color':column.colorShow?((scope.row[column.desc] == column.statusIndex[0]||scope.row[column.desc] == null)? column.colorShow[0]:(scope.row[column.desc] == column.statusIndex[1]? column.colorShow[1] :( scope.row[column.desc] === column.statusIndex[2]?column.colorShow[2]:( scope.row[column.desc] === column.statusIndex[3]?column.colorShow[3]:( scope.row[column.desc] === column.statusIndex[4]?column.colorShow[4]:column.colorShow[5]))))):false}"
            >{{ (scope.row[column.desc] == column.statusIndex[0]||scope.row[column.desc] == null)? column.status[0]:(scope.row[column.desc] == column.statusIndex[1]? column.status[1] :( scope.row[column.desc] === column.statusIndex[2]?column.status[2]:( scope.row[column.desc] === column.statusIndex[3]?column.status[3]:( scope.row[column.desc] === column.statusIndex[4]?column.status[4]:column.status[5])))) }}</div>
            <div
              v-if="column.showAndColor"
              :style="{color:(scope.row[column.desc] == 0||scope.row[column.desc] == null)? column.style[0]:(scope.row[column.desc] == 1? column.style[1] :( scope.row[column.desc] === 2?column.style[2]:( scope.row[column.desc] === 3?column.style[3]:( scope.row[column.desc] === 4?column.style[4]:column.style[5]))))}"
            >{{ (scope.row[column.desc] == 0||scope.row[column.desc] == null)? column.status[0]:(scope.row[column.desc] == 1? column.status[1] :( scope.row[column.desc] === 2?column.status[2]:( scope.row[column.desc] === 3?column.status[3]:( scope.row[column.desc] === 4?column.status[4]:column.status[5])))) }}</div>

            <div v-if="column.editBtns">
              <el-button
                v-for="(btn ,index) in scope.row[column.desc]?column.editBtns[0]:column.editBtns[1]"
                v-show="btn.name&&btn.btnShow===true?(scope.row[btn.index]===btn.indexValue?true:false):true"
                :class="btn.btnClass"
                :key="index"
                :type="btn.btnType"
                :disabled="btn.disabled&&(scope.row[btn.index]===btn.indexValue)"
                size="mini"
                @click="handleBtnClick(btn.clickType, scope.row)"
              >
                <span>
                  {{ btn.name }}
                  <i v-if="btn.icon===0" class="el-icon-sort-up" />
                  <i v-if="btn.icon===1" class="el-icon-sort-down" />
                </span>
              </el-button>
            </div>

            <div v-if="column.newBtns" :style="'text-align:center;'+column.style">
              <el-button
                v-for="(btn ,index) in column.newBtns"
                v-show="btn.name&&btn.btnShow===true?(btn.indexValue.includes(scope.row[btn.index])?true:false):true"
                :class="btn.btnClass"
                :key="index"
                :type="btn.btnType"
                :disabled="btn.disabled&&(btn.indexValue.includes(scope.row[btn.index]))"
                size="mini"
                @click="handleBtnClick(btn.clickType, scope.row)"
              >
                <span v-if="!btn.dropdowns">
                  {{ btn.changeName===true?((btn.descNum==0?scope.row[column.desc.split(',')[0]]===1?btn.name[1]:btn.name[0]:scope.row[column.desc.split(',')[1]]===1?btn.name[0]:btn.name[1])):btn.name }}
                  <i
                    v-if="btn.icon===0"
                    class="el-icon-sort-up"
                  />
                  <i v-if="btn.icon===1" class="el-icon-sort-down" />
                </span>

                <span v-if="btn.dropdowns">
                  <el-dropdown trigger="click">
                    <span style="color: #2C64FF; font-size: 12px">
                      {{ btn.changeName===true?((btn.descNum==0?scope.row[column.desc.split(',')[0]]===1?btn.name[1]:btn.name[0]:scope.row[column.desc.split(',')[1]]===1?btn.name[0]:btn.name[1])):btn.name }}
                      <i
                        v-if="btn.icon===0"
                        class="el-icon-sort-up"
                      />
                      <i v-if="btn.icon===1" class="el-icon-sort-down" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(dropdown ,index) in btn.dropdowns"
                        :key="index"
                        @click.native="handleBtnDropdownClick(dropdown.clickType, scope.row)"
                      >{{ dropdown.name }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              </el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    tableInfo: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      name: ''

    }
  },
  computed: {
    formatData() {
      return this.data
    },
    total() { // 总条数
      return this.data.length
    }
  },
  watch: {
    columns: {
      handler(newName, oldName) {
        this.listLoading = true
        this.listLoading = false
      },
      immediate: true,
      deep: true
    }
  },

  methods: {

    changeValue(obj, desc, value) {
      // console.log(obj, desc, value, obj.linkage, 11111)
      if (obj.verify) {
        value ? obj.verify[desc] = false : obj.verify[desc] = true// 单条校验
        if (value && obj.linkage.includes(desc)) { // 联动校验
          obj.linkage.forEach(key => {
            obj.verify[key] = false
          })
        }
      }
      if (desc === 'itemCode' || desc === 'itemModel') {
        this.$emit('selectLinkage', { value, obj })
      }
    },
    handleBtnDropdownClick(clickType, row) {
      this.$emit('handleBtnDropdownClick', { row: row, type: clickType })
    },
    handleBtnClick(clickType, row) {
      this.$emit('handleBtnClick', { row: row, type: clickType })
    },
    onTableClick(column, row, clickType) {
      this.$emit('onTableClick', { column: column, row: row, type: clickType })
    },
    getCheckInfo() {
      const checkInfo = this.$refs[this.tableInfo.ref].selection
      return checkInfo
    },
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    onTableSelect(val) {
      this.$emit('onTableSelect', val)
    },
    colChange(newWidth, oldWidth, column, event) {
      // console.log(newWidth, this.tableInfo.columns, column, event)
      console.log('拖动表头改变列宽')
      this.tableInfo.columns.map(item => {
        if (item.name === column.label) {
          item.width = newWidth
        }
      })
      console.log(this.tableInfo.columns)
    }

  }
}
</script>

<style lang="scss">
/*表格样式*/
.el-table__row:nth-of-type(odd) {
  background-color: white;
  font-size: 13px;
  color: #797979;
}
.el-table__row:nth-of-type(even) {
  background-color: white;
  font-size: 13px;
  color: #797979;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(67, 200, 200, 0.2);
}

.el-dropdown-menu {
  margin-right: -45px !important;
}
.select-border,
.input-border,
.date-border {
  input {
    border-color: red !important;
  }
}
#table {
  .el-date-editor {
    width: 140px;
  }
  .stateColorOne {
    color: red !important;
  }
  .stateColorTwo {
    color: #ea7028 !important;
  }
}
</style>
