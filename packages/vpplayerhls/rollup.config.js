/*
 * @Author: Allen OYang
 * @Date: 2021-07-28 19:23:13
 * @Descripttion: 
 * @LastEditTime: 2021-07-29 14:06:54
 * @FilePath: /plugin-core/packages/vpplayerhls/rollup.config.js
 */
/*
 * @Author: Allen OYang
 * @Date: 2020-09-30 10:21:49
 * @Descripttion: 
 * @LastEditTime: 2021-07-28 11:48:19
 * @FilePath: /plugin-core/packages/vp-player/rollup.config.js
 */
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import clear from 'rollup-plugin-clear';
import resolve from 'rollup-plugin-node-resolve';
import svg from 'rollup-plugin-svg'
import styles from "rollup-plugin-styles";
import tsconfig from './tsconfig.json';


import path from 'path';


const resolveFile = function (filePath) {
  return path.join(__dirname, filePath)
}

const outputConfig = {
  name: 'PlayerHLS',
  outputFile: './lib',
  format: ['iife', 'cjs', 'umd', 'esm']
}

const output = outputConfig.format.map((item) => {
  return {
    name: outputConfig.name,
    file: `${outputConfig.outputFile}/index.${item}.js`,
    format: item,
    sourcemap: true,
  }
})

export default {
  input: './src/index.ts',
  output,
  plugins: [
    styles(),  
    typescript({
      exclude: 'node_modules/**',
      tsconfigDefaults: tsconfig,
      objectHashIgnoreUnknownHack: false,
    }),
    svg(),
    commonjs(),
    clear('./lib'),
    resolve({
      // 将自定义选项传递给解析插件
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    })
  ],  
  external: ['vpplayer']  
 
};
