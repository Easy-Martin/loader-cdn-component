/*
    rollup 配置文件
*/
import pkg from './package.json'
import clear from 'rollup-plugin-clear'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
const external = Object.keys(pkg.dependencies)
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

const rollupConfig = {
  input: {
    index: 'src/index.js'
  },
  output: {
    dir: 'es',
    format: 'es',
    sourceMap: true,
    entryFileNames: 'load-cdn-component.js',
    exports: 'named'
  },
  experimentalCodeSplitting: true,
  plugins: [
    resolve(),
    babel({ runtimeHelpers: true, exclude: 'node_modules/**' }),
    clear({
      targets: ['es']
    })
  ],
  // 将模块视为外部模块，不会打包在库中
  external: id => external.some(e => id.indexOf(e) === 0)
}

export default rollupConfig
