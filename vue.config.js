module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  }
};
