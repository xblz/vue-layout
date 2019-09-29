<template>
  <div style="display: flex">
    <el-table :data="tableData" border>
      <el-table-column v-for="column in columns" v-bind:key="column.guid" :prop="column.prop">
        <template slot="header" slot-scope="scope">
          <span>{{ column.label }}</span>
          <i
            class="el-icon-setting"
            style="padding: 0 8px;cursor: pointer;"
            @click="handleClickEditCol(scope.$index)"
          ></i>
          <i
            class="el-icon-delete"
            style="color: red;padding: 0 8px 0 0;cursor: pointer;"
            @click="handleClickDelCol(scope.$index)"
          ></i>
        </template>
      </el-table-column>
      <el-table-column width="100px">
        <template slot="header">
          <i class="el-icon-plus" @click="handleClickAddCol()">添加列</i>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin: 8px;padding: 8px;" @click="handleClickDel">移除布局</el-button>
    <el-dialog title="编辑列属性" :visible.sync="showAddDialog" :append-to-body="true" width="30%" center>
      <el-form v-model="columnInfo" label-width="50px">
        <el-row>
          <el-form-item label="prop">
            <el-input v-model="columnInfo.prop"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="label">
            <el-input v-model="columnInfo.label"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getGuid } from '../../utils/commonUtil'

export default {
  name: 'template-table',
  props: {
    index: [String, Number],
    data: Array,
    config: Object
  },
  data() {
    return {
      tableData: [],
      columns: [],
      columnInfo: {},
      showAddDialog: false
    }
  },
  mounted() {
    if (this.data) {
      this.tableData = this.data
    }
    if (this.config && this.config.columns) {
      this.columns = this.config.columns
    } else {
      this.columns.push({
        prop: 'demo',
        label: 'demo列',
        guid: getGuid()
      })
    }
  },
  methods: {
    handleClickAddCol() {
      const index = this.columns.length
      this.columns.push({ prop: `new_${index}`, label: `新增列_${index}`, guid: getGuid() })
    },
    handleClickEditCol(index) {
      this.columnInfo = this.columns[index]
      this.showAddDialog = true
    },
    handleClickDelCol(index) {
      this.columns.splice(index, 1)
    },
    handleClickDel() {
      this.$emit('click-del')
    }
  },
  watch: {
    columns: {
      handler(newValue) {
        let data = {}
        let html = `    <el-table :data="data_${this.index}" border>\n`
        html += '      <el-table-column type="index" align="center" label="序号" />\n'
        newValue.forEach((val) => {
          data[val.prop] = val.label + '的数据'
          html += `      <el-table-column prop="${val.prop}" label="${val.label}" />\n`
        })
        html += '    </el-table>'
        this.tableData.splice(0, 1, data)
        let returnData = {}
        returnData[`data_${this.index}`] = this.tableData
        let config = {}
        config[`config_${this.index}`] = { columns: this.columns }
        this.$emit('change', { index: this.index, html, data: returnData, config })
      },
      deep: true
    }
  }
}
</script>
