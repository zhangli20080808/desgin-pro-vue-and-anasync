const path = require("path");
const resolve = dir => path.join(__dirname, dir);
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
  },
  // publicPath: '/best-practice', // 部署应用包时的基本 URL
  devServer: {
    port: 7001,
    open: true
  },
  configureWebpack: {
    // 向index.html注入标题
    name: "最佳实践"
  },
  //  配置svg    vue inspect --rules
  chainWebpack(config) {
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end(); //返回上一级

    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" })
      .end();
  }
};
