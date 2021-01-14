import { defineConfig } from 'umi';
import postcssPx2vw from 'postcss-px-to-viewport';

export default defineConfig({
  hash: true,
  history: {
    type: 'hash',
  },
  dva: {
    hmr: true,
  },
  antd: {},
  routes: [{ path: '/', component: '@/pages/index' }],
  theme: {
    'primary-color': '#008b7b',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  extraPostCSSPlugins: [
    postcssPx2vw({
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    }),
  ],
});
