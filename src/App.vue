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

import JSZip from 'jszip';
import fileSaver from 'file-saver';

export default {
  components: {
    draggable,
    ...components
  },
  data() {
    return {
      templates: [], // 模板库列表
      selectTemplates: [], // 已选中模板列表
      returnHtml: '', // 代码预览
      fileContext: {
        public: {
          index:
            '<!DOCTYPE html>\n' +
            '<html lang="en">\n' +
            '  <head>\n' +
            '    <meta charset="utf-8">\n' +
            '    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
            '    <meta name="viewport" content="width=device-width,initial-scale=1.0">\n' +
            '    <link rel="icon" href="<%= BASE_URL %>favicon.ico">\n' +
            '    <title>temp</title>\n' +
            '  </head>\n' +
            '  <body>\n' +
            '    <noscript>\n' +
            "      <strong>We're sorry but temp doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>\n" +
            '    </noscript>\n' +
            '    <div id="app"></div>\n' +
            '    <!-- built files will be auto injected -->\n' +
            '  </body>\n' +
            '</html>\n'
        },
        src: {
          app:
            '<template>\n' +
            '  <div id="app">\n' +
            '    <HelloWorld />\n' +
            '  </div>\n' +
            '</template>\n' +
            '\n' +
            '<script>\n' +
            'import HelloWorld from "./components/HelloWorld.vue";\n' +
            '\n' +
            'export default {\n' +
            '  name: "app",\n' +
            '  components: {\n' +
            '    HelloWorld\n' +
            '  }\n' +
            '};\n' +
            '<' +
            '/script>' +
            '<style>\n' +
            '#app {\n' +
            '  font-family: "Avenir", Helvetica, Arial, sans-serif;\n' +
            '  -webkit-font-smoothing: antialiased;\n' +
            '  -moz-osx-font-smoothing: grayscale;\n' +
            '  text-align: center;\n' +
            '  color: #2c3e50;\n' +
            '  margin-top: 60px;\n' +
            '}\n' +
            '</style>',
          main:
            "import Vue from 'vue';\n" +
            "import App from './App.vue';\n" +
            "import ElementUI from 'element-ui';\n" +
            "import 'element-ui/lib/theme-chalk/index.css';\n" +
            'Vue.use(ElementUI);\n' +
            '\n' +
            'Vue.config.productionTip = false;\n' +
            '\n' +
            'new Vue({\n' +
            '  render: (h) => h(App)\n' +
            "}).$mount('#app');\n"
        },
        package:
          '{\n' +
          '  "name": "temp",\n' +
          '  "version": "0.1.0",\n' +
          '  "private": true,\n' +
          '  "scripts": {\n' +
          '    "serve": "vue-cli-service serve",\n' +
          '    "build": "vue-cli-service build",\n' +
          '    "lint": "vue-cli-service lint"\n' +
          '  },\n' +
          '  "dependencies": {\n' +
          '    "element-ui": "^2.6.1",\n' +
          '    "core-js": "^2.6.5",\n' +
          '    "vue": "^2.6.10"\n' +
          '  },\n' +
          '  "devDependencies": {\n' +
          '    "@vue/cli-plugin-babel": "^3.11.0",\n' +
          '    "@vue/cli-plugin-eslint": "^3.11.0",\n' +
          '    "@vue/cli-service": "^3.11.0",\n' +
          '    "babel-eslint": "^10.0.1",\n' +
          '    "eslint": "^5.16.0",\n' +
          '    "eslint-plugin-vue": "^5.0.0",\n' +
          '    "vue-template-compiler": "^2.6.10"\n' +
          '  },\n' +
          '  "eslintConfig": {\n' +
          '    "root": true,\n' +
          '    "env": {\n' +
          '      "node": true\n' +
          '    },\n' +
          '    "extends": [\n' +
          '      "plugin:vue/essential",\n' +
          '      "eslint:recommended"\n' +
          '    ],\n' +
          '    "rules": {},\n' +
          '    "parserOptions": {\n' +
          '      "parser": "babel-eslint"\n' +
          '    }\n' +
          '  },\n' +
          '  "postcss": {\n' +
          '    "plugins": {\n' +
          '      "autoprefixer": {}\n' +
          '    }\n' +
          '  },\n' +
          '  "browserslist": [\n' +
          '    "> 1%",\n' +
          '    "last 2 versions"\n' +
          '  ]\n' +
          '}\n',
        babel: 'module.exports = {\n' + '  presets: [\n' + "    '@vue/app'\n" + '  ]\n' + '}\n'
      }
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
    // handleClickDelTemplate(index) {
    //   this.selectTemplates.splice(index, 1);
    // },
    handleClickDelTemplate() {
      this.downloadZip();
    },
    handleChangeTemplate(index, html, data) {
      this.selectTemplates[index].html = html;
      this.selectTemplates[index].data = data;
      this.returnHtml = getHtml4String(this.selectTemplates);
    },
    downloadZip() {
      const zip = new JSZip();

      // public
      zip.file('public/index.html', this.fileContext.public.index);

      // src
      zip.file('src/components/HelloWorld.vue', this.returnHtml);
      zip.file('src/App.vue', this.fileContext.src.app);
      zip.file('src/main.js', this.fileContext.src.main);

      // .
      zip.file('babel.config.js', this.fileContext.babel);
      zip.file('package.json', this.fileContext.package);

      zip.generateAsync({ type: 'blob' }).then(function(content) {
        fileSaver.saveAs(content, 'example.zip');
      });
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
