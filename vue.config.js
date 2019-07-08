const path = require('path');
// const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  /* configureWebpack: (config)=>{
    config.plugins.push(new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          app: path.join(__dirname, './src/skeleton.ts'),
        },
      },
      minimize: true,
      quiet: true,
    })) 
  }, */
  configureWebpack: {
    plugins: [
      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname, '../'),
        manifest: require('./public/vender/vender-manifest.json')
      })
    ]
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
};
