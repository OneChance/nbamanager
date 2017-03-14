// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack');

module.exports = {
    entry: {
        index:path.resolve(__dirname, './app/index.js')
    },
    // 输出配置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            'Vue': 'vue/dist/vue.js'
        }
    },
    module: {
        rules:[
          {
              test: /\.vue$/,
              use: ['vue-loader']
          }, {
              test: /\.js$/,
              loader: 'babel-loader?presets=es2015',
              exclude: [path.resolve(__dirname, 'node_modules')]
          }, {
              test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
              use: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
          }, {
              test: /\.css$/,
              use: ['style-loader','css-loader?importLoaders=1','postcss-loader']
          },{
            test:/\.scss$/,
            use:['style-loader','css-loader?importLoaders=1','postcss-loader','sass-loader']
          }
        ]
    },
    resolve:{
      extensions:[".js",".css",".scss"],
      alias: {
          'vue': 'vue/dist/vue.js'
      }
    },
    devServer: {
        colors: true,
        inline: true,
        port: 8888
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'app/index.html'),
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
