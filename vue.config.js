// 这个文件是 vue-cli 创建出来的配置文件
// 在 vue.comfig.js 这个配置文件，可以对整个项目的打包、构建进行全局性配置
// vue.config.js

// webpack 在进行打包的时候，底层用到了 node.js
const path = require('path')
const themePath = path.join(__dirname, './src/theme.less')
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          // 'nav-bar-background-color': '#007bff'
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${themePath}";`
        }

      }
    }
  }
}
