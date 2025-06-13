import resolve from "@rollup/plugin-node-resolve"; // 解析第三方模块依赖
import commonjs from "@rollup/plugin-commonjs"; // 将 CommonJS 模块转换为 ES6 模块
import { babel } from "@rollup/plugin-babel"; // 将 Babel 转译代码
import { terser } from "rollup-plugin-terser"; // 代码压缩工具
import path from "path"; // Node.js 路径处理模块

// 文件扩展名配置
const extensions = [".ts", ".tsx", ".js", ".jsx"];

export default () => ({
  // 入口配置
  input: path.resolve(__dirname, "index.ts"),
  // 输出配置
  output: [
    // UMD 格式（用于 <script> 标签）
    {
      file: path.resolve(__dirname, "dist/h5Monitor.js"), // 输出文件
      format: "umd", // 输出格式，UMD (Universal Module Definition)，支持浏览器、Node.js 和 AMD
      name: "h5Monitor", // 全局名称: h5Monitor，在浏览器中会挂载到 window.h5Monitor
    },
    // ESM 格式（用于 Vue/React 项目）
    {
      file: path.resolve(__dirname, "dist/h5Monitor.esm.js"),
      format: "esm",
    },
  ],
  // 插件
  plugins: [
    // 模块解析插件
    resolve({
      extensions, // 指定 import 模块后缀解析规则
    }),
    // 将 CommonJS 模块转换为 ES6 模块
    commonjs(),
    // Babel 转译插件
    babel({
      extensions,
      presets: [
        "@babel/preset-env", // 转换现代JS为兼容旧浏览器的代码
        [
          "@babel/preset-typescript", // 处理TS
          {
            isTSX: true, // 支持TSX语法
            allExtensions: true, // 处理所有扩展名文件
          },
        ],
      ],
      babelHelpers: "bundled", // 将Babel辅助函数集成到输出文件中
    }),
    // 代码压缩插件（压缩输出代码；删除注释、空白符，混淆变量名等；减少文件体积）
    terser(),
  ],
});
