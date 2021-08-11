/*
 * @Author: Allen OYang
 * @Date: 2021-07-28 19:23:13
 * @Descripttion: 
 * @LastEditTime: 2021-07-31 15:45:24
 * @FilePath: /plugin-core/packages/vpplayer/rollup.config.js
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
// import json from 'rollup-plugin-json';
// import serve from 'rollup-plugin-serve';
import resolve from 'rollup-plugin-node-resolve';
import svg from 'rollup-plugin-svg'
// import scss from 'rollup-plugin-scss'

import styles from "rollup-plugin-styles";
import alias from '@rollup/plugin-alias';



// import scss from 'rollup-plugin-scss'

// import { terser } from "rollup-plugin-terser";
// import {uglify} from 'rollup-plugin-uglify';

import path from 'path';

import tsconfig from './tsconfig.json';

const resolveFile = function (filePath) {
  return path.join(__dirname, filePath)
}

const outputConfig = {
  name: 'Player',
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
    styles({
      // modules: true
      modules: {
        mode: "local",
        generateScopedName: "vp_[local]_[hash:4]",
      },

    }),
    typescript({
      exclude: 'node_modules/**',
      tsconfigDefaults: tsconfig,
      objectHashIgnoreUnknownHack: false,
    }),
    svg(),
    resolve(),

    commonjs(),
    clear('./lib'),
    alias({
      entries: [
        { find: '@', replacement: './src' },
      ]
    })
    //  开发配置
    // serve({
    //   port: 3000,
    //   contentBase: [resolveFile('examples'), resolveFile('lib')]
    // }),
  ],

};
