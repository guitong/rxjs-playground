import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    name: 'MyBundle',
    format: 'iief'
  },
  plugins: [ resolve() ]
};