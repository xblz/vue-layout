<template>
  <div style="display: flex">
    <el-table :data="tableData">
      <el-table-column v-for="column in columns" v-bind:key="column.guid" :prop="column.prop">
        <template slot="header" slot-scope="scope">
          <span>{{ column.label }}</span>
          <i class="el-icon-setting" style="padding: 0 8px;cursor: pointer;" @click="handleClickEdit(scope.$index)"></i>
          <i
            class="el-icon-delete"
            style="color: red;padding: 0 8px 0 0;cursor: pointer;"
            @click="handleClickEdit(scope.$index, true)"
          ></i>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <i class="el-icon-plus" @click="handleClickEdit()">添加列</i>
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
import { guid } from '@/lib/methods'
export default {
  name: 'template-table',
  props: {
    index: [String, Number]
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
    this.columns.push({
      prop: 'demo',
      label: 'demo列',
      guid: guid()
    })
  },
  methods: {
    handleClickEdit(index, del) {
      if (del) {
        this.columns.splice(index, 1)
      } else {
        if (index === undefined) {
          const index = this.columns.length
          this.columns.push({ prop: 'new_' + index, label: '新增列_' + index, guid: guid() })
        } else {
          this.columnInfo = this.columns[index]
          this.showAddDialog = true
        }
      }
    },
    handleClickDel() {
      this.$emit('click-del')
    }
  },
  watch: {
    columns: {
      handler(newValue) {
        let data = {}
        let html = '    <el-table :data="tableData_' + this.index + '">\n'
        newValue.forEach((val) => {
          data[val.prop] = val.label + '的数据'
          html += '      <el-table-column prop="' + val.prop + '" label="' + val.label + '"> </el-table-column>\n'
        })
        html += '    </el-table>'
        this.tableData.splice(0, 1, data)
        let returnData = {}
        returnData['tableData_' + this.index] = this.tableData
        this.$emit('change', this.index, html, returnData)
      },
      deep: true
    }
  }
}
</script>
