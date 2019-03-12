module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'array-callback-return': 'error', // 强制数组方法的回调函数中有 return 语句
    curly: 'error', // 循环或者条件语句必须使用花括号包住
    eqeqeq: 'error', // 使用强制等===
    'max-len': 'off', // 取消行长度限制
    'no-console': 'error', // 禁止使用console时
    'no-debugger': 'error', // 禁止使用debugger时
    'no-mixed-spaces-and-tabs': 'error', // 不允许空格和 tab 混合缩进
    'no-unreachable': 'error', // 禁止在return、throw、continue 和 break语句之后出现不可达代码
    'prettier/prettier': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
