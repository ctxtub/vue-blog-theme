const TerserPlugin = require('terser-webpack-plugin')
const publicPath = '/'

// 页面Pages配置
const PAGES = {
  index: {
    // page 的入口
    entry: 'src/main.js',
    // 模板来源
    template: 'public/index.html',
    // 在 dist/index.html 的输出
    filename: 'index.html',
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', 'index']
  }
}

module.exports = {
  publicPath: publicPath,
  pages: PAGES,
  filenameHashing: true,
  css: {
    modules: false,
    extract: true,
    loaderOptions: {
    }
  },
  // webpack配置
  configureWebpack: {
    resolve: {
      alias: {}
    },
    optimization: {
      minimizer: [new TerserPlugin({ terserOptions: { compress: { drop_console: true } } })]
    }
  },
  devServer: {
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true
    }
    // proxy: {
    //   '/api': {
    //     target: ''
    //   }
    // }
  },
  // eslint报错展示
  lintOnSave: 'error'
}
