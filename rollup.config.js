import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import license from 'rollup-plugin-license'

const PROD = process.env.NODE_ENV === 'production'

let plugins = [
  babel({
    exclude: 'node_modules/**',
    presets: ["es2015-rollup"]
  })
]

if (PROD)
  plugins.push(uglify())

plugins.push(
  license({
    banner: `HjDict v0.0.4\n(C) Anthony Fu 2017\nReleased under the MIT License.\nhttps://github.com/antfu/hjdict`,
  }),
)

export default {
  entry: 'src/index.js',
  plugins,
  format: 'umd',
  moduleName: 'HjDict',
  sourceMap: true,
  dest: 'dist/hjdict.js',
  external: ['node-fetch']
}
