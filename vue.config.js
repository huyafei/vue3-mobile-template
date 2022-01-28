const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const publicPath = process.env.VUE_APP_publicPath;

module.exports = {
  // 部署应用包时的基本 URL,默认:/ https://cli.vuejs.org/zh/config/#publicpath
  publicPath,
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  outputDir: "dist",
  //以多页模式构建应用程序 如需要请参考 https://cli.vuejs.org/zh/config/#pages
  // pages:{ type:Object,Default:undfind },
  // eslint-loader是否在保存的时候检查
  lintOnSave: true,
  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true, // 花生壳显示Invalid Host header让其不检查hostname。
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    // proxy: "http://localhost:9527" // 配置跨域处理,只有一个代理
    //端口
    port: 9527,
    // host:'0.0.0.0', // 设置0.0.0.0则所有的地址都能访问
    // host: 'wxtest.com',
    // proxy: {
    // "/api": {
    //   target: "http://192.168.0.188:8080",// 设置调用的接口域名和端口号
    //   ws: true, // 代理websocket
    //   changeOrigin: true,
    //   pathRewrite: { // 路径重写
    //     "^/api": ""
    //   }
    // }
    // } // 配置多个代理,
  },
  // css相关配置
  css: {
    // 配置高于chainWebpack中关于css loader的配置
    // extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    sourceMap: false, // 是否在构建样式地图，false将提高构建速度
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        // additionalData: `@import "~@/variables.sass"`,
      },
      // 给 sass-loader 传递选项
      scss: {
        // additionalData: `@import "~@/variables.scss";`
      },
      less: {
        // @/ 是 src/ 的别名
        // data: `@import "~@/assets/less/color.less";`
      },
      postcss: {},
    },
  },
  configureWebpack: () => {
    //返回一个将要合并的对象
    return {
      output: {
        // filename: `js/[name].${_version}.${_timestamp}.js`,
        // chunkFilename: `js/[name].${_version}.${_timestamp}.js`,
      },
      resolve: {
        alias: {
          // "@src": path.resolve("src"),
          // "@components": path.resolve("src/components"),
        },
      },
      plugins: [
        // 配置compression-webpack-plugin压缩
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]", // 旧版本为assets，现为filename
          algorithm: "gzip",
          test: /\.jpg$|\.js$|\.html$|\.css$|\.less/,
          threshold: 10240, // 对超过10k的数据压缩
          // deleteOriginalAssets: true, // 删除源文件，不建议开启
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        }),
      ],
    };
  },
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins.delete("prefetch").delete("preload");
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("less").oneOf(type))
    );
    config.when(process.env.NODE_ENV === "development", (config) => {
      config.devtool("cheap-source-map"); //cheap-source-map--不显示源码 、source-map--显示源码 、 eval--最快的编译办法
    });
    if (process.env.VUE_APP_env === "prd") {
      // 打包优化，去除console.log
      config.optimization.minimizer.push(
        new UglifyJsPlugin({
          sourceMap: false,
          // 开启多线程提高打包速度, 默认并发运行数：os.cpus().length - 1
          parallel: true,
          uglifyOptions: {
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"], // 生产环境自动删除console
            },
            warnings: false,
          },
        })
      );
    }
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置... process.env.NODE_ENV !== 'development'
      config.module
        .rule("images")
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false },
          // webp: { quality: 75 } 大大减少体积，但在ios存在兼容问题，不用
        });
    } else {
      // 为开发环境修改配置...
    }
  },
  // PWA 插件相关配置
  pwa: {},
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
};
function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./src/assets/styles/less/color.less"),
        path.resolve(__dirname, "./src/assets/styles/less/mixin.less"),
      ],
    });
}
