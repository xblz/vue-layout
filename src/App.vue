<template>
  <div style="display: flex;height:100%">
    <draggable
      :list="templates"
      :options="{ group: { name: 'templates', pull: 'clone', put: false }, sort: false }"
      :clone="handleCloneTemplate"
      style="height:100%;width: 20%;border: 1px gray solid;padding: 8px;margin-right: 4px;"
    >
      <div v-for="template in templates" :key="template.id">
        <div>{{ template.name }}</div>
      </div>
    </draggable>

    <draggable
      :list="selectTemplates"
      :options="{ group: 'templates' }"
      class="dragArea11"
      style="height: 100%;width: 80%;border: 1px gray solid;padding: 8px;margin-left: 4px;"
    >
      <div v-for="(component, index) in selectTemplates" :key="component.id">
        <template v-if="component.name === 'template-table'">
          <template-table
            :index="index"
            @click-del="handleClickDelTemplate"
            @change="handleChangeTemplate"
          ></template-table>
        </template>
        <template v-else-if="component.name === 'layout2'">
          <layout2></layout2>
          <i @click="handleClickDelTemplate(index)">删除2</i>
        </template>
        <template v-else>
          {{ component.name }}
          <i @click="handleClickDelTemplate(index)">删除</i>
        </template>
      </div>
    </draggable>
    <label style="width: 40%;white-space: pre">{{ returnHtml }}</label>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import components from './components';
import { guid, getHtml4String } from './lib/methods';

export default {
  components: {
    draggable,
    ...components
  },
  data() {
    return {
      templates: [], // 模板库列表
      selectTemplates: [], // 已选中模板列表
      returnHtml: '' // 代码预览
    };
  },
  created() {
    this.templates = Object.keys(components).map((component) => {
      return {
        id: guid(),
        name: component
      };
    });
  },
  watch: {
    selectTemplates: {
      handler(newValue) {
        this.returnHtml = getHtml4String(newValue);
      },
      deep: true
    }
  },
  methods: {
    handleCloneTemplate(template) {
      template = JSON.parse(JSON.stringify(template));
      template.id = guid();
      return template;
    },
    handleClickDelTemplate(index) {
      this.selectTemplates.splice(index, 1);
    },
    handleChangeTemplate(index, html, data) {
      this.selectTemplates[index].html = html;
      this.selectTemplates[index].data = data;
      this.returnHtml = getHtml4String(this.selectTemplates);
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
</style>
