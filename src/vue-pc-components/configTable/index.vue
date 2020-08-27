<!--
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2020-03-27 16:34:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-07 18:04:10
 -->
<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>已显示栏目：</span>
        <span style="float: right; padding: 3px 0" type="text">提示：可拖拽按钮进行位置交换</span>
      </div>
      <div class="text item">
        <draggable
          :list="columns"
          :disabled="!enabled"
          :move="checkMove(columns)"
          class="list-group"
          ghost-class="ghost"
          @start="start(columns)"
          @end="dragging = false"
        >
          <el-tag
            v-for="(item,index) in columns"
            v-show="item.name!=''"
            :key="index"
            :class="{draggable:index!=0}"
            closable
            style="width:130px;margin:5px;cursor: pointer;text-align:center;"
            class="list-group-item"
            @close="onDel(index, columns)"
          >{{ item.name }}</el-tag>
        </draggable>
      </div>
    </el-card>

    <el-card shadow="never" style="margin-top:20px;">
      <div slot="header" class="clearfix">
        <span>未显示栏目：</span>
      </div>
      <div class="text item">
        <el-tag
          v-for="(delItem,n) in delcolumns"
          :key="n"
          style="width:130px; margin:5px;cursor: pointer;text-align:center;"
          class="list-group-item"
        >
          {{ delItem.name }}
          <i class="el-icon-plus" @click="add(n,delcolumns)" />
        </el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    delcolumns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      enabled: true,
      dragging: false
      // options: {
      //   group: "name",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] } name相同的组可以互相拖动
      //   sort: true,  // 内部排序列表
      //   delay: 0, // 以毫秒为单位定义排序何时开始。
      //   touchStartThreshold: 0, // px,在取消延迟拖动事件之前，点应该移动多少像素?
      //   disabled: false, // 如果设置为真，则禁用sortable。
      //   store: null,  // @see Store
      //   animation: 150,  // ms, 动画速度运动项目排序时，' 0 ' -没有动画。
      //   handle: ".my-handle",  // 在列表项中拖动句柄选择器。
      //   filter: ".ignore-elements",  // 不导致拖拽的选择器(字符串或函数)
      //   preventOnFilter: true, // 调用“event.preventDefault()”时触发“filter”
      //   draggable: ".list-group-item.el-tag el-tag--medium.el-tag--light.draggable",  // 指定元素中的哪些项应该是可拖动的。
      //   // ghostClass: "sortable-ghost",  // 设置拖动元素的class的占位符的类名。
      //   // chosenClass: "sortable-chosen",  // 设置被选中的元素的class
      //   // dragClass: "sortable-drag",  //拖动元素的class。
      //   dataIdAttr: 'data-id',
      //   forceFallback: false,  // 忽略HTML5的DnD行为，并强制退出。（h5里有个属性也是拖动，这里是为了去掉H5拖动对这个的影响）
      //   fallbackClass: "sortable-fallback",  // 使用forceFallback时克隆的DOM元素的类名。
      //   fallbackOnBody: false,  // 将克隆的DOM元素添加到文档的主体中。（默认放在被拖动元素的同级）
      //   fallbackTolerance: 0, // 用像素指定鼠标在被视为拖拽之前应该移动的距离。
      //   scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
      //   scrollSpeed: 10, // px
      // }
    }
  },
  mounted() {

  },
  methods: {
    // sortRight(index, columns) {
    //   if (index == columns.length - 1) {
    //     this.$message.error('已经在最后一位，无法后移')
    //   } else {
    //     columns[index] = columns.splice(index + 1, 1, columns[index])[0]
    //   }

    //   this.$forceUpdate()
    // },
    // sortLeft(index, columns) {
    //   if (index == 0) {
    //     this.$message.error('已经在首位，无法前移')
    //   } else {
    //     columns[index] = columns.splice(index - 1, 1, columns[index])[0]
    //   }

    //   this.$forceUpdate()
    // },
    onDel(index, columns) {
      if (columns[index].name === '') {
        this.$message.warning('判断是否异常的标志位不允许删除')
      } else {
        this.delcolumns.push(columns[index])
        columns.splice(index, 1)
      }
    },
    add(index, delcolumns) {
      this.columns.push(delcolumns[index])
      delcolumns.splice(index, 1)
    },
    start(e) {
      if (e[0].name === '') {
        return false
      }
    },
    // 表头拖拽
    checkMove: function(e) {
      window.console.log(e)
    }
  }
}
</script>
