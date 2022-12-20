//@ts-check
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { defineConfig } from 'rollup'
import ts from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import dts from 'rollup-plugin-dts'

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const __dirname = path.join(fileURLToPath(import.meta.url), '..')

/**
 * @param {string} p
 * @returns
 */
const resolve = (p) => path.resolve(__dirname, p)
const name = 'index'

export default defineConfig([
  {
    input: resolve('src/index.ts'),
    output: [
      {
        file: resolve(`dist/${name}.mjs`),
        format: 'esm'
      },
      {
        file: resolve(`dist/${name}.js`),
        name: `${name}`,
        format: `umd`
      }
    ],
    external: [
      ...Object.keys(pkg.devDependencies || {})
    ],
    plugins: [
      json({
        namedExports: false
      }),
      commonjs(),
      nodeResolve({
        preferBuiltins: true
      }),
      ts()
    ]
  },
  {
    input: resolve('src/index.ts'),
    output: {
      file: resolve(`dist/index.d.ts`),
      format: 'esm',
    },
    external: [
      ...Object.keys(pkg.devDependencies || {})
    ],
    plugins: [
      dts({ respectExternal: true })
    ]
  }
])
