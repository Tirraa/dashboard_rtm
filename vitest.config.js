import path from 'path';

/** @type {import('vite').UserConfig} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      reporter: ['html', 'text']
    },
    include: ['**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['node_modules']
  },
  resolve: {
    alias: {
      '##': path.resolve(__dirname, './interop'),
      '@': path.resolve(__dirname, './src'),
      'contentlayer/generated': path.resolve(__dirname, './.contentlayer/generated'),
      '@rtm/generated': path.resolve(__dirname, './.rtm-generated')
    }
  }
};
