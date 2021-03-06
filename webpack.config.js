 var path = require('path');
 var HtmlWebpackPlugin = require('html-webpack-plugin')
 var webpack = require('webpack');
 var ExtractTextPlugin = require('extract-text-webpack-plugin');
 var BabiliPlugin = require("babili-webpack-plugin");

 module.exports = {
     entry: {
         index: path.resolve(__dirname, './app/index.js')
     },
     output: {
         path: path.resolve(__dirname, 'dist'),
         filename: '[name].[chunkhash].js',
         publicPath: 'http://www.nbamanager.win/',
         //publicPath: 'http://localhost:8888/',
         chunkFilename: '[name].[chunkhash].js'
     },
     module: {
         rules: [{
             test: /\.vue$/,
             use: ['vue-loader']
         }, {
             test: /\.js$/,
             loader: 'babel-loader',
             exclude: [path.resolve(__dirname, 'node_modules')],
             query: {
                 presets: ['es2015']
             }
         }, {
             test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
             use: ['url-loader?limit=1&name=images/[hash:8].[name].[ext]', 'image-webpack-loader']
         }, {
             test: /\.css$/,
             use: ExtractTextPlugin.extract({
                 fallback: 'style-loader',
                 use: ['css-loader?importLoaders=1&minimize=true', 'postcss-loader']
             })
         }, {
             test: /\.scss$/,
             use: ExtractTextPlugin.extract({
                 fallback: 'style-loader',
                 use: ['css-loader?importLoaders=1&minimize=true', 'postcss-loader', 'sass-loader']
             })
         }]
     },
     resolve: {
         extensions: [".js", ".css", ".scss", ".vue"],
         alias: {
             'vue': 'vue/dist/vue.min.js',
             'jquery': "jquery/dist/jquery.min.js"
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
         }), new webpack.ProvidePlugin({
             jQuery: "jquery/dist/jquery.min.js",
             $: "jquery/dist/jquery.min.js",
             Chart: "chart.js/dist/Chart.min.js"
         }), new ExtractTextPlugin({
             filename: 'style.[contenthash].css'
         }), new webpack.optimize.CommonsChunkPlugin({
             name: 'vendor',
             minChunks: function(module) {
                 return module.context && module.context.indexOf('node_modules') !== -1;
             }
         }), new webpack.optimize.CommonsChunkPlugin({
             name: 'manifest'
         }), new BabiliPlugin(), new webpack.DefinePlugin({
             'process.env': {
                 NODE_ENV: '"production"'
             }
         })
     ]
 };
