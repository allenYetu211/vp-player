/*
 * @Author: Allen OYang
 * @Date: 2022-01-12 15:41:23
 * @Descripttion: 
 * @LastEditTime: 2022-01-17 15:46:18
 * @FilePath: /plugin-core/packages/xyplayer_react/rollup.config.js
 */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import jsx from 'acorn-jsx';
import sourcemaps from 'rollup-plugin-sourcemaps';

import tsconfig from './tsconfig.json';

export default {
  // input: "src/index.tsx",
  input: "src/index.tsx",
  acornInjectPlugins: [jsx()],
  external: ['react', 'xyplayerhls'],
  plugins: [
    sourcemaps(),
    resolve(),
    commonjs(),
    typescript({
      sourcemaps: true,
      jsx: 'preserve',
      exclude: 'node_modules/**',
      tsconfigDefaults: tsconfig,
      objectHashIgnoreUnknownHack: false,
    }),
    babel({
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']
    }),
  ],
  output: {
    name: 'XYPlayerReact',
    file: 'dist/index.js',
    format: 'esm',
    plugins: [
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
      })
    ],
    sourceMap: true,
  },
}
