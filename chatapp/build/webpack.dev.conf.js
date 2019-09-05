const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')


module.exports = merge(baseConfig,{
    mode:"development",
    output:{
        filename:'[name].[hash:16].js'
    },
    devtool:'inline-source-map',
    plugins:[
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
            minify: {
              html5: true
            },
            hash: false
          }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer:{
        port:3000,
        contentBase:path.join(__dirname,'../public'),
        compress:true,
        historyApiFallback:true,
        hot:true,
        https:false,
        noInfo:true,
        open:true,
        proxy:{
            '/register':{
                target:'http://localhost:8080',
                secure:false,
                changeOrigin: true
            },
            '/login':{
                target:'http://localhost:8080',
                secure:false,
                changeOrigin: true
            },
            '/update':{
                target:'http://localhost:8080',
                secure:false,
                changeOrigin: true
            },
            '/user':{
                target:'http://localhost:8080',
                secure:false,
                changeOrigin: true
            },
            '/userList':{
                target:'http://localhost:8080',
                secure:false,
                changeOrigin: true
            },
            '/msglist':{
                target:'http://localhost:8080',
                secure:false,
                changeOrigin: true
            },
            '/readmsg':{
                target:'http://localhost:8080',
                secure:false,
                changeOrigin: true
            }
        }
    }
})
