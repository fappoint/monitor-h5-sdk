module.exports = {
  // 单行最大长度
  printWidth: 120,

  // 使用空格缩进
  useTabs: false,

  // 缩进空格数
  tabWidth: 2,

  // 语句末尾分号
  semi: true,

  // 使用单引号
  singleQuote: true,

  // 对象属性引号使用: as-needed(仅在需要时使用)
  quoteProps: "as-needed",

  // JSX中使用单引号
  jsxSingleQuote: true,

  // 对象、数组尾随逗号: none(无)、es5(添加es5有效的尾随逗号)、all(尽可能添加)
  trailingComma: "all",

  // 对象字面量大括号内的空格: true - { foo: bar }, false - {foo: bar}
  bracketSpacing: true,

  // JSX标签闭合位置: false - <div
  //                      className=""
  //                   >
  //             true  - <div
  //                      className="">
  bracketSameLine: false,

  // 箭头函数参数括号: avoid(当只有一个参数时省略括号)、always(总是有括号)
  arrowParens: "avoid",

  // 文件顶部是否需要注释（@prettier等）才能格式化
  requirePragma: false,

  // 是否在文件顶部插入格式化注释
  insertPragma: false,

  // 行结束符: lf, crlf, cr, auto
  endOfLine: "lf",

  // HTML空白敏感性
  htmlWhitespaceSensitivity: "css",

  // 是否缩进Vue文件中的<script>和<style>标签
  vueIndentScriptAndStyle: false,
};
