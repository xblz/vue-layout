export default '' +
  'html,\n' +
  'body {\n' +
  '  height: 100%;\n' +
  "  font-family: 'Avenir', Helvetica, Arial, sans-serif;\n" +
  '}\n' +
  '\n' +
  '* {\n' +
  '  margin: 0;\n' +
  '  border: 0;\n' +
  '  padding: 0;\n' +
  '}\n' +
  '\n' +
  '.content{\n' +
  '  height: 100%;\n' +
  '  position: relative;\n' +
  '  padding: 20px;\n' +
  '  width: 100px;\n' +
  '  flex: 1;\n' +
  '}\n' +
  '\n' +
  '.el-table th.is-leaf {\n' +
  '  background: #f5f7fa;\n' +
  '}\n' +
  '\n' +
  '.form-label {\n' +
  '  .el-form-item {\n' +
  '    display: inline-table;\n' +
  '    label.el-form-item__label {\n' +
  '      text-align: center;\n' +
  '      display: table-cell;\n' +
  '      float: none;\n' +
  '      border: 1px solid #bfcbd9;\n' +
  '      border-right: 0;\n' +
  '      border-bottom-left-radius: 4px;\n' +
  '      border-top-left-radius: 4px;\n' +
  '      background-color: #fbfdff;\n' +
  '      padding: 0 10px;\n' +
  '      white-space: nowrap;\n' +
  '      font-size: 12px;\n' +
  '      line-height: 0;\n' +
  '    }\n' +
  '    .el-form-item__content {\n' +
  '      display: table-cell;\n' +
  '      line-height: 1;\n' +
  '      .el-input__inner {\n' +
  '        box-sizing: border-box;\n' +
  '        border-top-left-radius: 0;\n' +
  '        border-bottom-left-radius: 0;\n' +
  '      }\n' +
  '      .el-radio-group {\n' +
  '        height: 26px;\n' +
  '        align-items: center;\n' +
  '        display: flex;\n' +
  '        padding-left: 12px;\n' +
  '        border-left: 1px solid #dcdfe6;\n' +
  '      }\n' +
  '      .el-autocomplete{\n' +
  '        width: 100%;\n' +
  '      }\n' +
  '    }\n' +
  '    .el-date-editor.el-input,\n' +
  '    .el-date-editor.el-input__inner {\n' +
  '      width: 100% !important;\n' +
  '    }\n' +
  '    &.select-label {\n' +
  '      .el-form-item__label {\n' +
  '        padding: 0;\n' +
  '        line-height: 0;\n' +
  '        .el-input {\n' +
  '          input {\n' +
  '            border: none;\n' +
  '            background-color: #fbfdff;\n' +
  '          }\n' +
  '        }\n' +
  '        .el-select--mini {\n' +
  '          .el-input__inner {\n' +
  '            line-height: 26px;\n' +
  '            height: 26px;\n' +
  '          }\n' +
  '        }\n' +
  '      }\n' +
  '    }\n' +
  '  }\n' +
  '}\n' +
  '\n' +
  'form.flex {\n' +
  '  .el-form-item {\n' +
  '    width: 100%;\n' +
  '  }\n' +
  '  .double-input {\n' +
  '    width: 100% !important;\n' +
  '  }\n' +
  '}\n' +
  '\n' +
  'form.fixed-width {\n' +
  '  & > .el-row {\n' +
  "    & > [class*='el-col-'] {\n" +
  '      padding-right: 25px;\n' +
  '    }\n' +
  '    @for $i from 1 through 20 {\n' +
  '      & > .el-col-#{$i} {\n' +
  '        width: 50px * $i;\n' +
  '      }\n' +
  '    }\n' +
  '  }\n' +
  '}\n' +
  '\n' +
  '.el-form .el-select {\n' +
  '  width: 100%;\n' +
  '}\n' +
  '\n' +
  '.mgt20 {\n' +
  '  margin-top: 20px;\n' +
  '}\n' +
  '\n' +
  '.alert-tip {\n' +
  '  .el-alert__content .el-alert__description {\n' +
  '    color: #c09853;\n' +
  '  }\n' +
  '}\n' +
  '\n' +
  '.alert-box {\n' +
  '  color: #c09853;\n' +
  '  line-height: 26px;\n' +
  '  font-size: 12px;\n' +
  '  background-color: #fdf6ec;\n' +
  '  padding: 10px 20px;\n' +
  '  margin-bottom: 20px;\n' +
  '  font {\n' +
  '    color: red;\n' +
  '  }\n' +
  '}\n' +
  '\n' +
  '.alert-box__blue {\n' +
  '  color: #3a87ad;\n' +
  '  background-color: #d9edf7;\n' +
  '  line-height: 26px;\n' +
  '  padding: 10px 20px;\n' +
  '  font-size: 12px;\n' +
  '  margin-bottom: 20px;\n' +
  '}\n' +
  '\n' +
  '.form-item-tip {\n' +
  '  height: 40px;\n' +
  '  display: flex;\n' +
  '  align-items: center;\n' +
  '  line-height: 20px;\n' +
  '  font-size: 12px;\n' +
  '  color: #999;\n' +
  '  position: absolute;\n' +
  '  right: 0;\n' +
  '  width: 400px;\n' +
  '  top: 0;\n' +
  '  padding-left: 10px;\n' +
  '  transform: translateX(100%);\n' +
  '}\n' +
  '\n' +
  '.form-item-tip__bottom {\n' +
  '  margin-top: 5px;\n' +
  '  line-height: 20px;\n' +
  '  font-size: 12px;\n' +
  '  color: #999;\n' +
  '  padding-left: 10px;\n' +
  '}\n' +
  '\n' +
  '.el-table .warning-row {\n' +
  '  background: oldlace;\n' +
  '}\n' +
  '\n' +
  '.el-table .success-row {\n' +
  '  background: #f0f9eb;\n' +
  '}\n' +
  '\n' +
  '.el-notification {\n' +
  '  z-index: 9999 !important;\n' +
  '}\n' +
  '.el-input__count-inner {\n' +
  '  line-height: 24px;\n' +
  '}\n' +
  '.el-textarea .el-input__count {\n' +
  '  line-height: 1;\n' +
  '}\n' +
  '\n' +
  '.is-border-error .el-input__inner {\n' +
  '  border-color: #f56c6c;\n' +
  '}\n' +
  '.pt-0 .el-dialog__body{\n' +
  '  padding-top: 0;\n' +
  '}\n' +
  '.el-tabs__content{\n' +
  '  height: 100%;\n' +
  '}\n'
