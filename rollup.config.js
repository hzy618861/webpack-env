
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import {terser}  from "rollup-plugin-terser"
export default {
  input: "src/index.js", // 入口文件
  // 指出应将哪些模块视为外部模块，如 Peer dependencies 中的依赖
  output:  {
    format: "cjs",
    dir: "dist", // 动态导入时会分包成多文件
  },
  plugins: [
    resolve(),
    json(),
    process.env.NODE_ENV === "production"? terser():null, // 压缩js
  ],

};