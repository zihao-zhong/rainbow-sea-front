const path = require('path');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const resolve = (dir) => path.join(__dirname, dir);
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

console.log('NODE_ENV:', process.env.NODE_ENV);

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './', // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: '/public', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  pwa: {},
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: false,
      errors: true,
    },
    open: false, // 是否打开浏览器
    host: 'localhost',
    port: 4000, // 端口号
    hotOnly: true, // 热更新
    proxy: {
      '/api': {
        target: process.env.VUE_APP_HTTP_URL, // 目标代理接口地址
        secure: false, // 使用的是http协议则设置为false，https协议则设置为true
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          // '^/api': '/',
        },
        onProxyReq: function (proxyReq, req) {
          // 打印请求接口path
          console.log(req.path);
        },
      },
    },
  },
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
          @import "/css/normalize.css";
          @import "./src/assets/scss/common.scss";
          @import "./src/assets/scss/mixins.scss";
          @import "./src/assets/scss/function.scss";
          @import "./src/assets/scss/variables.scss";
        `,
      },
      less: {
        lessOptions: {
          modifyVars: {
            dark: true,
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack: (config) => {
    // webpack 插件集合
    const plugins = [];

    if (IS_PROD) {
      // 使用 splitChunks 单独打包第三方模块
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            common: {
              name: 'chunk-common',
              chunks: 'initial',
              minChunks: 2,
              minSize: 0,
              priority: 1,
              enforce: true,
              maxInitialRequests: 5,
              reuseExistingChunk: true,
            },
            vendors: {
              name: 'chunk-vendors',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'initial',
              priority: 2,
              enforce: true,
              reuseExistingChunk: true,
            },
            antdUI: {
              name: 'chunk-ant-design-vue',
              test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
              chunks: 'all',
              priority: 3,
              enforce: true,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // 开启 gzip 压缩
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip', // 压缩算法
          threshold: 10240, // 大于10kb 的文件才启用压缩
          minRatio: 0.8,
          compressionOptions: { level: 9 }, // 压缩等级9，开启最高
          test: /\.(js|ts|css|json|txt|html|ico|svg)(\?.*)?$/i,
        }),
      );
    }

    config.plugins = [...config.plugins, ...plugins];
  },
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@public', resolve('public'))
      .set('@pages', resolve('src/pages'))
      .set('@store', resolve('src/store'))
      .set('@types', resolve('src/types'))
      .set('@utils', resolve('src/utils'))
      .set('@router', resolve('src/router'))
      .set('@assets', resolve('src/assets'))
      .set('@plugins', resolve('src/plugins'))
      .set('@layouts', resolve('src/layouts'))
      .set('@scss', resolve('src/assets/scss'))
      .set('@components', resolve('src/components'));

    // 打包分析(本地打包才进行分析，服务器打包则不需要)
    if (IS_PROD && process.env.VUE_APP_BUILD_PLACE === 'local') {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static',
        },
      ]);
    }

    // 删除 moment 除 zh-cn 中文包外的其它语言包
    config.plugin('ignore').use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/));

    if (IS_PROD) {
      config.optimization.delete('splitChunks');
    }

    return config;
  },
};
