import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const PROD = process.env.NODE_ENV === 'production'

let plugins = [
  babel({
    exclude: 'node_modules/**',
    presets: ["es2015-rollup"]
  })
]

if (PROD)
  plugins.push(uglify())

export default {
  entry: 'src/index.js',
  plugins,
  format: 'umd',
  moduleName: 'hjdict',
  sourceMap: true,
  dest: 'dist/hjdict.js',
  external: [ 'node-fetch' ]
}
