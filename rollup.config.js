import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/my-app.js',
  output: {
    dir: 'public',
    format: 'iife'
  },
  plugins: [
    nodeResolve({browser: true}),
    commonjs()
  ]
};
