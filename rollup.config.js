//@ts-check
import path from 'path'
import ts from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import camelCase from 'lodash.camelcase'
import pkg from './package.json'

/**
 * @param {string} p
 * @returns
 */
const resolve = (p) => path.resolve(__dirname, p)
const name = camelCase(pkg.name) ?? 'index'

/**
 * @type { import('rollup').RollupOptions }
 */
const config = {
  input: path.resolve(__dirname, 'src/index.ts'),
  output: [
    {
      file: resolve(`dist/${name}.global.js`),
      name: `${name}`,
      format: 'iife'
    },
    {
      file: resolve(`dist/${name}.mjs`),
      format: 'es'
    },
    {
      file: resolve(`dist/${name}.js`),
      name: `${name}`,
      format: `umd`
    }
  ],
  external: [...Object.keys(pkg.devDependencies || {})],
  plugins: [
    json({
      namedExports: false
    }),
    commonjs(),
    nodeResolve(),
    ts({
      check: process.env.NODE_ENV === 'production',
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true
        },
        exclude: ['**/__TEST__', 'test-dts']
      }
    })
  ]
}

export default config
